import React, { useState } from 'react';
import style from './ChangePass.module.css'
import swal from 'sweetalert2';
import { url_ } from '../../../Config';

const ChangePass = () => {


  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmpass: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const user_id = window.localStorage.getItem('user_id');
    const storedToken = window.localStorage.getItem('jwtToken');

    if (data.newPassword === data.confirmpass) {


      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${storedToken}`);

        var raw = JSON.stringify({
          "oldPassword": data.oldPassword,
          "newPassword": data.newPassword
        });

        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        const response = await fetch(`${url_}/changePassword/${user_id}`, requestOptions);

        console.log(response.status);
        if (response.status !== 200) {
          const result = await response.json();
          swal.fire("Failed!", `${result.message}`, "error");
        } else {
          swal.fire("Success", `Password changed successful.`, "success");
          setData({
            oldPassword: "",
            newPassword: "",
            confirmpass: ""
          });
        }
      } catch (error) {
        console.log(error)
      }

    } else {
      swal.fire("Failed!", "Password doesn't match!!", "error");
    }
  };



  return (
    <div>
      <div className="container">
        <div className={`${style.title} row m-5 mt-5 `}>Change Password</div>
        <div className={`${style.changePass} row m-4 d-flex flex-column `}>
          <label htmlFor="">Current Password</label>
          <input type="password" value={data.oldPassword} onChange={handleChange} name='oldPassword' placeholder='Enter registered password ....' autoComplete='off' />
        </div>
        <div className={`${style.changePass} row m-4 d-flex flex-column `}>
          <label htmlFor="">New Password</label>
          <input type="password" value={data.newPassword} onChange={handleChange} name='newPassword' placeholder='Enter new password ....' autoComplete='off' />
        </div>
        <div className={`${style.changePass} row m-4 d-flex flex-column `}>
          <label htmlFor="">Confirm Password</label>
          <input type="password" value={data.confirmpass} onChange={handleChange} name='confirmpass' placeholder='Enter confirm password ....' autoComplete='off' />
        </div>

        <div className={`row d-flex justify-content-center ${style.changePass}`}>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>


  );
}

export default ChangePass;






