import React, { useState } from 'react';
import style from './Attendence.module.css';
import { useNavigate } from "react-router-dom";
import { url_ } from '../../../Config';

const AttendenceReport = () => {
  const Navigate = useNavigate();
  const user_id = window.localStorage.getItem("user_id");
  const storedToken = window.localStorage.getItem("jwtToken");

  const [logReports, setLogReports] = useState([]);
  const todatyDate = () => {
    const now = new Date();

    // Get the current date
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todaydate = `${year}-${month}-${day}`;
    return todaydate;
  }
  console.log(todatyDate())
  const handleDateChange = (e) => {
    setSelectedDate({
      ...selectedDate,
      [e.target.name]: e.target.value
    });
  };
  const [UserCount, setUserCount] = useState(0)
  const [selectedDate, setSelectedDate] = useState({
    StartDate: '',
    EndDate: ''
  });

  const CAandSubUserDateBetweenLogData = async () => {
    // console.log('Selected Start Date:', selectedDate.StartDate);
    // console.log('Selected End Date:', selectedDate.EndDate);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      // const Response = await fetch(`${url_}/working-time-getTotalListSubAndCA-DateBetween?startDate=${selectedDate.StartDate}&endDate=${selectedDate.EndDate}&category=Sub User&userid=${user_id}`, requestOptions)
      const Response = await fetch(`${url_}/working-time-getTotalListCA-DateBetween?startDate=${selectedDate.StartDate}&endDate=${selectedDate.EndDate}&category=User&userid=`, requestOptions)
      const result = await Response.json();
      console.log(result)
      setLogReports(result)
      SubUserData();
    } catch (error) {
      console.log(error)
    }


  }

  const SubUserData = async () => {
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
      setUserCount(SubUserResult.length)
      // console.log(tottalAbsentCount)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  function GoBack() {
    window.history.back(); // This will navigate to the previous page in the browser's history
  }

  const GotoReport = (gotoname, ReportDate) => {

    switch (gotoname) {
      case "CheckInReport":
        Navigate("CheckInReport", {
          state: {
            ReportDate: ReportDate,
            LogCategory: "Check In"

          }
        })
        break;
      case "CheckOutReport":
        Navigate("CheckOutReport", {
          state: {
            ReportDate: ReportDate,
            LogCategory: "Check Out"
          }
        })
        break;
      case "AbsentReport":
        Navigate("AbsentReport", {
          state: {
            ReportDate: ReportDate,
            LogCategory: "Absent"
          }
        })
        break;

      default:
        break;
    }



  }
  const AbsentCountData = (data) => {

    const uniquePANs = {};
    const filteredData = [];

    data.forEach(item => {
      if (!uniquePANs[item.pan]) {
        filteredData.push(item);
        uniquePANs[item.pan] = true;
      }
    });
    console.log(filteredData.length);
    return filteredData.length;
    // console.log(filteredData);

  }
  return (
    <div style={{ width: "98%" }}>
      <div className='mt-5'>
        <h2 className={` mt-5 d-flex align-items-center justify-content-around ${style.h1}`}>
          <div style={{ fontSize: "xxx-large", cursor: "pointer" }} onClick={GoBack}>
            &#8617;&nbsp;
          </div>

          <h3>Reports</h3>
          <div></div>
        </h2>
      </div>
      <hr
        style={{
          backgroundColor: "#d9d3d3",
          height: "1px",
          borderRadius: "5px",
        }}
      />



      <div className='d-flex justify-content-around'>
        <span>
          From&nbsp;:&nbsp;
          <input type="date" name="StartDate" max={todatyDate()} onChange={handleDateChange} value={selectedDate.StartDate} />

        </span>
        <span>
          To&nbsp;:&nbsp;
          <input type="date" name="EndDate" min={selectedDate.StartDate} max={todatyDate()} onChange={handleDateChange} value={selectedDate.EndDate} />

        </span>
        <span onClick={CAandSubUserDateBetweenLogData} className={`${style.Family_Group_btn} ${style.GetDataAttendence}`} >
          GET DATA
        </span>
      </div>
      {selectedDate.EndDate > selectedDate.StartDate || selectedDate.EndDate === selectedDate.StartDate ? <></> :
        <h5 style={{ padding: "15px 10px", color: "red", textAlign: "center" }}>* Note : To date should be greater than From date.</h5>
      }
      <hr
        style={{
          backgroundColor: "#d9d3d3",
          height: "1px",
          borderRadius: "5px",
        }}
      />
      <div className={`${style.logdataTbl} mt - 4`}>

        <table class="table text-center">
          <thead>
            <tr>
              <th scope="col">
                Date
                {/* <span className={style.sortIcons}>
                  <span className={style.sortIcon}><i class="bi bi-arrow-up"></i></span>
                  <span className={style.sortIcon}><i class="bi bi-arrow-down"></i></span>
                </span> */}
              </th>
              <th scope="col">
                <i class="bi bi-door-open-fill text-success"></i>&nbsp;
                Total Checked In
              </th>
              <th scope="col">
                <i class="bi bi-door-closed-fill text-danger"></i>&nbsp;
                Total Checked Out
              </th>
              <th scope="col">
                <i class="bi bi-journal-x text-danger"></i>&nbsp;
                Total  Absent
              </th>
            </tr>
          </thead>
          <tbody>
            {logReports.map((item, index) => (
              <tr>
                <th scope="row">{item.Date}</th>
                <td className={style.GenerateReportTblData} onClick={() => GotoReport("CheckInReport", item.Date)}><h5>{item.TotalCheckIn}</h5></td>
                <td className={style.GenerateReportTblData} onClick={() => GotoReport("CheckOutReport", item.Date)}><h5>{item.TotalCheckOut}</h5></td>
                <td className={style.GenerateReportTblData} onClick={() => GotoReport("AbsentReport", item.Date)}><h5>{UserCount - AbsentCountData(item.AbsentRecords)}</h5></td>
              </tr>

            ))}





          </tbody>
        </table>

      </div>
    </div>
  );
}

export default AttendenceReport;
