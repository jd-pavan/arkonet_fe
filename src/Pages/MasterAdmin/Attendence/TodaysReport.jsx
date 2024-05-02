

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import style from './Attendence.module.css';
import { url_ } from "../../../Config";


const TodaysReport = () => {

  const LogCategory = useLocation().state.LogCategory;
  console.log(LogCategory);
  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');

  const [todaysLogDetails, settodaysLogDetails] = useState([])

  const todatyDate = () => {
    const now = new Date();

    // Get the current date
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todaydate = `${year}-${month}-${day}`;
    return todaydate;
  }

  const currentTime = () => {
    const now = new Date();

    // Get the current time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const CurrentTime = `${hours}:${minutes}:${seconds}`;
    return CurrentTime;
  }


  const todaysLogData = async () => {
    const datetoday = todatyDate();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };


      switch (LogCategory) {
        case "UserCheckedIn":
          const responseUsercheckin = await fetch(`${url_}/GetCheckInListCA/${datetoday}`, requestOptions);
          const resultUsercheckin = await responseUsercheckin.json();
          console.log(resultUsercheckin);
          settodaysLogDetails(resultUsercheckin);
          break;
        case "UserCheckedOut":
          const responseUsercheckout = await fetch(`${url_}/GetCheckOutListCA/${datetoday}`, requestOptions);
          const resultUsercheckout = await responseUsercheckout.json();
          console.log(resultUsercheckout);
          settodaysLogDetails(resultUsercheckout);
          break;
        case "UserAbsent":
          const responseUserAbsent = await fetch(`${url_}/GetAbsentListCA/${datetoday}`, requestOptions);
          const resultUserAbsent = await responseUserAbsent.json();
          console.log(resultUserAbsent);
          const filteredUsersArray = resultUserAbsent.filter(item => item.name !== null);
          settodaysLogDetails(filteredUsersArray);
          break;
        case "SubUserCheckedIn":
          const responsecheckin = await fetch(`${url_}/GetCheckInListSubUsersWithoutUserid/${datetoday}`, requestOptions);
          const resultcheckin = await responsecheckin.json();
          console.log(resultcheckin);
          settodaysLogDetails(resultcheckin);
          break;
        case "SubUserCheckedOut":
          const responsecheckout = await fetch(`${url_}/GetCheckOutListSubUsersWithoutUserid/${datetoday}`, requestOptions);
          const resultcheckout = await responsecheckout.json();
          console.log(resultcheckout);
          settodaysLogDetails(resultcheckout);
          break;
        case "SubUserAbsent":
          const responseAbsent = await fetch(`${url_}/GetAbsentListSubUsersWithoutUserid/${datetoday}`, requestOptions);
          const resultAbsent = await responseAbsent.json();
          console.log(resultAbsent);
          const filteredArray = resultAbsent.filter(item => item.name !== null);
          settodaysLogDetails(filteredArray);
          break;

        default:
          break;
      }

    } catch (error) {
      console.log(error)
    }
  }
  function GoBack() {
    window.history.back(); // This will navigate to the previous page in the browser's history
  }


  function getCurrentDateTime(time1, time2) {
    const time1Parts = time1.split(":");
    const time2Parts = time2.split(":");

    const time1InSeconds = parseInt(time1Parts[0]) * 3600 + parseInt(time1Parts[1]) * 60 + parseInt(time1Parts[2]);
    const time2InSeconds = parseInt(time2Parts[0]) * 3600 + parseInt(time2Parts[1]) * 60 + parseInt(time2Parts[2]);

    const differenceInSeconds = Math.abs(time1InSeconds - time2InSeconds);

    const hours = Math.floor(differenceInSeconds / 3600);
    const minutes = Math.floor((differenceInSeconds % 3600) / 60);
    const seconds = differenceInSeconds % 60;

    return `${hours}Hrs : ${minutes}min`;
  }




  useEffect(() => {
    todaysLogData();
  }, []);
  return (
    <div>
      <div className='mt-5'>
        <h2 className={` mt-5 d-flex align-items-center justify-content-around ${style.h1}`}>
          <div style={{ fontSize: "xxx-large", cursor: "pointer" }} onClick={GoBack}>
            &#8617;&nbsp;
          </div>

          <h3>Showinf Results For : <span className='text-info'>{todatyDate()}</span></h3>
          <div></div>
        </h2>
      </div>
      <div className={`${style.logdataTbl} mt-4`}>

        <table class="table text-center">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Employee Name
                {/* <span className={style.sortIcons}>
                  <span className={style.sortIcon}><i class="bi bi-arrow-up"></i></span>
                  <span className={style.sortIcon}><i class="bi bi-arrow-down"></i></span>
                </span> */}
              </th>
              <th scope="col">Current Status</th>
              <th scope="col">Attendance</th>


              {
                LogCategory === "UserCheckedIn" || LogCategory === "SubUserCheckedIn" ?
                  <>
                    <th scope="col">Total Working</th>
                  </>
                  :
                  LogCategory === "UserCheckedOut" || LogCategory === "SubUserCheckedOut" ?
                    <>
                      <th scope="col">Total Working</th>
                    </>
                    :
                    <>


                    </>
              }
            </tr>
          </thead>
          <tbody>
            {todaysLogDetails.map((item, index) => (





              <tr>
                <th scope="row">{todatyDate()}</th>
                <td>{item.name}</td>
                <td className={LogCategory === "UserCheckedIn" || LogCategory === "SubUserCheckedIn" ? 'text-success' : 'text-danger'}>
                  {
                    LogCategory === "UserCheckedIn" || LogCategory === "SubUserCheckedIn" ? 'Checked In' :
                      LogCategory === "UserCheckedOut" || LogCategory === "SubUserCheckedOut" ? 'checked Out' :
                        'Absent'
                  }
                </td>
                <td>
                  {
                    LogCategory === "UserCheckedIn" || LogCategory === "SubUserCheckedIn" ? <>
                      <i class="bi bi-door-open-fill text-success"></i>
                      <span>{item.checkIn}</span>
                    </>
                      :
                      LogCategory === "UserCheckedOut" || LogCategory === "SubUserCheckedOut" ? <>
                        <i class="bi bi-door-closed-fill text-danger"></i>
                        <span>{item.checkOut}</span>
                      </> :
                        <>
                          <i class="bi bi-journal-x text-danger"></i>

                        </>
                  }


                </td>
                {
                  LogCategory === "UserCheckedIn" || LogCategory === "SubUserCheckedIn" ? <>
                    <td>{item.checkOut === null ? getCurrentDateTime(currentTime(), item.checkIn) : getCurrentDateTime(item.checkOut, item.checkIn)}</td>
                  </>
                    :
                    LogCategory === "UserCheckedOut" || LogCategory === "SubUserCheckedOut" ? <>
                      <td>{getCurrentDateTime(item.checkOut, item.checkIn)}</td>
                    </> :
                      <>


                      </>
                }

              </tr>


            ))}

          </tbody>
        </table>

      </div>
    </div>
  );
}


export default TodaysReport;


