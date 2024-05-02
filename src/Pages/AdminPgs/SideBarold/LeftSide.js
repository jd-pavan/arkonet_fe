import React, { useState, useEffect } from 'react';

import styles from './leftside.module.css';
import Applogo from '../../../Images/taxko_logo.jpeg'
import Cmpylogo from '../../../Images/Arkonet - Logo_page-0001.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { url_ } from '../../../Config';
import Swal from 'sweetalert2';

const LeftSide = ({ loggedIn, setLoggedIn }) => {
  const subscription_status = localStorage.getItem(`subscription_status`);
  const Category = localStorage.getItem(`Category`);
  const Sub_user_id = localStorage.getItem(`Sub_user_id`);
  const Sub_user_pan = localStorage.getItem(`Sub_user_pan`);
  const Sub_user_name = localStorage.getItem(`name`);


  const user_id = window.localStorage.getItem("user_id");
  const storedToken = window.localStorage.getItem("jwtToken");
  const username = localStorage.getItem("user_name");
  const userpan = localStorage.getItem("pan");
  const logintime = localStorage.getItem('logintime');
  const logindate = localStorage.getItem('logindate');
  const Navigate = useNavigate();

  useEffect(() => {

    if (localStorage.length > 0) {
      // setLoggedIn(JSON.parse(localStorage.getItem('LogedIn')));
      setLoggedIn(localStorage.getItem('LogedIn'));
      // setLoggedIn(fa);
    }
    // console.log('is logged in',isLoggedIn);
  });

  function getCurrentDateTime() {
    const now = new Date();

    // Get the current date
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todaydate = `${year}-${month}-${day}`;

    // Get the current time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const logouttime = `${hours}:${minutes}:${seconds}`;

    return { todaydate, logouttime };
  }



  const handleLogout = async () => {

    await Swal.fire({
      title: 'Logging off...',
      text: 'Please wait...',
      timer: 4000, // 4 seconds
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      onClose: () => {
        console.log('logged off');
        // You can add additional actions here if needed
      }
    });


    const { todaydate, logouttime } = getCurrentDateTime();
    console.log("date :", todaydate);
    console.log("time :", logouttime);
    try {


      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const raw = JSON.stringify({
        "name": Category === "Sub User" ? Sub_user_name : username,
        "daydate": logindate,
        "startTime": logintime,
        "endTime": logouttime,
        "userid": user_id,
        "subid": Category === "Sub User" ? Sub_user_id : "",
        "category": Category,
        "pan": Category === "Sub User" ? Sub_user_pan : userpan
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch(`${url_}/Attendence`, requestOptions);
      if (response.status === 200) {



        if (Category === "Sub User") {
          callLoginDataFunction(logintime, logouttime, todaydate, Sub_user_pan);
        } else {
          callLoginDataFunction(logintime, logouttime, todaydate, userpan);
          // console.log(logintime, logouttime, todaydate, userpan);
        }



        setLoggedIn(false);
        localStorage.clear();
        Navigate("/admin");
        Swal.close();

      } else {
        console.log(response)
      }

    } catch (error) {
      console.log(error)
    }

  };

  const callLoginDataFunction = async (checkINtime, checkOuttime, workingDate, UserPAN) => {
    if (Category === "Sub User") {
      TodaysLoginSubUSERData(checkINtime, checkOuttime, workingDate, UserPAN);
    } else {
      // console.log(checkINtime, checkOuttime, workingDate, UserPAN)
      UserLogData(checkINtime, checkOuttime, workingDate, UserPAN);
    }
  }
  const TodaysLoginSubUSERData = async (checkINtime, checkOuttime, workingDate, subUserPAN) => {
    try {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        const raw = JSON.stringify({
          "checkIn": checkINtime,
          "checkOut": checkOuttime,
          "workingDate": workingDate
        });

        const requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };

        const response = await fetch(`${url_}/SubUserCheckInOROut/${subUserPAN}`, requestOptions)
        const result = await response.json();
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const UserLogData = async (LoginTime, LogOutTime, Logindate, UserPAN) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const raw = JSON.stringify({
        "checkIn": LoginTime,
        "checkOut": LogOutTime,
        "workingDate": Logindate
      });

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch(`${url_}/CACheckInOROut/${UserPAN}`, requestOptions)
      const result = await response.json();
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const [activeLink, setActiveLink] = useState("Dashboard");
  const [clickedActiveLink, setclickedActiveLink] = useState("Dashboard");


  const handleLinkClick = (pglink) => {

    switch (pglink) {
      case "dashboard":
        setclickedActiveLink("Dashboard")
        break;
      case "myclients":
        setclickedActiveLink("My CLients")
        break;
      case "tallybackup":
        setclickedActiveLink("Tally Backup")
        break;
      case "changepass":
        setclickedActiveLink("Change Pass")
        break;
      case "investNow":
        setclickedActiveLink("Invest Now")
        break;
      case "sublogin":
        setclickedActiveLink("Sub Login")
        break;
      case "leads":
        setclickedActiveLink("Leads")
        break;
      case "userUpdate":
        setclickedActiveLink("Update Profile")
        break;
      case "UserSubscriptionPage":
        setclickedActiveLink("Subcription")
        break;
      case "familygroup":
        setclickedActiveLink("Family Group")
        break;
      case "transferRequest":
        Navigate("transferRequest");

        break;
      case "logdetails":
        Navigate("logdetails");

        break;
      case "help":
        setclickedActiveLink("Help")
        break;
      default:

    }
    setActiveLink(pglink);
    switch (pglink) {
      case "dashboard":
        //   
        Navigate("dashboard");

        break;
      case "myclients":
        Navigate("dashboard/tc");

        break;

      case "tallybackup":
        Navigate("tallybackup");
        break;

      case "changepass":
        Navigate("changepass");
        break;

      case "investNow":
        Navigate("investNow");

        break;

      case "sublogin":
        Navigate("dashboard/sublogin");
        break;

      case "leads":
        Navigate("dashboard/leads");

        break;

      case "userUpdate":
        Navigate("userUpdate");

        break;
      case "UserSubscriptionPage":
        Navigate("UserSubscriptionPage");

        break;
      case "notification":
        Navigate("notification");

        break;
      case "transferRequest":
        Navigate("transferRequest");

        break;
      case "logdetails":
        Navigate("logdetails");

        break;
      case "help":
        Navigate("help");

        break;
      default:

    }
  };
  return (
    <span className={styles.main_sideBar}>

      <div className={styles.SideBar_Total}>
        <div className={styles.SideBar_Main}>
          {loggedIn &&
            <div className={styles.SideBar_Notification}>
              {/* <span>&lt;</span> */}
              {/* <span><i className="bi bi-arrow-right-short"></i></span>
              <span>{clickedActiveLink}</span> */}
              <span onClick={() => handleLinkClick('notification')} style={{ cursor: "pointer" }}><i className="bi bi-bell-fill"></i></span>
            </div>
          }
          <div className={styles.SideBar_Main_SideBar}>
            {loggedIn ?
              <div className={styles.SideBar_Img_container} onClick={() => Navigate("dashboard")} style={{ cursor: "pointer" }}>
                <img src={Applogo} alt="TAXKO" />
              </div>
              :
              <div className={styles.SideBar_Img_container} >
                <img src={Applogo} alt="TAXKO" />
              </div>
            }

            <div className={styles.SideBar_Menus}>
              {loggedIn ? (
                <>
                  {subscription_status === "off" || subscription_status === "not_subscribed" ? '' :
                    <>
                      <Link to="dashboard" onClick={() => handleLinkClick('dashboard')}>
                        <h6 className={activeLink === 'dashboard' ? 'font-weight-bold' : ''}>Dashboard</h6>
                      </Link>

                      <Link to="dashboard/tc" onClick={() => handleLinkClick('myclients')}>
                        <h6 className={activeLink === 'myclients' ? 'font-weight-bold' : ''}>My Clients</h6>
                      </Link>




                      {Category !== "Sub User" &&
                        <>

                          <Link to="tallybackup" onClick={() => handleLinkClick('tallybackup')}>
                            <h6 className={activeLink === 'tallybackup' ? 'font-weight-bold' : ''}>Tally Backup</h6>
                          </Link>



                          <Link to="investNow" onClick={() => handleLinkClick('investNow')}>
                            <h6 className={activeLink === 'investNow' ? 'font-weight-bold' : ''}>Invest Now</h6>
                          </Link>

                          <Link to="dashboard/sublogin" onClick={() => handleLinkClick('sublogin')}>
                            <h6 className={activeLink === 'sublogin' ? 'font-weight-bold' : ''}>Sub Login</h6>
                          </Link>

                          <Link to="dashboard/leads" onClick={() => handleLinkClick('leads')}>
                            <h6 className={activeLink === 'leads' ? 'font-weight-bold' : ''}>Leads</h6>
                          </Link>

                          <Link to="dashboard/familygroup" onClick={() => handleLinkClick('familygroup')}>
                            <h6 className={activeLink === 'familygroup' ? 'font-weight-bold' : ''}>Family Group</h6>
                          </Link>

                          <div style={{ marginTop: "1rem" }} className={styles.myprofilelink}>
                            <input id="check01" type="checkbox" name="menu" />
                            <label htmlFor="check01" onClick={() => handleLinkClick('My Profile')}><h6 className={activeLink === 'My Profile' ? 'font-weight-bold' : ''}>My Profile</h6>
                            </label>
                            <ul className={styles.submenu}>
                              <Link to="userUpdate" onClick={() => handleLinkClick('userUpdate')}>
                                <h6 className={activeLink === 'userUpdate' ? 'font-weight-bold' : ''}>Update Profile</h6>
                              </Link>
                              <Link to="UserSubscriptionPage" onClick={() => handleLinkClick('UserSubscriptionPage')}>
                                <h6 className={activeLink === 'UserSubscriptionPage' ? 'font-weight-bold' : ''}>Subcription</h6>
                              </Link>
                              <Link to="changepass" onClick={() => handleLinkClick('changepass')}>
                                <h6 className={activeLink === 'changepass' ? 'font-weight-bold' : ''}>Change Password</h6>
                              </Link>
                            </ul>
                          </div>

                          <Link to="logdetails" onClick={() => handleLinkClick('logdetails')}>
                            <h6 className={activeLink === 'logdetails' ? 'font-weight-bold' : ''}>Log Details</h6>
                          </Link>

                          <Link to="transferRequest" onClick={() => handleLinkClick('transferRequest')}>
                            <h6 className={activeLink === 'transferRequest' ? 'font-weight-bold' : ''}>Transfer Requests</h6>
                          </Link>
                          <Link to="help" onClick={() => handleLinkClick('help')}>
                            <h6 className={activeLink === 'help' ? 'font-weight-bold' : ''}>Help</h6>
                          </Link>
                        </>
                      }

                    </>
                  }
                  <Link to="" className={styles.logout_text} onClick={handleLogout}><h6>Logout</h6></Link>

                </>
              ) : (
                <>

                  {/* <Link to="help" onClick={() => handleLinkClick('help')}>
                    <h6 className={activeLink === 'help' ? 'font-weight-bold' : 'text-center'}>Help</h6>
                  </Link> */}
                </>
              )}
            </div>
            <div className={styles.SideBar_footer_container}>
              <h6 >Developed and Manage By</h6>
              <img alt='logo' src={Cmpylogo} />
              <h6 >version 1.0</h6>
            </div>
          </div>
        </div>
      </div>

      {loggedIn &&

        <>

          {true && <div className={`${styles.navbarH}`}>
            <div className={`${styles.containerH} ${styles.navcontainer}`}>
              <input className={`${styles.checkbox}`} type="checkbox" name="" id="" />
              <div className={`${styles.hamburgerlines}`}>
                <small className={`${styles.line} ${styles.line1}`}></small>
                <small className={`${styles.line} ${styles.line2}`}></small>
                <small className={`${styles.line} ${styles.line3}`}></small>
              </div>
              <div className={styles.MobileView_bell} onClick={() => handleLinkClick('notification')} style={{ cursor: "pointer" }}>
                <i className="bi bi-bell-fill"></i>
              </div>
              <div className={`${styles.menuitems}`}>

                <li onClick={() => handleLinkClick('dashboard')}><span className={activeLink === 'dashboard' ? 'font-weight-bold ' : ''} style={{ cursor: "pointer" }}>Dashboard</span></li>
                <li onClick={() => handleLinkClick('myclients')}><span className={activeLink === 'myclients' ? 'font-weight-bold ' : ''} style={{ cursor: "pointer" }}>My Clients</span></li>
                <li onClick={() => handleLinkClick('tallybackup')}><span className={activeLink === 'tallybackup' ? 'font-weight-bold ' : ''} style={{ cursor: "pointer" }}>Tally Backup</span></li>
                <li onClick={() => handleLinkClick('changepass')}><span className={activeLink === 'changepass' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Change Password</span></li>
                <li onClick={() => handleLinkClick('investNow')}><span className={activeLink === 'investNow' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Invest Now</span></li>
                <li onClick={() => handleLinkClick('sublogin')}><span className={activeLink === 'sublogin' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Sub Login</span></li>
                <li onClick={() => handleLinkClick('leads')}><span className={activeLink === 'leads' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Leads</span></li>
                <li onClick={() => handleLinkClick('familygroup')}><span className={activeLink === 'familygroup' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Family Group</span></li>
                {/* <li onClick={() => handleLinkClick('My Profile')}><span className={activeLink === 'My Profile' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>My Profile</span></li> */}
                <li onClick={() => handleLinkClick('userUpdate')}><span className={activeLink === 'userUpdate' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Update Profile</span></li>
                <li onClick={() => handleLinkClick('UserSubscriptionPage')}><span className={activeLink === 'UserSubscriptionPage' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Subcription</span></li>
                <li onClick={() => handleLinkClick('logdetails')}><span className={activeLink === 'logdetails' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Log Details</span></li>
                <li onClick={() => handleLinkClick('transferRequest')}><span className={activeLink === 'transferRequest' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Transer Request</span></li>
                <li onClick={() => handleLinkClick('help')}><span className={activeLink === 'help' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }} >Help</span></li>
                <li className={`${styles.logout_text}`} onClick={handleLogout}><span >Logout</span></li>


              </div>
            </div>

          </div >}
        </>

      }
    </span>
  );
}

export default LeftSide;
