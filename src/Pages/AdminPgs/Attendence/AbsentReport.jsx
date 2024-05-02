

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import style from './Attendence.module.css';
import { url_ } from "../../../Config";
import { useEffect } from "react";


const AbsentReport = () => {
  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');

  // const [checkInData, setCheckInData] = useState([])
  const [absentData, setAbsentData] = useState([])
  const LogCategory = useLocation().state.LogCategory;
  const AbsentDate = useLocation().state.ReportDate;
  // console.log(LogCategory);

  const GetCheckInList = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`${url_}/working-time-SubUser-CheckOutList-DateBetween?startDate=${AbsentDate}&endDate=${AbsentDate}&category=Sub User&userid=${user_id}`, requestOptions)
      const result = await response.json();
      console.log(result)
      // setCheckInData(result)
      GetData(result);
    } catch (error) {
      console.log(error)
    }
  }
  function GoBack() {
    window.history.back(); // This will navigate to the previous page in the browser's history
  }

  const GetData = async (checkInData) => {
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


      const resultArray = SubUserResult.filter(itemA => !checkInData.some(itemB => itemB.name === itemA.name || itemA.name === null));



      setAbsentData(resultArray)


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    GetCheckInList();
    GetData();
  }, []);
  return (
    <div>
      <div className='mt-5'>
        <h2 className={` mt-5 d-flex align-items-center justify-content-around ${style.h1}`}>
          <div style={{ fontSize: "xxx-large", cursor: "pointer" }} onClick={GoBack}>
            &#8617;&nbsp;
          </div>
          <h3>{LogCategory} Report</h3>
          <div></div>
        </h2>
        <h5 className="mt-4">
          Showing Results For
          {/* <span className='text-info ml-4' style={{ border: "1px dashed black", padding: "10px", borderRadius: "10px" }}>13-Mar-2024</span>&nbsp; */}
          <i class="bi bi-caret-right-fill"></i>
          <i class="bi bi-caret-right-fill"></i>
          <i class="bi bi-caret-right-fill"></i>&nbsp;
          <span className='text-info' style={{ border: "1px dashed black", padding: "10px", borderRadius: "10px" }}>{AbsentDate}</span>
        </h5>
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
              <th scope="col">Status</th>
              <th scope="col">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {absentData.map((item, index) => (
              <tr>
                <th scope="row">{AbsentDate}</th>
                <td>{item.name}</td>
                <td className='text-danger'>
                  Absent
                </td>
                <td>

                  <i class="bi bi-journal-x text-danger"></i>


                </td>
              </tr>

            ))}





          </tbody>
        </table>

      </div>
    </div>
  );
}


export default AbsentReport;


