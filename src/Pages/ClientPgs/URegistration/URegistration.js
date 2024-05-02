import React, { useEffect, useState } from 'react';

import styles from './URegistration.module.css';

import RadioInput from '../../../components/RadioField/RadioInput';
import { url_ } from '../../../Config';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import formfields from './formfields';
import InputType from "./InputType"
import InputField from '../../../components/InputField/InputField';






const URegistration = () => {

  const Navigate = useNavigate();
  // Access JWT token and remove double quotes
  const user_id = window.localStorage.getItem('user_id');
  const user_pan = window.localStorage.getItem('pan');
  const storedToken = window.localStorage.getItem('jwtToken');
  // const cleanedToken = window.storedToken.replace(/^"(.*)"$/, '$1');



  const [isNameNull, setIsNameNull] = useState(true);
  const [isProfessionNull, setIsProfessionNull] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidMobile, setIsValidMobile] = useState(true);
  const [isValidPAN, setIsValidPAN] = useState(true);
  const [isValidPIN, setIsValidPIN] = useState(true);
  const [fieldDisable, setFieldDisable] = useState('');
  const [SUbmitbtn, setSUbmitbtn] = useState(false);

  const [Income_Tax_Radio, setIncome_Tax_Radio] = useState(false);
  const [GST_Radio, setGST_Radio] = useState(false);
  const [Both_Radio, setBoth_Radio] = useState(false);

  const [mailList, setMailList] = useState(
    [
      {
        "val": "Other",
        "option_name": "Other"
      }

    ]
  )
  const [GSTINValidation, setGSTINValidation] = useState("");
  const [formdata, setFormdata] = useState({
    gstin: "",
    gstinname: "",
    gstinaddress: "",
    address: "",
    email: "",
    mobile: "",
    pan: "",
    pin_code: "",
    profession: "",
    state: "",
    invest_now_email: "",
    telephone: "",
    category: "",
    dob: "",
    name: "",
    residential_status: "",
    userid: `${user_id}`,

  });

  useEffect(() => {
    fetchMailList();
  }, [])

  async function fetchMailList() {
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

      const updateItems = [...mailList]
      result.map((item) => {
        updateItems.push({
          id: item.id,
          pan: item.pan,
          val: item.investNow_Email,
          option_name: item.investNow_Email,
        });
      })
      // console.log(updateItems)
      setMailList(updateItems)
    } catch (error) {
      console.log(error)
    }
  }


  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === "pan") {
      if (value.length === 10) {
        FetchClientDATA(value);
      }
      // console.log(value)
    }

    //=============================================================================
    switch (name) {

      case "name":
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
        if (!e.target.value) {
          setIsNameNull(false);
        }
        else {
          setIsNameNull(true);
        }
        break;


      case "profession":
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
        if (!e.target.value) {
          setIsProfessionNull(false);
        }
        else {
          setIsProfessionNull(true);
        }
        break;


      case "email":
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
        //---Basic Email Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailPattern.test(e.target.value));
        break;

      case "pan":

        const userPAN = e.target.value;
        const uppercaseName = userPAN.toUpperCase();
        setFormdata({ ...formdata, [e.target.name]: uppercaseName });
        //---Basic PAN Validation
        const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        setIsValidPAN(panPattern.test(uppercaseName));
        break;

      case "mobile":
        setFormdata({ ...formdata, [e.target.name]: value.replace(/\D/g, "") });
        e.target.value = value.replace(/\D/g, "");
        // Basic mobile validation
        const mobilePattern = /^[789]\d{9}$/;
        setIsValidMobile(mobilePattern.test(e.target.value));
        break;

      case "pin_code":
        setFormdata({ ...formdata, [e.target.name]: value.replace(/\D/g, "") });
        e.target.value = value.replace(/\D/g, "");
        // Basic pin code validation
        const pinPattern = /^[1-9]{1}[0-9]{5}$/;
        setIsValidPIN(pinPattern.test(e.target.value));
        // if (e.target.value.length > 5) {
        //   FetchStateFromPincode(e.target.value)
        // }
        break;

      case "telephone":
        setFormdata({ ...formdata, [e.target.name]: value.replace(/\D/g, "") });
        e.target.value = value.replace(/\D/g, "");
        break;


      case "invest_now_email":
        const index = formfields.findIndex(item => item.name === "invest_now_email");
        if (index !== -1) {
          if (formfields[index].type === "dropdown" && e.target.value === "Other") {
            formfields[index].type = "text";
            if (e.target.value === "Other") {
              setFormdata({ ...formdata, [e.target.name]: "" });
              e.target.value = "";
            }
          }
          else if (formfields[index].type === "dropdown" && e.target.value !== "Other") {
            formfields[index].type = "dropdown";
            setFormdata({ ...formdata, [e.target.name]: e.target.value });
          }
          else {
            setFormdata({ ...formdata, [e.target.name]: e.target.value });
          }
        }
      case "gstinname":
        setFormdata({ ...formdata, [e.target.name]: value.replace(/\d/g, "") });

        break;
      case "gstin":


        setFormdata({ ...formdata, [e.target.name]: value.toUpperCase() });


        break;



      default:
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }


  };



  const FetchStateFromPincode = async (value) => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${value}`)
      const result = await response.json()
      // console.log(result[0].PostOffice[0].State)
      setFormdata({ ...formdata, state: result[0].PostOffice[0].State });
    } catch (error) {
      console.log(error)
    }
  }


  const FetchClientDATA = async (Cpan) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${url_}/pan?pan=${Cpan}`, requestOptions);
      const result = await response.json();
      console.log(result);




      const extractedData = result.users[0];


      let usersLength = result.users;

      if (usersLength.length === 2) {
        swal.fire("Client Already registered for Income Tax and GST");
        setFormdata({
          pan: ""
        })
      } else if (result.users[0].category === "Both") {
        swal.fire("Client Already registered for Income Tax and GST");
        setFormdata({
          pan: ""
        })
      } else if (result.users[0].userid == user_id) {
        swal.fire(`Client Already registered for ${extractedData.category}`);
        setFieldDisable(true);
        setIncome_Tax_Radio(true);
        setGST_Radio(true);
        setFormdata(extractedData);
      } else {
        if (result.users[0].category === "GST") {
          swal.fire(`Client Already registered for ${extractedData.category}`);
          setFieldDisable(true);
          setGST_Radio(true);
          setBoth_Radio(true)
          setFormdata(extractedData);
        } else {
          swal.fire(`Client Already registered for ${extractedData.category}`);
          setFieldDisable(true);
          setIncome_Tax_Radio(true);
          setBoth_Radio(true)
          setFormdata(extractedData);
        }
      }


    } catch (error) {
      console.log('error', error);
    }
  }



  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formdata.invest_now_email)



    if (!formdata.name) {
      setIsNameNull(false);
    }

    if (!formdata.profession) {
      setIsProfessionNull(false);
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailPattern.test(formdata.email));

    // PAN Validation
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    setIsValidPAN(panPattern.test(formdata.pan));

    // Mobile Validation
    const mobilePattern = /^[789]\d{9}$/;
    setIsValidMobile(mobilePattern.test(formdata.mobile));

    const pinPattern = /^[1-9]{1}[0-9]{5}$/;
    setIsValidPIN(pinPattern.test(formdata.pin_code));


    // Check Form Fields
    if (
      formdata.category === "GST" || formdata.category === "Both" ?
        !formdata.name ||
        !formdata.profession ||
        !isValidPAN ||
        !isValidMobile ||
        !isValidPIN ||
        !isValidEmail ||
        !formdata.category ||
        !formdata.gstin ||
        !formdata.gstinname ||
        !formdata.gstinaddress
        :
        !formdata.name ||
        !formdata.profession ||
        !isValidPAN ||
        !isValidMobile ||
        !isValidPIN ||
        !isValidEmail ||
        !formdata.category

    ) {
      swal.fire("Failed!", "Please fill the mandatory fields!!", "error");
      console.log(formdata);
      return;
    } else {

      console.log(formdata);

      swal.fire({
        title: 'Registering Client.',
        text: 'Please wait...',
        showConfirmButton: false,
        onBeforeOpen: () => {
          swal.showLoading();
        },
      });




      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append(
          "Authorization",
          `Bearer ${storedToken}`);

        const raw = JSON.stringify({
          name: formdata.name,
          dob: formdata.dob,
          profession: formdata.profession,
          pan: formdata.pan,
          telephone: formdata.telephone,
          mobile: formdata.mobile,
          email: formdata.email,
          address: formdata.address,
          pin_code: formdata.pin_code,
          state: formdata.state,
          residential_status: formdata.residential_status,
          category: formdata.category,
          userid: user_id,
          invest_now_email: formdata.invest_now_email,
          gstin: formdata.category === "GST" || formdata.category === "Both" ? formdata.gstin : ``,
          gstinname: formdata.category === "GST" || formdata.category === "Both" ? formdata.gstinname : ``,
          gstinaddress: formdata.category === "GST" || formdata.category === "Both" ? formdata.gstinaddress : ``
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        const response = await fetch(`${url_}/createclient`, requestOptions);
        const result = await response.text();



        /////////////////////////////////////////////************************** */
        console.log(result);
        if (response.status === 200) {
          swal.fire("Success!", `${result}`, "success");
          setFormdata({
            address: "",
            email: "",
            mobile: "",
            pan: "",
            pin_code: "",
            profession: "",
            state: "",
            telephone: "",
            category: "",
            dob: "",
            name: "",
            residential_status: "",
            userid: "",
            invest_now_email: ""
          });
          setFieldDisable(false)
          Navigate(-1)
        } else {
          swal.fire("Failed!", `${result}`, "error");
        }
      } catch (error) {
        console.error('error', error);
      }


    }
  };




  const isGSTINExits = async (name, GSTIN_value) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`${url_}/checkValuePresence/gstin?gstin=${GSTIN_value}`, requestOptions)
      const result = await response.text();
      console.log(response.status)
      console.log(result)

      if (result === "Value is not present") {
        setFormdata({ ...formdata, [name]: GSTIN_value.toUpperCase() });
      } else {
        swal.fire("", `GSTIN already exits!`, "warning");
        setFormdata({ ...formdata, [name]: "" });
      }



    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <div className={styles.right}>
        <div className={styles.regtitle} style={{ textAlign: 'center' }}>
          <span>CLIENT REGISTRATION FORM</span>
        </div>
        <div className={styles.regform}>
          {/* <form > */}

          <div className={styles.radio}>
            <RadioInput name='category' label='Income Tax' value='Income_Tax' checked={formdata.category === 'Income_Tax'} onChange={handleChange} manadatory='*' disabled={Income_Tax_Radio} />
            <RadioInput name='category' label='GST' value='GST' checked={formdata.category === 'GST'} onChange={handleChange} manadatory='*' disabled={GST_Radio} />
            <RadioInput name='category' label='Both' value='Both' checked={formdata.category === 'Both'} onChange={handleChange} manadatory='*' disabled={Both_Radio} />

          </div>




          {formfields.map((formfield) => (
            <InputType
              key={"k" + formfield.id}
              labelname={formfield.labelname}
              name={formfield.name}
              type={formfield.type}
              placeholder={formfield.placeholder}
              value={formdata[formfield.name]}
              mandatory={formfield.mandatory}
              onChange={handleChange}
              disabled={(formfield.name === "invest_now_email" && GST_Radio) ? false
                : fieldDisable}
              validationmsg={formfield.validationmsg}
              isNameNull={formfield.name === "name" && isNameNull}
              isValidPIN={formfield.name === "pin_code" && isValidPIN}
              isValidEmail={formfield.name === "email" && isValidEmail}
              isValidMobile={formfield.name === "mobile" && isValidMobile}
              isValidPAN={formfield.name === "pan" && isValidPAN}
              isProfessionNull={formfield.name === "profession" && isProfessionNull}
              mailList={mailList}
            />
          ))}



          <>{formdata.category !== "Income_Tax" ?
            <>
              {/* <InputField lblname='GSTIN' color='black' placeholder='Enter GST number' name='gstin' value={formdata.gstin} onChange={handleChange} manadatory={"*"} maxLength={15} />
                <InputField lblname='GSTIN Name' color='black' placeholder='Enter GSTIN name' name='gstinName' value={formdata.gstinName} onChange={handleChange} manadatory={"*"} />
                <InputField lblname='GSTIN Address' color='black' placeholder='Enter GSTIN address' name='gstinAddress' value={formdata.gstinAddress} onChange={handleChange} /> */}

              <InputField placeholder='Enter your GSTIN' onChange={handleChange} lblname='GSTIN' name='gstin' value={formdata.gstin} maxLength={15} manadatory={"*"} validationmsg={GSTINValidation} />
              <InputField placeholder='Enter your GSTIN name' onChange={handleChange} lblname='GSTIN Name' name='gstinname' value={formdata.gstinname} manadatory={"*"} maxLength={100} />
              <InputField placeholder='Enter your GSTIN address' onChange={handleChange} lblname='GSTIN Address' name='gstinaddress' value={formdata.gstinaddress} manadatory={"*"} maxLength={100} />

            </>
            :
            <>

            </>
          }</>

          <div className={styles.btn_submit}>
            {SUbmitbtn ? null : (

              <button type="submit" onClick={handleSubmit}>SUBMIT</button>
            )}
          </div>

          {/* </form> */}
        </div>
      </div>

    </div>
  );
}

export default URegistration;
