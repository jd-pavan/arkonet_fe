import React, { useState, useEffect } from 'react';
import style from './NotificationCA.module.css'
import { url_ } from '../../../Config';
import Swal from 'sweetalert2';

const NotificationsCA = () => {
  const [imgcontent, setImgContent] = useState();
  const [filename, setFilename] = useState("No file selected.");
  const [searchQuery, setSearchQuery] = useState("");
  const [formdata, setFormdata] = useState({
    details: "",
    noti_img: ``
  });

  const [emailData, setEmailData] = useState({
    To: "",
    DateTime: "",
    Message: "",
    Img: ""
  })

  const wordLimit = 300;

  function handleChange(e) {
    const { name, value } = e.target;
    const file = e.target.files && e.target.files[0]; // Check if files array is defined

    switch (name) {
      case "details":
        const inputText = e.target.value;
        // Split the text into words and filter out empty strings
        const words = inputText.split(' ').filter(word => word.length > 0);

        if (words.length <= wordLimit) {
          setFormdata({ ...formdata, [name]: value });
        }
        break;

      case "noti_img":
        if (file) {
          setFormdata({ ...formdata, [name]: file });
        } else {
          setFormdata({ ...formdata, [name]: value });
        }
        setFilename(file.name)
        break;
      default:
    }
  }



  const [tcdata, setTcdata] = useState([]);
  const [clientCategory, setclientCategory] = useState("");
  const storedToken = window.localStorage.getItem('jwtToken');
  const user_id = window.localStorage.getItem('user_id');
  const user_name = window.localStorage.getItem('user_name');

  const handleClients = async (data) => {
    try {

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      if (data === "Income_Tax") {

        const response1 = await fetch(`${url_}/getClientByIncomeTax/${user_id}`, requestOptions);
        const result1 = await response1.json();
        // console.log(result)
        setTcdata(result1)
        setclientCategory(data)
      } else if (data === "GST") {
        const response2 = await fetch(`${url_}/getClientByGst/${user_id}`, requestOptions);
        const result2 = await response2.json();
        // console.log(result)
        setTcdata(result2)
        setclientCategory(data)
      } else {
        const response3 = await fetch(`${url_}/getClientByUserid/${user_id}`, requestOptions);
        const result3 = await response3.json();
        // console.log(result3)
        setTcdata(result3)
        setclientCategory(data)
      }


      // if (Sub_category !== "Sub User") {
      // setTcdata(data);
      // } else {
      //   const filteredResult = data.filter(item => item.subUserId == sub_userid);
      //   setTcdata(filteredResult);

      // }

    } catch (error) {
      console.warn("Error on function calling...");
    }
  }
  // const [clientName, setClientName] = useState("");
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectAllIncome_Tax, setSelectAllIncomeTax] = useState(false);
  const [selectAllGST, setSelectAllGST] = useState(false);
  const [notiCategory, setNotiCategory] = useState("");
  const [notiClientName, setNotiClientName] = useState("");

  const handleCheckboxChange = (checkboxName) => {
    // Toggle checkbox state
    const isChecked = checkedCheckboxes.includes(checkboxName);
    const updatedCheckboxes = isChecked
      ? checkedCheckboxes.filter((name) => name !== checkboxName)
      : [...checkedCheckboxes, checkboxName];
    setCheckedCheckboxes(updatedCheckboxes);
  };



  const handleSelectAll = () => {
    if (selectAll) {
      // If all are selected, unselect all
      setCheckedCheckboxes([]);
      setSelectAll(false);
      setSelectAllIncomeTax(false);
      setSelectAllGST(false);
    } else {
      // Otherwise, select all checkboxes
      const allClientIds = tcdata.map(item => item.clientId);
      setCheckedCheckboxes(allClientIds);
      setSelectAll(true);
      setSelectAllIncomeTax(true);
      setSelectAllGST(true);
    }
  };

  const handleSelectAllIncomeTax = () => {



    if (selectAllIncome_Tax) {
      // If all are selected, unselect all
      setCheckedCheckboxes([]);
      setSelectAll(false);
      setSelectAllIncomeTax(false);
      setSelectAllGST(false);
    } else {
      // Otherwise, select all checkboxes
      const allClientIds = tcdata.map(item => item.clientId);
      setCheckedCheckboxes(allClientIds);
      setSelectAll(false);
      setSelectAllIncomeTax(true);
      setSelectAllGST(false);
    }
  };

  const handleSelectAllGST = () => {
    if (selectAllGST) {
      // If all are selected, unselect all
      setCheckedCheckboxes([]);
      setSelectAll(false);
      setSelectAllIncomeTax(false);
      setSelectAllGST(false);
    } else {
      // Otherwise, select all checkboxes
      const allClientIds = tcdata.map(item => item.clientId);
      setCheckedCheckboxes(allClientIds);
      setSelectAll(false);
      setSelectAllIncomeTax(false);
      setSelectAllGST(true);
    }
  };




  const [singlesNoti, setSinglesNoti] = useState([]);
  const [multiplesNoti, setMultiplesNoti] = useState([]);
  const [multiNoti, setMultiNoti] = useState([]);

  const [singleClientNoti, setSingleClientNoti] = useState([]);
  const [multipleClientNoti, setMultipleClientNoti] = useState([]);
  const [allIncomeTaxClientNoti, setAllIncomeTaxClientNoti] = useState([]);
  const [allGSTClientNoti, setAllGSTClientNoti] = useState([]);
  const [allClientNoti, setAllClientNoti] = useState([]);





  const GroupedArrayFunction = (data) => {
    const groupedData = {};

    data.forEach(notification => {
      const notificationTo = notification.notificationTo;
      if (!groupedData.hasOwnProperty(notificationTo)) {
        groupedData[notificationTo] = [];
      }
      groupedData[notificationTo].push(notification);
    });

    // Create an array to store the first object from each group
    const firstObjectsArray = [];

    // Loop through the groupedData object and push the first object from each group
    for (const groupKey in groupedData) {
      if (groupedData.hasOwnProperty(groupKey)) {
        const group = groupedData[groupKey];
        if (group.length > 0) {
          firstObjectsArray.push(group[0]);
        }
      }
    }

    // console.log(firstObjectsArray);
    return firstObjectsArray;

  }
  const [combinedData, setCombinedData] = useState([]);
  const GetSentNotifications = async () => {

    var FinalArray = [];
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response1 = await fetch(`${url_}/getNotificationDataByUseridAndCategory/${user_id}/Single`, requestOptions);
      const result1 = await response1.json();

      if (result1.length > 0) {
        result1.forEach(element => {
          // Check if the element is not already present in combinedData
          if (!FinalArray.some(item => item.id === element.id)) {
            FinalArray.push(element);
          }
        });
      }
      setSingleClientNoti(result1)

      // console.log(result1)
      // console.log(combinedData)

      const response2 = await fetch(`${url_}/getNotificationDataByUseridAndCategory/${user_id}/Multiple_Clients`, requestOptions);
      const result2 = await response2.json();
      // console.log(result2.length)
      const MultipleNoti = GroupedArrayFunction(result2)
      if (MultipleNoti.length > 0) {
        MultipleNoti.forEach(element => {
          // Check if the element is not already present in combinedData
          if (!FinalArray.some(item => item.id === element.id)) {
            FinalArray.push(element);
          }
        });
      }
      setMultipleClientNoti(MultipleNoti)

      // console.log(AllNoti)
      // console.log(combinedData)

      const response3 = await fetch(`${url_}/getNotificationDataByUseridAndCategory/${user_id}/All_Income_Tax_Clients`, requestOptions);
      const result3 = await response3.json();
      // console.log(result3.length)
      const AllIncomeTaxNoti = GroupedArrayFunction(result3)
      if (AllIncomeTaxNoti.length > 0) {
        AllIncomeTaxNoti.forEach(element => {
          // Check if the element is not already present in combinedData
          if (!FinalArray.some(item => item.id === element.id)) {
            FinalArray.push(element);
          }
        });
      }
      setAllIncomeTaxClientNoti(AllIncomeTaxNoti)

      // console.log(AllNoti)
      // console.log(combinedData)

      const response4 = await fetch(`${url_}/getNotificationDataByUseridAndCategory/${user_id}/All_GST_Clients`, requestOptions);
      const result4 = await response4.json();
      const AllGSTNoti = GroupedArrayFunction(result4)
      if (AllGSTNoti.length > 0) {
        AllGSTNoti.forEach(element => {
          // Check if the element is not already present in combinedData
          if (!FinalArray.some(item => item.id === element.id)) {
            FinalArray.push(element);
          }
        });
      }
      setAllGSTClientNoti(AllGSTNoti)

      // console.log(AllNoti)
      // console.log(combinedData)

      const response5 = await fetch(`${url_}/getNotificationDataByUseridAndCategory/${user_id}/All_Clients`, requestOptions);
      const result5 = await response5.json();
      const AllNoti = GroupedArrayFunction(result5)

      if (AllNoti.length > 0) {
        AllNoti.forEach(element => {
          // Check if the element is not already present in combinedData
          if (!FinalArray.some(item => item.id === element.id)) {
            FinalArray.push(element);

          }
        });
      }
      setAllClientNoti(AllNoti)

      // console.log(AllNoti)
      // console.log(combinedData)


      const NewFinalArray = FinalArray.sort((a, b) => {
        const dateA = new Date(a.sendDate.replace(" at", ""));
        const dateB = new Date(b.sendDate.replace(" at", ""));
        return dateB - dateA;
      });
      console.log(FinalArray)
      setCombinedData(NewFinalArray)






    } catch (error) {
      console.log(error)
    }
  }



  const handleNotification = async () => {



    let currentDate = new Date();

    // Format the date
    let options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };

    let todate = currentDate.toLocaleString('en-US', options);

    // const formattedString = data.join(',');
    //
    if (checkedCheckboxes.length === 0) {
      Swal.fire("Select atleast one client!!!");
    } else {


      // console.log("file", formdata.noti_img);
      // console.log("text", formdata.details);
      // console.log("clientIds", checkedCheckboxes.join(','));
      // console.log("sendDate", todate);
      // console.log("from", user_name);
      // console.log("to", (`${checkedCheckboxes.length === 1 ? `Single` :
      //   selectAll ? `AllClients_${allClientNoti.length + 1}` :
      //     selectAllIncome_Tax ? `AllIncomeTaxClients_${allIncomeTaxClientNoti.length + 1}` :
      //       selectAllGST ? `AllGSTClients_${allGSTClientNoti.length + 1}` :
      //         `MultipleClients_${multipleClientNoti.length + 1}`
      //   }`));
      // console.log("userid", user_id);
      // console.log("category", (`${checkedCheckboxes.length === 1 ? `Single` :
      //   selectAll ? `All_Clients` :
      //     selectAllIncome_Tax ? `All_Income_Tax_Clients` :
      //       selectAllGST ? `All_GST_Clients` :
      //         'Multiple_Clients'
      //   }`));




      try {

        Swal.fire({
          title: 'Sending Notifications...',
          text: 'Please wait...',
          showConfirmButton: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        var APIformdata = new FormData();
        APIformdata.append("file", formdata.noti_img);
        APIformdata.append("text", formdata.details);
        APIformdata.append("clientIds", checkedCheckboxes.join(','));
        APIformdata.append("sendDate", todate);
        APIformdata.append("from", user_name);
        APIformdata.append("to", (`${checkedCheckboxes.length === 1 ? `${notiClientName}` :
          selectAll ? `AllClients_${allClientNoti.length + 1}` :
            selectAllIncome_Tax ? `AllIncomeTaxClients_${allIncomeTaxClientNoti.length + 1}` :
              selectAllGST ? `AllGSTClients_${allGSTClientNoti.length + 1}` :
                `MultipleClients_${multipleClientNoti.length + 1}`
          }`));
        APIformdata.append("userid", user_id);
        APIformdata.append("category", (`${checkedCheckboxes.length === 1 ? `Single` :
          selectAll ? `All_Clients` :
            selectAllIncome_Tax ? `All_Income_Tax_Clients` :
              selectAllGST ? `All_GST_Clients` :
                'Multiple_Clients'
          }`));

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: APIformdata,
          redirect: 'follow'
        };

        const Response = await fetch(`${url_}/SaveNotification`, requestOptions)
        const Result = await Response.text();
        console.log(Result)
        if (Response.ok) {
          await Swal.fire("Success.", "Notification sent successfully.", "success");
          window.location.reload();
        } else {
          await Swal.fire("Failed.", "Failed to send notification!!!", "error");
          window.location.reload();
        }
      } catch (error) {
        console.log(error)
      }
    }

  }


  const handlePreview = async (pdata) => {
    // console.log(pdata.imagePath)
    // console.log(pdata.imagePath === null)
    // console.log(pdata.imagePath === null)
    // setEmailData({
    //   To: pdata.category === "Singles" ? pdata.notificationTo : (pdata.category).replace("_", " "),
    //   DateTime: pdata.sendDate,
    //   Message: pdata.text === "undefined" ? "" : pdata.text,
    //   Img: ""
    // })
    if (pdata.imagePath === null) {
      setEmailData({
        To: pdata.category === "Single" ? pdata.notificationTo : (pdata.category).replace(/_/g, " "),
        DateTime: pdata.sendDate,
        Message: pdata.text === "undefined" ? "" : pdata.text,
        Img: ""
      })
      setImgContent("")
    } else {
      setEmailData({
        To: pdata.category === "Single" ? pdata.notificationTo : (pdata.category).replace(/_/g, " "),
        DateTime: pdata.sendDate,
        Message: pdata.text === "undefined" ? "" : pdata.text,
        Img: ""
      })
      clickMe(pdata.id);

    }

  }

  const clickMe = async (imgId) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    const response = await fetch(`${url_}/notification/${imgId}`, requestOptions)
    const result = await response.json();
    // console.log(result)

    setImgContent(result.content)
  }
  // console.log(combinedData)
  const imageSrc = imgcontent ? `data: image / jpeg; base64, ${imgcontent} ` : 0;
  useEffect(() => {
    handleClients("ALL");
    GetSentNotifications();
  }, []);
  return (
    <>

      <div className={style.noti_Titile}>
        <h3>
          <b>
            Notify your clients
          </b>
        </h3>
      </div>
      <div className={style.noti_TextareaAndIMGarea}>
        <div className={style.noti_First_Section}>
          <div className={style.noti_input_area}>
            <h5 className='text-center'><b>Add Text</b></h5>
            <div className={style.TEXT_area}>
              <textarea name="details" className={`${style.text2}`} defaultValue={formdata.details}
                onChange={handleChange} placeholder={`Max. ${wordLimit} Words..`} />

              <div className={`${style.p2}`}>
                <p className={`${style.wordcount}`}>Word Count: {formdata.details.split(' ').filter(word => word.length > 0).length}/{wordLimit}</p>
              </div>
            </div>
          </div>
          <div className={style.noti_img_area}>
            <label htmlFor="noti_img_upload"><b>Upload file</b></label>
            <div className={style.upload_btn_wrapper}>
              <div>
                <button className={style.btn}>Upload a file</button>
                <input type="file" name="noti_img" id='noti_img_upload' onChange={handleChange} />
                <div className='w-100 text-center mt-2'>{filename}</div>
              </div>

            </div>
          </div>
        </div>
        <div className={style.noti_Second_Section}>
          {/* {formdata.details === "" || formdata.noti_img === null ? <>
          </> : <>
            <button data-toggle="modal" data-target=".bd-example-modal-xl" >SEND</button>
          </>} */}
          <button data-toggle="modal" data-target=".bd-example-modal-xl" >NEXT</button>

        </div>
      </div>
      <div className={style.noti_Lists}>
        <h4 className='mt-3 mb-2'><b>Notifications</b></h4>
        <div className={style.noti_lists} >

          {combinedData.map((item, index) => (
            <div className={`${style.noti_list} row`} key={index}>
              <span className="col">{index + 1}</span>
              <span className="col-3">{item.category === "Single" ? item.notificationTo : (item.category).replace(/_/g, " ")}</span>
              <span className="col-5">{item.sendDate}</span>
              <span className="col-3" data-toggle="modal" data-target="#exampleModalCenter" onClick={() => handlePreview(item)}>Preview...</span>
            </div>



          ))}



        </div>
      </div>


      <div className="modal fade bd-example-modal-xl" tabIndex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Send To...</h5>
            </div>
            <div className="modal-body">
              <div className={style.noti_Clients_Option}>
                <button className='col-4' onClick={() => handleClients("Income_Tax")}><span>Income Tax Clients</span></button>
                <button className='col-4' onClick={() => handleClients("GST")}><span>GST Clients</span></button>
                <button className='col-4' onClick={() => handleClients("ALL")}><span>ALL</span></button>
              </div>
              <div className={style.Select_All}>
                <div className={`col ${style.Select_All_Option}`}>
                  {clientCategory === "ALL" ? <>


                    <span>
                      <input
                        type="checkbox"
                        id="SelectAll"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                      <label htmlFor="SelectAll"> Select All</label>
                    </span>
                    <span style={{ marginRight: "10rem", width: "50%" }} className='ml-3'>
                      <input
                        type="text"
                        className={`form-control ${style.round}`}
                        placeholder="Search Client by Name / PAN / Mobile"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <span className={style.search}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                      </span>
                    </span>




                  </> :
                    clientCategory === "Income_Tax" ? <>

                      <span>
                        <input
                          type="checkbox"
                          id="SelectAll"
                          checked={selectAllIncome_Tax}
                          onChange={handleSelectAllIncomeTax}
                        />
                        <label htmlFor="SelectAll"> Select all income tax</label>
                      </span>
                      <span style={{ marginRight: "10rem", width: "50%" }} className='ml-3'>
                        <input
                          type="text"
                          className={`form-control ${style.round}`}
                          placeholder="Search Client by Name / PAN / Mobile"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <span className={style.search}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                          </svg>
                        </span>
                      </span>
                    </> :
                      clientCategory === "GST" ? <>


                        <span>
                          <input
                            type="checkbox"
                            id="SelectAll"
                            checked={selectAllGST}
                            onChange={handleSelectAllGST}
                          />
                          <label htmlFor="SelectAll"> Select all GST</label>

                        </span>
                        <span style={{ marginRight: "10rem", width: "50%" }} className='ml-3'>
                          <input
                            type="text"
                            className={`form-control ${style.round}`}
                            placeholder="Search Client by Name / PAN / Mobile"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                          <span className={style.search}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                          </span>
                        </span>
                      </> :
                        <>

                        </>}

                </div>

              </div>
              <div className={style.noti_Client_lists}>
                <>
                  <div className='d-flex flex-column justify-content-center'>
                    <table className="table table-striped ">
                      <thead>
                        <tr style={{ backgroundColor: "#ffd401e6" }}>
                          <th scope="col" className="text-center">#</th>
                          <th scope="col" className="text-center">NAME</th>
                          <th scope="col" className={`text-center ${style.table_tr}`}>PAN</th>
                          <th scope="col" className={`text-center ${style.table_tr}`}>Mobile</th>
                        </tr>
                      </thead>
                      <tbody>

                        {tcdata
                          .filter(item =>
                            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.pan.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.mobile.toLowerCase().includes(searchQuery.toLowerCase())
                          )

                          .map((item, index) => (
                            <tr key={index} >
                              <td className="text-center">
                                <input
                                  type="checkbox"
                                  id={item.clientId}
                                  checked={checkedCheckboxes.includes(item.clientId)}
                                  onChange={() => {
                                    handleCheckboxChange(item.clientId);
                                    setNotiClientName(item.name);
                                  }
                                  }
                                />
                              </td>
                              <td className='text-center'>{item.name}</td>
                              <td className={`text-center ${style.table_tr}`}>{item.pan}</td>
                              <td className={`text-center ${style.table_tr}`}>{item.mobile}</td>

                            </tr>
                          ))}



                      </tbody>
                    </table>
                  </div>
                </>
              </div>

            </div>
            <div className={`${style.noti_Modal_footer_btn} modal-footer d-flex justify-content-center `}>
              <button onClick={handleNotification}>Send Notification</button>
            </div>
          </div>
        </div>
      </div>


      <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Sent to....</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="email-container">

                <div className="email-content">
                  <p><strong>To:</strong> {(emailData.To).replace("TT", " ")}</p>
                  <p><strong>Date Time:</strong> {emailData.DateTime}</p>
                  <p><strong>Message:</strong></p>
                  <p>
                    {emailData.Message}
                  </p>

                  <div className={style.image_container}>
                    {imageSrc ? <>
                      <img src={imageSrc} alt="Placeholder_Image" width="400" style={{ objectFit: "contain" }} />
                    </> : <>
                      <hr />
                    </>}
                  </div>
                </div>
                <hr />
                <div className="email-footer">

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default NotificationsCA;



