import React, { useState } from 'react';
import style from './Subscription.module.css'; // Import the CSS module for styling
import planqrcode from '../../../Images/ARKONET QRCODE.jpg'
import { useLocation } from 'react-router-dom';

const Subscription = () => {
  const usubscription = useLocation().state.subscription;
  const utotalClients = useLocation().state.totalClients;
  const [modalVisible, setModalVisible] = useState(false);

  const handleClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  function GoBack() {
    window.history.back(); // This will navigate to the previous page in the browser's history
  }
  return (
    <div className={`${style.workport}`}>


      <div className={`${style.maincont}`}>

        <div className={`${style.mainhair}`}>
          <div style={{ fontSize: "xxx-large", cursor: "pointer" }} onClick={GoBack}>
            &#8617;&nbsp;
          </div>
          <h3 className={`${style.h31}`}>RENEW SUBSCRIPTION</h3>
        </div>

        <div className={`${style.mainhead}`}>
          <div className={`${style.mainheadtop}`}>
            <h4 className={`${style.h41}`}>PAYENT DETAILS</h4>
          </div>

          <div className={`${style.mainheadbot}`}>
            <div className={`${style.title}`}>
              <p className={`${style.titlepara}`}>QR CODE</p>
            </div>
            <div className={`${style.value} d-flex align-items-center`}>
              <h1 className={`${style.h11}`}><i class="fa-solid fa-qrcode " data-toggle="modal" data-target="#exampleModalLong" onClick={handleClick}></i></h1>
              <h6>
                <b className='d-flex justify-content-center'>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-bar-left" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z" />
                    </svg>
                  </span>
                  <span className='ml-2'>
                    CLICK HERE TO SCAN AND PAY.
                  </span>
                </b>
              </h6>
            </div>


          </div>
          <div>

            {modalVisible && (
              <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">

                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class={` modal-body w-25`}>
                      <img src={planqrcode} alt="" style={{ width: "29rem", height: "37rem" }} />
                    </div>

                  </div>
                </div>
              </div>
            )}
          </div>
          <p className={`${style.pline}`} ></p>

          <div className={`${style.mainneck}`}>
            <div className={`${style.title}`}>
              <p className={`${style.titlepara}`}>UPI ID</p>
            </div>
            <div className={`${style.value}`}><h6 className={`${style.h61}`}>eazypay2000013502@icici</h6></div>
          </div>

          <p className={`${style.pline}`} ></p>

          <div className={`${style.abdobinal}`}>

            <div className={`${style.headtr}`}>
              <h6 className={`${style.titleh6}`}>BANK DETAILS</h6>
            </div>

            <div className={`${style.onerow}`}>
              <div className={`${style.title}`}>
                <p className={`${style.titlepara}`}>BANK NAME</p>
              </div>
              <div className={`${style.value}`}>
                <h6 className={`${style.h61}`}>ICICI BANK</h6></div>
            </div>

            <div className={`${style.onerow}`}>
              <div className={`${style.title}`}>
                <p className={`${style.titlepara}`}>ACCOUNT NAME</p>
              </div>
              <div className={`${style.value}`}>
                <h6 className={`${style.h61}`}>ARKONET GLOBAL SERVICES PRIVATE LIMITED</h6></div>
            </div>

            <div className={`${style.onerow}`}>
              <div className={`${style.title}`}>
                <p className={`${style.titlepara}`}>ACCOUNT NUMBER</p>
              </div>
              <div className={`${style.value}`}>
                <h6 className={`${style.h61}`}>016605018980</h6></div>
            </div>

            <div className={`${style.onerow}`}>
              <div className={`${style.title}`}>
                <p className={`${style.titlepara}`}>IFSC</p>
              </div>
              <div className={`${style.value}`}>
                <h6 className={`${style.h61}`}>ICIC0000166</h6></div>
            </div>

          </div>

          <p className={`${style.pline}`} ></p>

          <div className={`${style.message}`} >
            <h6 className={`${style.h62}`}>IMPORTANT</h6>
            <p className={`${style.para2}`}>Make payment using ARKONET QR code or using UPI ID or NEFT/RTGS/IMPS payment to Bank Account, upload payment acknowledgement receipt upon successful transaction. once you submit payment  acknowledgement receipt , it may take 48 hours to reflect payment details in TAXKO system.</p>
          </div>

          <div className={`${style.attatchment} mb-4`}>
            <di className={`${style.leftitle}`}>
              <h6 className={`${style.h62}`}>ATTATCHMENT</h6>
            </di>
            <div className={`${style.rightcont}`}>
              <div className={`${style.rightconttop} mt-4`}>
                <div className='mb-4'>
                  <h6>

                    You have selected subscription plan for <b>{utotalClients}</b> clients and total cost is <b>{usubscription}</b>.

                  </h6>
                </div>
                <label htmlFor="file">
                  <input className={`${style.input1}`} type="file" id='file' />
                  <div className={`${style.card1}`}><p className={`${style.cardtext}`}>Upload here</p></div>
                  <h6 className={`${style.h}`}>jpeg, pdf fromat accepted</h6>
                </label>

              </div>

            </div>
          </div>

          <div className={`${style.btn} `}>
            <button className={`${style.button1} `} type="submit">SUMBIT</button>
          </div>
        </div>






      </div>

      {/* <div className={`${style.QR}`}>
        <img src={taxko} alt="" className={style.qrimg} />
      </div> */}



    </div>
  );
}

export default Subscription;