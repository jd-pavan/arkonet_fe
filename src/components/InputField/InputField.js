import React, { useState } from 'react';
import styles from './InputFields.module.css'
import ValidationError from '../ValidationError/ValidationError'
import Swal from 'sweetalert2';

const InputField = (props) => {

  const [show_hide_Pass, setShow_hide_Pass] = useState(false)
  const [inputType, setInputType] = useState("password")
  const properties = {
    placeholder: props.placeholder,
    type: props.name === "password" ? inputType : props.type,
    name: props.name,
    id: props.id,
    className: 'form-control ',
    value: props.value,
    onChange: props.onChange,
    maxLength: props.maxLength,
    autoComplete: 'off',
    disabled: props.disabled,

  }


  const handleInputChange = (event) => {
    // Prevent typing into the input field
    event.preventDefault();
  };

  const handlePaste = (event) => {
    // Prevent pasting into the input field
    event.preventDefault();
  };
  if (props.type === "date") {
    properties.max = new Date().toISOString().split('T')[0];
    properties.onKeyDown = handleInputChange;
    properties.onPaste = handlePaste;
  }
  return (
    <div className={` ${styles.inputfield} mb-4`} >
      <label htmlFor={props.id}>{props.lblname}<span className={styles.manadatory}>{props.manadatory}</span></label>
      <input
        {...properties}
      />
      {props.name == "password" && <>
        {
          show_hide_Pass ?
            <span
              className={styles.Show_hide_Pass}
              onClick={() => {
                setShow_hide_Pass(false);
                setInputType('password');
              }}>
              <i class="bi bi-eye-fill"></i>
            </span>
            :
            <span
              className={styles.Show_hide_Pass}
              onClick={() => {
                setShow_hide_Pass(true);
                setInputType('text');
              }}>
              <i class="bi bi-eye-slash-fill"></i>
            </span>
        }
      </>}

      {props.name === "name" && (
        !props.isNameNull && <ValidationError validationmsg={props.validationmsg} />
      )}
      {props.name === "email" && (
        !props.isValidEmail && <ValidationError validationmsg={props.validationmsg} />
      )}
      {props.name === "mobile" && (
        !props.isValidMobile && <ValidationError validationmsg={props.validationmsg} />
      )}
      {props.name === "pan" && (
        !props.isValidPAN && <ValidationError validationmsg={props.validationmsg} />
      )}
      {props.manadatory && (
        (props.name === "address" && !props.isAddressNull) && <ValidationError validationmsg={props.validationmsg} />
      )}

      {props.manadatory && (
        ((props.name === "pin_code" || props.name === "pin_Code") && !props.isValidPIN) && <ValidationError validationmsg={props.validationmsg} />
      )}

    </div >
  );
}

export default InputField;
