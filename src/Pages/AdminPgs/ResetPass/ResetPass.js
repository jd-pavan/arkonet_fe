import React, { useState } from 'react';
import style from './ResetPass.module.css'
// import swal from 'sweetalert';
import { url_ } from '../../../Config';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { Link, json, useNavigate } from 'react-router-dom';


const ResetPass = ({ setAlertMessage }) => {

  const Navigate = useNavigate();
  const [otpSent, setOTPSent] = useState(false)
  const [otpVerified, setotpVerified] = useState(false)
  const [data, setData] = useState({
    pan: "",
    otp: "",
    newPassword: "",
    confirmpassword: ""
  });

  const handleChange = (e) => {

    switch (e.target.name) {
      case "pan":
        const UpperCasePAN = e.target.value
        setData({ ...data, [e.target.name]: UpperCasePAN.toUpperCase() });
        break;

      default: setData({ ...data, [e.target.name]: e.target.value });
        break;
    }




  };


  const SendOTP = () => {


    const otpurl = `${url_}/send-otp`;



    try {
      Swal.fire({
        title: 'Sending OTP...',
        text: 'Please wait...',
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      const formdata = new FormData();
      formdata.append("pan", data.pan);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch(otpurl, requestOptions)
        .then(response => {
          response.json();
          console.log(response.status)
          if (response.status === 200) {
            // Swal.fire("Success.", "OTP is sent to registered email. Verify the OTP", "success");
            Swal.close();
            setAlertMessage("OTP is sent to registered email. Verify the OTP.")
            setOTPSent(true)
          } else {
            Swal.fire("Failed.", "Failed To send OTP", "error");

          }
        })

        .catch(error => console.log('error', error));



    } catch (error) {
      console.warn("Error on function calling...")
    }

  }

  const VerifyOTP = () => {

    const verifyurl = `${url_}/verify-otp`;

    try {

      const formdata = new FormData();
      formdata.append("otp", data.otp);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch(verifyurl, requestOptions)
        .then(response => {
          response.json();
          console.log(response.status)
          if (response.status === 200) {
            // swal("Success.", "OTP Verified.", "success");
            setAlertMessage("OTP Verified.")
            setotpVerified(true);
            console.log(data.otp)
          } else {
            swal("Failed", "Invalid OTP!!", "error");

            console.log(data.otp)
          }
        })

        .catch(error => console.log('error', error));



    } catch (error) {
      console.warn("Error on function calling...")
    }
  }

  const handleSubmit = async () => {




    if (data.newPassword === data.confirmpassword) {

      console.log("New:", data.newPassword)
      console.log("Confirm:", data.confirmpassword)
      console.log("Otp:", data.otp)

      const verifyurl = `${url_}/reset-password`;

      try {

        const formdata = new FormData();
        formdata.append("otp", data.otp);
        formdata.append("newPassword", data.newPassword);

        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };

        const response = await fetch(verifyurl, requestOptions)
        // const result = await response.json();

        // console.log(result)
        console.log(response)



        if (response.status !== 200) {
          const result = await response.json();
          console.log(result)
          if (result.status === "NOT_FOUND") {
            swal("Failed", `${result.message}`, "error");
            setData({
              ...data,
              newPassword: "",
              confirmpassword: ""
            })

          } else {
            swal("Failed", "Failed to change password!!", "error");
            setData({
              ...data,
              newPassword: "",
              confirmpassword: ""
            })
          }

        } else {
          await swal("Success.", "Password changed successfully.", "success");
          setData({
            newPassword: "",
            confirmpassword: "",
            otp: ""
          })
          Navigate("/admin/")
        }
      }
      catch (error) {
        console.log(error)
      }



    } else {
      swal("Failed!", "Passsword doesn't match!!", "error");

    }

  }

  return (
    <div>
      <div className="container">
        <div className='d-flex justify-content-between align-items-center pr-5'>

          <div className={`${style.title} row m-5 mt-5 `}>
            Forget Password
          </div>
          <div className={` ${style.back_to_login_btn} `}>
            <button onClick={() => Navigate("/admin/")}>Back to LOGIN</button>
          </div>
        </div>
        <div className={`row m-4 d-flex flex-column ${style.reset_input}`}>
          <label htmlFor=""><b>Enter Registered PAN</b></label>
          <input type="text" value={data.pan} onChange={handleChange} name='pan' placeholder='Enter Registered PAN....' autoComplete='off' maxLength={10} disabled={otpSent} />
        </div>
        <div className="row m-2 d-flex justify-content-end mr-4">
          <span onClick={SendOTP} className={`${style.line} ${style.hover}`}>Send OTP</span>
        </div>
        <div className='row m-4 mt-5'>
          <div className={`col-6 ${style.reset_input}`}>
            <input type="text" onChange={handleChange} value={data.otp} name='otp' placeholder='Enter the OTP....' autoComplete='off' maxLength={6} disabled={otpVerified} />
          </div>
          <div className={`col-6 ${style.btn} d-flex justify-content-center`}>
            <button onClick={VerifyOTP}>Verify</button>
          </div>
        </div>

        <div className="row m-4 d-flex flex-column">

          <div className={`row m-4 ${style.reset_input}`}>
            <label htmlFor=""><b>New Password</b></label>
            <input type="password" onChange={handleChange} value={data.newPassword} name='newPassword' placeholder='Enter new password....' autoComplete='off' />
          </div>
          <div className={`row m-4 ${style.reset_input}`}>
            <label htmlFor=""><b>Confirm New Password</b></label>
            <input type="password" onChange={handleChange} value={data.confirmpassword} name='confirmpassword' placeholder='Re-enter new password....' autoComplete='off' />
          </div>
          <div className={`row d-flex justify-content-center ${style.btn}`}>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>


      </div>

    </div >
  );
}

export default ResetPass;
