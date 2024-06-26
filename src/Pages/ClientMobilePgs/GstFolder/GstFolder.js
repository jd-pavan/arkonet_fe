
import { Link, useNavigate } from "react-router-dom";
import style from "./GstFolder.module.css";
import fd from "../../../Images/fourdots.svg"
import ClientFileBackup from "../ClientFileBackup/ClientFileBackup";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';


function GstFolder() {
  const client_Information = useLocation().state.client_information;
  const Navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  function getLastFiveYears() {
    let currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    //if Month is Jan,Feb or March 
    if (currentMonth < 3) {
      currentYear = currentYear - 1;
    }

    const lastFiveYears = [];
    //console.log(currentYear)
    for (let i = 0; i < 5; i++) { // Change 6 to 5 to get the last five years
      lastFiveYears.push(`${currentYear - i}-${(currentYear - i + 1).toString().slice(-2)}`);
    }

    return lastFiveYears;
  }

  const lastFiveYearsArray = getLastFiveYears();
  //console.log(lastFiveYearsArray)

  const getFolderColor = (index) => {
    const colors = ['#567cf2', '#f4b51c', '#f11cd0', '#22b0b2', '#567cf2', 'text-info'];
    return colors[index % colors.length];
  };



  const [isBackupFile, setBackupFile] = useState(false);

  function showBackupFile() {

    const todayDate = new Date();
    const currentDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
    const targetDate = new Date(todayDate.getFullYear(), 2, 31);//Set Date to March 31
    // console.log("Target date",targetDate)

    const dayDifference = (targetDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);

    // Check if it's 15 days or more before March 31st
    if (dayDifference < 15 && dayDifference > 0) {
      setBackupFile(true);
    }
    else {
      setBackupFile(false);
    }
  }

  useEffect(() => {
    showBackupFile();
  }, [isBackupFile])


  return (
    <div className={`row ${style.row1}`}>
      <div className={`${style.allport}`}>

        {/* Headbar Starts*/}
        <div className={`${style.headerbar}`}>
          <div className={`${style.leftear}`}>
            <Link onClick={(e) => {
              e.preventDefault();
              Navigate(-1);
            }} style={{ fontSize: "2rem", margin: "0.5rem", color: "black" }}>
              <i className="fa-solid fa-angle-left" style={{ fontSize: "1.5rem", color: "grey" }} ></i> &nbsp;GST
            </Link>
          </div>
          <div className={`${style.rightear}`}>
            <h4>
              <img src={fd} alt="fd" style={{ fontSize: "2rem", width: "2rem" }} />
            </h4>
          </div>
        </div>
        {/* Headbar Ends ....................................................................................................... */}

        {/* ABD Starts*/}
        <div className={`${style.abd}`}>
          <div className={`${style.leftbear}`}>
            {/* <p className={`${style.p3}`}>My Folders</p> */}
          </div>
          <div className={`${style.rightbear}`}>
            <div className={`${style.licon}`}>
              <h5 ><i className="fa-solid fa-plus" style={{ fontWeight: "bold" }}></i></h5>
              <h5>

              </h5>
            </div>
            <div className={`${style.micon}`}>
              <h5><i className="fa-solid fa-bars" style={{ color: "#7387ab" }}></i></h5>
            </div>
            <div className={`${style.ricon}`}>
              <h5>
                <i className="fa-solid fa-table-cells-large" style={{ color: "#7387ab" }}></i>
              </h5>
            </div>
          </div>
        </div>
        {/* ABD Ends ....................................................................................................... */}


        {/* Cards Starts*/}
        <div className={`row ${style.row2}`}>
          {lastFiveYearsArray.map((year, index) => {
            return (

              <div className='col-6 B' onClick={(e) => {
                e.preventDefault();
                Navigate("gstmonthly", {
                  state: {
                    year: year,

                    client_information: client_Information
                  },
                });

              }} key={index}>
                <div className={`${style.uniclass} ${style[`card${index + 1}`]}`}>
                  <div className={`${style.icons} `}>
                    <div className={`${style.lefticons} `}>
                      <h1><i className="fa-solid fa-folder" id="iconleft" style={{ color: `${getFolderColor(index)}` }}></i></h1>
                    </div>
                    <div className={`${style.righticons} `}>
                      <h4><i className="fa-solid fa-ellipsis-vertical" id="iconrigth" style={{ color: `${getFolderColor(index)}` }} ></i></h4>
                    </div>
                  </div>
                  <div className={`${style.textual} `}>
                    <div className={`${style.uptext} `}>
                      <h5 style={{ color: `${getFolderColor(index)}` }}>FY {year}</h5>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          {isBackupFile && <div className='col-6'>
            {/* <ClientFileBackup title={`Backup ${currentYear-5}-${(currentYear-4).toString().slice(2)} files`} category="GST"/> */}
            <ClientFileBackup title={`Backup ${currentYear - 4}-${(currentYear - 3).toString().slice(2)} files`} category="GST" />
          </div>}
        </div>

        {/* Cards Ends ....................................................................................................... */}

      </div>
    </div>

  );
}

export default GstFolder;
