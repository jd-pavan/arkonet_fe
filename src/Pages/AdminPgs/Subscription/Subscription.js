import React, { useState, useRef } from 'react';
import swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { url_ } from '../../../Config';
import PaymentGateway from '../../../PaymentGateway';
import DemoPdf from '../../../Files/payment.pdf';
import style from './Subscription.module.css'
import qrCodeimg from '../../../Images/ARKONET QRCODE.jpg'

const Subscription = (props) => {
  const subscription_status = localStorage.getItem('subscription_status');
  const U_Name = window.localStorage.getItem('user_name');
  const U_Mobile = window.localStorage.getItem('mobile');
  const U_Email = window.localStorage.getItem('email');
  const U_Pan = window.localStorage.getItem('pan');
  const Navigate = useNavigate()
  // const subs_pack = props.SubTYPE;
  // const subs_amount = props.SubPRICE;
  // const no_of_client = props.AccessCLIENT;
  // console.log(subs_pack, subs_amount, no_of_client);
  const { subs_pack, subs_amount, no_of_client } = useLocation().state;

  const userInfo = {
    userid: localStorage.getItem("user_id"),
    userPAN: localStorage.getItem("pan"),
    jwtToken: localStorage.getItem("jwtToken")
  }


  const [modalVisible, setModalVisible] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const maxSize = 10;

  const handleClick = () => {
    setModalVisible(true);
  };

  const blob = new Blob([DemoPdf], { type: 'application/pdf' });

  // Create a File object from the blob
  const PAYMENT_PDF = new File([blob], 'Payment_Successful.pdf');

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const fileSizeInBytes = file.size;
      const fileSizeInKb = fileSizeInBytes / 1024;
      const fileSizeInMb = fileSizeInKb / 1024;
      //console.log(fileSizeInBytes,":",fileSizeInKb+":",fileSizeInMb);
      if (fileSizeInMb > maxSize) {
        swal.fire({
          title: `Select file with a size less than ${maxSize} MB.`,
          text: 'Click OK to open a file reducer website in a new tab',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            if (file.type === "image/jpeg" ||
              file.type === "image/jpg" ||
              file.type === "image/png") {
              window.open("https://www.reduceimages.com/", '_blank');
            }

            else {
              window.open("https://www.ilovepdf.com/compress_pdf", '_blank');
            }
            fileInputRef.current.value = '';
          }
          else {
            fileInputRef.current.value = '';
          }
        });
      }
      else {
        const renamedFile = new File([file], `Payment_Acknowledgement.${file.type.split("/")[1]}`, {
          type: file.type,
        });
        if (
          file.type === "image/jpeg" ||
          file.type === "image/jpg" ||
          file.type === "image/png" ||
          file.name.endsWith(".pdf")
        ) {
          const reader = new FileReader();

          reader.onload = (e) => {
            const binaryData = e.target.result;
            setSelectedFile(renamedFile);

          };
          reader.readAsDataURL(file);
        }
        else {
          swal
            .fire({
              title: `Select (JPEG or PNG or PDF) `,
              icon: "info",
              confirmButtonText: "OK",
            })
            .then((result) => {
              if (result.isConfirmed) {
                fileInputRef.current.value = "";
              } else {
                fileInputRef.current.value = "";
              }
            });
        }
      }
    }
  }


  async function submitAcknowledgement() {



    const message = `Dear Accounts Team,
    Greeting from TAXKO!

    I hope this message finds you well. 

    Our client ${localStorage.getItem("user_name")}, has made payment for ${subs_pack} subcription pack worth Rs${subs_amount}. 
    Following is the attachment of payment acknowledgement.Kindly activate the subscription as soon as possible.

    Best regards,

    ${localStorage.getItem("user_name")},
    Contact no : ${localStorage.getItem("mobile")}`;


    const formattedMsg = message.replace(/\n/g, '<br>')
    // console.log(message)
    console.log(no_of_client);
    console.log(userInfo.userid);
    console.log(PAYMENT_PDF);
    console.log(subs_amount);
    console.log(subs_pack);
    console.log("Payment Acknowledgement");
    console.log(formattedMsg);
    //   swal.fire({
    //     title: 'Sending Acknowledgement',
    //     text: 'Please wait...',
    //     showConfirmButton: false,
    //     onBeforeOpen: () => {
    //       swal.showLoading();
    //     },
    //   });


    // var myHeaders = new Headers();
    // myHeaders['Content-Type'] = 'multipart/form-data';

    // myHeaders.append("Authorization", `Bearer ${userInfo.jwtToken}`);

    // var formdata = new FormData();
    // formdata.append("aceesclient", no_of_client);
    // formdata.append("userid", userInfo.userid);
    // formdata.append("attachmentContent", selectedFile);
    // formdata.append("subscriptionprice", subs_amount);
    // formdata.append("subscriptiontype", subs_pack);
    // formdata.append("subject", "Payment Acknowledgement");
    // formdata.append("text", formattedMsg);

    // var requestOptions = {
    //   method: "PUT",
    //   headers: myHeaders,
    //   body: formdata,
    //   redirect: "follow",
    // };

    // try {
    //   const response = await fetch(`${url_}/Subscription/${userInfo.userPAN}`, requestOptions);
    //   const result = await response.text();


    //   if (response.status === 200) {
    //     swal.close();
    //     swal.fire({
    //       position: 'center',
    //       icon: 'success',
    //       title: 'Acknowledgement Submitted.!',
    //       text: "Thank you for payment.Your subscription will be activated soon.",
    //       showConfirmButton: false,
    //       timer: 7000
    //     });
    //     if (subscription_status === "not_subscribed" || subscription_status === "off") {

    //     }
    //     else {
    //       localStorage.clear();
    //       Navigate('/admin');
    //     }


    //   } else {
    //     swal.close();
    //     swal.fire("Failed!", `${result}`, "error");
    //   }
    // } catch (error) {
    //   swal.close();
    //   swal.fire("Failed!", `${error}`, "error");
    // }
  }





  return (
    // <>
    //   <div className={`${style.workport}`}>


    //     <div className={`${style.maincont}`}>

    //       <div className={`${style.mainhair}`}>
    //         <h3 className={`${style.h31}`}>RENEW SUBSCRIPTION</h3>
    //       </div>

    //       <div className={`${style.mainhead}`}>
    //         <div className={`${style.mainheadtop}`}>
    //           <h4 className={`${style.h41}`}>PAYENT DETAILS</h4>
    //         </div>

    //         <div className={`${style.mainheadbot}`}>
    //           <div className={`${style.title}`}>
    //             <p className={`${style.titlepara}`}>QR CODE</p>
    //           </div>
    //           <div className={`${style.value} d-flex align-items-center`} data-toggle="modal" data-target=".bd-example-modal-lg">
    //             <h1 className={`${style.h11}`}><i className="fa-solid fa-qrcode" onClick={handleClick}></i></h1>
    //             <h6>(Click me to Scan/Pay)</h6>
    //           </div>
    //         </div>
    //         <div className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    //           <div className="modal-dialog modal-lg">
    //             <div className="modal-content">
    //               <div className="modal-header">
    //                 {/* <h5 className="modal-title" id="exampleModalLabel">New message</h5> */}
    //                 <span type="button" className="close" data-dismiss="modal" aria-label="Close">
    //                   <span aria-hidden="true">&times;</span>
    //                 </span>
    //               </div>
    //               <div className='d-flex justify-content-center'>
    //                 <img src={qrCodeimg} alt="QR Code...." style={{ width: "30rem" }} />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <p className={`${style.pline}`} ></p>

    //         <div className={`${style.mainneck}`}>
    //           <div className={`${style.title}`}>
    //             <p className={`${style.titlepara}`}>UPI ID</p>
    //           </div>
    //           <div className={`${style.value}`}><h6 className={`${style.h61}`}>eazypay2000013502@icici</h6></div>
    //         </div>

    //         <p className={`${style.pline}`} ></p>

    //         <div className={`${style.abdobinal}`}>

    //           <div className={`${style.headtr}`}>
    //             <h6 className={`${style.titleh6}`}>BANK DETAILS</h6>
    //           </div>

    //           <div className={`${style.onerow}`}>
    //             <div className={`${style.title}`}>
    //               <p className={`${style.titlepara}`}>BANK NAME</p>
    //             </div>
    //             <div className={`${style.value}`}>
    //               <h6 className={`${style.h61}`}>ICICI BANK</h6></div>
    //           </div>

    //           <div className={`${style.onerow}`}>
    //             <div className={`${style.title}`}>
    //               <p className={`${style.titlepara}`}>ACCOUNT NAME</p>
    //             </div>
    //             <div className={`${style.value}`}>
    //               <h6 className={`${style.h61}`}>ARKONET GLOBAL SERVICES PRIVATE LIMITED</h6></div>
    //           </div>

    //           <div className={`${style.onerow}`}>
    //             <div className={`${style.title}`}>
    //               <p className={`${style.titlepara}`}>ACCOUNT NUMBER</p>
    //             </div>
    //             <div className={`${style.value}`}>
    //               <h6 className={`${style.h61}`}>016605018980</h6></div>
    //           </div>

    //           <div className={`${style.onerow}`}>
    //             <div className={`${style.title}`}>
    //               <p className={`${style.titlepara}`}>IFSC</p>
    //             </div>
    //             <div className={`${style.value}`}>
    //               <h6 className={`${style.h61}`}>ICIC0000166</h6></div>
    //           </div>

    //         </div>

    //         <p className={`${style.pline}`} ></p>

    //         <div className={`${style.message}`} >
    //           <h6 className={`${style.h62}`}>IMPORTANT</h6>
    //           <p className={`${style.para2}`}>Make payment using ARKONET QR code or using UPI ID or NEFT/RTGS/IMPS payment to Bank Account, upload payment acknowledgement receipt upon successful transaction. once you submit payment  acknowledgement receipt , it may take 48 hours to reflect payment details in TAXKO system.</p>
    //         </div>

    //         <div className={`${style.message}`} >
    //           <h6 className={`${style.h62}`}>Selected Pack</h6>
    //           <p className={`${style.para2}`}>{`${subs_pack} Clients`}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`Amount :`}&nbsp;&#8377;{`${subs_amount}`}/-</p>
    //         </div>

    //         <div className={`${style.attatchment} mb-4`}>
    //           <di className={`${style.leftitle}`}>
    //             <h6 className={`${style.h62}`}>ATTATCHMENT</h6>
    //           </di>
    //           <div className={`${style.rightcont}`}>
    //             <div className={`${style.rightconttop} mt-4`}>
    //               <label htmlFor="file">
    //                 <input className={`${style.input1}`} ref={fileInputRef} type="file" id='file' onChange={handleFileChange} />
    //                 <div className={`${style.card1}`}><p className={`${style.cardtext}`}>Upload here</p></div>
    //                 <h6 className={`${style.h}`}>{selectedFile ? selectedFile.name : "jpeg, pdf fromat accepted"}</h6></label>
    //             </div>

    //           </div>
    //         </div>

    //         <div className={`${style.btn} `}>
    //           <button className={`${style.button1} `} type="submit" onClick={submitAcknowledgement}>SUMBIT</button>
    //         </div>
    //       </div>

    //     </div>




    //   </div>

    // <>
    //   <PaymentGateway
    //     ClientContact={U_Mobile}
    //     ClientEmail={U_Email}
    //     ClientName={U_Name}
    //     ClientPan={U_Pan}
    //     Amount={subs_amount}
    //     FunctionToExcute={submitAcknowledgement}
    //   >
    //     {props.children}

    //   </PaymentGateway>
    // </>








    <div style={{
      height: "auto",
      width: "70%",
      margin: "10%",
      boxShadow: "gray 1px 1px 10px",
      marginTop: "2rem",
      marginBottom: "2rem",
      borderRadius: "50px",
    }}>
      <div className='d-flex flex-column align-items-center '>
        <h2 className='d-flex justify-content-center mt-4 mb-3' style={{ fontSize: "2em" }}>
          <b>Order Details</b>
        </h2>
      </div>
      <hr style={{ backgroundColor: "#ffd401", height: "2px", borderRadius: "5px" }} />

      <div className='d-flex justify-content-center'>
        <div style={{ width: "80%" }}>
          <div className='row'>
            <span className='col-4 '><h5 style={{ fontSize: "1.5em" }}>Name</h5></span>
            <span className='col-2 text-center'><h4>:</h4></span>
            <span className='col-6 text-center text-muted' style={{ fontSize: "1.5em" }}>{U_Name}</span>
          </div>
          <div className='row'>
            <span className='col-4 '><h5 style={{ fontSize: "1.5em" }}>PAN</h5></span>
            <span className='col-2 text-center'><h4>:</h4></span>
            <span className='col-6 text-center text-muted' style={{ fontSize: "1.5em" }}>{U_Pan}</span>
          </div>
          <div className='row'>
            <span className='col-4 '><h5 style={{ fontSize: "1.5em" }}>Email</h5></span>
            <span className='col-2 text-center'><h4>:</h4></span>
            <span className='col-6 text-center text-muted' style={{ fontSize: "1.5em" }}>{U_Email}</span>
          </div>
          <div className='row'>
            <span className='col-4 '><h5 style={{ fontSize: "1.5em" }}>Contact</h5></span>
            <span className='col-2 text-center'><h4>:</h4></span>
            <span className='col-6 text-center text-muted' style={{ fontSize: "1.5em" }}>{U_Mobile}</span>
          </div>
          <div className='row'>
            <span className='col-4 '><h5 style={{ fontSize: "1.5em" }}>Pack Type</h5></span>
            <span className='col-2 text-center'><h4>:</h4></span>
            <span className='col-6 text-center text-muted' style={{ fontSize: "1.5em" }}>{subs_pack}</span>
          </div>

          <div className='row'>
            <span className='col-4 '><h5 style={{ fontSize: "1.5em" }}>Amount</h5></span>
            <span className='col-2 text-center'><h3>:</h3></span>
            <span className='col-6 text-center ' style={{ fontSize: "1.5em" }}>{subs_amount}/-</span>
          </div>
        </div>
      </div>

      {/* <PaymentGateway
        ClientContact={U_Mobile}
        ClientEmail={U_Email}
        ClientName={U_Name}
        ClientPan={U_Pan}
        Amount={subs_amount}
        FunctionToExcute={submitAcknowledgement}
      > */}
      <div className='d-flex flex-column align-items-center '>
        <div className={`${style.btn} mb-5 d-flex justify-content-center mt-4`}>
          <button className={`${style.button1}`} type="submit" onClick={submitAcknowledgement}>
            SUBMIT
          </button>
        </div>
      </div>
      {/* </PaymentGateway> */}
    </div>



  );
}

export default Subscription;