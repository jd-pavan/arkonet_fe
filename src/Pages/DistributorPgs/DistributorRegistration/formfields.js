
//List of Input Fields
const formfields = [
  {
    labelname: "Name",
    id: "name",
    name: "name",
    type: "text",
    placeholder: "Enter your name",
    mandatory: true,
    validationmsg: "Fill the name"
  },
  {
    labelname: "DOB/DOI",
    id: "datebirth",
    name: "datebirth",
    type: "date",
    placeholder: "",
    mandatory: false,
    validationmsg: ""
  },
  
  {
    labelname: "Profession",
    id: "profession",
    name: "profession",
    type: "dropdown",
    placeholder: "",
    mandatory: true,
    validationmsg: "Select Profession"
  },
  {
    labelname: "PAN",
    id: "pan",
    name: "pan",
    type: "text",
    placeholder: "Enter your PAN",
    mandatory: true,
    validationmsg: "Enter Valid PAN"
  },
  {
    labelname: "Telephone",
    id: "telephone",
    name: "telephone",
    type: "text",
    placeholder: "Enter your Telephone",
    mandatory: false,
    validationmsg: ""
  },
  {
    labelname: "Mobile",
    id: "mobile",
    name: "mobile",
    type: "text",
    placeholder: "Enter your Mobile",
    mandatory: true,
    validationmsg: "Enter Valid Mobile Number"
  },
  {
    labelname: "Email",
    id: "email",
    name: "email",
    type: "text",
    placeholder: "Enter your Email",
    mandatory: true,
    validationmsg: "Enter Valid Email"
  },
  {
    labelname: "Addresss",
    id: "address",
    name: "address",
    type: "text",
    placeholder: "Enter your address",
    mandatory: true,
    validationmsg: "Enter your address"
  },
  {
    labelname: "Pin Code",
    id: "pin_code",
    name: "pin_code",
    type: "text",
    placeholder: "Enter your pin",
    mandatory: true,
    validationmsg: "Enter valid pin"
  },
  {
    labelname: "State",
    id: "state",
    name: "state",
    type: "dropdown",
    placeholder: "",
    mandatory: true,
    validationmsg: "Select state"
  },
  {
    labelname: "WhatsApp Link",
    id: "whatsApp_Link",
    name: "whatsApp_Link",
    type: "text",
    placeholder: "Enter your whatsapp link",
    mandatory: false,
    validationmsg: ""
  },
  {
    labelname: "Nominee Name",
    id: "nomineename",
    name: "nomineename",
    type: "text",
    placeholder: "Enter nominee name",
    mandatory: false,
    validationmsg: ""
  },
  {
    labelname: "Nominee Mobile",
    id: "nomieemobile",
    name: "nomieemobile",
    type: "text",
    placeholder: "Enter nominee mobile",
    mandatory: false,
    validationmsg: "Invalid mobile"
  },
  
  {
    labelname: "Password",
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    mandatory: true,
    validationmsg: ""
  },
  {
    labelname: "Confirm Password",
    id: "confirmpassword",
    name: "confirmpassword",
    type: "password",
    placeholder: "Re-enter password",
    mandatory: true,
    validationmsg: "Password Mismatch"
  }
];
export default formfields;
