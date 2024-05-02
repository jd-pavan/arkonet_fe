import React, { useEffect, useState } from "react";
import { url_ } from "../../Config";

const AdCarousel = () => {
  const [ads, setAds] = useState([]);
  const storedToken = window.localStorage.getItem('jwtToken');

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
      console.log(result);
      setAds(result)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    GetTotalAds();
  }, []);
  return (


    <div>
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" style={{ backgroundColor: "gray", borderRadius: "10px" }}>
        <ol className="carousel-indicators">
          {ads.map((AdsData, index) => (
            <li data-target="#carouselExampleIndicators" data-slide-to={`${index}`} className={`${index === 0 ? 'active' : ''}`}></li>
          ))}


        </ol>
        <div className="carousel-inner">

          {/* <div className="carousel-item active" style={{ height: "100%", width: "100%", objectFit: "cover" }}>
              <img src={`data:image/jpeg;base64,${AdsData.data}`} className="d-block w-100" alt="First Ad" style={{ height: "30vh" }} />
            </div> */}
          {ads.map((AdsData, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img className="d-block w-100" src={`data:image/jpeg;base64,${AdsData.data}`} alt="First slide" style={{ height: "30vh", borderRadius: "10px" }} />
            </div>
          ))}

        </div>
        {/* {ads.length > 1 ?
          <> */}
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
        {/* 
          </>
          :
          <>
          </>} */}
      </div>
    </div>




  );
}

export default AdCarousel;
