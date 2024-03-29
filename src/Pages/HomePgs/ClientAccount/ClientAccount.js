import { useRef, useState } from "react";
import taxko from "../../../Images/Taxko.jpg";
import style from "./ClientAccount.module.css";
import { url_ } from "../../../Config";
import swal from "sweetalert2";
import { Link } from "react-router-dom";
const ClientAccount = (props) => {
  const closemodal = useRef();
  const storedToken = localStorage.getItem("jwtToken");
  const [isValidMobile, setIsValidMobile] = useState(true)
  const [formData, setFormData] = useState({
    clientname: "",
    clientmobileno: "",
    taxprofname: "",
    taxprofmobile: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;


    switch (name) {
      case "clientmobileno":
      case "taxprofmobile":
        setFormData({ ...formData, [name]: value.replace(/\D/g, "") });
        e.target.value = value.replace(/\D/g, "");
        const mobilePattern = /^[789]\d{9}$/;
        setIsValidMobile(mobilePattern.test(e.target.value));
        break;
      default:
        setFormData({ ...formData, [name]: value });
        break;
    }
  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (
      formData.clientname === "" ||
      formData.clientmobileno === "" ||
      formData.taxprofname === "" ||
      formData.taxprofmobile === "" ||
      !/^[789]\d{9}$/.test(formData.clientmobileno) ||   //Check mobile validity
      !/^[789]\d{9}$/.test(formData.taxprofmobile) //Check mobile validity
    ) {
      swal.fire({
        text:
          formData.clientname === ""
            ? `Please enter your name.`
            : (formData.clientmobileno === "" || !(/^[789]\d{9}$/.test(formData.clientmobileno)))
              ? `Please enter valid mobile no.`
              : formData.taxprofname === ""
                ? `Please enter Tax Professional name.`
                : (formData.taxprofmobile === "" || !(/^[789]\d{9}$/.test(formData.taxprofmobile))) &&
                `Please enter valid Tax professional mobile no.`
        // :!(formData.clientmobileno.test(e.target.value))&&`Please check mobile no entered`,
      });
    } else {



      swal.fire({
        title: 'Saving details',
        text: 'Please wait...',
        showConfirmButton: false,
        onBeforeOpen: () => {
          swal.showLoading();
        },
      });


      const subject = `Client Registration : `;

      const message = `Dear Support Team,
  Greeting from TAXKO!

  I hope this message finds you well. 
  
  ${formData.clientname}(Contact No :${formData.clientmobileno}) has expressed interest in TAXKO. ${formData.clientname} has also shared the details of their tax consultant, as follows:
- Name:${formData.taxprofname}
- Contact Number:${formData.taxprofmobile}

  We place our confidence in your expertise and kindly request your assistance in reaching out to the aforementioned references to gather more information.

                    
  Best regards,

  ${formData.clientname},
  Contact no : ${formData.clientmobileno}`;




      var formdata = new FormData();
      formdata.append("subject", subject);
      formdata.append("text", message);
      formdata.append("yourname", formData.clientname);
      formdata.append("yourmobileno", formData.clientmobileno);
      formdata.append("taxprofessionalname", formData.taxprofname);
      formdata.append("taxprofessionalmobile", formData.taxprofmobile);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };


      try {
        const response = await fetch(
          `${url_}/save/Client_TaxProfessional_data`,
          requestOptions
        );
        const result = await response.text();
        if (response.status === 200) {
          swal.close();

          swal.fire({
            icon: "success",
            text: "Thank you for registering with us. We will contact you soon.",
          });
        }
      } catch (error) {
        swal.close();
        console.log(error);
      }
      clearForm()
      closemodal.current.click();
    }
  }
  function clearForm() {
    setFormData({
      clientname: "",
      clientmobileno: "",
      taxprofname: "",
      taxprofmobile: "",
    });
  }
  return (
    <>
      <span
        // className={`${style.yellow}`}
        data-toggle="modal"
        data-target="#exampleModal"
      >
        {props.children}
      </span>

      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title " id="exampleModalLabel">
                <b>WHO IS YOUR TAX PROFESSIONAL</b>
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                ref={closemodal}
                onClick={clearForm}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-header">
              <p
                style={{
                  textAlign: "center",
                  fontSize: "1rem",
                  fontWeight: "200",
                }}
              >
                Please tell us about your Tax Professional and we will let
                hom/her know you are looking for filed tax documents on TAXKO
              </p>
            </div>

            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="">YOUR NAME</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    className={`form-control ${style.inputText}`}
                    name="clientname"
                    id="clientname"
                    value={formData.clientname}
                    autocomplete="off"
                    placeholder="FULL NAME"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">YOUR MOBILE NUMBER</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    className={`form-control ${style.inputText}`}
                    value={formData.clientmobileno}
                    name="clientmobileno"
                    id="clientmobileno"
                    autocomplete="off"
                    maxLength={10}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">YOUR TAX PROFESSIONAL NAME</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    className={`form-control ${style.inputText}`}
                    name="taxprofname"
                    value={formData.taxprofname}
                    id="taxprofname"
                    autocomplete="off"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">YOUR TAX PROFESSIONAL MOBILE NUMBER</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    className={`form-control ${style.inputText}`}
                    name="taxprofmobile"
                    value={formData.taxprofmobile}
                    id="taxprofmobile"
                    autocomplete="off"
                    maxLength={10}
                  />
                </div>
              </form>
            </div>
            <div className={`modal-footer ${style.modal_footer}`}>
              {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
              <button
                type="button"
                className={`btn btn-warning ${style.btn}`}
                onClick={handleSubmit}
              >
                Submit
              </button>
              <img src={taxko} className={`${style.modalimg}`} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default ClientAccount;
