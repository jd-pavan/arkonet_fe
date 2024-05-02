import React, { useState } from 'react';
import './AdUpload.css'
import Swal from 'sweetalert2';
import { url_ } from '../../Config';

const AdUpload = () => {
  const [adImage, setAdImage] = useState(null);
  const storedToken = window.localStorage.getItem('jwtToken');

  const handleAdChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (file && allowedTypes.includes(file.type)) {
      setAdImage(file);
    } else {
      console.error('Invalid file type. Please select a JPG, PNG, or JPEG file.');
      Swal.fire("Warning!!", "Only JPG, PNG, or JPEG files are allowed!!", "warning")
    }
  }


  const UploadAD = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const formdata = new FormData();
      formdata.append("file", adImage);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };

      const response = await fetch(`${url_}/Advertisement-Image`, requestOptions)
      if (response.status === 200) {
        await Swal.fire("Success!!", "Ad uploaded.", "success");
        window.location.reload();
      } else {
        Swal.fire("Failed!!", "Failed to upload Ad.", "error")
      }

    } catch (error) {
      console.log(error)
    }

    console.log("Ad uploaded...", adImage);
    setAdImage(null)
  }
  return (
    <>
      <form class="form-container" enctype='multipart/form-data'></form>
      <div className='d-flex justify-content-center w-100'>
        <div class="upload-files-container">
          <div class="drag-file-area">
            <span class="material-icons-outlined upload-icon"> file_upload </span>
            <h3 class="dynamic-message"> Drag & drop any file here </h3>
            <label class="label"> or <span class="browse-files"><input type="file" class="default-file-input" name='AdImage' onChange={handleAdChange} /> <span class="browse-files-text">browse file</span> <span>from device</span> </span> </label>
          </div>
          {adImage === null ? <></> : <>
            <button type="button" class="upload-button" onClick={UploadAD}> Upload </button>
          </>}
        </div>
      </div >
      <form />
    </>
  );
}

export default AdUpload;
