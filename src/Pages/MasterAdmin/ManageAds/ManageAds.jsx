import React, { useEffect, useState } from 'react';
import AdUpload from '../../../components/AdUpload/AdUpload';
import DemoImg from '../../../Images/sunset-horizon-standing-alone-mountains-scenery-ai-art-hd-wallpaper-uhdpaper.com-715@1@l.jpg'
import { url_ } from '../../../Config';
import Swal from 'sweetalert2';
import { classNames } from '@react-pdf-viewer/core';

const ManageAds = () => {

  const AdImageDiv = {
    height: "10vh",
    border: "1px dashed black",
    margin: "31px 35px 0 20px",
    width: "15rem",
    height: "15rem",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 10px 20px, rgba(0, 0, 0, 0.28) 0px 6px 6px",
    backgroundSize: "cover"

  }
  const AdDeleteDiv = {
    padding: "0 10px",
    backgroundColor: "white",
    fontSize: "30px",
    borderTopRightRadius: "10px",
    borderBottomLeftRadius: "10px",
    color: "red",
    borderBottom: "2px dashed black",
    borderLeft: "2px dashed black",
    cursor: "pointer"
  }

  const storedToken = window.localStorage.getItem('jwtToken');
  const [totalAdImages, setTotalAdImages] = useState([]);
  const GetTotalAds = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`${url_}/Get-Advertisement-Images`, requestOptions)
      const result = await response.json();
      // console.log(result);
      setTotalAdImages(result)
    } catch (error) {
      console.log(error);
    }
  }

  const DeleteAdImage = async (AdId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, confirm!'
    });

    if (result.isConfirmed) {
      try {

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow"
        };

        const response = await fetch(`${url_}/Delete-Advertisement-Image/${AdId}`, requestOptions)
        if (response.status === 200) {
          await Swal.fire("Success!!", "Ad deleted.", "success")
          window.location.reload();

        } else {
          Swal.fire("Failed!!", "Failed to delete Ad.", "error")
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log("Canceled the toggle!");
    }
  }

  useEffect(() => {

    GetTotalAds();
  }, []);
  return (
    <>
      {
        totalAdImages.length === 5 ?
          <>
            <div style={{ textAlign: "center", width: "100%", border: "3px dashed red", padding: "10px", borderRadius: "10px", margin: "15px 0" }} >
              <h5>Max Limit reached for ads</h5>
            </div>
          </> :

          <>
            <AdUpload callBackFunction={GetTotalAds} />

          </>
      }

      <div className='d-flex justify-content-evenly flex-wrap'>
        {totalAdImages.map((AdsData, index) => (
          <div style={{ ...AdImageDiv, backgroundImage: `url(data:image/jpeg;base64,${AdsData.data})` }}>
            <div className='d-flex justify-content-end' style={{ position: "relative" }}>
              <span style={AdDeleteDiv} onClick={() => DeleteAdImage(AdsData.id)}>
                <i class="bi bi-trash3-fill"></i>
              </span>
            </div>
          </div>
        ))}




      </div >
    </>
  );
}

export default ManageAds;
