import style from './SearchAdmin.module.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { url_ } from '../../../Config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SearchAdmin = () => {
    const Navigate = useNavigate()
    const userProf = useLocation().state.userProfession;
    const storedToken = window.localStorage.getItem('jwtToken');
    const currentDate = new Date();
    // console.log(userProf)
    useEffect(() => {
        GetUserDATA();
    }, []);

    const [searchQuery, setSearchQuery] = useState("");
    const [userdata, setuserdata] = useState([]);
    const [userSubStatus, setUserSubStatus] = useState(false);


    const GetUserDATA = async () => {


        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'

        };
        await fetch(`
        
        
        
        
        ${userProf === "Chartered Accountant" ||
                userProf === "Tax Consultant" ||
                userProf === "Tax Return Preparer(TRP)" ||
                userProf === "Accountant" ||
                userProf === "Certified Consultant" ||
                userProf === "Advocate" ||
                userProf === "Other" ? `${url_}/by-profession/${userProf}` :
                `${url_}/by-profession/all`
            }

    `, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                // console.log(result[0].count)
                // console.log(result[0].registration)
                setuserdata(result)


            })
            .catch((error) => {
                console.log(error);
            })

    }
    function GoBack() {
        window.history.back(); // This will navigate to the previous page in the browser's history
    }
    const GOTOClients = (userpan, userid, usertitle) => {
        Navigate('refUser', {
            state: {
                UserPan: userpan,
                UserID: userid,
                user_title: usertitle
            },
        });

    }
    const GOTOUserdata = (userid) => {
        Navigate('Userdata', {
            state: {
                UserId: userid,

            },
        });

    }

    const isSubscriptionPackActive = (endingDate) => {
        const currentDate = new Date(); // Get current date
        const subEndDateObject = new Date(endingDate);

        const CurrentDATENEWFORMATE = currentDate.toISOString().replace('Z', '+00:00');
        const EndingDATENEWFORMATE = subEndDateObject.toISOString().replace('Z', '+00:00');

        // console.log("Ending Date", endingDate);
        // console.log("Current Date", CurrentDATENEWFORMATE);
        // console.log("Ending Date", EndingDATENEWFORMATE);

        return currentDate < subEndDateObject; // Check if current date is before ending date
    }

    // const a = isSubscriptionPackActive("2024-12-07T05:44:35.010+00:00");
    // console.log(a); // This will log true or false based on the subscription pack's validity

    return (


        <div className="d-flex w-100">


            <div className={`${style.workport} `}>

                {/* Top Port Starts */}
                <h2 className=' mt-2 d-flex justify-content-around align-items-center w-100'>
                    <div style={{ fontSize: "xxx-large", cursor: "pointer" }} onClick={GoBack}>
                        &#8617;&nbsp;
                    </div>
                    <b>{userProf}</b>
                    <div>
                    </div>
                </h2>
                <div className={`${style.top} `}>
                    <div className={`${style.inputbox} `}>
                        <div className={`${style.seachbox} `}>
                            <input type="search" className={`${style.inputbox} `} placeholder='Search C.A By PAN/Name'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <div className={`${style.seachlogo} `}>
                            <h4><i className="fa-solid fa-magnifying-glass"></i></h4>
                        </div>
                    </div>
                </div>
                {/* Top Port Ends */}

                {/* Bottom Port Starts */}
                <div className={`${style.bottom} `}>

                    <div className={`${style.drow} `}>
                        <div className={`${style.name} `} ><p className={`${style.gdtxt1} `}>Sr. No</p></div>
                        <div className={`${style.name} `} ><p className={`${style.gdtxt2} `}>C.A Name</p></div>
                        <div className={`${style.name} `} ><p className={`${style.gdtxt3} `}>PAN</p></div>
                        <div className={`${style.name} `} ><p className={`${style.gdtxt4} `}>Mobile</p></div>
                        <div className={`${style.name} `} ><p className={`${style.gdtxt5} `}>Reference</p></div>
                        <div className={`${style.name} `} ><p className={`${style.gdtxt5} ml-4 `}>Sub Users</p></div>
                        <div className={`${style.name} `} ><p className={`${style.gdtxt6} `}>Status</p></div>
                    </div>


                    {




                        userdata.filter(item =>
                            item.registration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.registration.pan.toLowerCase().includes(searchQuery.toLowerCase())

                        )


                            .map((item, index) => (



                                <div className={`${style.ddata} `}>
                                    <div className={`${style.name} `} ><p className={`${style.srno} `}>{index + 1}</p></div>
                                    <div className={`${style.name} `} ><p className={`${style.an} `}>{item.registration.name}</p></div>
                                    <div className={`${style.name} `} onClick={() => GOTOUserdata(item.registration.regId)} style={{ cursor: "pointer" }}><p className={`${style.pan} text-primary`}>{item.registration.pan}</p></div>
                                    <div className={`${style.name} `} ><p className={`${style.mobile} `}>{item.registration.mobile}</p></div>

                                    <div className={`${style.name} ml-4 `} onClick={() => GOTOClients(item.registration.pan, item.registration.regId, "Users")}><p className={`${style.reference} text-primary`} style={{ cursor: "pointer" }}>{item.count}</p></div>
                                    <div className={`${style.name} `} onClick={() => GOTOClients(item.registration.pan, item.registration.regId, "Sub Users")}><p className={`${style.reference} text-primary`} style={{ cursor: "pointer" }}>{item.countSubuser}</p></div>


                                    <div className={`${style.name} `} >
                                        <p className={`${style.status} `}>

                                            {item.forceStopStatus === true ? <i className="bi bi-exclamation-octagon-fill" style={{ color: "#ff0000" }}></i> :
                                                item.subscriptiontype === "Trial" ? <span style={{ fontSize: "15px", color: isSubscriptionPackActive(item.subendtdate) ? "#ff0000" : "#32e132" }}><b>Trial</b></span> :
                                                    item.substartdatebyuser === null ? <i className="fa-solid fa-circle" style={{ color: "#d2cccc" }} ></i> :
                                                        isSubscriptionPackActive(item.subendtdate) ?
                                                            <i className="fa-solid fa-circle" style={{ color: "#32e132" }} ></i> :
                                                            <i className="fa-solid fa-circle" style={{ color: "#ff0000" }} ></i>
                                                // <i className="fa-solid fa-circle" style={{ color: "#32e132" }} ></i>


                                                //             isSubscriptionPackActive(item.subendtdate) ? {color: "#ff0000" } : {color: "#32e132" }}></i>:
                                                // <i className="fa-solid fa-circle" style={item.substartdatebyuser === null ? { color: "#d2cccc" } : isSubscriptionPackActive(item.subendtdate) ? { color: "#ff0000" } : { color: "#32e132" }}></i>



                                            }




                                        </p>
                                    </div>
                                </div>

                            ))




                    }





                </div>
                {/* Bottom Port Ends */}


            </div >

        </div >


    );
}

export default SearchAdmin;