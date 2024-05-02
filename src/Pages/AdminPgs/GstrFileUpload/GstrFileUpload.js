import React, { useEffect, useState } from 'react';
import style from "./GstrFileUpload.module.css";
import upload from '../../../Images/upload.png';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { url_ } from '../../../Config';

const GstrFileUpload = () => {
  const Navigate = useNavigate();

  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');

  const client_Information = useLocation().state.client_Information;
  const clientid = client_Information.clientId;
  const year = useLocation().state.year;
  const gst_title = useLocation().state.gstCategory;
  const subscription_status = localStorage.getItem('subscription_status');

  const [fileResponse, setFileResponse] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dbfilelength, setDbfilelength] = useState(["1", "2"]);
  const [codeVisible, setCodeVisible] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

  const [gstrFileUpload, setGstrFileUpload] = useState({
    FileUploadedStatus: false,
    // FiledResponseStatus: false,
    fileid: "",
    filePath: "",
    filename: ""
  })


  const toggleCodeVisibility = () => {
    setCodeVisible(!codeVisible);
  };

  const handleCheckboxChange = (event, fileId) => {
    if (event.target.checked) {
      setSelectedFiles(prevSelectedFiles => [...prevSelectedFiles, fileId]);
    } else {
      setSelectedFiles(prevSelectedFiles => prevSelectedFiles.filter(id => id !== fileId));
    }
  };
  const handleFileUpload = (event, FileYr) => {
    const file = event.target.files[0];

    if (file) {


      if (file.name.endsWith('.pdf')) {

        FileUpload(file, FileYr);
      } else {
        Swal.fire(
          'Invalid File Type!',
          "Please select a valid file type (PDF).",
          "error"
        );
      }



    } else {
      console.log("No file selected");
    }
  }
  async function FileUpload(file, filedyear) {

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
      // console.log("file", file);
      // console.log("userid", user_id);
      // console.log("clientid", clientid);
      // console.log("financialYear", year);
      // console.log("category", gst_title);
      // console.log("month", filedyear.substring(0, 4));

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const formdata = new FormData();

      formdata.append("file", file);
      formdata.append("userid", user_id);
      formdata.append("clientid", clientid);
      formdata.append("financialYear", year);
      formdata.append("category", gst_title);
      formdata.append("month", filedyear.substring(0, 4));
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      try {
        const response = await fetch(`${url_}/GSTFileUpload`, requestOptions);
        const responseData = await response.text();
        console.log(responseData)
        if (response.status === 200) {
          await Swal.fire(
            'Success.',
            `${responseData}`,
            'success'
          )
          window.location.reload();

        } else {
          Swal.fire(
            'Failed!',
            `${responseData}`,
            'error'
          )
        }
      } catch (error) {
        console.log('Error:', error);
        if (error.response) {
          console.log('Response Status:', error.response.status);
          console.log('Response Data:', await error.response.text());
        }
      }
    } else {
      console.log("Upload is canceled.");
      window.location.reload();
    }
  }
  const DeleteFile = async () => {

    if (subscription_status === "grace_period") {
      Swal.fire({
        icon: "error",
        text: "Sorry this service is currently not available due to end of subscription. Renew subscription to resume services."
      })

    }

    else if (subscription_status === "not_subscribed") {
      Swal.fire({
        icon: "error",
        text: "Subscribe to avail this service."
      })

    }

    else {
      try {
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



          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", `Bearer ${storedToken}`);

          var raw = JSON.stringify({
            "fileIds": selectedFiles
          });

          var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };


          const response = await fetch(`${url_}/gstdeletefile`, requestOptions);
          const responseData = await response.text();
          console.log(responseData)
          if (response.status === 200) {
            await Swal.fire(
              'Success.',
              `${responseData}`,
              'success'
            )
            window.location.reload();

          } else {
            Swal.fire(
              'Failed!',
              `${responseData}`,
              'error'
            )
          }

          console.log(selectedFiles)


        } else {
          console.log("Canceled the delete!");
        }
      } catch (error) {
        console.log("Failed to call function!!!");

        console.log('Error:', error);
        if (error.response) {
          console.log('Response Status:', error.response.status);
          console.log('Response Data:', error.response.text());
        }
      }
    }
  }
  const handleToggle = async (filedyear) => {

    if (subscription_status === "grace_period") {
      Swal.fire({
        icon: "error",
        text: "Sorry this service is currently not available due to end of subscription. Renew subscription to resume services."
      })

    }

    else if (subscription_status === "not_subscribed") {
      Swal.fire({
        icon: "error",
        text: "Subscribe to avail this service."
      })

    }
    else {
      if (fileResponse === true) {
        // console.log("It's TRUE");
      } else {
        try {
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
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${storedToken}`);

            var requestOptions = {
              method: 'PUT',
              headers: myHeaders,
              redirect: 'follow'
            };


            const response = await fetch(`${url_}/GSTR-9-updateFiledNotFiled/${user_id}/${clientid}/${filedyear.substring(0, 4)}/${gst_title}`, requestOptions)
            if (response.status === 200) {
              await Swal.fire("Success.", "Updated successfuly.", "success")
              window.location.reload();
            } else {
              await Swal.fire("Failed.", "Failed to Update.", "error")
            }

            // console.log(user_id)
            // console.log(clientid)
            // console.log(month)
            // console.log(year.slice(0, 4))
            // console.log(gst_title)
          } else {
            console.log("Canceled the toggle!");
          }
        } catch (error) {
          console.log("Failed to call function!!!");

          console.log('Error:', error);
          if (error.response) {
            console.log('Response Status:', error.response.status);
            console.log('Response Data:', error.response.text());
          }
        }
      }
    }
  };


  const checkSubsriptionStatus = (fileId) => { }

  const openFileAndDownload = async (contentType, fileName, file_ID) => {


    if (subscription_status === "grace_period") {
      Swal.fire({
        icon: "error",
        text: "Sorry this service is currently not available due to end of subscription. Renew subscription to resume services."
      })

    }

    else if (subscription_status === "not_subscribed") {
      Swal.fire({
        icon: "error",
        text: "Subscribe to avail this service."
      })

    }
    else {

      try {
        const response = await fetch(`${url_}/openGstfile/${file_ID}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const arrayBuffer = await response.arrayBuffer();
        const fileBlob = new Blob([arrayBuffer], { type: `application/${contentType}` });
        const blobUrl = URL.createObjectURL(fileBlob);

        if (contentType === 'pdf') {
          setPdfBlobUrl(blobUrl);
          const pdfWindow = window.open(blobUrl, '_blank');
          pdfWindow.addEventListener('beforeunload', () => {
            URL.revokeObjectURL(blobUrl);
          });
        } else if (contentType === 'xlsx') {
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = fileName;
          link.click();
          URL.revokeObjectURL(blobUrl);
        }
      } catch (error) {
        console.error(`Error fetching or downloading ${contentType.toUpperCase()} file: `, error);
      }
    }
  }; function GoBack() {
    window.history.back(); // This will navigate to the previous page in the browser's history
  }
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      await getFile();
      await GetFileResponse();


    } catch (error) {
      console.error('An error occurred:', error);
    }
  };


  const getFile = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${url_}/Gstgetfile/${user_id}/${clientid}/${year}/${gst_title}`, requestOptions);
      const data = await response.json();
      // console.log("getFile", data)
      // console.log("getFile", `${ url_ }/Gstgetfile/${ user_id }/${ clientid }/${ year }/${ gst_title }`)

      // const extractedNames = data.map(file => {
      //   const financialYear = file.financialYear;
      //   const fileid = file.id;
      //   const filePath = file.filePath;
      //   let splitString = file.fileName.split('_');
      //   let extractedName = splitString.slice(2).join('_');
      //   let FileUploadedStatus = file.fileName ? true : false;

      //   return { fileid, extractedName, filePath, FileUploadedStatus, financialYear };
      // });
      // console.log(data[0].fileName)
      let splitString = data[0].fileName.split('_');
      let extractedName = splitString.slice(2).join('_');
      setGstrFileUpload({

        FileUploadedStatus: data[0].fileName ? true : false,
        fileid: data[0].id,
        filePath: data[0].filePath,
        filename: extractedName,
      })

    } catch (error) {
      console.error('An error occurred while fetching files:', error);
    }
  };

  const GetFileResponse = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(`${url_}/GST_Statusfilednotfiled/${user_id}/${clientid}/${year.slice(0, 4)}/${gst_title}`, requestOptions);
      const result = await response.json();
      console.log("GetFileResponse", result)
      if (result[0].filednotfiled === "yes") {
        setFileResponse(true);
      } else {
        setFileResponse(false);
      }
      // console.log("GetFileResponse", `${ url_ }/GST_Statusfilednotfiled/${ user_id }/${ clientid }/${ year.slice(0, 4) }/${ gst_title }`)



    } catch (error) {
      console.error('An error occurred while fetching files:', error);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row m-3" style={{ "minWidth": "300px" }} id="maindiv">
          <div >
            <h1 className={`d-flex align-items-center ${style.h1}`}>
              <div style={{ fontSize: "xxx-large", cursor: "pointer" }} onClick={GoBack}>
                &#8617;&nbsp;
              </div>
              <b>{gst_title}</b>
            </h1>
            <p className={`${style.headpara}`}>F.Y {year}</p>

          </div>

        </div>
        <div className={`${style.neckbar}`}>
          <div className="d-flex">
            <div className="col-4 col-sm-4 col-md-6 col-lg-9 col-xl-9" id="select">
              {dbfilelength.length > 0
                ? <button type="button" className="btn btn-danger" onClick={toggleCodeVisibility}>Select</button>
                : null}
            </div>
            <div className="col-4 col-sm-4 col-md-3 col-lg-3 col-xl-3 d-flex justify-content-center" id="delet">
              {selectedFiles.length < 1 ?
                <></> :
                <h2 className="icons">
                  {codeVisible && (
                    <i className="fa-solid fa-trash-can" onClick={DeleteFile}></i>
                  )}
                </h2>
              }

            </div>
            <div className="col-4 col-sm-4 col-md-3 col-lg-3 col-xl-3 d-flex justify-content-center" id="share">
              {selectedFiles.length < 1 ?
                <></> :
                <h2 className="icons">
                  {codeVisible && (
                    <i className="fa-solid fa-share-from-square" ></i>
                  )}
                </h2>
              }

            </div>
          </div>
        </div>

        <div className={`w-100 d-flex align-items-center m-2 row ${style.minwidth}`}>

          <>
            <div className={`col-4 col-sm-4 col-md-4 col-lg-5 col-xl-5 ${style.filename}`}>
              <div className={`${style.gstr1_mothn_filename} col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 `}>
                <p className={`${style.filename_text} text-danger h4`} >{year}</p>
              </div>

              <div className={`${style.gstr_1_file_toggle}  col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 d-flex justify-content-center`} style={{ margin: "auto" }}>
                <label className={`${style.switch}`}>
                  <input type="checkbox" checked={fileResponse ? true : false} onChange={() => handleToggle(year)} />
                  <span className={`${style.slider} ${style.round}`}></span>
                </label>
              </div>
            </div>


            <div className={`col-8 col-sm-8 col-md-8 col-lg-7 col-xl-7 ${style.files}`}>



              {gstrFileUpload.FileUploadedStatus ? (
                <div className=' col-6'>

                  <div className={style.file_upload}>
                    {codeVisible && (
                      <label className={style.checkbox_label}>
                        <input
                          type="checkbox"
                          className={style.checkbox}
                          onChange={event => handleCheckboxChange(event, gstrFileUpload.fileid)}
                        />
                        <span className={style.checkbox_custom}>
                          <span className={style.checkbox_tick}></span>
                        </span>
                      </label>
                    )}


                    <i className="bi bi-file-earmark-pdf-fill text-danger" onDoubleClick={() => openFileAndDownload('pdf', 'document.pdf', gstrFileUpload.fileid)}>

                    </i>


                  </div>
                  <p className={`${style.filename_text2} w-100`} >
                    {gstrFileUpload.filename}
                  </p>
                </div>
              ) : (

                <div className={`${style.file_upload}  mr-2 ml-2 col`}>
                  <div className={style.image_upload_wrap}>
                    <input className={style.file_upload_input} type='file' onChange={(event) => handleFileUpload(event, year)} onClick={checkSubsriptionStatus} />
                    <div className={style.drag_text}>
                      <img src={upload} alt="" />
                      <p className=''>Upload File</p>
                    </div>
                  </div>
                </div>


              )}

            </div>

          </>



        </div>

      </div >

    </>
  );
}

export default GstrFileUpload;
