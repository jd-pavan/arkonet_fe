import React from 'react';
import style from './GSTR3BFilling.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

const GSTR3BFilling = () => {
  const Navigate = useNavigate();
  const client_Information = useLocation().state.client_Information;
  const year = useLocation().state.year;
  const FinancStartyear = parseInt((useLocation().state.fy).split("-")[0]);
  const month = useLocation().state.month;
  const gstCategory = useLocation().state.gstCategory;
  return (
    <React.Fragment>
      <div className={style.GSTRB_title_div}>
        <div style={{ fontSize: "xxx-large", cursor: "pointer", color: "black" }} onClick={() => Navigate(-1)}>
          &#8617;&nbsp;
        </div>
        <div className='d-flex align-items-center'>
          <div className={style.GSTRB_title_div_A}>
            <h1 style={{ margin: "0" }}><b>GSTR-3B</b></h1>
            <span>{month.toUpperCase()}</span>
          </div>
          <div className='pl-3'>
            <h6>Monthly</h6>
          </div>
        </div>

      </div>
      <div className={style.GSTR3B_cards_div}>
        <div className={style.GSTR3B_cards} >
          <h3><b>Outword Supply</b></h3>
          <span style={{ fontWeight: "500" }}>Incl. Reverse Charge, Section 9(5), Inter State Supplies</span>
          <h6 className='mt-4 mb-3'><b>Imported From GSTR-1/IFF</b></h6>
          <span className={style.GSTR3B_cards_taxable_AMt} >Taxable Amount</span>
          <h3 className='mt-2'><b>₹<span>25,250</span></b></h3>
        </div>
        <div className={style.GSTR3B_cards} >
          <h3><b>Inword Supply</b></h3>
          <span style={{ fontWeight: "500" }}>Exempt, Nil & Non-GST Inward Supplies</span>
          <h6 className='mt-4 mb-3'><b>Imported From GSTR-2, GSTR-2A</b></h6>
          <span className={style.GSTR3B_cards_taxable_AMt} >Taxable Amount</span>
          <h3 className='mt-2'><b>₹<span>21,000</span></b></h3>
        </div>
        <div className={style.GSTR3B_cards} >
          <h3><b>Eligible ITC</b></h3>
          <span style={{ fontWeight: "500" }}>Eligible Input Tax Credit for the month</span>
          <h6 className='mt-4 mb-3'><b>As reported in GSTR-2, GSTR-2A</b></h6>
          <div className={style.GSTR3B_Eligible_card}>
            <div>
              <span>IGST</span>
              <h3><b>₹<span>2,700</span></b></h3>
            </div>
            <div>
              <span>CGST</span>
              <h3><b>₹<span>900</span></b></h3>
            </div>
            <div>
              <span>SGST</span>
              <h3><b>₹<span>900</span></b></h3>
            </div>
            <div>
              <span>CESS</span>
              <h3><b>₹<span>0</span></b></h3>
            </div>
          </div>
        </div>

      </div>
      <div className={style.GSTR3B_Footer}>
        <small>To file GSTR-3B will redirect to GST portal</small>
        <span><b>File GSTR-3B</b></span>
        <span><b>Generate JSON</b></span>
      </div>
    </React.Fragment>
  );
}

export default GSTR3BFilling;
