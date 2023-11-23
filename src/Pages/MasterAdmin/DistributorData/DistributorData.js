import React, { useState } from 'react';
import DropDown from '../../../components/DropDown/DropDown'
import Uprofesion_obj from '../../../ObjData/AProf.json'
import States_obj from '../../../ObjData/States.json'

import swal from 'sweetalert';
import { url_ } from '../../../Config';
import styles from './DistributorData.module.css';
import profileimg from '../../../Images/profile.png'
import InputField from '../../../components/InputField/InputField';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



const DistributorData = () => {

  const Navigate = useNavigate()
  const user_id = useLocation().state.DistributorID;
  const Distri_PAN = useLocation().state.DistributorPAN;
  // console.log(user_id)
  const storedToken = window.localStorage.getItem('jwtToken');

  const [values, setValues] = useState({
    name: "",
    datebirth: "",
    profession: "",
    pan: "",
    telephone: "",
    mobile: "",
    email: "",
    office_Address: "",
    pin_Code: "",
    state: "",
    whatsApp_Link: "",
    investNow_Email: "",
    userid: `${user_id}`,
  })


  useEffect(() => {
    GetClient();
    Getbankdetails();
    GetDistriKYCdata();
  }, [])



  function GetClient() {
    try {

      fetch(`${url_}/all/distributorbyid/${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        }
      })
        .then(response => response.json())
        .then(res => {
          // console.log(res);
          setValues({
            name: res.name,
            datebirth: res.datebirth,
            profession: res.profession,
            pan: res.pan,
            telephone: res.telephone,
            mobile: res.mobile,
            email: res.email,
            office_Address: res.office_Address,
            pin_Code: res.pin_code,
            state: res.state,
            whatsApp_Link: res.whatsApp_Link,
            investNow_Email: res.investNow_Email,
            userid: res.regId,
          })

        })
        .catch(error => {


          console.log(error)
        });
    } catch (error) {
      console.warn("Error on function calling...")
    }
  }


  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `${url_}/updateDistribution/${user_id}`;
    console.log(url);
    console.log(values)
    try {

      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        },

        body: JSON.stringify(values),
      })
        .then(res => {
          swal("Success", "Data updated successfully.", "success");
          window.history.back();
          console.log(values)
        })
        .catch(error => {
          swal("Failed!", " Failed to update.!!!!", "error");
          console.log(error)
        });
    } catch (error) {
      console.warn("Error on function calling...")
    }
  }




  ////////////////////////////////////////////////////////////////////////////////////


  const [bankdatalength, setBankDataLength] = useState();
  const [imgcontent, setImgContent] = useState();
  const [image_name, setImage_name] = useState(null);
  const [bankdetails, setBankdetails] = useState({

    // qrcode: null,
    // upiid: "",
    // upinumber: "",
    bankname: "",
    accountname: "",
    accountnumber: "",
    ifsc: "",

    profilepic: null,
    DistriPAN: null,
    DistriAddhar: null,
    DistriCanceledCheuqe: null
  });


  const bankhandleChange = (e) => {





    const { name, value } = e.target;




    //=============================================================================
    switch (name) {


      case "accountnumber":
        setBankdetails({ ...bankdetails, [e.target.name]: value.replace(/\D/g, "") });
        e.target.value = value.replace(/\D/g, "");
        break;



      case "profilepic":
        setBankdetails({ ...bankdetails, [e.target.name]: e.target.files[0] });
        break;



      default:
        setBankdetails({ ...bankdetails, [e.target.name]: e.target.value });
    }


    // console.log(bankdetails)
  };


  function Getbankdetails() {
    try {

      fetch(`${url_}/getdistributordetail/${Distri_PAN}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        }
      })
        .then(response => response.json())
        .then(res => {
          // console.lsog(res);
          // const objectPropertyCount = Object.keys(res).length;
          // setBankDataLength(objectPropertyCount);
          // setImgContent(res.content)
          setBankdetails({
            // profilepic: res.paymentDetails.imageName,
            // upiid: res.paymentDetails.upiId,
            // upinumber: res.upiNumber,
            bankname: res.bank_name,
            accountname: res.accountName,
            accountnumber: res.accountNumber,
            ifsc: res.ifsc,
            // qrcode: res.paymentDetails.qrcode
          })

        })
        .catch(error => {
          console.log(error)
        });
    } catch (error) {
      console.warn("Error on function calling...")
    }
  }



  const UpdateBankData = async (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var formdata = new FormData();
    formdata.append("imagePathProfile", bankdetails.profilepic);
    formdata.append("Bank_Name", bankdetails.bankname);
    formdata.append("AccountName", bankdetails.accountname);
    formdata.append("AccountNumber", bankdetails.accountnumber);
    formdata.append("IFSC", bankdetails.ifsc);

    console.log(bankdetails.ifsc)
    console.log(bankdetails.accountname)
    console.log(bankdetails.accountnumber)
    console.log(bankdetails.bankname)
    console.log(bankdetails.profilepic)

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${url_}/UpdatedistributorPaymentDetails/${Distri_PAN}`, requestOptions);
      const result = await response.text();
      console.log(result);
      if (response.status === 200) {
        await swal(
          'Success.',
          `${result}`,
          'success'
        )


      } else {
        swal(
          'Failed!',
          `Failed to update data!!!`,
          'error'
        )
      }
    } catch (error) {
      console.log('error', error);
    }
  };


  async function StopServiceDistributor() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${url_}/update/distributor/${user_id}/false`, requestOptions);

      if (response.status === 200) {
        await Swal.fire("Success.", "Distributor stopped successfully.", "success");
        window.location.reload();
      } else {
        await Swal.fire("Failed!", "Failed to approve distributor.", "error");
        window.location.reload();

      }
    } catch (error) {
      console.log(error);
    }
  }

  function GoBack() {
    window.history.back(); // This will navigate to the previous page in the browser's history
  }

  const GetDistriKYCdata = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    await fetch(`${url_}/getdistributorprofile/${Distri_PAN}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const decodedImage = atob(result);

        // Convert the decoded string to a Uint8Array
        const arrayBuffer = new Uint8Array(decodedImage.length);
        for (let i = 0; i < decodedImage.length; i++) {
          arrayBuffer[i] = decodedImage.charCodeAt(i);
        }

        // Create a Blob from the arrayBuffer
        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

        // Create a data URL from the Blob
        const dataUrl = URL.createObjectURL(blob);
        console.log(dataUrl)
        // setImgContent(dataUrl)


      })
      .catch((error) => {
        console.log(error);
      })
    // await fetch(`${url_}/getdistributoradhar/${Distri_PAN}`, requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     // console.log(result)

    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    // await fetch(`${url_}/getdistributorpan/${Distri_PAN}`, requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     // console.log(result)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    // await fetch(`${url_}/getdistributorcheque/${Distri_PAN}`, requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     // console.log(result.length)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })



  }
  const imageSrc = imgcontent ? `data:image/jpeg;base64,${imgcontent}` : profileimg;

  return (
    <div>
      <div className={styles.right}>
        <div className={`${styles.regtitle} d-flex justify-content-around align-items-center mt-4`}>
          <div style={{ fontSize: "xxx-large", cursor: "pointer" }} onClick={GoBack}>
            &#8617;&nbsp;
          </div>
          <h3> DISTRIBUTOR PROFILE</h3>
          <div></div>

        </div>
        <div className={`${styles.proimg} d-flex flex-column align-items-center`} >

          <div className={styles.file_upload}>
            <div className={styles.image_upload_wrap}>
              <input className={styles.file_upload_input} type='file' name='profilepic' onChange={bankhandleChange} />
              <div className={styles.drag_text}>
                <img src={imageSrc} alt="Profile Image" />
                <h4>Upload File</h4>
              </div>
            </div>
          </div>
          <button className='mt-2 ' onClick={() => StopServiceDistributor()} style={{ backgroundColor: "red" }}>STOP</button>
        </div>
        <div className={styles.regform}>
          <h4 className='text-danger mb-4'>
            <hr />
            <b>Personal Information</b>
            <hr />
          </h4>
          <form action="" onSubmit={handleSubmit}>
            <div className={`${styles.first} ml-5 w-75`}>
              <InputField placeholder='Enter your Name' onChange={handleChange} lblname='Name' name='name' value={values.name} />
              <InputField placeholder='Enter your DOB in YYYYY-MM-DD' onChange={handleChange} lblname='DOB/DOI' name='datebirth' value={values.datebirth} />
              <DropDown value_array={Uprofesion_obj} lblname='Profession' name='profession' onChange={handleChange} value={values.profession} />
              <InputField placeholder='Enter your PAN' onChange={handleChange} lblname='PAN' name='pan' value={values.pan} disabled={true} />
              <InputField type='number' placeholder='Enter your Telephone' onChange={handleChange} lblname='Telephone' name='telephone' value={values.telephone} maxLength='11' />
              <InputField type='number' placeholder='Enter your Mobile' onChange={handleChange} lblname='Mobile' name='mobile' value={values.mobile} maxLength='10' />
              <InputField placeholder='Enter your Email' onChange={handleChange} lblname='Email' name='email' value={values.email} />
              <InputField placeholder='Enter your office address' onChange={handleChange} lblname='Office Address' name='office_Address' value={values.office_Address} />
              <InputField placeholder='Enter your pin' onChange={handleChange} lblname='Pin Code' name='pin_Code' value={values.pin_Code} />
              <DropDown value_array={States_obj} lblname='State' name='state' value={values.state} onChange={handleChange} />
              <InputField placeholder='Enter your whatsapp link' onChange={handleChange} lblname='Whatsapp Link' name='whatsApp_Link' value={values.whatsApp_Link} />
              <InputField placeholder='Enter your investnow email' onChange={handleChange} lblname='InvestNow Email' name='investNow_Email' value={values.investNow_Email} />
            </div>

          </form>
        </div>
        <div className={`${styles.btn_submit} w-100 d-flex justify-content-center`}>
          <button type="submit" onClick={handleSubmit}>
            UPDATE
          </button>
        </div>
      </div>

      <div className="">
        <h4 className='text-danger mb-4'>
          <hr />
          <b>Bank Details</b>
          <hr />
        </h4>
      </div>
      <div className={`w-75 `}>

        <div className='ml-5'>
          <div className={`${styles.qrupload} mb-4 d-flex justify-content-around w-100 `}>
            <div className='d-flex flex-column align-items-center '>
              <i class="bi bi-file-earmark-richtext-fill text-success" style={{ fontSize: "110px" }}></i>
              <h6>PAN Card</h6>
            </div>
            <div className='d-flex flex-column align-items-center '>
              <i class="bi bi-file-earmark-richtext-fill text-success" style={{ fontSize: "110px" }}></i>
              <h6>Aadhar Card</h6>
            </div>
            <div className='d-flex flex-column align-items-center '>
              <i class="bi bi-file-earmark-richtext-fill text-success" style={{ fontSize: "110px" }}></i>
              <h6>Canceled Cheque</h6>
            </div>

          </div>
          <div className={`${styles.upiid} `}>
            {/* <InputField lblname='UPI ID' color='red' placeholder='Enter your UPI ID' name='upiid' value={bankdetails.upiid} onChange={bankhandleChange} />
            <InputField lblname='UPI Number' color='red' placeholder='Enter your UPI Number' name='upinumber' value={bankdetails.upinumber} onChange={bankhandleChange} maxLength={10} /> */}

            <InputField lblname='BANK NAME' color='red' placeholder='Enter bank name' name='bankname' value={bankdetails.bankname} onChange={bankhandleChange} />
            <InputField lblname='ACCOUNT NAME' color='red' placeholder='Enter account name' name='accountname' value={bankdetails.accountname} onChange={bankhandleChange} />
            <InputField lblname='ACCOUNT NUMBER' color='red' placeholder='Enter account number' name='accountnumber' value={bankdetails.accountnumber} onChange={bankhandleChange} />
            <InputField lblname='IFSC' color='red' placeholder='Enter IFSC code' name='ifsc' value={bankdetails.ifsc} onChange={bankhandleChange} />

          </div>
        </div>
      </div >
      <div className={`${styles.ifsc} w-100 d-flex justify-content-center`}>

        <button onClick={UpdateBankData}>UPDATE</button>

      </div>
    </div >
  );
}

export default DistributorData;
