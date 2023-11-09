import React, { useState } from 'react';

import styles from './URegistration.module.css';

import RadioInput from '../../../components/RadioField/RadioInput';
import { url_ } from '../../../Config';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import formfields from './formfields';
import InputType from "./InputType"






const URegistration = () => {

  const Navigate = useNavigate();
  // Access JWT token and remove double quotes
  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');
  // const cleanedToken = window.storedToken.replace(/^"(.*)"$/, '$1');



  const [isNameNull, setIsNameNull] = useState(true);
  const [isProfessionNull, setIsProfessionNull] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidMobile, setIsValidMobile] = useState(true);
  const [isValidPAN, setIsValidPAN] = useState(true);
  const [fieldDisable, setFieldDisable] = useState('');
  const [SUbmitbtn, setSUbmitbtn] = useState(false);

  const [Income_Tax_Radio, setIncome_Tax_Radio] = useState(false);
  const [GST_Radio, setGST_Radio] = useState(false);
  const [Both_Radio, setBoth_Radio] = useState(false);

  const [formdata, setFormdata] = useState({
    address: "",
    email: "",
    mobile: "",
    pan: "",
    pin_Code: "",
    profession: "",
    state: "",
    telephone: "",
    category: "",
    dob: "",
    name: "",
    residential_status: "",
    userid: `${user_id}`,
  });






  const handleChange = (e) => {
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
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
        //---Basic PAN Validation
        const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        setIsValidPAN(panPattern.test(e.target.value));
        break;

      case "mobile":
        setFormdata({ ...formdata, [e.target.name]: value.replace(/\D/g, "") });
        e.target.value = value.replace(/\D/g, "");
        // Basic mobile validation
        const mobilePattern = /^[789]\d{9}$/;
        setIsValidMobile(mobilePattern.test(e.target.value));
        break;

      case "telephone":
        setFormdata({ ...formdata, [e.target.name]: value.replace(/\D/g, "") });
        e.target.value = value.replace(/\D/g, "");
        break;



      default:
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }


  };






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



    // Check Form Fields
    if (
      !formdata.name ||
      !formdata.profession ||
      !isValidPAN ||
      !isValidMobile ||
      !isValidEmail ||
      !formdata.category

    ) {
      swal.fire("Failed!", "Please fill the mandatory fields!!", "error");
      console.log(formdata);
      return;
    } else {
      const url = `${url_}/createclient`;
      console.log(url);
      console.log(formdata);
      console.log(user_id)





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
          pin_code: formdata.pin_Code,
          state: formdata.state,
          residential_status: formdata.residential_status,
          category: formdata.category,
          userid: user_id,
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        const response = await fetch(`${url_}/createclient`, requestOptions);
        const result = await response.text();
        console.log(result);
        if (response.status === 200) {
          swal.fire("Success!", `${result}`, "success");
          setFormdata({
            address: "",
            email: "",
            mobile: "",
            pan: "",
            pin_Code: "",
            profession: "",
            state: "",
            telephone: "",
            category: "",
            dob: "",
            name: "",
            residential_status: "",
            userid: "",
          });
          setFieldDisable(false)
        } else {
          swal.fire("Failed!", `${result}`, "error");
        }
      } catch (error) {
        console.error('error', error);
      }


    }
  };







  return (
    <div>
      <div className={styles.right}>
        <div className={styles.regtitle} style={{ textAlign: 'center' }}>
          <span>CLIENT REGISTRATION FORM</span>
        </div>
        <div className={styles.regform}>
          <form action="/" onSubmit={handleSubmit}>

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
                disabled={fieldDisable}
                validationmsg={formfield.validationmsg}
                // strengh/tScore={formfield.name === "password" ? strenghtScore : ""}
                isNameNull={formfield.name === "name" && isNameNull}
                isValidEmail={formfield.name === "email" && isValidEmail}
                isValidMobile={formfield.name === "mobile" && isValidMobile}
                isValidPAN={formfield.name === "pan" && isValidPAN}
                // isPasswordMatch={formfield.name === "confirmpassword" && isPasswordMatch}
                isProfessionNull={formfield.name === "profession" && isProfessionNull}
              />
            ))}


            <div className={styles.btn_submit}>
              {SUbmitbtn ? null : (

                <button type="submit" onClick={handleSubmit}>SUBMIT</button>
              )}
            </div>

          </form>
        </div>
      </div>

    </div>
  );
}

export default URegistration;
