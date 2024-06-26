import React, { useEffect, useState } from 'react';

import styles from './DistributorSideBar.module.css';
import Applogo from '../../../Images/taxko_logo.jpeg'
import Cmpylogo from '../../../Images/Arkonet - Logo_page-0001.jpg'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DistributorSideBar = ({ loggedIn, setLoggedIn }) => {
    const Navigate = useNavigate();
    const distributor_pan = localStorage.getItem("pan");


    useEffect(() => {

        if (localStorage.length > 0) {

        }

    }, []);


    const handleLogout = () => {
        localStorage.clear();
        setLoggedIn(false);
        Navigate("")
    };


    const [activeLink, setActiveLink] = useState(null);
    useEffect(() => {

    }, [activeLink])
    const handleLinkClick = (pglink) => {

        switch (pglink) {
            case "dashboard":
                Navigate("/distributor/distributor_dash");
                setActiveLink("dashboard")
                break;

            case "investnow":
                setActiveLink("investnow")
                Navigate("/distributor/investNow");
                break;
            // case "rewards":
            //     setActiveLink("rewards")     
            // break;
            case "profile":
                Navigate("update/distributor_reg");
                setActiveLink("profile")
                break;
            case "help":
                setActiveLink("help");
                Navigate("/distributor/help");
                break;

            case "refferallink":
                setActiveLink("refferallink");

                // const refferalLink=`http://localhost:3000/admin/refferal/user/${parseInt(new Date().getTime() / 1000)}_${userInfo.userPAN}`;
                const refferalLink = `http://taxko.in/admin/refferal/user/${parseInt(new Date().getTime() / 1000)}_${distributor_pan}`;
                const copy = require('clipboard-copy')
                copy(refferalLink);

                Swal.fire('Refferal link has been copied to clipboard');

                break;
            default: break;
        }

    };

    return (
        // <div className="container">
        <>
            <div className={`${styles.sidebar}`}>
                <div className={`d-flex flex-column justify-content-evenly ${styles.navbar}  `}>
                    <div>
                        <img className={styles.taxo_logo} src={Applogo} alt="" />
                    </div>
                    {loggedIn ? (
                        <div >

                            <div onClick={() => handleLinkClick('dashboard')}>
                                <Link to="" >
                                    <h6 className={activeLink === 'dashboard' ? 'font-weight-bold mt-4' : 'mt-4'}>Dashboard</h6>
                                </Link>
                            </div>



                            <div onClick={() => handleLinkClick('investnow')}>
                                <h6 className={activeLink === 'investnow' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Invest Now</h6>
                            </div>

                            {/* <div onClick={() => handleLinkClick('rewards')}>
                            <h6 className={activeLink === 'rewards' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Rewards</h6>
                        </div> */}

                            <div onClick={() => handleLinkClick('profile')}>
                                <h6 className={activeLink === 'profile' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Profile</h6>
                            </div>

                            <div onClick={() => handleLinkClick('refferallink')}>
                                <h6 className={activeLink === 'refferallink' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }}>Generate Refferal Link</h6>
                            </div>

                            <div onClick={() => handleLinkClick('help')}>
                                <h6 className={activeLink === 'help' ? 'font-weight-bold mt-4' : 'mt-4'} style={{ cursor: "pointer" }} >Help</h6>
                            </div>



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


            </div >


            {/* <div > */}
            {/* <nav> */}
            {loggedIn ? (

                <div className={`${styles.navbarH}`}>
                    <div className={`${styles.containerH} ${styles.navcontainer}`}>
                        <input className={`${styles.checkbox}`} type="checkbox" name="" id="" />
                        <div className={`${styles.hamburgerlines}`}>
                            <small className={`${styles.line} ${styles.line1}`}></small>
                            <small className={`${styles.line} ${styles.line2}`}></small>
                            <small className={`${styles.line} ${styles.line3}`}></small>
                        </div>

                        <div className={`${styles.menuitems}`}>
                            <li onClick={() => handleLinkClick('dashboard')}><span className={activeLink === 'dashboard' ? 'font-weight-bold ' : ''} style={{ cursor: "pointer" }}>Dashboard</span></li>
                            <li onClick={() => handleLinkClick('investnow')}><span className={activeLink === 'investnow' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Invest Now</span></li>
                            <li onClick={() => handleLinkClick('profile')}><span className={activeLink === 'profile' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Profile</span></li>
                            <li onClick={() => handleLinkClick('refferallink')}><span className={activeLink === 'refferallink' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }}>Generate Refferal Link</span></li>
                            <li onClick={() => handleLinkClick('help')}><span className={activeLink === 'help' ? 'font-weight-bold  ' : ' '} style={{ cursor: "pointer" }} >Help</span></li>
                            <li className={`${styles.logout_text}`} onClick={handleLogout}><span >Logout</span></li>

                        </div>
                    </div>
                    {/* </div> */}
                    {/* </nav> */}
                </div >

            ) : (<></>)}



        </>

        // </div>
    );
}

export default DistributorSideBar;
