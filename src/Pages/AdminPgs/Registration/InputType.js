import React from "react";
import InputField from "../../../components/InputField/InputField";
import PasswordField from "../../../components/Password/PasswordField";
//import styles from "./Registration.module.css";
import DropDown from "../../../components/DropDown/DropDown";
import Aprofesion_obj from "../../../ObjData/AProf.json";
import States_obj from "../../../ObjData/States.json";

//Render Input Fields depending on their type 

export default class InputType extends React.Component {

  render() {



    //--------Add attributes dynamically
    const properties = {
      key: "k" + this.props.id,
      id: this.props.id,
      lblname: this.props.labelname,
      name: this.props.name,
      type: this.props.type,
      placeholder: this.props.placeholder,
      value: this.props.value,
      manadatory: this.props.mandatory ? "*" : "",
      onChange: this.props.onChange,
      validationmsg: this.props.validationmsg,
    }
    if (this.props.name === "name")
      properties.maxLength = 50;
    {
      properties.isNameNull = this.props.isNameNull;
    }
    if (this.props.name === "profession") {
      properties.value_array = Aprofesion_obj;
      properties.isProfessionNull = this.props.isProfessionNull;
    }
    if (this.props.name === "state") {
      properties.value_array = States_obj;
    }
    if (this.props.name === "email") {
      properties.isValidEmail = this.props.isValidEmail;
    }
    if (this.props.name === "mobile") {
      properties.maxLength = 10;
      properties.isValidMobile = this.props.isValidMobile;
    }
    if (this.props.name === "telephone") {
      properties.maxLength = 11;
    }
    if (this.props.name === "pan") {
      properties.maxLength = 10;
      properties.isValidPAN = this.props.isValidPAN;
    }
    if (this.props.name === "pin_code") {
      properties.maxLength = 6;
      properties.isValidPIN = this.props.isValidPIN;
    }


    if (this.props.type === "password") {
      properties.strenghtScore = this.props.strenghtScore;
      properties.isPasswordMatch = this.props.isPasswordMatch;
    }

    //Text and Date Fields
    if (this.props.type === "text" || this.props.type === "date") {
      return (
        <InputField
          {...properties}
        />
      );
    }

    //Password Field
    else if (this.props.type === "password") {
      return (
        <PasswordField
          {...properties}
        />
      );
    }

    //DropDown Field
    else if (this.props.type === "dropdown") {
      return (
        <DropDown
          {...properties}
        />
      );
    }
  }
}
