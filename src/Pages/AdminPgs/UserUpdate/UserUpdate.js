import React, { useState } from 'react';
import DropDown from '../../../components/DropDown/DropDown'
import Uprofesion_obj from '../../../ObjData/AProf.json'
import States_obj from '../../../ObjData/States.json'


import { url_ } from '../../../Config';
import styles from './UserUpdate.module.css';
import profileimg from '../../../Images/profile.png'
import SampleQrImg from '../../../Images/SampleQrImg.png'
import InputField from '../../../components/InputField/InputField';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const UserUpdate = () => {


  const user_id = window.localStorage.getItem('user_id');
  const user_pan = window.localStorage.getItem('pan');
  const storedToken = window.localStorage.getItem('jwtToken');
  const [dbMailList, setdbMailList] = useState([]);
  // const [combinedlist, setCombinedList] = useState([]);
  const [email, setEmail] = useState()

  const [values, setValues] = useState({
    name: "",
    datebirth: "",
    profession: "",
    pan: "",
    telephone: "",
    mobile: "",
    email: "",
    office_Address: "",
    pin_code: "",
    state: "",
    whatsApp_Link: "",
    investNow_Email: [],
    userid: `${user_id}`,

  })


  useEffect(() => {
    GetClient();
    Getbankdetails();
  }, [])



  function GetClient() {
    try {

      fetch(`${url_}/getuserByid/${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        }
      })
        .then(response => response.json())
        .then(res => {
          // console.log(res);
          const updatedItems = {
            name: res.name,
            datebirth: res.datebirth,
            profession: res.profession,
            pan: res.pan,
            telephone: res.telephone,
            mobile: res.mobile,
            email: res.email,
            office_Address: res.office_Address,
            pin_code: res.pin_code,
            state: res.state,
            whatsApp_Link: res.whatsApp_Link,
            investNow_Email: [], //res.investNow_Email,
            userid: `${user_id}`,
          }
          fetchMailList(updatedItems);

        })
        .catch(error => {


          console.log(error)
        });
    } catch (error) {
      console.warn("Error on function calling...")
    }
  }

  async function updateInvestMails() {
    const db = dbMailList.map(item => item.investNow_Email);

    const updateMails = values.investNow_Email.filter(item => !db.includes(item))
    // console.log("current : ",values.investNow_Email)
    // console.log("db : ",db);
    console.log("newelements : ", updateMails.length)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var raw = JSON.stringify(updateMails);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    if (updateMails.length > 0) {
      fetch(`${url_}/Invest_now/save-emails/${user_pan}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
  }

  async function fetchMailList(updatedItems) {


    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${url_}/Invest_now/get_all/by-pan/${user_pan}`, requestOptions);
      const result = await response.json();
      if (response.status === 200) {
        updatedItems.investNow_Email = result.map((item) => item.investNow_Email)
        setdbMailList(result);
      }

    } catch (error) {
      console.log(error)
    }


    setValues(updatedItems)

  }



  async function deleteMails() {


    const deleteIds = dbMailList.filter(item => !values.investNow_Email.includes(item.investNow_Email)).map((item) => item.id)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var raw = JSON.stringify(deleteIds);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${url_}/Invest_now/delete_by_id`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }


  const handleChange = (e) => {
    if (e.target.name === "investNow_Email") {
      setEmail(e.target.value);
    }
    else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `${url_}/updateuser/${user_id}`;
    console.log(url);
    console.log(values)
    try {

      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        },

        body: JSON.stringify({
          name: values.name,
          datebirth: values.datebirth,
          membership_No: values.membership_No,
          profession: values.profession,
          pan: values.pan,
          telephone: values.telephone,
          mobile: values.mobile,
          email: values.email,
          office_Address: values.office_Address,
          pin_code: values.pin_code,
          state: values.state,
          whatsApp_Link: values.whatsApp_Link,
        }),
      })
        .then(res => {
          localStorage.setItem('user_name', values.name);
          localStorage.setItem('mobile', values.mobile);
          localStorage.setItem('profession', values.profession);



          deleteMails();
          updateInvestMails();
          Swal.fire("Success", "Data updated successfully.", "success");
          window.location.reload();
          // console.log(values)
        })
        .catch(error => {
          Swal.fire("Failed!", " Failed to update.!!!!", "error");
          console.log(error)
        });
    } catch (error) {
      console.warn("Error on function calling...")
    }
  }




  ////////////////////////////////////////////////////////////////////////////////////


  const [bankdatalength, setBankDataLength] = useState();
  const [imgcontent, setImgContent] = useState();
  const [qrimgcontent, setQrimgcontent] = useState();
  // const [image_name, setImage_name] = useState(null);
  const [bankdetails, setBankdetails] = useState({

    profilepic: null,
    qrcode: null,
    upiid: "",
    upinumber: "",
    bankname: "",
    accountname: "",
    accountnumber: "",
    ifsc: ""
  });


  const bankhandleChange = (e) => {





    const { name, value } = e.target;


    if (name === "upinumber") {
      if (value.length === 10) {

        const mobilePattern = /^[789]\d{9}$/;
        if (mobilePattern.test(e.target.value)) {
          setBankdetails({ ...bankdetails, [e.target.name]: value.replace(/\D/g, "") });
          e.target.value = value.replace(/\D/g, "");
        } else {

          Swal.fire("Enter valid UPI Number!")

        }
      }

    }

    //=============================================================================
    switch (name) {


      case "accountname":
        setBankdetails({ ...bankdetails, [e.target.name]: value.replace(/\d/g, "") });
        // e.target.value = value.replace(/\D/g, "");
        break;
      case "accountnumber":
        setBankdetails({ ...bankdetails, [e.target.name]: value.replace(/\D/g, "") });
        // e.target.value = value.replace(/\D/g, "");
        break;



      case "upinumber":

        setBankdetails({ ...bankdetails, [e.target.name]: value.replace(/\D/g, "") });
        e.target.value = value.replace(/\D/g, "");
        break;

      case "qrcode":
        setBankdetails({ ...bankdetails, [e.target.name]: e.target.files[0] });
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

      fetch(`${url_}/getpaymentDetails/${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        }
      })
        .then(response => response.json())
        .then(res => {
          console.log(res);
          const objectPropertyCount = Object.keys(res).length;
          setBankDataLength(objectPropertyCount);
          setImgContent(res.content)
          setQrimgcontent(res.paymentDetails.qrCode)
          setBankdetails({
            profilepic: res.paymentDetails.imageName,
            upiid: res.paymentDetails.upiId,
            upinumber: res.paymentDetails.upiNumber,
            bankname: res.paymentDetails.bank_name,
            accountname: res.paymentDetails.accountName,
            accountnumber: res.paymentDetails.accountNumber,
            ifsc: res.paymentDetails.ifsc,
            qrcode: res.paymentDetails.qrcode
          })

        })
        .catch(error => {
          console.log(error)
        });
    } catch (error) {
      console.warn("Error on function calling...")
    }
  }

  const SaveBankData = async (event) => {
    if (bankdetails.qrcode === null ||
      !bankdetails.bankname ||
      !bankdetails.accountname ||
      !bankdetails.accountnumber ||
      !bankdetails.ifsc ||
      !bankdetails.upiid ||
      !bankdetails.upinumber) {
      console.log("fill all mandatory fiedls!!!")
      Swal.fire("Failed!", "fill all mandatory fields!!!", "warning")
      console.log(bankdetails)
    } else {
      event.preventDefault();

      Swal.fire({
        title: 'Updating.',
        text: 'Please wait...',
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        `Bearer ${storedToken}`
      );

      var formdata = new FormData();
      formdata.append("userid", user_id);
      formdata.append("QR", bankdetails.qrcode);
      formdata.append("Bank_Name", bankdetails.bankname);
      formdata.append("AccountName", bankdetails.accountname);
      formdata.append("AccountNumber", bankdetails.accountnumber);
      formdata.append("IFSC", bankdetails.ifsc);
      formdata.append("UPI_ID", bankdetails.upiid);
      formdata.append("UPI_Number", bankdetails.upinumber);
      formdata.append("image", bankdetails.profilepic);


      // console.log(formdata)
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      try {
        const response = await fetch(`${url_}/paymentDetails`, requestOptions);
        const result = await response.text();
        console.log(result);
        if (response.status === 200) {
          await Swal.fire(
            'Success.',
            `${result}`,
            'success'
          )
          window.location.reload();

        } else {
          Swal.fire(
            'Failed!',
            `Failed to save data!!!`,
            'error'
          )
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };


  const UpdateBankData = async () => {
    console.log(bankdetails)
    // e.preventDefault();
    Swal.fire({
      title: 'Updating.',
      text: 'Please wait...',
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var formdata = new FormData();
    formdata.append("image", bankdetails.profilepic);
    formdata.append("QR", bankdetails.qrcode);
    formdata.append("Bank_Name", bankdetails.bankname);
    formdata.append("AccountName", bankdetails.accountname);
    formdata.append("AccountNumber", bankdetails.accountnumber);
    formdata.append("IFSC", bankdetails.ifsc);
    formdata.append("UPI_Number", bankdetails.upiid);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${url_}/UpdatePaymentDetails/${user_id}`, requestOptions);
      const result = await response.text();
      // console.log(result);
      if (response.status === 200) {
        await Swal.fire(
          'Success.',
          `${result}`,
          'success'
        )


      } else {
        Swal.fire(
          'Failed!',
          `Failed to update data!!!`,
          'error'
        )
      }
    } catch (error) {
      console.log('error', error);
    }
  };


  function manageMailList(event, index) {
    event.preventDefault();

    switch (event.target.id) {
      case "add":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email) || values.investNow_Email.includes(email)) {
          Swal.fire({
            icon: "error",
            text: !email
              ? "Blank field..!!"
              : !emailPattern.test(email) ? "Invalid email..!!"
                : values.investNow_Email.includes(email) && "Item already exists",
          });
        } else {

          setValues({ ...values, investNow_Email: [email, ...values.investNow_Email] });
          setEmail('');

        }
        break;

      case "remove":
        console.log(index)
        Swal.fire({

          title: `Remove`,
          text: `${values.investNow_Email[index]}  .?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            const updatedItems = [...values.investNow_Email];
            updatedItems.splice(index, 1);
            setValues({ ...values, investNow_Email: updatedItems });
          }
        });

        break;
      default:
        break;
    }
  }

  const imageSrc = imgcontent ? `data:image/jpeg;base64,${imgcontent}` : profileimg;
  const qrimageSrc = qrimgcontent ? `data:image/jpeg;base64,${qrimgcontent}` : SampleQrImg;

  return (
    <div style={{ "paddingLeft": "7px", "paddingRight": "7px", "minWidth": "320px" }}>
      <div className={styles.right}>
        <div className={`${styles.regtitle} d-flex justify-content-around m-4`}>
          <span> C.A UPDATE FORM</span>
          <div className={`${styles.btn_submit} `}>
            <button type="submit" onClick={handleSubmit}>
              UPDATE
            </button>
          </div>
        </div>
        <div className={styles.regform}>
          <form action="" onSubmit={handleSubmit}>
            <div className={styles.first}>
              <InputField placeholder='Enter your Name' onChange={handleChange} lblname='Name' name='name' value={values.name} />
              <InputField placeholder='Enter your DOB in YYYYY-MM-DD' onChange={handleChange} lblname='DOB/DOI' name='datebirth' value={values.datebirth} />
              <DropDown value_array={Uprofesion_obj} lblname='Profession' name='profession' onChange={handleChange} value={values.profession} />
              <InputField placeholder='Enter your PAN' onChange={handleChange} lblname='PAN' name='pan' value={values.pan} disabled={true} />
              <InputField type='number' placeholder='Enter your Telephone' onChange={handleChange} lblname='Telephone' name='telephone' value={values.telephone} maxLength='11' />
              <InputField type='number' placeholder='Enter your Mobile' onChange={handleChange} lblname='Mobile' name='mobile' value={values.mobile} maxLength='10' />
              <InputField placeholder='Enter your Email' onChange={handleChange} lblname='Email' name='email' value={values.email} />
              <InputField placeholder='Enter your office address' onChange={handleChange} lblname='Office Address' name='office_Address' value={values.office_Address} />
              <InputField placeholder='Enter your pin' onChange={handleChange} lblname='Pin Code' name='pin_code' value={values.pin_code} />
              <DropDown value_array={States_obj} lblname='State' name='state' value={values.state} onChange={handleChange} />
              <InputField placeholder='Enter your whatsapp link' onChange={handleChange} lblname='Whatsapp Link' name='whatsApp_Link' value={values.whatsApp_Link} />

              <div className={`${styles.investnow}`}>
                <InputField placeholder='Enter your investnow email' onChange={handleChange} lblname='InvestNow Email' name='investNow_Email' value={email} />
                <i className="fa-solid fa-plus" style={{ "margin": "0px 20px", "cursor": "pointer", "float": "right", "position": "relative", "top": "1rem", "right": "0rem" }}
                  id="add" onClick={(e) => { manageMailList(e) }}></i>
              </div>
              <>
                <ul className={values.investNow_Email.length > 0 && `${styles.emaillist}`}>
                  {values.investNow_Email.map((email, index) => (
                    <li key={index} className={styles.emailitem}>
                      <i className="fa fa-times" aria-hidden="true" id="remove"
                        onClick={(e) => { manageMailList(e, index) }}>
                      </i>
                      {email}
                    </li>
                  ))}
                </ul>
              </>



            </div>

          </form>
        </div>
      </div>

      <div className="row">
        <div className={`${styles.paytitle}`}>PAYMENT DETAILS</div>
      </div>
      <div className={` row ${styles.paymentres} m-2  `}>
        <div className={`${styles.proimg} d-flex`} >

          <div className={styles.file_upload}>
            <div className={styles.image_upload_wrap}>
              <input className={styles.file_upload_input} type='file' name='profilepic' onChange={bankhandleChange} />
              <div className={styles.drag_text}>
                <img src={imageSrc} alt="Profile_Image" />
                <h4>Upload File</h4>
                <h6><b>Profile Image</b></h6>
              </div>
            </div>
          </div>
          <div className={styles.file_upload}>
            <div className={styles.image_upload_wrap}>
              <input className={styles.file_upload_input} type='file' name='qrcode' onChange={bankhandleChange} />
              <div className={styles.drag_text}>
                <img src={qrimageSrc} alt="Profile_Image" />
                <h4>Upload File</h4>
                <h6><b>QR Image</b></h6>
              </div>
            </div>
          </div>

        </div>
        <div className='ml-5'>
          {/* <div className={`${styles.qrupload} mb-4 `}>
            <label >QR CODE <span style={{ fontSize: "22px" }}>*</span></label>
            <input type="file" name="qrcode" id="" className={`${styles.qrinput}`} onChange={bankhandleChange} />
            <span className={` ml-4  ${bankdetails.qrcode === null ? `text-danger` : `text-success`}`} style={{ border: `5px dashed ${bankdetails.qrcode === null ? `red` : `green`}`, padding: "10px", borderRadius: "10px" }}><b>{bankdetails.qrcode === null ? `File is not uploaded` : `File is Uploaded`}</b></span>
          </div> */}
          <div className={`${styles.upiid} `}>
            <InputField lblname='UPI ID' color='red' placeholder='Enter your UPI ID' name='upiid' value={bankdetails.upiid} onChange={bankhandleChange} manadatory={"*"} />
            <InputField lblname='UPI Number' color='red' placeholder='Enter your UPI Number' name='upinumber' value={bankdetails.upinumber} onChange={bankhandleChange} maxLength={10} manadatory={"*"} />

          </div>
          <div className={`${styles.detailtitle}`}>BANK DETAILS</div>
          <div className="accname">
            <InputField lblname='BANK NAME' color='red' placeholder='Enter bank name' name='bankname' value={bankdetails.bankname} onChange={bankhandleChange} manadatory={"*"} />
            <InputField lblname='ACCOUNT NAME' color='red' placeholder='Enter account name' name='accountname' value={bankdetails.accountname} onChange={bankhandleChange} manadatory={"*"} />
            <InputField lblname='ACCOUNT NUMBER' color='red' placeholder='Enter account number' name='accountnumber' value={bankdetails.accountnumber} onChange={bankhandleChange} manadatory={"*"} maxLength={15} />
            <div className={`${styles.ifsc} `}>
              <InputField lblname='IFSC' color='red' placeholder='Enter IFSC code' name='ifsc' value={bankdetails.ifsc} onChange={bankhandleChange} manadatory={"*"} maxLength={15} />

              {bankdatalength > 0 ?
                (
                  <button onClick={UpdateBankData}>UPDATE</button>
                ) : (
                  <button onClick={SaveBankData}>SAVE</button>
                )}
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}

export default UserUpdate;
