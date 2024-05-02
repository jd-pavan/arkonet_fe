
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import style from './Attendence.module.css';
import { url_ } from "../../../Config";


const CheckOutReport = () => {

  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');

  const LogCategory = useLocation().state.LogCategory;
  const CheckOutDate = useLocation().state.ReportDate;
  const [checkOutData, setCheckOutData] = useState([])
  console.log(LogCategory);
  function GoBack() {
    window.history.back(); // This will navigate to the previous page in the browser's history
  }
  const GetCheckOutList = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`${url_}/working-time-SubUser-CheckOutList-DateBetween?startDate=${CheckOutDate}&endDate=${CheckOutDate}&category=User&userid=`, requestOptions)
      const result = await response.json();
      console.log(result)
      setCheckOutData(result)
    } catch (error) {
      console.log(error)
    }
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
    GetCheckOutList();
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
          <span className='text-info' style={{ border: "1px dashed black", padding: "10px", borderRadius: "10px" }}>{CheckOutDate}</span>
        </h5>
      </div>
      <div className={`${style.logdataTbl} mt - 4`}>

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
              <th scope="col">Total Working</th>

            </tr>
          </thead>
          <tbody>
            {checkOutData.map((item, index) => (
              <tr>
                <th scope="row">{item.daydate}</th>
                <td>{item.name}</td>
                <td className='text-danger'>
                  Checked Out
                </td>
                <td>

                  <i class="bi bi-door-closed-fill text-danger"></i>
                  <span>{item.endTime}</span>

                </td>
                <td>{getCurrentDateTime(item.endTime, item.startTime)}</td>
              </tr>
            ))}





          </tbody>
        </table>

      </div>
    </div>
  );
}


export default CheckOutReport;


