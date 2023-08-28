import arkonet from "../../../Images/Arkonet.jpg";
import style from "./ClientPassCheck.module.css";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { url_ } from '../../../Config';
import { useLocation } from 'react-router-dom';

function ClientPassCheck() {
  const { isPasswordNull, clientid } = useLocation().state; //Get Password status and Clientid(PAN) from route

  //const {isPasswordNull,clientid}={isPasswordNull:false,clientid:"PAVAN1999J"};

  //console.log("password ",isPasswordNull,clientid)


  const [credentials, setCredentials] = useState({
    Upassword: "",
    confirmpassword: ""
  });

  const Navigate = useNavigate();

  function handleChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });


    //Code to : to check two passwords
    if (e.target.name === "confirmpassword" && credentials.Upassword !== e.target.value) {
      //console.log("Password mismatch");       
    }


  }


  //------------------store jwt user data in localStorage----------------
  function storeJwtData(jwtData) {
    Object.keys(jwtData).forEach((key) => {
      localStorage.setItem(key, jwtData[key]);
    });

  }


  //---------------Set New Password -----------------------------
  const handleSetPassword = async () => {
    if (credentials.Upassword === credentials.confirmpassword && (credentials.Upassword !== "" || credentials.confirmpassword !== "")) {
      console.log("Password Match", credentials.Upassword, credentials.confirmpassword);
      //-----Code to Set Password -----------

    }
    else {
      console.log("Password : ", credentials.Upassword, "Confirm : ", credentials.confirmpassword);
    }

  };


  //----------------Login---------------
  const handleLogin = async () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: clientid,//Recieved From Previous Page
      password: credentials.Upassword,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };


    await fetch(`${url_}/authenticate`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Login error");
        }
      })
      .then((data) => {
        const jwtToken = data.token;
        localStorage.setItem("jwtToken", jwtToken);
        const user_id = data.user.regId;
        localStorage.setItem("user_id", user_id);
        storeJwtData(data.user)
        Navigate(`/clientdocfolder`, { state: { clientid: "1" } });

      })
      .catch((error) => console.log("error", error));

  };


  function handleButtonClick() {
    console.log("Client Id : ", clientid);
    if (isPasswordNull) {
      //Code to Set the Password
      handleSetPassword();

    }
    else { //Code to Login
      handleLogin();
    }



  }
  return (
    // main class
    <div className={`${style.maincontainer}`}>
      {/* Header */}
      <div className={`${style.header}`}>
        <a href="previous link" id={`${style.welcome}`}>
          &lt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to
        </a>
        <h2>TAXKO</h2>
      </div>

      {/* Main Content */}
      <div className={`${style.inputs}`}>
        <form className={`${style.form}`}>
          <label htmlFor="password" className={`${style.labels}`}>
            {isPasswordNull ? "Set your Password" : "Enter Your Password"}
          </label>
          <input
            type="password"
            id="Upassword"
            name="Upassword"
            placeholder={`${isPasswordNull ? "Set your Password" : "Enter your Password"}`}
            value={credentials.Upassword}
            onChange={handleChange}
          />
          {isPasswordNull &&
            <>
              <label htmlFor="confirmpassword" className={`${style.labels}`}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                placeholder="Confirm Password"
                value={credentials.confirmpassword}
                onChange={handleChange}
              /></>
          }
        </form>
      </div>

      {/* Button */}
      <div className={`${style.button}`}>
        <button type="button" ld={`${style.login}`} onClick={handleButtonClick}>
          {isPasswordNull ? "Set Password" : "Login"}
        </button>
        <a href="previous link" id={`${style.forgot}`}>
          <u>Forgot Password?</u>
        </a>
      </div>

      {/* Copyright */}
      <div className={`${style.copyright}`}>
        <a href="previous link" id={`${style.devs}`}>
          Developed & Managed by
        </a>
        <img src={arkonet} alt="" id={`${style.arkonet}`} />
        <a href="previous link" id={`${style.social}`}>
          Follow us on
        </a>
        <div className={`${style.handles}`}>
          <a href="previous link" id={`${style.instagram}`}>
            <i className="fa-brands fa-instagram" style={{ color: "#05022c" }}></i>
          </a>
          <a href="previous link" id={`${style.twitter}`}>
            <i className="fa-brands fa-twitter" style={{ color: "#05022c" }}></i>
          </a>
          <a href="previous link" id={`${style.facebook}`}>
            <i className="fa-brands fa-facebook-f" style={{ color: "#05022c" }}></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ClientPassCheck;
