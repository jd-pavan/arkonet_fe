import React, { useState, useEffect } from 'react';
import style from './GSTR3BFilling.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { url_ } from '../../../Config';

const GSTR3BFilling = () => {

  useEffect(() => {
    Inward();
    Outward();
    ITC_Amount();
  }, []);

  const Navigate = useNavigate();
  const client_Information = useLocation().state.client_Information;
  const year = useLocation().state.year;
  const FinancStartyear = parseInt((useLocation().state.fy).split("-")[0]);
  const month = useLocation().state.month;
  const gstCategory = useLocation().state.gstCategory;


  // console.log(client_Information)
  // console.log(month)

  const [inward, setInward] = useState(0);
  const [outward, setOutward] = useState(0);
  const [itcAmount, setItcAmount] = useState({
    IGST_Amount: 0,
    CGST_Amount: 0,
    SGST_Amount: 0,
    CESS_Amount: 0
  });

  const storedToken = window.localStorage.getItem('jwtToken');

  function getMonthNumber(monthName) {
    switch (monthName.toLowerCase()) {
      case "january":
        return "01";
      case "february":
        return "02";
      case "march":
        return "03";
      case "april":
        return "04";
      case "may":
        return "05";
      case "june":
        return "06";
      case "july":
        return "07";
      case "august":
        return "08";
      case "september":
        return "09";
      case "october":
        return "10";
      case "november":
        return "11";
      case "december":
        return "12";
      default:
        return "Invalid month";
    }
  }


  console.log(getMonthNumber(month)); // Output: 03

  const MonthNumber = `${getMonthNumber(month)}`


  const Inward = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`${url_}/api/sum-of-taxable-value?bill_from_GSTIN=${client_Information.gstin}&Year=${FinancStartyear}&Month=${getMonthNumber(month)}&isAmended=False&supplytype=Inward`, requestOptions)
      const result = await response.json();
      // console.log("Inward", result)
      setInward(result)
    } catch (error) {
      console.log(error)
    }
  }

  const Outward = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`${url_}/api/sum-of-taxable-value?bill_from_GSTIN=${client_Information.gstin}&Year=${FinancStartyear}&Month=${getMonthNumber(month)}&isAmended=False&supplytype=Outward`, requestOptions)
      const result = await response.json();
      console.log("Outward", result)
      setOutward(result);
    } catch (error) {
      console.log(error)
    }
  }
  const ITC_Amount = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`${url_}/api/itc/value?bill_from_GSTIN=${client_Information.gstin}&Year=${FinancStartyear}&Month=${getMonthNumber(month)}&isAmended=False&supplytype=Inward`, requestOptions)
      const result = await response.json();
      // console.log("ITC", result)
      setItcAmount({
        IGST_Amount: result.IGST,
        SGST_Amount: result.SGST,
        CGST_Amount: result.CGST,
        CESS_Amount: 0
      })
    } catch (error) {
      console.log(error)
    }
  }
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
          <h3 className='mt-2'><b>₹<span>{inward}</span></b></h3>
        </div>
        <div className={style.GSTR3B_cards} >
          <h3><b>Inword Supply</b></h3>
          <span style={{ fontWeight: "500" }}>Exempt, Nil & Non-GST Inward Supplies</span>
          <h6 className='mt-4 mb-3'><b>Imported From GSTR-2, GSTR-2A</b></h6>
          <span className={style.GSTR3B_cards_taxable_AMt} >Taxable Amount</span>
          <h3 className='mt-2'><b>₹<span>{outward}</span></b></h3>
        </div>
        <div className={style.GSTR3B_cards} >
          <h3><b>Eligible ITC</b></h3>
          <span style={{ fontWeight: "500" }}>Eligible Input Tax Credit for the month</span>
          <h6 className='mt-4 mb-3'><b>As reported in GSTR-2, GSTR-2A</b></h6>
          <div className={style.GSTR3B_Eligible_card}>
            <div>
              <span>IGST</span>
              <h3><b>₹<span>{itcAmount.IGST_Amount}</span></b></h3>
            </div>
            <div>
              <span>CGST</span>
              <h3><b>₹<span>{itcAmount.CGST_Amount}</span></b></h3>
            </div>
            <div>
              <span>SGST</span>
              <h3><b>₹<span>{itcAmount.SGST_Amount}</span></b></h3>
            </div>
            <div>
              <span>CESS</span>
              <h3><b>₹<span>{itcAmount.CESS_Amount}</span></b></h3>
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
