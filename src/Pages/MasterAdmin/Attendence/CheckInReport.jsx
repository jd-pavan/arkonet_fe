
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import style from './Attendence.module.css';
import { url_ } from "../../../Config";

const CheckInReport = () => {

  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');

  const LogCategory = useLocation().state.LogCategory;
  const CheckInDate = useLocation().state.ReportDate;
  const [checkInData, setCheckInData] = useState([])
  console.log(LogCategory);
  function GoBack() {
    window.history.back(); // This will navigate to the previous page in the browser's history
  }
  const GetCheckInList = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`${url_}/working-time-SubUser-CheckOutList-DateBetween?startDate=${CheckInDate}&endDate=${CheckInDate}&category=User&userid=`, requestOptions)
      const result = await response.json();
      console.log(result)
      setCheckInData(result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    GetCheckInList();
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
          <span className='text-info' style={{ border: "1px dashed black", padding: "10px", borderRadius: "10px" }}>{CheckInDate}</span>
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

            {checkInData.map((item, index) => (
              <tr>
                <th scope="row">{item.daydate}</th>
                <td>{item.name}</td>
                <td className='text-success'>
                  Checked In
                </td>
                <td>

                  <i class="bi bi-door-open-fill text-success"></i>
                  <span>{item.startTime}</span>

                </td>
              </tr>
            ))}






          </tbody>
        </table>

      </div>
    </div>
  );
}


export default CheckInReport;


