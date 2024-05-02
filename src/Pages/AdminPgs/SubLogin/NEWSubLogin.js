import React, { useState, useEffect } from 'react';
import style from './SubLogin.module.css'
import SubLoginRegister from './SubLoginRegister';
import { url_ } from '../../../Config';
import SubLoginUpdate from './SubLoginUpdate';
import SubLoginClientView from './SubLoginClientView';
import Swal from 'sweetalert2';
import SubLoginRenewal from './SubLoginRenewal';
import InputField from '../../../components/InputField/InputField';

const NEWSubLogin = () => {


  useEffect(() => {
    GetData();
    Remainingdays();
    // GetClientData();
  }, []);





  const user_id = window.localStorage.getItem('user_id');
  const End_Date = window.localStorage.getItem('End_Date');
  const storedToken = window.localStorage.getItem('jwtToken');

  const [values, setValues] = useState({
    email: "",
    mobile: "",
    pan: "",
    name: "",
    SubUserId: ""
  })

  const [sublogins, setSublogins] = useState([]);
  const [UserRemainingDays, setUserRemainingDays] = useState();

  const [blinkStyle, setBlinkStyle] = useState(false);
  function DateConvert(ConvertingDate) {

    if (ConvertingDate === null) {
      return null;
    } else {



      const date = new Date(ConvertingDate);
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-GB', options);
      return formattedDate;

    }

  }
  const Remainingdays = () => {
    const EndingDate = End_Date.slice(0, 10)
    const daysDiff = (Math.floor((new Date(EndingDate) - new Date()) / (1000 * 60 * 60 * 24)) + 1);

    setUserRemainingDays(Math.abs(daysDiff))
    console.log(EndingDate)
  }

  const GetData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const SubUserResponse = await fetch(`${url_}/getSub_Users/${user_id}`, requestOptions);
      const SubUserResult = await SubUserResponse.json();
      console.log(SubUserResult);
      setSublogins(SubUserResult)


      const ClientsDataResponse = await fetch(`${url_}/getClientByUserid/${user_id}`, requestOptions);
      const ClientsDataResult = await ClientsDataResponse.json();
      // console.log(ClientsDataResult);
      setClientsData(ClientsDataResult)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };




  const [SubUserId, setSubUserId] = useState("");
  const [ClientsData, setClientsData] = useState([]);
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);

  const handleCheckboxChange = (checkboxName) => {
    // Toggle checkbox state
    const isChecked = checkedCheckboxes.includes(checkboxName);
    const updatedCheckboxes = isChecked
      ? checkedCheckboxes.filter((name) => name !== checkboxName)
      : [...checkedCheckboxes, checkboxName];

    setCheckedCheckboxes(updatedCheckboxes);
  };
  const handleSetSubID = (SubID) => {

    setSubUserId(SubID)
  };

  const handleLogCheckedCheckboxes = async () => {
    // console.log('Checked Checkboxes:', checkedCheckboxes);
    // console.log('Sub ID:', SubUserId);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const raw = JSON.stringify({
        "clientIds": checkedCheckboxes,
        "subUserId": SubUserId
      });

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/Assign_Client`, requestOptions);
      const result = await response.text();
      if (response.status === 200) {
        await Swal.fire("Success.", `${result}`, "success")
        window.location.reload()
      } else {
        Swal.fire("Failed!", `Failed to assign clients!!`, "error")
      }
      console.log(result);
    } catch (error) {
      console.log('error', error);
    }

  };

  const handleItemClick = (clickedData) => {

    console.log("Clicked Data:", clickedData.pan);
    setValues({
      email: clickedData.email || "",
      mobile: clickedData.mobile || "",
      pan: clickedData.pan || "",
      name: clickedData.name || "",
      SubUserId: clickedData.id || ""
    });
    setIsvalid({
      NameValid: true,
      PanValid: true,
      EmailValid: true,
      MobileValid: true
    })
  };
  const [errorMsg, setErrorMsg] = useState({
    NameMsg: "",
    PanMsg: "",
    EmailMsg: "",
    MobileMsg: ""
  })
  const [isValid, setIsvalid] = useState({
    NameValid: false,
    PanValid: false,
    EmailValid: false,
    MobileValid: false
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharRegex.test(value)) {
          // console.log("Special character not allowed!!!")
          setErrorMsg({
            ...errorMsg,
            NameMsg: "Special character not allowed!!!"
          })
          setIsvalid({
            ...isValid, NameValid: false
          })
        } else {
          setValues({ ...values, [name]: value });
          setErrorMsg({
            ...errorMsg,
            NameMsg: ""
          })
          setIsvalid({
            ...isValid, NameValid: true
          })
        }
        break;
      case "pan":

        const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        const userPAN = value;
        const uppercaseName = userPAN.toUpperCase();
        // // //---Basic PAN Validation
        setValues({ ...values, [name]: uppercaseName });
        // console.log(uppercaseName)
        // console.log(panPattern.test(uppercaseName))
        if (panPattern.test(uppercaseName)) {
          setErrorMsg({
            ...errorMsg,
            PanMsg: ""
          })
          setIsvalid({
            ...isValid, PanValid: true
          })
        } else {

          setErrorMsg({
            ...errorMsg,
            PanMsg: "Invalid PAN !!!"
          })
          setIsvalid({
            ...isValid, PanValid: false
          })
        }
        if (value.length === 10) {
          SubUserIsExits(name, value);
        }

        break;
      case "email":
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValues({ ...values, [name]: value });
        if (!emailRegex.test(value)) {
          setErrorMsg({
            ...errorMsg,
            EmailMsg: "Invalid Email !!!"
          });
          setIsvalid({
            ...isValid, EmailValid: false
          })
        } else {
          setErrorMsg({
            ...errorMsg,
            EmailMsg: ""
          });
          setIsvalid({
            ...isValid, EmailValid: true
          })
        }
        break;
      case "mobile":
        setValues({ ...values, [name]: value.replace(/\D/g, "") });
        e.target.value = value.replace(/\D/g, "");
        // Basic mobile validation
        // setValues({ ...values, [name]: value });
        const mobilePattern = /^[789]\d{9}$/;
        if (!mobilePattern.test(value)) {
          setErrorMsg({
            ...errorMsg,
            MobileMsg: "Invalid mobile number !!!"
          });
          setIsvalid({
            ...isValid, MobileValid: false
          })
        } else {
          setErrorMsg({
            ...errorMsg,
            MobileMsg: ""
          });
          setIsvalid({
            ...isValid, MobileValid: true
          })
        }
        break;
      default:
      // setValues({ ...values, [name]: value });

    }





  }

  const SubUserIsExits = async (name, value) => {

    try {

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };


      const response = await fetch(`${url_}/SubUserPanCheck/${value}`, requestOptions);
      const result = await response.json();
      if (response.status === 200) {
        // const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        const userPAN = value;
        const uppercaseName = userPAN.toUpperCase();
        // //---Basic PAN Validation
        setValues({ ...values, [name]: uppercaseName });
        // console.log(uppercaseName)
        // console.log(panPattern.test(uppercaseName))
        // if (panPattern.test(uppercaseName)) {
        //   setErrorMsg({
        //     ...errorMsg,
        //     PanMsg: ""
        //   })
        //   setIsvalid({
        //     ...isValid, PanValid: true
        //   })
        // } else {

        //   setErrorMsg({
        //     ...errorMsg,
        //     PanMsg: "Invalid PAN !!!"
        //   })
        // }
      } else {
        Swal.fire("", `${result.message}`, "warning");
        setValues({ ...values, [name]: "" });
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  // console.log(value)

  const handleUpdate = async () => {

    console.log(values)
    console.log(isValid)



    if (

      !isValid.EmailValid ||

      !isValid.MobileValid ||

      !isValid.NameValid ||
      !isValid.PanValid
    ) {
      Swal.fire("Please fill the valid details in all fields")
    } else {
      try {
        // Set up headers for the request
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append(
          "Authorization",
          `Bearer ${storedToken}`);

        // Create a JSON string with the data to be updated
        var raw = JSON.stringify({
          "name": values.name,
          "pan": values.pan,
          "email": values.email,
          "mobile": values.mobile
        });

        // Set up the request options
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        // Make the PUT request using the Fetch API

        const response = await fetch(`${url_}/updateSub_Users/${values.SubUserId}`, requestOptions);
        // const result = await response.text();
        // console.log(result);
        if (response.status === 200) {
          await Swal.fire("Success.", "Data updated successful.", "success")
          setValues({

            pan: "",
            email: "",
            mobile: "",
            name: ""
          })
          window.location.reload();
        } else {
          Swal.fire("Failed!", "Failed to update!!", "error")
          // setValues({
          //   ...values,
          //   pan: "",
          //   email: "",
          //   mobile: "",
          //   name: ""
          // })
        }
      } catch (error) {
        console.log('error', error);
      }

      // console.log(values)
      // console.log(isValid)
    }
  };

  function getFormattedDate(inputDate) {
    const dateObject = new Date(inputDate);
    return dateObject.toISOString().split('T')[0];
  }

  function getFormattedTime(inputDate) {
    const dateObject = new Date(inputDate);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const period = hours >= 12 ? 'pm' : 'am';

    // Convert to 12-hour format
    const formattedHours = hours % 12 || 12;

    return `${formattedHours}:${minutes}${period}`;
  }

  return (
    <>
      <div style={{ width: "98%" }}>
        <div >
          <div className='d-flex flex-column align-items-center mt-4 mb-3'>
            <h4 className='d-flex justify-content-center'><b>SUB LOGINS</b></h4>
            <SubLoginRegister DaysRemaining={UserRemainingDays}>

              <div className='mt-3'>
                <button className={`${style.buysublogin_btn} d-flex justify-content-center`}><b>BUY LOGIN</b></button>
              </div>
            </SubLoginRegister>
          </div>
        </div>
        <hr style={{ backgroundColor: "#d9d3d3", height: "1px", borderRadius: "5px" }} />
        <div style={{ height: "35rem", overflowY: "scroll" }} className='d-flex flex-column '>


          {sublogins.length === 0 ? (
            <div style={{ height: "35rem" }} className='d-flex flex-column '>
              <>
                <h4 style={{
                  margin: "10rem auto",
                  fontFamily: "cursive"
                }}>No SUB User's</h4>
              </>
            </div>
          ) : (
            <>
              {sublogins.map((item, index) => (


                <div style={{
                  width: "95%",
                  padding: "2rem",
                  boxShadow: "1px 1px 10px gray",
                  marginTop: "2rem",
                  marginBottom: "2rem",
                  borderBottomLeftRadius: "50px",
                  borderTopRightRadius: "50px"
                }} className='container'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <span style={{ fontSize: "1rem" }}><b>SUB LOGIN {item.id}</b></span>

                    {
                      item.name === null ? (
                        <div className=''>
                          <button className={`${style.buysublogin_btn}`} onClick={() => {
                            handleSetSubID(item.id);
                            Swal.fire("Sub Login data can't be empty!!. Update the sub Login data.");
                            setBlinkStyle(true);

                            // Reset the style after 30 seconds
                            setTimeout(function () {
                              setBlinkStyle(false);
                            }, 15000);  // 30,000 milliseconds = 30 seconds

                          }}><b>Assign Clients</b></button>
                        </div>
                      ) : (
                        <div className='' data-toggle="modal" data-target=".bd-example-modal-lg" onClick={() => handleSetSubID(item.id)}>
                          <button className={`${style.buysublogin_btn}`} ><b>Assign Clients</b></button>
                        </div>
                      )
                    }



                  </div>


                  <hr style={{ backgroundColor: "#d9d3d3", borderRadius: "5px" }} />


                  <div className='row mt-4'>
                    <div className='col-md-2 col-sm-12 mb-2 d-flex justify-content-center border border-warning' style={{ height: "2rem" }}><b>{item.name}</b></div>
                    <div className='col-md-2 col-sm-12 mb-2 d-flex justify-content-center border border-warning' style={{ height: "2rem" }}><b>{item.pan}</b></div>
                    <div className='col-md-2 col-sm-12 mb-2 d-flex justify-content-center border border-warning' style={{ height: "2rem" }}><b>{item.mobile}</b></div>
                    <div className='col-md-4 col-sm-12 mb-2 d-flex justify-content-center border border-warning' style={{ height: "2rem" }}><b>{item.email}</b></div>
                    <div className='col-md-1 col-sm-12 mb-2 d-flex justify-content-center border border-warning' style={{ height: "2rem" }} >

                      {item.name === null && item.id === SubUserId ? (
                        <b className={blinkStyle ? style.blink : style.NOTblink}><i className={blinkStyle ? "bi bi-pencil-square text-danger" : "bi bi-pencil-square"} ></i></b>
                      ) : (
                        <b className={style.NOTblink}><i className="bi bi-pencil-square" onClick={() => handleItemClick(item)} data-toggle="modal" data-target="#exampleModal1"></i></b>
                      )}

                    </div>
                    <div className='col-md-1 col-sm-12 d-flex justify-content-center mb-2' style={{ height: "2rem" }} >
                      <SubLoginRenewal AmountToPay={2.7 * UserRemainingDays} SubUserId={item.id}>
                        <button className={`${style.buysublogin_btn} d-flex justify-content-center w-100`}><b>Renew</b></button>
                      </SubLoginRenewal >
                    </div>
                  </div>


                  <hr style={{ backgroundColor: "#d9d3d3", borderRadius: "5px" }} />

                  <div className='row d-flex justify-content-center'>
                    <div className="col-md-8">
                      <div className="d-flex flex-md-row flex-column justify-content-between" style={{
                        boxShadow: "gray 2px 3px 10px",
                        borderRadius: "10px",
                        padding: "7px"
                      }}>
                        <div className="col-md-6 mb-md-0 mb-3">
                          <h6 className='text-center'><b>Start Date :</b>{getFormattedDate(item.startDate)}</h6>
                          <h6 className='text-center'><b>Time :</b> {getFormattedTime(item.startDate)}</h6>
                        </div>
                        <div className="col-md-6">
                          <h6 className='text-center'><b>End Date :</b> {getFormattedDate(item.endDate)}</h6>
                          <h6 className='text-center'><b>Time :</b> {getFormattedTime(item.endDate)}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>







              ))}
            </>
          )}


        </div>
      </div>
      {/* ///////////////////////////////////////////////////////////////// Assign Clients /////////////////////////////////////////////////////////////// */}


      <>
        {/* <span data-toggle="modal" data-target=".bd-example-modal-lg">
          {props.children}
        </span> */}

        <div className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" style={{ overflowY: "initial !important" }}>
            <div className="modal-content">
              <div className="modal-header">
                <div className=' mt-4 mb-2 ml-3'>
                  <h4><b>Assign clients to SUB-Login {SubUserId}</b></h4>
                </div>
                {/* <button className={`${style.close}`} type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button> */}
              </div>
              <div className="modal-body " style={{ height: "50vh", overflowY: "auto" }}>
                <>
                  <div className='d-flex flex-column justify-content-center'>
                    <table className="table table-striped ">
                      <thead>
                        <tr style={{ backgroundColor: "#ffd401e6" }}>
                          <th scope="col" className="text-center">#</th>
                          <th scope="col" className="text-center">NAME</th>
                          <th scope="col" className="text-center">PAN</th>
                          <th scope="col" className="text-center">CATEGORY</th>
                          <th scope="col" className="text-center">Assigned To</th>

                        </tr>
                      </thead>
                      <tbody>
                        {ClientsData.map((item, index) => (

                          <tr key={index}>
                            <td className="text-center">
                              <input
                                type="checkbox"
                                id={item.clientId}
                                checked={checkedCheckboxes.includes(item.clientId)}
                                onChange={() => handleCheckboxChange(item.clientId)}
                              />
                            </td>
                            <td className='text-center'>{item.name}</td>
                            <td className='text-center'>{item.pan}</td>
                            <td className='text-center'>{item.category}</td>
                            {item.subUserId !== null ? (
                              <td className='text-center'>SUB-Login {item.subUserId}</td>
                            ) : (
                              <td className='text-center'></td>
                            )}
                          </tr>
                        ))}


                      </tbody>
                    </table>
                  </div>
                </>
              </div>
              <div className="modal-footer">

                <div className='mt-3 d-flex justify-content-center w-100'>
                  <button className={`${style.buysublogin_btn} d-flex justify-content-center`} onClick={handleLogCheckedCheckboxes}><b>Assign Clients</b></button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </>

      {/* ///////////////////////////////////////////////////////////////// Update SUB USER /////////////////////////////////////////////////////////////// */}

      <div className="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className=' mt-4 mb-2 ml-3'>
                <h4><b>UPDATE SUB-LOGIN</b></h4>
              </div>
              {/* <button className={`${style.close} close`} type="button" data-dismiss="modal" aria-label="Close"> */}
              {/* <span aria-hidden="true">&times;</span>
            </button> */}
            </div>
            <div className="modal-body">
              <>
                <div className='d-flex flex-column justify-content-center'>

                  <InputField placeholder='Enter name...' onChange={handleChange} lblname='Name' name='name' value={values.name} validationmsg={errorMsg.NameMsg} />

                  <InputField placeholder='Enter PAN...' onChange={handleChange} lblname='PAN' name='pan' value={values.pan} validationmsg={errorMsg.PanMsg} maxLength={10} />

                  <InputField placeholder='Enter email...' onChange={handleChange} lblname='Email' name='email' value={values.email} validationmsg={errorMsg.EmailMsg} />

                  <InputField placeholder='Enter mobile...' onChange={handleChange} lblname='Mobile' name='mobile' value={values.mobile} maxLength={10} validationmsg={errorMsg.MobileMsg} />


                </div>
              </>
            </div>
            <div className="modal-footer">

              <div className='mt-3 d-flex justify-content-center w-100'>
                <button className={`${style.buysublogin_btn} d-flex justify-content-center`} onClick={handleUpdate}><b>UPDATE</b></button>
              </div>

            </div>
          </div>
        </div>
      </div >


      {/* ///////////////////////////////////////////////////////////////// Assign Clients /////////////////////////////////////////////////////////////// */}



    </>
  );
}

export default NEWSubLogin;




