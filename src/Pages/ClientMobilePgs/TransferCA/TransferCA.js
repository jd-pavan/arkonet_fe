import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import style from './TransferCA.module.css'
import { url_ } from '../../../Config';
import Swal from 'sweetalert2';

const TransferCA = () => {

  const Navigate = useNavigate();
  const storedToken = window.localStorage.getItem('jwtToken');
  const client_id = localStorage.getItem("clientId");
  const client_pan = localStorage.getItem("pan");
  const client_Category = localStorage.getItem("category");

  const client_id_it = localStorage.getItem("client_id_it");
  const client_id_gst = localStorage.getItem("client_id_gst");

  const [isActive, setIsActive] = useState(false);
  const [selectedCA, setsetSelectedCA] = useState('Transfer To.....');
  const [searchWord, setSearchWord] = useState('');
  const [selectedValue, setSelectedValue] = useState({
    NEW_CA_REGID: "",
    NEW_CA_NAME: "",
    NEW_CA_PAN: "",
  });
  const todayDate = () => {
    const now = new Date();

    // Get the current date
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const todaydate = `${year}-${month}-${day}`;
    return todaydate;
  }
  const [requestClientsData, setRequestClientsData] = useState({


  });
  const [caListData, setCaListData] = useState([]);
  const [clientcaListData, setClientCaListData] = useState([]);
  const [requestedCombinedList, setRequestedCombinedList] = useState([]);
  const [clientRequestsGSTRequests, setClientRequestsGSTRequests] = useState([]);
  const [clientRequestsIncomeRequests, setClientRequestsIncomeRequests] = useState([]);
  const [finalCombineCAList, setFinalCombineCAList] = useState([]);

  const handleInputChange = (e) => {
    setSearchWord(e.target.value.toLowerCase());
  };

  const filterCountries = () => {
    const filteredOptions = options.filter((item) => item.pin_code.startsWith(searchWord) || item.name.includes(searchWord) || item.pan.toLowerCase().includes(searchWord));

    if (filteredOptions.length === 0) {
      return (
        <li key="no-result" className="no-result">
          No result found
        </li>

      );
    }

    const matchingResults = filteredOptions.map((item, index) => {
      const isSelected = item.value === selectedCA ? 'selected' : '';
      return (
        <li key={index} onClick={() => updateName(item.value, item.name, item.pan)} className={isSelected} style={{ backgroundColor: "#ffd401c2" }}>
          {item.name}
        </li>

      );
    });

    const remainingResults = options
      .filter((item) => !filteredOptions.includes(item))
      .map((item, index) => {
        const isSelected = item.value === selectedCA ? 'selected' : '';
        return (

          <li key={matchingResults.length + index} onClick={() => updateName(item.value, item.name, item.pan)} className={isSelected}>
            {item.name}
          </li>


        );
      });

    return [...matchingResults, ...remainingResults];
  };

  const updateName = (regid, name, pan) => {


    setSearchWord('');
    setSelectedValue({
      NEW_CA_REGID: regid,
      NEW_CA_NAME: name,
      NEW_CA_PAN: pan,
    })
    setsetSelectedCA(name); // Change this line to setselectedCA(selectedCA)
    setIsActive(false);
    // Log the selected value and name to the console
    GetRequestedRemainCAList();
    console.log("Selected Name:", name);




  };

  const GetClientCAList = async () => {

    const combinedResults = [];

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };


    //===========Retrive Both Data==============

    let isBoth = false;

    try {
      const Both_res = await fetch(`${url_}/getuserBypan/${client_pan}/Both`, requestOptions);
      const Both_user = await Both_res.json();
      if (Both_res.status === 200) {
        console.log(Both_user)
        Both_user.title = "Both";
        Both_user.new_client_id = client_id;
        combinedResults.push(Both_user);
        isBoth = true;
      }
    } catch (error) {
      console.log(error)
    }
    //===========Retrive IT User Data==============
    if (!isBoth) {

      if (client_id_it) {
        // console.log("IT", client_id_it)
        try {
          const IT_res = await fetch(`${url_}/getuserBypan/${client_pan}/Income_Tax`, requestOptions);
          const IT_User = await IT_res.json();
          if (IT_res.status === 200) {
            IT_User.title = "Income Tax";
            IT_User.new_client_id = client_id_it;
            combinedResults.push(IT_User);
            // console.log(IT_User)
          }
        } catch (error) {
          console.log(error)
        }
      }






      //Retrive GST User Data

      if (client_id_gst) {
        // console.log("gst ", client_id_gst)
        try {
          const GST_res = await fetch(`${url_}/getuserBypan/${client_pan}/GST`, requestOptions);
          const GST_User = await GST_res.json();
          if (GST_res.status === 200) {
            // console.log(GST_User)
            GST_User.title = "GST";
            GST_User.new_client_id = client_id_gst;
            combinedResults.push(GST_User);
          }
        } catch (error) {
          console.log(error)
        }
      }

    }


    // console.log(combinedResults)
    setClientCaListData(combinedResults)
    const regIds = combinedResults.map(item => item.userinfo.regId);
    GetCALists(regIds);


  }
  const GetCALists = async (CAIDs) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`${url_}/by-profession/all`, requestOptions);
      const result = await response.json();
      const filteredData = result.filter(item => !CAIDs.includes(item.registration.regId));
      setCaListData(filteredData);
      // console.log(filteredData);
    } catch (error) {
      console.log(error)
    }

  }

  const options = caListData.map(item => {

    return {
      value: item.registration.regId,
      name: item.registration.name,
      pin_code: item.registration.pin_code,
      pan: item.registration.pan
    };
  });
  const [pendingAmount, setpendingAmount] = useState(null);


  const GetClientPendingCABtn = async (user_id_ca, client_id_ca) => {
    console.log(user_id_ca, client_id_ca)
    try {


      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/sumOFPaymentClient/${user_id_ca}/${client_id_ca}`, requestOptions)
      const result = await response.json();
      // console.log(result)
      setpendingAmount(result.pendingPayment);
    } catch (error) {
      console.log(error)
    }


  }

  useEffect(() => {

    GetClientCAList();
  }, []);

  const [selectedCAToTransfer, setSelectedCAToTransfer] = useState({
    CAId: "",
    CAName: "Transfer From..",
    caPAN: ""
  })
  const [updatedClient_ID, setUpdatedClient_ID] = useState()
  const handleSelectChange = (caId, caName, caPAN, client_id_new) => {

    setSelectedCAToTransfer({
      CAId: caId,
      CAName: caName,
      caPAN: caPAN
    });
    GetClientPendingCABtn(caId, client_id_new);
    setUpdatedClient_ID(client_id_new)
    setIsActive(false);
    // console.log(caId)
    // console.log(caName)
  }

  const TransferClientsCA = async () => {

    // console.log("TO:", selectedValue.NEW_CA_REGID);
    // console.log("TO:", selectedValue.NEW_CA_PAN);
    // console.log("TO:", selectedValue.NEW_CA_NAME);
    // console.log("-----------------------------");
    // console.log("From:", selectedCAToTransfer.CAId);
    // console.log("From:", selectedCAToTransfer.CAName);
    // console.log("From:", selectedCAToTransfer.caPAN);
    // console.log("-----------------------------");
    // console.log("Client_ID:", updatedClient_ID);
    // console.log("-----------------------------");
    // console.log(typeof localStorage.getItem("telephone"))
    // console.log({

    //   "clientId": updatedClient_ID,
    //   "name": localStorage.getItem("name"),
    //   "dob": localStorage.getItem("dob") === "null" ? null : localStorage.getItem("dob"),
    //   "profession": localStorage.getItem("profession"),
    //   "pan": localStorage.getItem("pan"),
    //   "telephone": localStorage.getItem("telephone") === "" ? null : localStorage.getItem("telephone"),
    //   "mobile": localStorage.getItem("mobile"),
    //   "email": localStorage.getItem("email"),
    //   "userid": selectedValue.NEW_CA_REGID,
    //   "userpan": selectedValue.NEW_CA_PAN,
    //   "requestdate": todayDate(),
    //   "status": true
    // })



    Swal.fire({
      title: 'Sending Request.',
      text: 'Please wait...',
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const raw = JSON.stringify({
        "clientId": updatedClient_ID,
        "name": localStorage.getItem("name"),
        "dob": localStorage.getItem("dob") === "null" ? null : localStorage.getItem("dob"),
        "profession": localStorage.getItem("profession"),
        "pan": localStorage.getItem("pan"),
        "telephone": localStorage.getItem("telephone") === "" ? null : localStorage.getItem("telephone"),
        "mobile": localStorage.getItem("mobile"),
        "email": localStorage.getItem("email"),
        "userid": selectedValue.NEW_CA_REGID,
        "userpan": selectedValue.NEW_CA_PAN,
        "requestdate": todayDate(),
        "status": true

      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch(`${url_}/save/client/request/data`, requestOptions)
      const result = await response.json();
      console.log(result)
      if (response.status === 201) {
        await Swal.fire("Success.", "Request sent successfully.", "success")
        GetRequestsForClient();
        window.location.reload();
      } else {
        Swal.fire("Failed.", "Failed to send request.", "error")
      }
    } catch (error) {
      console.log(error)
    }

  }

  const GetRequestedRemainCAList = () => {

    // console.log(clientcaListData)
    // console.log(requestedCombinedList)

    const newArray = requestedCombinedList.map(item => ({ "new_client_id": item.clientId }));
    const resultArray = clientcaListData.filter(itemA => !newArray.some(itemB => itemB.new_client_id.toString() === itemA.new_client_id.toString()));

    console.log(resultArray);


    console.log(newArray);



    setFinalCombineCAList(resultArray)


  }
  const GetRequestsForClient = async () => {
    const RequestedCombinedList = []
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      if (client_Category === "Income_Tax") {
        const responseit = await fetch(`${url_}/get/client/request/${client_id_it}`, requestOptions)
        const resultit = await responseit.json();
        console.log(resultit)
        RequestedCombinedList.push(...resultit);
        setClientRequestsIncomeRequests(resultit)
      }



      if (client_Category === "GST") {
        const responsegst = await fetch(`${url_}/get/client/request/${client_id_gst}`, requestOptions)
        const resultgst = await responsegst.json();
        console.log(resultgst)
        RequestedCombinedList.push(...resultgst);
        setClientRequestsGSTRequests(resultgst)


      }
      if (client_Category === "Both") {


        const responseit = await fetch(`${url_}/get/client/request/${client_id_it}`, requestOptions)
        const resultit = await responseit.json();
        console.log(resultit)
        // RequestedCombinedList.push(...resultit);
        setClientRequestsIncomeRequests(resultit)



        const responsegst = await fetch(`${url_}/get/client/request/${client_id_gst}`, requestOptions)
        const resultgst = await responsegst.json();
        console.log(resultgst)
        // RequestedCombinedList.push(...resultgst);
        setClientRequestsGSTRequests(resultgst)


      }




      setRequestedCombinedList(RequestedCombinedList)


      console.log(clientcaListData)
      console.log(RequestedCombinedList)
    } catch (error) {
      console.log(error)
    }
  }

  const DeleteTransferRequest = async (requestid) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, confirm!'
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: 'Deleting Request...',
        text: 'Please wait...',
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        // console.log(requestid)

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        const requestOptions = {
          method: "DELETE",
          headers: myHeaders,
          redirect: "follow"
        };

        const response = await fetch(`${url_}/delete/client/request/${requestid}`, requestOptions)
        if (response.status === 200) {
          Swal.fire("Success.", "Request deleted.", "success");
          GetRequestsForClient();
        } else {
          Swal.fire("Failed!", "Failed to delete rquest. Try again!!", "error");
          GetRequestsForClient();
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log("Canceled the delete!");
    }
  }



  useEffect(() => {

    GetRequestsForClient();

  }, []);
  return (
    <>
      <div className={style.tranferCA}>
        <hr />
        <div>
          <Link onClick={(e) => {
            e.preventDefault();
            Navigate(-1);
          }} style={{ fontSize: "2rem", margin: "0.5rem", color: "black" }}>
            <i className="fa-solid fa-angle-left" style={{ fontSize: "1.5rem", color: "grey" }} ></i>
            <h4 style={{ fontWeight: "bold", textAlign: "center", display: "inline-block" }}>&nbsp;&nbsp;&nbsp;Transfer CA</h4>

          </Link>
        </div>
        <hr />
        <>
          <div className={`${style.wrapper} ${isActive ? 'active' : ''}`}>
            <h6>Select CA you would like to <strong>TRANSFER to</strong>.</h6>


            {requestedCombinedList.length === 2 ?


              <div className={style.select_btn} onClick={() => Swal.fire("You have already requested for transfer. To change delete the request.")}>
                <span>{selectedCA}</span>
                {isActive ?
                  <i className="uil uil-angle-down"></i>
                  :
                  <i className="uil uil-angle-up"></i>}
              </div>
              :
              <>

                <div className={style.select_btn} onClick={() => setIsActive(!isActive)}>
                  <span>{selectedCA}</span>
                  {isActive ?
                    <i className="uil uil-angle-down"></i>
                    :
                    <i className="uil uil-angle-up"></i>}
                </div>
                {isActive && <>
                  <div className={style.content}>
                    <div className={style.search}>
                      <i className="uil uil-search"></i>
                      <input
                        spellCheck="false"
                        type="text"
                        placeholder="Search"
                        value={searchWord}
                        onChange={handleInputChange}
                      />
                    </div>
                    <ul className={style.options}>
                      {searchWord ? filterCountries() :
                        <>
                          <li></li>
                          <li><span style={{ marginLeft: "-38px", fontSize: "18px" }}>Search by Name / PAN / Pincode</span></li>
                          <li></li>
                        </>
                      }

                      {/* <li style={{ visibility: "hidden" }}>A</li>
                  <li style={{ backgroundColor: "#e8e8e8" }} >
                    Not in the list, click <small className='ml-2 btn btn-warning text-white d-flex justify-content-center align-items-center' style={{
                      width: "3rem",
                      height: "2rem"
                    }}><b>ADD</b></small>
                  </li> */}
                    </ul>
                  </div>

                </>}

              </>
            }






          </div>
        </>



      </div>
      <div className={style.requestsDone}>

        {clientRequestsGSTRequests.map((item, index) => (
          <>
            <span><h6 style={{ margin: "0px" }}>GST Requested To : {item.userpan}</h6><i class="bi bi-x-circle-fill text-danger" onClick={() => DeleteTransferRequest(item.id)} style={{ cursor: "pointer" }}></i></span>

          </>
        ))}


        {clientRequestsIncomeRequests.map((item, index) => (
          <span><h6 style={{ margin: "0px" }}>Income Tax Requested To : {item.userpan}</h6><i class="bi bi-x-circle-fill text-danger" onClick={() => DeleteTransferRequest(item.id)} style={{ cursor: "pointer" }}></i></span>
        ))}

      </div>

      {selectedValue.NEW_CA_REGID === "" ? <></> :
        <>

          <div className='d-flex justify-content-center'>
            <span style={{ backgroundColor: "#e8e8e8" }} >
              <small className=' btn btn-warning text-white d-flex justify-content-center align-items-center' data-toggle="modal" data-target="#exampleModalCenter" ><b>NEXT</b></small>
            </span>
          </div>
        </>}







      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Transfer Request...</h5>
            </div>
            <div class="modal-body">
              <h6>Select CA you would like to <strong>TRANSFER</strong>.</h6>
              <>
                <div className={`${style.wrapper} ${isActive ? 'active' : ''}`} style={{ marginBottom: "20px" }}>
                  <div className={style.select_btn} onClick={() => setIsActive(!isActive)}>
                    <span>{selectedCAToTransfer.CAName}</span>
                    {isActive ?
                      <i className="uil uil-angle-down"></i>
                      :
                      <i className="uil uil-angle-up"></i>}
                  </div>
                  {isActive && <>
                    <div className={style.content}>

                      <ul className={style.options}>

                        {
                          finalCombineCAList.map((item, index) => (
                            <li key={index + "t"} onClick={() => handleSelectChange(item.userinfo.regId, item.userinfo.name, item.userinfo.pan, item.new_client_id)}>{item.userinfo.name}</li>
                          ))
                        }

                      </ul>
                    </div>

                  </>}
                </div>
              </>

              {pendingAmount === null ? <></> :

                <>
                  {pendingAmount !== 0 ? <>

                    <strong>You have payment pending of <span className='text-danger'>{pendingAmount}</span> Rs, from <span className='text-info'>{selectedCAToTransfer.CAName}</span>. <br /> Please clear the payment to transfer CA.</strong>
                  </> :
                    pendingAmount === 0 ? <>
                      <strong className='text-success'>You have no payment pending from <span className='text-info'>{selectedCAToTransfer.CAName}</span>.</strong>

                    </> : <></>}

                </>

              }


            </div>
            <div class="modal-footer d-flex justify-content-center">
              {pendingAmount !== 0 ? <>
                <span style={{ backgroundColor: "#686868", borderRadius: "10px" }} >
                  <small className=' btn text-white d-flex justify-content-center align-items-center' ><b>Transfer</b></small>
                </span>
              </> : <>
                <span style={{ backgroundColor: "#e8e8e8", borderRadius: "10px" }} onClick={TransferClientsCA}>
                  <small className=' btn btn-warning text-white d-flex justify-content-center align-items-center' ><b>Transfer</b></small>
                </span>
              </>}


            </div>
          </div>
        </div>
      </div >

    </>
  );
}

export default TransferCA;
