import React, { useEffect, useState } from "react";
import style from "./Attendence.module.css";
import { url_ } from "../../../Config";
import { useNavigate } from "react-router-dom";

const Attendence = () => {

  const Navigate = useNavigate();
  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');



  const [todaysCheckInDataCounts, setTodaysCheckInDataCounts] = useState(0)
  const [todaysCheckOutDataCounts, seTtodaysCheckOutDataCounts] = useState(0)
  const [todaysAbsentDataCounts, setTodaysAbsentDataCounts] = useState(0)
  const [subUserCount, setsubUserCount] = useState(0)


  const todatyDate = () => {
    const now = new Date();

    // Get the current date
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todaydate = `${year}-${month}-${day}`;
    return todaydate;
  }


  const todayLogData = async () => {
    const datetoday = todatyDate();

    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };



      const responsecheckin = await fetch(`${url_}/GetCheckInListSubUsers/${user_id}/${datetoday}`, requestOptions);
      const resultcheckin = await responsecheckin.json();
      // console.log(resultcheckin);
      setTodaysCheckInDataCounts(resultcheckin.length)

      const responsecheckout = await fetch(`${url_}/GetCheckOutListSubUsers/${user_id}/${datetoday}`, requestOptions);
      const resultcheckout = await responsecheckout.json();
      // console.log(resultcheckout);
      seTtodaysCheckOutDataCounts(resultcheckout.length)

      const responseAbsent = await fetch(`${url_}/GetAbsentListSubUsers/${user_id}/${datetoday}`, requestOptions);
      const resultAbsent = await responseAbsent.json();
      console.log(resultAbsent);


      setTodaysAbsentDataCounts(CountLength(resultAbsent))



    } catch (error) {
      console.log(error)
    }
    // console.log(result2)
    // setCASubDataTY(result2)

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
      // console.log(SubUserResult.length);
      setsubUserCount(CountLength(SubUserResult))


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    todayLogData();
    GetData();
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

      <div className={style.Log_Cards_div_A}>
        <h3>Present : <span>{todaysCheckInDataCounts - todaysCheckOutDataCounts}</span> out of <span>{subUserCount}</span></h3>
      </div>
      <div className={style.Log_Cards_div_B}>
        <div className={style.Log_cards} onClick={() => GotoLogDetails("checkedIn")}>
          <div className={`${style.Log_cards_iconName} `}><i class="bi bi-door-open-fill text-success"></i><span> Checked In</span></div>
          <div className={`${style.Log_cards_counts} text-success`}><h4>{todaysCheckInDataCounts}</h4></div>
        </div>
        <div className={style.Log_cards} onClick={() => GotoLogDetails("checkedOut")}>
          <div className={`${style.Log_cards_iconName} `}><i class="bi bi-door-closed-fill text-danger"></i><span> Checked Out</span></div>
          <div className={`${style.Log_cards_counts} text-danger`}><h4>{todaysCheckOutDataCounts}</h4></div>
        </div>
        <div className={style.Log_cards} onClick={() => GotoLogDetails("Absent")}>
          <div className={`${style.Log_cards_iconName} `}><i class="bi bi-journal-x text-danger"></i><span>  Absent</span></div>
          <div className={`${style.Log_cards_counts} text-danger`}><h4>{todaysAbsentDataCounts}</h4></div>
        </div>

      </div>

    </div >
  );
};

export default Attendence;
