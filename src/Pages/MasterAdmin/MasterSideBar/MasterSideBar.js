import React, { useEffect, useState } from 'react';

import styles from './MasterSideBar.module.css';
import Applogo from '../../../Images/taxko_logo.jpeg'
import Cmpylogo from '../../../Images/Arkonet - Logo_page-0001.jpg'
import { Link, useNavigate } from 'react-router-dom';

const MasterSideBar = ({ loggedIn, setLoggedIn }) => {
  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.length > 0) {
      setLoggedIn(JSON.parse(localStorage.getItem("LogedIn")));
    }
  }, []);


  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    Navigate("/masteradmin")
  };


  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (pglink) => {
    setActiveLink(pglink);
    switch (pglink) {
      case "dashboard":
        //   
        Navigate("admindashboard");

        break;
      case "searchadmin":
        Navigate("searchadmin", {
          state: {
            userProfession: "All",
          },
        });

        break;

      case "clientview":
        Navigate(pglink, {
          state: {
            ClientCategory: "All",
          },
        });



        break;
      case "subPackDetails":
        Navigate(pglink);




        break;
      case "distributor":
        Navigate("distributor", {
          state: {
            userProfession: "Distributor List",
          },
        });

        break;

      case "distriPayments":
        Navigate("distriPayments", {
          state: {
            userProfession: "Distributor List",
          },
        });

        break;

      case "addsalesManager":
        Navigate("addsalesManager");

        break;

      case "setmanagertarget":
        Navigate("salemgmlist", {
          state: {
            userProfession: "Sale Manager Target",
          },
        });

        break;

      case "salePayments":
        Navigate("salePayments", {
          state: {
            userProfession: "Sale Manager's Payment",
          },
        });

        break;
      case "changepass":
        Navigate("changepass");
        break;
      case "manageAds":
        Navigate("manageAds");
        break;
      case "logdetails":
        Navigate("logdetails");


        break;
      default:

    }
  };

  return (
    <>
      {/* <div className={`${styles.sidebar}`}>
        <div className={`d-flex flex-column justify-content-evenly ${styles.navbar}  `}>
          <Link to={"dashboard"}>
            <img className={styles.taxo_logo} src={Applogo} alt="" />
          </Link>
          {loggedIn ? (
            <div >

              <Link to="/masteradmin/admindashboard/" onClick={() => handleLinkClick('dashboard')}>
                <h6 className={activeLink === 'dashboard' ? 'font-weight-bold mt-4' : 'mt-4'}>Dashboard</h6>
              </Link>

              <div onClick={() => handleLinkClick('searchadmin')}>
                <h6 className={activeLink === 'searchadmin' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>CA</h6>
              </div>

              <div onClick={() => handleLinkClick('clientview')}>
                <h6 className={activeLink === 'clientview' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Clients</h6>
              </div>

              <div onClick={() => handleLinkClick('addsalesManager')}>
                <h6 className={activeLink === 'addsalesManager' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Add Sales Manager</h6>
              </div>

              <div onClick={() => handleLinkClick('subPackDetails')}>
                <h6 className={activeLink === 'subPackDetails' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Manage Subsriptions</h6>
              </div>

              <div onClick={() => handleLinkClick('distributor')}>
                <h6 className={activeLink === 'distributor' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Manage Distributors</h6>
              </div>

              <div onClick={() => handleLinkClick('setmanagertarget')}>
                <h6 className={activeLink === 'setmanagertarget' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Manage Sale Manager</h6>
              </div>

              <div onClick={() => handleLinkClick('distriPayments')}>
                <h6 className={activeLink === 'distriPayments' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Distributors Payment</h6>
              </div>

              <div onClick={() => handleLinkClick('salePayments')}>
                <h6 className={activeLink === 'salePayments' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Sale Manager Payment</h6>
              </div>

              <Link to="changepass" onClick={() => handleLinkClick('changepass')}>
                <h6 className={activeLink === 'changepass' ? 'font-weight-bold mt-4' : 'mt-4'}>Change Password</h6>
              </Link>
              <Link to="logdetails" onClick={() => handleLinkClick('logdetails')}>
                <h6 className={activeLink === 'logdetails' ? 'font-weight-bold mt-4' : 'mt-4'}>Log Details</h6>
              </Link>

              <div className='mt-4'>
                <Link to="" className={`${styles.logout_text} mt-4`} onClick={handleLogout}><h6>Logout</h6></Link>
              </div>

            </div>
          ) : (
            <>


            </>
          )}
        </div>

        <div className={styles.help}>
          <h6 className={styles.poweredby}>Developed and Manage By</h6>
          <img className={` ${styles.arko_logo}`} alt='logo' src={Cmpylogo} />
          <h6 className={styles.version}>version 1.0</h6>
        </div>
      </div> */}


      {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}




      <div className={styles.SideBar_Total}>
        <div className={styles.SideBar_Main}>

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

            <div className={styles.SideBar_Menus} >
              {loggedIn ? (
                <>



                  <Link to="/masteradmin/admindashboard/" onClick={() => handleLinkClick('dashboard')}>
                    <h6 className={activeLink === 'dashboard' ? 'font-weight-bold mt-4' : 'mt-4'}>Dashboard</h6>
                  </Link>

                  <div onClick={() => handleLinkClick('searchadmin')}>
                    <h6 className={activeLink === 'searchadmin' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>CA</h6>
                  </div>

                  <div onClick={() => handleLinkClick('clientview')}>
                    <h6 className={activeLink === 'clientview' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Clients</h6>
                  </div>

                  <div onClick={() => handleLinkClick('addsalesManager')}>
                    <h6 className={activeLink === 'addsalesManager' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Add Sales Manager</h6>
                  </div>

                  <div onClick={() => handleLinkClick('subPackDetails')}>
                    <h6 className={activeLink === 'subPackDetails' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Manage Subsriptions</h6>
                  </div>

                  <div onClick={() => handleLinkClick('distributor')}>
                    <h6 className={activeLink === 'distributor' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Manage Distributors</h6>
                  </div>

                  <div onClick={() => handleLinkClick('setmanagertarget')}>
                    <h6 className={activeLink === 'setmanagertarget' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Manage Sale Manager</h6>
                  </div>

                  <div onClick={() => handleLinkClick('distriPayments')}>
                    <h6 className={activeLink === 'distriPayments' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Distributors Payment</h6>
                  </div>

                  <div onClick={() => handleLinkClick('salePayments')}>
                    <h6 className={activeLink === 'salePayments' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Sale Manager Payment</h6>
                  </div>

                  <div onClick={() => handleLinkClick('manageAds')}>
                    <h6 className={activeLink === 'manageAds' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Manage Ads</h6>
                  </div>

                  <Link to="changepass" onClick={() => handleLinkClick('changepass')}>
                    <h6 className={activeLink === 'changepass' ? 'font-weight-bold mt-4' : 'mt-4'}>Change Password</h6>
                  </Link>
                  <Link to="logdetails" onClick={() => handleLinkClick('logdetails')}>
                    <h6 className={activeLink === 'logdetails' ? 'font-weight-bold mt-4' : 'mt-4'}>Log Details</h6>
                  </Link>

                  <div className='mt-4'>
                    <Link to="" className={`${styles.logout_text} mt-4`} onClick={handleLogout}><h6>Logout</h6></Link>
                  </div>

















                </>
              ) : (
                <>

                  <Link to="help" onClick={() => handleLinkClick('help')}>
                    <h6 className={activeLink === 'help' ? 'font-weight-bold' : 'text-center'}>Help</h6>
                  </Link>
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































      {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}


      {loggedIn && <div className={`${styles.navbarH}`}>
        <div className={`${styles.containerH} ${styles.navcontainer}`}>
          <input className={`${styles.checkbox}`} type="checkbox" name="" id="" />
          <div className={`${styles.hamburgerlines}`}>
            <small className={`${styles.line} ${styles.line1}`}></small>
            <small className={`${styles.line} ${styles.line2}`}></small>
            <small className={`${styles.line} ${styles.line3}`}></small>
          </div>

          <div className={`${styles.menuitems}`}>
            <li onClick={() => handleLinkClick('dashboard')}><span className={activeLink === 'dashboard' ? 'font-weight-bold ' : ''} style={{ cursor: "pointer" }}>Dashboard</span></li>
            <li onClick={() => handleLinkClick('searchadmin')}><span className={activeLink === 'searchadmin' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>CA</span></li>
            <li onClick={() => handleLinkClick('clientview')}><span className={activeLink === 'clientview' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Clients</span></li>
            <li onClick={() => handleLinkClick('addsalesManager')}><span className={activeLink === 'addsalesManager' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Add Sales Manager</span></li>
            <li onClick={() => handleLinkClick('subPackDetails')}><span className={activeLink === 'subPackDetails' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }} >Manage Subsriptions</span></li>
            <li onClick={() => handleLinkClick('distributor')}><span className={activeLink === 'distributor' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }} >Manage Distributors</span></li>
            <li onClick={() => handleLinkClick('setmanagertarget')}><span className={activeLink === 'setmanagertarget' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }} >Manage Sale Manager</span></li>
            <li onClick={() => handleLinkClick('distriPayments')}><span className={activeLink === 'distriPayments' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }} >Distributors Payment</span></li>
            <li onClick={() => handleLinkClick('salePayments')}><span className={activeLink === 'salePayments' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }} >Sale Manager Payment</span></li>
            <li onClick={() => handleLinkClick('manageAds')}><span className={activeLink === 'manageAds' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }} >Manage Ads</span></li>
            <li onClick={() => handleLinkClick('changepass')}><span className={activeLink === 'changepass' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Change Password</span></li>
            <li onClick={() => handleLinkClick('logdetails')}><span className={activeLink === 'logdetails' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Log Details</span></li>
            <li className={`${styles.logout_text}`} onClick={handleLogout}><span >Logout</span></li>
          </div>
        </div>

      </div >}
    </>
  );
}

export default MasterSideBar;
