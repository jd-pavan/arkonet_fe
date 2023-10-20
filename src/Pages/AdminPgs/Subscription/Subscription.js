import React, { useState } from 'react';
import style from './Subscription.module.css'; // Import the CSS module for styling
import ImageModal from '../../../components/ImageModal/ImageModal'; // Import the ImageModal component
import taxko from "../../../Images/Taxko.jpg";
import arkonet from "../../../Images/Arkonet.jpg";

const Subscription = () => {

  const [modalVisible, setModalVisible] = useState(false);

  const handleClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className={`${style.workport}`}>


      <div className={`${style.maincont}`}>

        <div className={`${style.mainhair}`}>
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
              <h1 className={`${style.h11}`}><i class="fa-solid fa-qrcode" onClick={handleClick}></i></h1>
              <h6>(Click me to Scan/Pay)</h6>
            </div>
          </div>
          {modalVisible && (
            <ImageModal
              imageSrc={arkonet} // Replace 'arkonet' with the appropriate image source
              imageAlt="Arkonet"
              closeModal={closeModal}
            />
          )}
          <p className={`${style.pline}`} ></p>

          <div className={`${style.mainneck}`}>
            <div className={`${style.title}`}>
              <p className={`${style.titlepara}`}>UPI ID</p>
            </div>
            <div className={`${style.value}`}><h6 className={`${style.h61}`}>arknonet@icici</h6></div>
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
                <h6 className={`${style.h61}`}>123456789</h6></div>
            </div>

            <div className={`${style.onerow}`}>
              <div className={`${style.title}`}>
                <p className={`${style.titlepara}`}>IFSC</p>
              </div>
              <div className={`${style.value}`}>
                <h6 className={`${style.h61}`}>ICICI10000164</h6></div>
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
                <label htmlFor="file">
                  <input className={`${style.input1}`} type="file" id='file' />
                  <div className={`${style.card1}`}><p className={`${style.cardtext}`}>Upload here</p></div>
                  <h6 className={`${style.h}`}>jpeg, pdf fromat accepted</h6></label>
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