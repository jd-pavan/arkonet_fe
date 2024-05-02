import React, { useEffect, useState } from "react";
import style from "./Attendence.module.css";
import { url_ } from "../../../Config";
import { useNavigate } from "react-router-dom";

const Attendence = () => {

  const Navigate = useNavigate();
  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');


  const [UserCount, setUserCount] = useState(0)
  const [todaysCheckInDataUserCounts, setTodaysCheckInDataUserCounts] = useState(0)
  const [todaysCheckOutDataUserCounts, setTodaysCheckOutDataUserCounts] = useState(0)
  const [todaysAbsentDataUserCounts, setTodaysAbsentDataUserCounts] = useState(0)


  const [subUserCount, setsubUserCount] = useState(0)
  const [todaysCheckInDataSubUserCounts, setTodaysCheckInDataSubUserCounts] = useState(0)
  const [todaysCheckOutDataSubUserCounts, setTodaysCheckOutDataSubUserCounts] = useState(0)
  const [todaysAbsentDataSubUserCounts, setTodaysAbsentDataSubUserCounts] = useState(0)


  const todatyDate = () => {
    const now = new Date();

    // Get the current date
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todaydate = `${year}-${month}-${day}`;
    return todaydate;
  }

  const CountLength = (a) => {
    let countNotNullNames = 0;

    for (let i = 0; i < a.length; i++) {
      if (a[i].name !== null) {
        countNotNullNames++;
      }
    }
    return countNotNullNames;
  }

  const TodayLogUserData = async () => {
    const datetoday = todatyDate();

    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };



      const responsecheckin = await fetch(`${url_}/GetCheckInListCA/${datetoday}`, requestOptions);
      const resultcheckin = await responsecheckin.json();
      // console.log(resultcheckin);
      setTodaysCheckInDataUserCounts(resultcheckin.length)


      const responseAbsent = await fetch(`${url_}/GetAbsentListCA/${datetoday}`, requestOptions);
      const resultAbsent = await responseAbsent.json();
      // console.log(resultAbsent);
      setTodaysAbsentDataUserCounts(resultAbsent.length)

      const responsecheckout = await fetch(`${url_}/GetCheckOutListCA/${datetoday}`, requestOptions);
      const resultcheckout = await responsecheckout.json();
      // console.log(resultcheckout);
      setTodaysCheckOutDataUserCounts(resultcheckout.length)





    } catch (error) {
      console.log(error)
    }
    // console.log(result2)
    // setCASubDataTY(result2)

  }
  const TodayLogSubUserData = async () => {
    const datetoday = todatyDate();

    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };



      const responsecheckin = await fetch(`${url_}/GetCheckInListSubUsersWithoutUserid/${datetoday}`, requestOptions);
      const resultcheckin = await responsecheckin.json();
      // console.log(resultcheckin);
      setTodaysCheckInDataSubUserCounts(resultcheckin.length)


      const responseAbsent = await fetch(`${url_}/GetAbsentListSubUsersWithoutUserid/${datetoday}`, requestOptions);
      const resultAbsent = await responseAbsent.json();
      // console.log(resultAbsent);
      const filteredArray = resultAbsent.filter(item => item.name !== null);
      setTodaysAbsentDataSubUserCounts(filteredArray.length)

      const responsecheckout = await fetch(`${url_}/GetCheckOutListSubUsersWithoutUserid/${datetoday}`, requestOptions);
      const resultcheckout = await responsecheckout.json();

      // console.log(resultcheckout);
      setTodaysCheckOutDataSubUserCounts(resultcheckout.length)





    } catch (error) {
      console.log(error)
    }
    // console.log(result2)
    // setCASubDataTY(result2)

  }

  const GetUserData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const UserResponse = await fetch(`${url_}/by-profession/all`, requestOptions);
      const UserResult = await UserResponse.json();
      // console.log(SubUserResult.length);
      setUserCount(CountLength(UserResult))


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const GetSubUserData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const SubUserResponse = await fetch(`${url_}/by-profession/all`, requestOptions);
      const SubUserResult = await SubUserResponse.json();
      // console.log(SubUserResult.length);
      setsubUserCount(CountLength(SubUserResult))


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    TodayLogUserData();
    GetUserData();
    TodayLogSubUserData();
    GetSubUserData();
  }, []);



  const GotoLogDetails = (LogedCategory, StartDate, EndDate) => {
    // console.log(LogedCategory)

    Navigate("logdata", {
      state: {
        LogCategory: LogedCategory,
        StartDate: StartDate,
        EndDate: EndDate
      }
    })
  }
  const GOTOGenerateReport = () => {


    Navigate("logreport");
  }
  return (
    <div style={{ width: "98%" }}>
      <div>
        <div className="d-flex flex-column align-items-center mt-4 mb-3">
          <h2 className="d-flex justify-content-center">
            <b>Check In / Check Out</b>
          </h2>
        </div>
      </div>
      <hr
        style={{
          backgroundColor: "#d9d3d3",
          height: "1px",
          borderRadius: "5px",
        }}
      />

      <div className="d-flex justify-content-center w-80">
        <button className={`${style.Family_Group_btn} d-flex justify-content-center`}>
          <b onClick={GOTOGenerateReport}>Generate Report</b>
        </button>
      </div>
      <hr
        style={{
          backgroundColor: "#d9d3d3",
          height: "1px",
          borderRadius: "5px",
        }}
      />

      <>
        <div className={style.Log_Cards_div_A}>
          <h3>Present : <span>{todaysCheckInDataUserCounts - todaysCheckOutDataUserCounts}</span> out of <span>{UserCount} CA's</span></h3>
        </div>
        <div className={style.Log_Cards_div_B}>
          <div className={style.Log_cards} onClick={() => GotoLogDetails("UserCheckedIn")}>
            <div className={`${style.Log_cards_iconName} `}><i class="bi bi-door-open-fill text-success"></i><span> Checked In</span></div>
            <div className={`${style.Log_cards_counts} text-success`}><h4>{todaysCheckInDataUserCounts}</h4></div>
          </div>
          <div className={style.Log_cards} onClick={() => GotoLogDetails("UserCheckedOut")}>
            <div className={`${style.Log_cards_iconName} `}><i class="bi bi-door-closed-fill text-danger"></i><span> Checked Out</span></div>
            <div className={`${style.Log_cards_counts} text-danger`}><h4>{todaysCheckOutDataUserCounts}</h4></div>
          </div>
          <div className={style.Log_cards} onClick={() => GotoLogDetails("UserAbsent")}>
            <div className={`${style.Log_cards_iconName} `}><i class="bi bi-journal-x text-danger"></i><span>  Absent</span></div>
            <div className={`${style.Log_cards_counts} text-danger`}><h4>{todaysAbsentDataUserCounts}</h4></div>
          </div>

        </div>
      </>


      <>
        <div className={style.Log_Cards_div_A}>
          <h3>Present : <span>{todaysCheckInDataSubUserCounts - todaysCheckOutDataSubUserCounts}</span> out of <span>{todaysCheckInDataSubUserCounts + todaysAbsentDataSubUserCounts} Sub User's</span></h3>
        </div>
        <div className={style.Log_Cards_div_B}>
          <div className={style.Log_cards} onClick={() => GotoLogDetails("SubUsercheckedIn")}>
            <div className={`${style.Log_cards_iconName} `}><i class="bi bi-door-open-fill text-success"></i><span> Checked In</span></div>
            <div className={`${style.Log_cards_counts} text-success`}><h4>{todaysCheckInDataSubUserCounts}</h4></div>
          </div>
          <div className={style.Log_cards} onClick={() => GotoLogDetails("SubUsercheckedOut")}>
            <div className={`${style.Log_cards_iconName} `}><i class="bi bi-door-closed-fill text-danger"></i><span> Checked Out</span></div>
            <div className={`${style.Log_cards_counts} text-danger`}><h4>{todaysCheckOutDataSubUserCounts}</h4></div>
          </div>
          <div className={style.Log_cards} onClick={() => GotoLogDetails("SubUserAbsent")}>
            <div className={`${style.Log_cards_iconName} `}><i class="bi bi-journal-x text-danger"></i><span>  Absent</span></div>
            <div className={`${style.Log_cards_counts} text-danger`}><h4>{todaysAbsentDataSubUserCounts}</h4></div>
          </div>

        </div>
      </>

    </div >
  );
};

export default Attendence;
