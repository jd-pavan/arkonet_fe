import React from "react";
import style from "./InvoicePrintTemplate.module.css";
const InvoicePrintTemplate = (props) => {
  const printinvoiceData = props.invoiceValues;
  const ItemsData = props.InvoiceItemData;
  console.log(printinvoiceData)
  const totaSumofAmount = (a, b, c, d, e, f, g, h, i) => {
    const sumIS = a + b + c + d + e + f + g + h + i;
    return sumIS;
  }





  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const scales = ['', 'thousand', 'million', 'billion', 'trillion'];

  function convertToWords(num) {
    if (num === 0) return 'zero';

    let words = '';
    let i = 0;

    while (num > 0) {
      if (num % 1000 !== 0) {
        words = convertHundreds(num % 1000) + ' ' + scales[i] + ' ' + words;
      }
      num = Math.floor(num / 1000);
      i++;
    }

    return words.trim();
  }

  function convertHundreds(num) {
    if (num > 99) {
      return ones[Math.floor(num / 100)] + ' hundred ' + convertTens(num % 100);
    } else {
      return convertTens(num);
    }
  }

  function convertTens(num) {
    if (num < 10) {
      return ones[num];
    } else if (num >= 11 && num <= 19) {
      return teens[num - 10];
    } else {
      return tens[Math.floor(num / 10)] + ' ' + ones[num % 10];
    }
  }

  // const amountInWords = convertToWords(parseInt(a));
  // console.log(amountInWords);




  return (
    <>

      <div className={style.main_page}>
        <div className={style.O_F_R}>
          <span>ORIGINAL FOR RECIPIENT</span>
        </div>
        <div className={style.main}>
          <div className={style.first}>
            <span className={style.tittle}>
              &nbsp;{printinvoiceData.bill_from_Name}
            </span>
            <span className={style.address}>
              &nbsp;{printinvoiceData.dispatch_from_Address}
            </span>
            <div className={style.details}>
              <span className={style.details_span}>
                <span className={style.first_span_name}>GSTIN </span>
                <span className={style.first_span_semicolon}>:</span>
                <span> &nbsp;{printinvoiceData.bill_from_GSTIN} </span>
              </span>
              <span className={style.details_span}>
                <span className={style.first_span_name}>Email ID</span>
                <span className={style.first_span_semicolon}>:</span>
                <span>&nbsp;{printinvoiceData.Client_GSTIN_Email} </span>
              </span>
            </div>
            <div className={style.details}>
              <span className={style.details_span}>
                <span className={style.first_span_name}>State</span>
                <span className={style.first_span_semicolon}>:</span>
                <span>&nbsp;{printinvoiceData.bill_from_State} </span>
              </span>
              <span className={style.details_span}>
                <span className={style.first_span_name}>Phone No.</span>
                <span className={style.first_span_semicolon}>:</span>
                <span>&nbsp;{printinvoiceData.Client_GSTIN_PhoneNo}</span>
              </span>
            </div>
            <div>
              <span className={style.invoice_title}>TAX INVOICE</span>
            </div>
          </div>

          <div className={style.second}>
            <div style={{ width: "50%", borderRight: "1px solid black" }}>
              <div className={style.details}>
                <span className={style.details_span}>
                  <span className={style.first_span_name}>Invoice No.</span>
                  <span className={style.first_span_semicolon}>:</span>
                  <span> &nbsp;{printinvoiceData.invoiceid}</span>
                </span>
                <span className={style.details_span}>
                  <span className={style.second_span_name_date}>Date</span>
                  <span className={style.first_span_semicolon}>:</span>
                  <span>&nbsp;{printinvoiceData.documentdate}</span>
                </span>
              </div>
              <div className={style.details}>
                <span className={style.details_span}>
                  <span className={style.first_span_name}>Bill Ref No.</span>
                  <span className={style.first_span_semicolon}>:</span>
                  <span> &nbsp;{printinvoiceData.Bill_Ref_No}</span>
                </span>
                <span className={style.details_span}>
                  <span className={style.second_span_name_date}>Date</span>
                  <span className={style.first_span_semicolon}>:</span>
                  <span> &nbsp;{printinvoiceData.documentdate}</span>
                </span>
              </div>
            </div>

            <div style={{ width: "50%" }}>
              <div className={style.details}>
                <span className={style.details_span}>
                  <span className={style.second_span_name}>
                    Dispatch Doc No.
                  </span>
                  <span className={style.first_span_semicolon}>:</span>
                  <span>&nbsp;{printinvoiceData.part_b_Transper_doc} </span>
                </span>
                <span className={style.details_span}>
                  <span className={style.second_span_name_date}>Date</span>
                  <span className={style.first_span_semicolon}>:</span>
                  <span>&nbsp;{printinvoiceData.part_b_Transper_doc_no_date}  </span>
                </span>
              </div>
              <div className={style.details}>
                <span className={style.details_span}>
                  <span className={style.second_span_name}>Payment Type</span>
                  <span className={style.first_span_semicolon}>:</span>
                  <span>&nbsp;{printinvoiceData.Payment_Type} </span>
                </span>
              </div>
            </div>
          </div>

          <div className={style.third}>
            <div style={{ width: "50%", borderRight: "1px solid black" }}>
              <div className={style.details_2}>
                <span className={style.details_span}>
                  <span className={style.second_span_name_title}>
                    Billing Details (Bill To)
                  </span>
                </span>
                <span
                  className={style.details_span}
                  style={{ padding: "7px 0px" }}
                >
                  <span className={style.second_span_name}>Name</span>
                  <span className={style.first_span_semicolon}>:</span>
                  <span> &nbsp;{printinvoiceData.bill_to_Name}</span>
                </span>

                <span
                  className={style.details_span}
                  style={{ padding: "7px 0px" }}
                >
                  <span className={style.second_span_name}>Address</span>
                  <span className={style.first_span_semicolon}>:</span>
                  <span> &nbsp;{printinvoiceData.Bill_To_Address} </span>
                </span>

                <span
                  className={style.details_span}
                  style={{ padding: "7px 0px" }}
                >
                  <span className={style.second_span_name}>State</span>
                  <span className={style.first_span_semicolon}>:</span>
                  <span>&nbsp;{printinvoiceData.bill_to_State}  </span>
                </span>
                <span
                  className={style.details_span}
                  style={{ padding: "7px 0px" }}
                >
                  <span className={style.second_span_name}>Phone No.</span>
                  <span className={style.first_span_semicolon}>:</span>
                  <span> &nbsp;{printinvoiceData.Bill_To_Phone_No} </span>
                </span>
                <span
                  className={style.details_span}
                  style={{ padding: "7px 0px" }}
                >
                  <span className={style.second_span_name}>GSTIN</span>
                  <span className={style.first_span_semicolon}>:</span>
                  <span> &nbsp;{printinvoiceData.bill_to_GSTIN} </span>
                </span>
              </div>
            </div>
            <div style={{ width: "50%" }}>
              <div className={style.details_2}>
                <span className={style.details_span}>
                  <span className={style.second_span_name_title}>
                    Shipping Details (Ship To)
                  </span>
                </span>
                <span
                  className={style.details_span}
                  style={{ padding: "7px 0px" }}
                >
                  <span className={style.second_span_name}>Name</span>
                  <span className={style.first_span_semicolon}>:</span>
                  <span>&nbsp;{printinvoiceData.bill_to_Name}  </span>
                </span>

                <span
                  className={style.details_span}
                  style={{ padding: "7px 0px" }}
                >
                  <span className={style.second_span_name}>Address</span>
                  <span className={style.first_span_semicolon}>:</span>
                  <span> &nbsp;{printinvoiceData.ship_to_Address} </span>
                </span>

                <span
                  className={style.details_span}
                  style={{ padding: "7px 0px" }}
                >
                  <span className={style.second_span_name}> State</span>
                  <span className={style.first_span_semicolon}>:</span>
                  <span> &nbsp;{printinvoiceData.ship_to_State} </span>
                </span>
                <span
                  className={style.details_span}
                  style={{ padding: "7px 0px" }}
                >
                  <span className={style.second_span_name}> Phone No.</span>
                  <span className={style.first_span_semicolon}>:</span>
                  <span>&nbsp;{printinvoiceData.Ship_To_Phone_No}  </span>
                </span>
                <span
                  className={style.details_span}
                  style={{ padding: "7px 0px" }}
                >
                  <span className={style.second_span_name}> GSTIN</span>
                  <span className={style.first_span_semicolon}>:</span>
                  <span>&nbsp;{printinvoiceData.bill_to_GSTIN}  </span>
                </span>
              </div>
            </div>
          </div>
          <div className={style.fourth}>
            <div style={{ width: "50%", borderRight: "1px solid black" }}>
              <div className={style.details}>
                <span className={style.details_span}>
                  <span className={style.first_span_name}>E-Way No</span>
                  <span className={style.first_span_semicolon}>:</span>
                  <span>&nbsp;{printinvoiceData.E_Way_No}  </span>
                </span>
              </div>
            </div>

            <div style={{ width: "50%" }}>
              <div className={style.details}>
                <span className={style.details_span}>
                  <span className={style.first_span_name}>Vehicle No</span>
                  <span className={style.first_span_semicolon}>:</span>
                  <span>&nbsp;{printinvoiceData.part_b_vechileNo}  </span>
                </span>
                <span className={style.details_span}>
                  <span className={style.first_span_name}>Destination</span>
                  <span className={style.first_span_semicolon}>:</span>
                  <span> &nbsp;{printinvoiceData.ship_to_Place} </span>
                </span>
              </div>
            </div>
          </div>
          <div className={style.fifth}>
            <div style={{ width: "100%" }}>
              <div className={style.details}>
                <span className={style.details_span}>
                  <span className={style.first_span_name}>IRN</span>
                  <span className={style.first_span_semicolon}>:</span>
                  <span> &nbsp;{printinvoiceData.IRN} </span>
                </span>
              </div>
            </div>
          </div>
          <div className={style.sixth} style={{ height: "333px", borderBottom: "1px solid black" }}>
            <table style={{ width: "100%", textAlign: "center" }}>
              <tbody>
                <tr className={style.sixth_tbl}>
                  <th rowSpan="2">SlNo </th>
                  <th rowSpan="2">Item Description</th>
                  <th rowSpan="2">HSN/SAC</th>
                  <th rowSpan="2">Qty</th>
                  <th rowSpan="2">Unit</th>
                  <th>Basic</th>
                  <th>Gross</th>
                  <th>Dis.</th>
                  <th colSpan="2">CGST + SGS</th>
                  <th rowSpan="2">Amount </th>
                </tr>
                <tr className={style.sixth_tbl}>
                  <th>
                    <small>Rate</small>
                  </th>
                  <th>
                    <small>Amount</small>
                  </th>
                  <th>
                    <small>Amount</small>
                  </th>
                  <th>
                    <small>Tax Per</small>
                  </th>
                  <th>
                    <small>Tax Amount</small>
                  </th>
                </tr>
                {ItemsData.map((item, index) => (

                  <tr className={style.sixth_tbl} key={index}>
                    <td>{index + 1}</td>
                    <td>{item.description}</td>
                    <td>{item.hsn}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td>{item.value}</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>


                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={style.seventh}>
            <div className={style.seventh_A}>
              <div className={style.seventh_A_1}>
                <div className={style.seventh_A_1_tbl}>
                  <table>
                    <tbody>
                      <tr className={style.seventh_A_1_tbl_tr}>
                        <th>TAXABLE AMT</th>
                        <th>CGST %</th>
                        <th>CGST AMT</th>
                        <th>SGST %</th>
                        <th>SGST AMT</th>
                        <th>IGST %</th>
                        <th>IGST AMT</th>
                      </tr>
                      <tr className={style.seventh_A_1_tbl_tr}>
                        <td>&nbsp;{printinvoiceData.total_taxiable_value} </td>
                        <td>&nbsp;{printinvoiceData.CGST_percentage} </td>
                        <td>&nbsp;{printinvoiceData.cgst_amount} </td>
                        <td>&nbsp;{printinvoiceData.SGST_percentage} </td>
                        <td>&nbsp;{printinvoiceData.sgst_amount} </td>
                        <td>&nbsp;{printinvoiceData.IGST_percentage} </td>
                        <td>&nbsp;{printinvoiceData.igst_amount} </td>
                      </tr>
                      <tr className={style.seventh_A_1_tbl_tr}>
                        <td className={style.seventh_A_1_tbl_t}>Total</td>
                        <td className={style.seventh_A_1_tbl_t}>CGST</td>
                        <td>&nbsp;{printinvoiceData.cgst_amount} </td>
                        <td className={style.seventh_A_1_tbl_t}>SGST</td>
                        <td> &nbsp;{printinvoiceData.sgst_amount} </td>
                        <td className={style.seventh_A_1_tbl_t}>IGST</td>
                        <td> &nbsp;{printinvoiceData.igst_amount} </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className={style.seventh_A_1_qrcode}>
                  <span> No.of Items: &nbsp;</span>
                  {/* {ItemsData.length}  */}
                  <span className={style.qrimgContainer}>
                    <img src={`data:image/png;base64,${printinvoiceData.QR_Code}`} alt="qrcode" />
                  </span>
                  <span>&nbsp;{printinvoiceData.UPI_ID}</span>
                </div>
              </div>
              <div className={style.seventh_A_2}>
                <span style={{ width: "100px", fontWeight: "bold" }}>

                  Bank Details:
                </span>

                <div style={{ width: "100%" }}>
                  <div className={style.details}>
                    <span className={style.details_span}>
                      <span className={style.seventh_A_2_span_name}>
                        Bank Name
                      </span>
                      <span className={style.first_span_semicolon}>:</span>
                      <span>&nbsp;{printinvoiceData.Bank_Name} </span>
                    </span>
                    <span className={style.details_span}>
                      <span className={style.seventh_A_2_span_name}>
                        A/c No.
                      </span>
                      <span className={style.first_span_semicolon}>:</span>
                      <span> &nbsp;{printinvoiceData.Account_No}</span>
                    </span>
                  </div>

                  <div className={style.details}>
                    <span className={style.details_span}>
                      <span className={style.seventh_A_2_span_name}>
                        Branch Name
                      </span>
                      <span className={style.first_span_semicolon}>:</span>
                      <span>&nbsp;{printinvoiceData.Bank_Branch} </span>
                    </span>
                    <span className={style.details_span}>
                      <span className={style.seventh_A_2_span_name}>IFSC</span>
                      <span className={style.first_span_semicolon}>:</span>
                      <span> &nbsp;{printinvoiceData.IFSC_Code}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.seventh_B}>
              <span className={`${style.details_span} ${style.seventh_B_w}`}>
                <span className={style.seventh_B_span_name}><b>Total Amount</b></span>
                <span className={style.first_span_semicolon}>:</span>
                <span className={style.seventh_B_span_3}>&nbsp;{printinvoiceData.total_inv_amount} </span>
              </span>
              <span className={`${style.details_span} ${style.seventh_B_w}`}>
                <span className={style.seventh_B_span_name}>Discount Amount</span>
                <span className={style.first_span_semicolon}>:</span>
                <span className={style.seventh_B_span_3}>&nbsp;{printinvoiceData.total_dis_amount}  </span>
              </span>
              <span className={`${style.details_span} ${style.seventh_B_w}`}>
                <span className={style.seventh_B_span_name}>Pre Tax</span>
                <span className={style.first_span_semicolon}>:</span>
                <span className={style.seventh_B_span_3}>&nbsp;{printinvoiceData.pre_tax_amount}  </span>
              </span>
              <span className={`${style.details_span} ${style.seventh_B_w}`}>
                <span className={style.seventh_B_span_name}>Taxable Amount</span>
                <span className={style.first_span_semicolon}>:</span>
                <span className={style.seventh_B_span_3}>&nbsp;{printinvoiceData.total_taxiable_value}  </span>
              </span>
              <span className={`${style.details_span} ${style.seventh_B_w}`}>
                <span className={style.seventh_B_span_name}>CGST Amt</span>
                <span className={style.first_span_semicolon}>:</span>
                <span className={style.seventh_B_span_3}> &nbsp;{printinvoiceData.cgst_amount} </span>
              </span>
              <span className={`${style.details_span} ${style.seventh_B_w}`}>
                <span className={style.seventh_B_span_name}>SGST Amt</span>
                <span className={style.first_span_semicolon}>:</span>
                <span className={style.seventh_B_span_3}>&nbsp;{printinvoiceData.sgst_amount}  </span>
              </span>
              <span className={`${style.details_span} ${style.seventh_B_w}`}>
                <span className={style.seventh_B_span_name}>Cess Amount</span>
                <span className={style.first_span_semicolon}>:</span>
                <span className={style.seventh_B_span_3}>&nbsp;{printinvoiceData.cess_amount}  </span>
              </span>
              <span className={`${style.details_span} ${style.seventh_B_w}`}>
                <span className={style.seventh_B_span_name}>Post Tax</span>
                <span className={style.first_span_semicolon}>:</span>
                <span className={style.seventh_B_span_3}> &nbsp;{printinvoiceData.post_amount} </span>
              </span>
              <span className={`${style.details_span} ${style.seventh_B_w}`}>
                <span className={style.seventh_B_span_name}></span>
                <span className={style.first_span_semicolon}>:</span>
                <span className={style.seventh_B_span_3}></span>
              </span>
              <span className={`${style.details_span} ${style.seventh_B_w}`}>
                <span className={style.seventh_B_span_name}>Round Off Amount</span>
                <span className={style.first_span_semicolon}>:</span>
                <span className={style.seventh_B_span_3}> &nbsp;{printinvoiceData.Round_OFF_Amount} </span>
              </span>
            </div>

          </div>
          <div className={style.eight}>
            <div className={style.eigth_A}>
              <div>
                <div className={style.details}>
                  <span className={style.details_span}>
                    <span className={style.eight_span_name_date}>
                      Amount In Words :
                    </span>
                  </span>
                </div>
                <div className={style.details}>
                  <span className={style.details_span}>
                    <span className={style.eight_span_name_date}>
                      {convertToWords(
                        totaSumofAmount(
                          printinvoiceData.total_inv_amount,
                          printinvoiceData.total_dis_amount,
                          printinvoiceData.pre_tax_amount,
                          printinvoiceData.total_taxiable_value,
                          printinvoiceData.cgst_amount,
                          printinvoiceData.sgst_amount,
                          printinvoiceData.cess_amount,
                          printinvoiceData.post_amount,
                          printinvoiceData.post_amount,
                        )
                      )} only.
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className={style.eigth_B}>
              <span
                className={`${style.details_span} ${style.seventh_B_w}`}
                style={{ padding: "5px" }}
              >
                <span className={style.seventh_B_span_name}>
                  <b>Grand Total</b>
                </span>
                <span className={style.first_span_semicolon}>:</span>
                <span className={style.seventh_B_span_3}>{totaSumofAmount(
                  printinvoiceData.total_inv_amount,
                  printinvoiceData.total_dis_amount,
                  printinvoiceData.pre_tax_amount,
                  printinvoiceData.total_taxiable_value,
                  printinvoiceData.cgst_amount,
                  printinvoiceData.sgst_amount,
                  printinvoiceData.cess_amount,
                  printinvoiceData.post_amount,
                  printinvoiceData.post_amount,
                )}</span>
              </span>
            </div>
          </div>
          <div className={style.nineth} style={{ padding: "5px" }}>
            <div className={style.nineth_A}>Terms & condition :</div>
            <div className={style.nineth_B}>
              <ol className={style.nineth_B_ol}>
                <li>
                  COMPLETION OF WORK WILL BE AFTER 1 WEEK, AFTER RECEIVING YOUR
                  PURCHASE ORDER.
                </li>
                <li>PAYMENT CONDITION 70% ADVANCE.</li>
                <li>QUOTATION VALIDITY 2 DAYS FROM THE DATE OF ISSUE.</li>
                <li>REMAINING 30% AFTER WORK COMPLETION.</li>
              </ol>
            </div>
          </div>
          <div className={style.tenth} style={{ padding: "5px" }}>
            <span> E. & O.E.</span>
          </div>
          <div className={style.eleventh}>
            <div
              className={style.eleventh_A}
              style={{ borderRight: "1px solid black" }}
            >
              <span>RECEIVED THE MATERIAL IN GOOD CONDITION</span>
              <span>RECEIVER'S SIGNATURE AND SEAL</span>
            </div>
            <div className={style.eleventh_A} style={{ textAlign: "center" }}>
              <span> For SHREE SWAMI SAMARTH FABRICATION</span>
              <span>Authorised Signatory</span>
            </div>
          </div>
        </div>


      </div>

    </>
  );
};



export default InvoicePrintTemplate;




