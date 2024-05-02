import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./ClientNotification.module.css";
import { url_ } from "../../../Config";
import taxko_logo from "../../../Images/taxko_logo1.png";

function ClientNotification() {

  const storedToken = window.localStorage.getItem("jwtToken");
  const clientID = window.localStorage.getItem("clientId");
  const [client_notification, setClient_notification] = useState([]);
  const [imgcontent, setImgContent] = useState();
  const [emailData, setEmailData] = useState({
    From: "",
    DateTime: "",
    Message: "",
    Img: ""
  })
  const handlePreview = (pdata, notiID) => {
    // console.log(notiID)
    if (pdata.imagePath === null) {
      setEmailData({
        From: pdata.notificationFrom,
        DateTime: pdata.sendDate,
        Message: pdata.text === "undefined" ? "" : pdata.text,
        Img: ""
      })
      handleViewedNoti(notiID);
      setImgContent("")
    } else {
      setEmailData({
        From: pdata.notificationFrom,
        DateTime: pdata.sendDate,
        Message: pdata.text === "undefined" ? "" : pdata.text,
        Img: ""
      })
      handleViewedNoti(notiID);
      clickMe(pdata.id);
    }
  }

  const handleViewedNoti = async (noti_ID) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/changeNotificationView/${noti_ID}`, requestOptions);
      const result = await response.text();

    } catch (error) {
      console.log(error)
    }
  }



  const GetClientNotifications = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const Response = await fetch(`${url_}/getListByClientid/${clientID}`, requestOptions);
      const Result = await Response.json();
      // console.log(Result)
      const NewFinalArray = Result.sort((a, b) => {
        const dateA = new Date(a.sendDate.replace(" at", ""));
        const dateB = new Date(b.sendDate.replace(" at", ""));
        return dateB - dateA;
      });
      setClient_notification(NewFinalArray)
    } catch (error) {
      console.log(error)
    }
  }


  const clickMe = async (imgId) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(`${url_}/notification/${imgId}`, requestOptions)
    const result = await response.json();
    console.log(result)

    setImgContent(result.content)
  }

  const imageSrc = imgcontent ? `data:image/jpeg;base64,${imgcontent} ` : 0;
  useEffect(() => {

    GetClientNotifications();
  }, []);
  return (

    <>
      <div className={` ${style.backlink}`}>
        <Link to="/client/clientpasscheck/clienthome">
          <i className="fa-solid fa-angle-left"></i> &nbsp;Notifications
        </Link>
      </div>
      <hr />
      <div className={style.ClientNoti_Main_body}>
        {client_notification.map((item, index) => (
          <div key={index} className={`${style.ClientNoti_N_Lists}`} data-toggle="modal" data-target="#exampleModalCenter" onClick={() => handlePreview(item, item.id)} style={item.notificationView === false ? { backgroundColor: "#ffe35c" } : { backgroundColor: "#e2e2e2" }}>
            <div className={`${style.ClientNoti_N_Lists_A}`}>
              <img src={taxko_logo} alt="TAXKO" />
            </div>
            <div className={`${style.ClientNoti_N_Lists_B}`}>
              <span>{item.notificationFrom}</span>
              <hr />
              <div>{item.text === "undefined" ? '' : item.text.length > 40 ? item.text.slice(0, 40) + " . . . ." : item.text + "."}&nbsp;</div>
              <small>{item.sendDate}</small></div>
          </div>

        ))}


      </div >


      <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Notification</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={GetClientNotifications}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="email-container">

                <div className="email-content">
                  <p><strong>From:</strong> {emailData.From}</p>
                  <p><strong>Date Time:</strong> {emailData.DateTime}</p>
                  <p><strong>Message:</strong></p>
                  <p>
                    {emailData.Message}
                  </p>

                  <div className={style.Client_image_container}>
                    {imageSrc ? <>
                      <img src={imageSrc} alt="Placeholder_Image" width="400" style={{ objectFit: "contain" }} />
                    </> : <>
                      NO IMG
                    </>}
                  </div>
                </div>
                <hr />
                <div className="email-footer">

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>


  );
}

export default ClientNotification;
