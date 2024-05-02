import { Link, useNavigate } from "react-router-dom";
import style from "../ProfileUpdate/ProfileUpdate.module.css"
import qrIMG from "../../../Images/clentBankQR.png";
// import { useEffect, useRef, useState } from "react";
import formfields from "./ClientBankFieldNames";


import Swal from "sweetalert2";
import { url_ } from "../../../Config";
import { useState } from "react";
import { useEffect } from "react";


function ClientBankDetails() {
  const navigate = useNavigate();
  const storedToken = window.localStorage.getItem('jwtToken');
  const PAN = localStorage.getItem("pan");

  const client_id_it = localStorage.getItem("client_id_it");
  const client_id_gst = localStorage.getItem("client_id_gst");
  const [clientBankDetails, setClientBankDetails] = useState({
    upiId: "",
    bank_name: "",
    branch_name: "",
    acNo: "",
    ifscCode: "",
    qrimg: null,

  })
  const handleBankDetailChange = (e) => {
    // const { name, value } = e.target;


    switch (e.target.name) {
      case "upiId":
        setClientBankDetails({ ...clientBankDetails, [e.target.name]: e.target.value });
        break;
      case "bank_name":
        setClientBankDetails({ ...clientBankDetails, [e.target.name]: e.target.value.replace(/\d/g, "") });
        break;
      case "branch_name":
        setClientBankDetails({ ...clientBankDetails, [e.target.name]: e.target.value.replace(/\d/g, "") });
        break;
      case "acNo":
        setClientBankDetails({ ...clientBankDetails, [e.target.name]: e.target.value.replace(/\D/g, "") });
        break;
      case "ifscCode":
        setClientBankDetails({ ...clientBankDetails, [e.target.name]: e.target.value.toUpperCase() });
        break;
      case "qrimg":
        setClientBankDetails({ ...clientBankDetails, [e.target.name]: e.target.files[0] });
        break;

      default:
        break;
    }
  }

  const SavaClientBankDetails = async () => {
    console.log(clientBankDetails)
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);


      const formdata = new FormData();
      formdata.append("pan", PAN);
      formdata.append("qrCode", clientBankDetails.qrimg);
      formdata.append("upiId", clientBankDetails.upiId);
      formdata.append("bankName", clientBankDetails.bank_name);
      formdata.append("accountName", clientBankDetails.branch_name);
      formdata.append("accountNumber", clientBankDetails.acNo);
      formdata.append("ifsc", clientBankDetails.ifscCode);
      formdata.append("upiNumber", "1");

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
      };

      const response = await fetch(`${url_}/client-bank-details`, requestOptions)
      if (response.status === 200) {
        Swal.fire("Success.", "Bank data saved.", "success");
        GetClientBankData();
        window.location.reload();
      }
      else {
        Swal.fire("Failed.", "Failed to save bank details.", "error")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const UpdateClientBankDetails = async () => {
    try {



      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const formdata = new FormData();

      formdata.append("pan", PAN);
      formdata.append("qrCode", clientBankDetails.qrimg);
      formdata.append("upiId", clientBankDetails.upiId);
      formdata.append("bankName", clientBankDetails.bank_name);
      formdata.append("accountName", clientBankDetails.branch_name);
      formdata.append("accountNumber", clientBankDetails.acNo);
      formdata.append("ifsc", clientBankDetails.ifscCode);
      formdata.append("upiNumber", "1");
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };

      const response = await fetch(`${url_}/update/client-bank-details`, requestOptions)
      if (response.status === 200) {
        Swal.fire("Success.", "Bank data updated.", "success");
        window.location.reload();
        GetClientBankData();
      }
      else {
        Swal.fire("Failed.", "Failed to update bank details.", "error")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const GetClientBankData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`${url_}/client-bank-details/pan/${PAN}`, requestOptions)
      const result = await response.json();
      setClientBankDetails(
        {
          upiId: result.upiId,
          bank_name: result.bank_name,
          branch_name: result.accountName,
          acNo: result.accountNumber,
          ifscCode: result.ifsc,
          qrimg: `data:image/png;base64,${result.qrCode}`,
        }
      )
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    GetClientBankData();
  }, []);
  return (
    <div className={`${style.row1}`}>
      <div className={`${style.allport}`}>
        {/* Headbar Starts*/}
        <div className={`${style.headerbar}`}>
          <div className={`${style.leftear}`}>
            <Link
              onClick={(e) => {
                e.preventDefault();
                navigate("/client/clientpasscheck/clienthome");
              }}
              style={{ fontSize: "2rem", margin: "0.5rem", color: "black" }}
            >
              <i
                className="fa-solid fa-angle-left"
                style={{ fontSize: "1.5rem", color: "grey" }}
              ></i>

            </Link>
            <h4 className={`${style.h31}`}>Bank Information</h4>

          </div>
        </div>
        {/* Headbar Ends ....................................................................................................... */}

        {/* ABD Starts*/}
        <div className={`${style.abd}`}>
        </div>
        {/* ABD Ends ....................................................................................................... */}

        {/* workport Starts*/}
        <div className={`${style.workport}`}>
          <div className={`${style.profileport}`}>
            <div className={`${style.card}`}>
              <img
                src={clientBankDetails.qrimg ? clientBankDetails.qrimg : qrIMG}
                alt="profile_picture"
                className={`${style.img1}`}
              />

              <div className={`${style.cardbody}`}>
                <b >
                  Your QR Code</b>
                {/* <input
                  id="profileImg"
                  type="file"
                  accept="image/*"
                  name="qrimg"
                  style={{ display: 'none' }}
                  value={clientBankDetails.qrimg}
                  onChange={handleBankDetailChange}
                /> */}
                <input type="file" name="qrimg" id="" onChange={handleBankDetailChange} />
                <p className={`${style.p1}`}>{PAN}</p>
              </div>
            </div>
          </div>





          {formfields.map((item, index) => (
            <div className={`${style.input}`}>
              <div className={`${style.label}`}>
                <label htmlFor={item.id} className={`${style.mandatory} `}>
                  {item.labelname}
                </label>
              </div>
              <div className={`${style.txtbox}`}>
                <input type="text" name={item.name} id={item.id} className={`${style.ipc}`} autoComplete="off" onChange={handleBankDetailChange} value={clientBankDetails[item.name]} />
              </div>
            </div>
          ))}



        </div>
        {/* workport Ends ....................................................................................................... */}
      </div>
      <div className={`${style.button}`}>
        {clientBankDetails.bank_name === null ?
          <>
            <button
              type="submit"
              className={`${style.btnsbt}`}
              onClick={SavaClientBankDetails}
            >
              SAVE
            </button>
          </>
          :
          <>
            <button
              type="submit"
              className={`${style.btnsbt}`}
              onClick={UpdateClientBankDetails}
            >
              UPDATE
            </button>
          </>
        }

      </div>
    </div>
  );
}
export default ClientBankDetails;