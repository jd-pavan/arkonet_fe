import styles from "./PaymentDetails.module.css"
import profileimg from '../../../Images/profile.png'
import InputField from "../../../components/InputField/InputField";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRef } from "react";
import { url_ } from "../../../Config";
// import { file } from "jszip";

function PaymentDetails() {
  const disrtributor_pan = window.localStorage.getItem('pan');
  const storedToken = window.localStorage.getItem('jwtToken');

  const maxSize = 5;


  ////////////////////////////////////////////////////////////////////////////////////


  const [bankdatalength, setBankDataLength] = useState();
  const [imgcontent, setImgContent] = useState();

  const [bankdetails, setBankdetails] = useState({

    bankname: "",
    accountname: "",
    accountnumber: "",
    ifsc: ""
  });



  const [KYCFiles, setKYCFiles] = useState([
    {
      name: "Profile Picture",
      id: "profilepic",
      fileType: "",
      selectedFile: null,
      isExist: false,
      imgsrc: null,
      fileRef: useRef(null),
      uploadStatus: false
    },
    {
      name: "Aadhar Card",
      id: "aadhar_card",
      fileType: "",
      selectedFile: null,
      isExist: false,
      imgsrc: null,
      fileRef: useRef(null),
      uploadStatus: false
    },
    {
      name: "PAN Card",
      id: "pan_card",
      fileType: "",
      selectedFile: null,
      isExist: false,
      imgsrc: null,
      fileRef: useRef(null),
      uploadStatus: false
    },
    {
      name: "Bank Cheque",
      id: "bank_cheque",
      fileType: "",
      selectedFile: null,
      isExist: false,
      imgsrc: null,
      fileRef: useRef(null),
      uploadStatus: false
    }]);


  const bankhandleChange = (e) => {


    setBankdetails({ ...bankdetails, [e.target.name]: e.target.value });
    if (e.target.name === "accountnumber") {
      setBankdetails({ ...bankdetails, [e.target.name]: e.target.value.replace(/\D/g, "") });
      e.target.value = e.target.value.replace(/\D/g, "");

    }


  };



  const SaveBankData = async (event) => {
    console.log(KYCFiles)
    event.preventDefault();


    if (!bankdetails.bankname || !bankdetails.accountname || !bankdetails.accountnumber || !bankdetails.ifsc) {
      Swal.fire("Fill all bank details")
    }
    else {



      Swal.fire({
        title: 'Saving details',
        text: 'Please wait...',
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var formdata = new FormData();
      formdata.append("imagePathProfile", KYCFiles[0].selectedFile && KYCFiles[0].selectedFile);
      formdata.append("Bank_Name", bankdetails.bankname);
      formdata.append("AccountName", bankdetails.accountname);
      formdata.append("AccountNumber", bankdetails.accountnumber);
      formdata.append("IFSC", bankdetails.ifsc);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      try {
        const response = await fetch(`${url_}/UpdatedistributorPaymentDetails/${disrtributor_pan}`, requestOptions)
        const result = await response.text();
        if (response.status === 200) {
          Swal.close();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Details saved.!',
            showConfirmButton: false,
            timer: 5000
          });
        }
      } catch (error) { Swal.close(); console.log('error', error) };
    }
  };




  async function getImageData(updatedItems) {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };


    await fetch(`${url_}/getdistributorprofile/${disrtributor_pan}`, requestOptions)
      .then(response => response.blob())
      .then(result => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataURL = reader.result;
          updatedItems[0].imgsrc = dataURL;

          updatedItems[0].selectedFile = new File([result], `$profile.jpeg`, {
            type: "image/jpeg",
          });
        };
        reader.readAsDataURL(result);
      })
      .catch((error) => console.log(error));


    await fetch(`${url_}/getdistributoradhar/${disrtributor_pan}`, requestOptions)
      .then(response => response.blob())
      .then(result => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataURL = reader.result;
          updatedItems[1].imgsrc = dataURL;
        };
        reader.readAsDataURL(result);
      })
      .catch((error) => console.log(error));



    await fetch(`${url_}/getdistributorpan/${disrtributor_pan}`, requestOptions)
      .then(response => response.blob())
      .then(result => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataURL = reader.result;
          updatedItems[2].imgsrc = dataURL;
        };
        reader.readAsDataURL(result);
      })
      .catch((error) => console.log(error));



    await fetch(`${url_}/getdistributorcheque/${disrtributor_pan}`, requestOptions)
      .then(response => response.blob())
      .then(result => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataURL = reader.result;
          updatedItems[3].imgsrc = dataURL;
        };
        reader.readAsDataURL(result);
      })
      .catch((error) => console.log(error));

    setKYCFiles(updatedItems);


  }


  async function saveKyc(e) {
    console.log(e.target.id)
    const updatedItems = [...KYCFiles];
    const index = updatedItems.findIndex((item) => item.id === e.target.id);



    if (index !== -1) {



      Swal.fire({
        title: 'Saving details',
        text: 'Please wait...',
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var formdata = new FormData();
      formdata.append("pan", disrtributor_pan);


      let url_opt = "";
      switch (e.target.id) {
        case "aadhar_card":
          url_opt = "Kycadharimage";
          formdata.append("imagePathAdhar", KYCFiles[1].selectedFile);

          break;
        case "pan_card":
          url_opt = "Kycpanimage";
          formdata.append("imagePathpan", KYCFiles[2].selectedFile);

          break;
        case "bank_cheque":
          url_opt = "Kycchequeimage";

          formdata.append("imagePathcheque", KYCFiles[3].selectedFile);

          break;
        default:
          break;
      }


      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch(`${url_}/distributor/upload/${url_opt}`, requestOptions)
        .then(response => {
          if (response.status === 200) {
            Swal.close();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: `${KYCFiles[index].name} Saved successfully.!!`,
              showConfirmButton: false,
              timer: 5000
            });
          }
          response.text()
        }
        )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


    }





  }

  async function deleteFile(e) {

    const updatedItems = [...KYCFiles];
    const index = updatedItems.findIndex((item) => item.id === e.target.id);

    Swal.fire({
      title: 'Are you sure?',
      text: `${KYCFiles[index].name} will be Deleted .!!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        if (index !== -1) {


          let url_opt = "";
          switch (e.target.id) {
            case "aadhar_card":
              url_opt = "Kycadharimage"
              break;
            case "pan_card":
              url_opt = "Kycpanimage"
              break;
            case "bank_cheque":
              url_opt = "Kycachequeimage"
              break;
            default:
              break;
          }
          Swal.fire({
            title: 'Saving details',
            text: 'Please wait...',
            showConfirmButton: false,
            onBeforeOpen: () => {
              Swal.showLoading();
            },
          });

          var myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${storedToken}`);

          var formdata = new FormData();
          formdata.append("pan", disrtributor_pan);

          var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };

          fetch(`${url_}/distributor/delete/${url_opt}`, requestOptions)
            .then(response => {
              if (response.status === 200) {
                Swal.close();
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: `${KYCFiles[index].name} Deleted successfully.!!`,
                  showConfirmButton: false,
                  timer: 5000
                });
              }
              response.text()
            }
            )
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


        }

      }
    })



  }


  const handleFileChange = (e, fileid) => {


    const updatedItems = [...KYCFiles];
    const index = updatedItems.findIndex((item) => item.id === fileid);

    const file = e.target.files[0];


    if (file) {
      const fileSizeInBytes = file.size;
      const fileSizeInKb = fileSizeInBytes / 1024;
      const fileSizeInMb = fileSizeInKb / 1024;
      //console.log(fileSizeInBytes,":",fileSizeInKb+":",fileSizeInMb);
      if (fileSizeInMb > maxSize) {
        Swal.fire({
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


            e.target.value = '';
          }
          else {
            e.target.value = '';
          }
        });
      } else {
        const renamedFile = new File([file], `${e.target.id}.${file.type.split("/")[1]}`, {
          type: file.type,
        });
        if (
          file.type === "image/jpeg" ||
          file.type === "image/jpg" ||
          file.type === "image/png"

        ) {
          const reader = new FileReader();

          reader.onload = (e) => {
            // Get the binary data of the uploaded image
            const binaryData = e.target.result;
            // Find the index of the item with the given name


            if (index !== -1) {
              // Update the item's value
              updatedItems[index].selectedFile = renamedFile;
              if (
                file.type === "image/jpeg" ||
                file.type === "image/jpg" ||
                file.type === "image/png"
              ) {
                updatedItems[index].imgsrc = binaryData;
                updatedItems[index].fileType = "image";
              }
              // console.log(updatedItems)
              setKYCFiles(updatedItems);
            }
          };
          reader.readAsDataURL(file);
        } else {
          Swal
            .fire({
              title: `Select (JPEG or PNG ) `,
              icon: "info",
              confirmButtonText: "OK",
            })
            .then((result) => {
              if (result.isConfirmed) {
                e.target.value = "";
              } else {
                e.target.value = "";
              }
            });
        }
      }
    }

  };

  function handleSelectFile(e) {


    const fileid = e.target.id;
    const index = KYCFiles.findIndex((item) => item.id === fileid);
    // console.log(fileid,index)  

    if (index !== -1) {
      KYCFiles[index].fileRef.current.click();
    }

  }


  async function viewFile(filename) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let url_opt = "";
    switch (filename) {
      case "aadhar_card":
        url_opt = "getdistributoradhar"
        break;
      case "pan_card":
        url_opt = "getdistributorpan"
        break;
      case "bank_cheque":
        url_opt = "getdistributorcheque"
        break;
      default:
        break;
    }



    await fetch(`${url_}/${url_opt}/${disrtributor_pan}`, requestOptions)
      .then(response => response.arrayBuffer())
      .then(result => {
        const fileBlob = new Blob([result], {
          type: `image/jpeg`,
        });

        const blobUrl = URL.createObjectURL(fileBlob);
        console.log(blobUrl)


        const pdfWindow = window.open(blobUrl, "_blank");
        pdfWindow.addEventListener("beforeunload", () => {
          URL.revokeObjectURL(blobUrl);
        });
      })
      .catch((error) => console.log(error));



  }

  async function getKYCDetails() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const updatedItems = [...KYCFiles];

    await fetch(`${url_}/getdistributordetail/${disrtributor_pan}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)

        setBankdetails({
          bankname: result.bank_name,
          accountname: result.accountName,
          accountnumber: result.accountNumber,
          ifsc: result.ifsc
        })

        if (result.imageNameprofile) {
          const index = updatedItems.findIndex((item) => item.id === "profilepic");
          if (index !== -1) {

            updatedItems[index].isExist = true;
            updatedItems[index].fileType = "image";


          }
        }



        if (result.imageNameAdhar) {
          const index = updatedItems.findIndex((item) => item.id === "aadhar_card");
          if (index !== -1) {
            updatedItems[index].isExist = true;
            updatedItems[index].fileType = "image";

          }
        }


        if (result.imageNamepan) {
          const index = updatedItems.findIndex((item) => item.id === "pan_card");
          if (index !== -1) {
            updatedItems[index].isExist = true;
            updatedItems[index].fileType = "image";
          }
        }

        if (result.imageNamecheque) {
          const index = updatedItems.findIndex((item) => item.id === "bank_cheque");
          if (index !== -1) {
            updatedItems[index].isExist = true;
            updatedItems[index].fileType = "image";

          }
        }

      }).catch(error => console.log('error', error));

    getImageData(updatedItems);
  }
  useEffect(() => {
    getKYCDetails()
  }, [])

  const imageSrc = imgcontent ? `data:image/jpeg;base64,${imgcontent}` : profileimg;

  return (
    <>

    </>
  )
}
export default PaymentDetails;