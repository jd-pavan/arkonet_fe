
import style from "./MonthFolders.module.css";
import fd from "../../../Images/fourdots.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
function MonthFolders() {
  const client_Information = useLocation().state.client_Information;

  const client_id = localStorage.getItem("client_id");

  console.log(client_Information)

  const [monthFolder, setMonthFolders] = useState([
    "March",
    "February",
    "January",
    "December",
    "November",
    "October",
    "September",
    "August",
    "June",
    "July",
    "May",
    "April",
  ]);
  const monthFolders = monthFolder.reverse()
  const gstCategory = useLocation().state.gstCategory;
  const year = useLocation().state.year;
  console.log(year)
  const currentYear = new Date().getFullYear();


  function goto(e, month) {

    e.preventDefault();

    if (!client_Information.gstin || !client_Information.gstinname) {
      Swal.fire({
        title: '',
        text: "Please Update GSTIN and GSTIN name for GSTR filing!!",
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          Navigate(`/admin/dashboard/gstclients/Cupdate/${client_Information.clientId}`, { state: { sentTotitle: "dashboard" } })
        }
      })

      // Swal.fire("", "Please Update GSTIN for GSTR filing!!", "error")
    } else {
      Navigate(gstCategory === "GSTR-1" ? "gstfile" :
        gstCategory === "GSTR-3B" ? "gstr3b" :
          gstCategory === "GSTR-2A" && "gst2a",
        {
          state: {
            fy: year,
            year: (month === "January" || month === "February" || month === "March") ?
              year.split("-")[0].slice(0, 2) + year.split("-")[1] :
              year.split("-")[0],
            month: month,
            gstCategory: gstCategory,
            client_Information: client_Information
          }
        });
    }

  }


  const Navigate = useNavigate()
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
              <i className="fa-solid fa-angle-left" style={{ fontSize: "1.5rem", color: "grey" }} ></i> &nbsp;{gstCategory}</Link>
            <h6 style={{ color: "#596fa4", marginLeft: "2rem" }}>FY {year}</h6>

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
              {/* <h5 ><i className="fa-solid fa-plus" style={{ fontWeight: "bold" }}></i></h5> */}
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
          {
            monthFolders.map((item, index) => {
              return (
                <div className={`col-6 ${style.crd}`}
                  onClick={(e) => { goto(e, item) }}>
                  <div className={`${style.uniclass} ${style[`card${index + 1}`]}`}>
                    <div className={`${style.icons} `}>
                      <div className={`${style.lefticons} `}>
                        <h1><i className="fa-solid fa-folder" id="iconleft" ></i></h1>
                      </div>
                      <div className={`${style.righticons} `}>
                        <h4><i className="fa-solid fa-ellipsis-vertical" id="iconrigth"  ></i></h4>
                      </div>
                    </div>
                    <div className={`${style.textual} `}>
                      <div className={`${style.uptext} `}>
                        <h5>{item}</h5>
                        <p style={{ fontSize: "x-small" }}>{(item === "January" || item === "February" || item === "March") ? year.split("-")[0].slice(0, 2) + year.split("-")[1] : year.split("-")[0]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
        {/* Cards Ends ....................................................................................................... */}


      </div>
    </div>

  );
}

export default MonthFolders;
