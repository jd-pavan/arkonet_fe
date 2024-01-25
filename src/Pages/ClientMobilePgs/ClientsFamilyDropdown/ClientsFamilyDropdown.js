import React from 'react';
import style from './ClientsFamilyDropdown.module.css'
import { useState, useEffect } from 'react';
import { url_ } from '../../../Config';

const ClientsFamilyDropdown = (props) => {
  const [isActive1, setIsActive1] = useState(false);
  const [familyData, setFamilyData] = useState([]);
  const [clientName, setClinentName] = useState(props.clientDefaultName);
  const storedToken = window.localStorage.getItem("jwtToken");


  const GetData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/getClientByFamilyId/${localStorage.getItem("familyId")}`, requestOptions)
      const result = await response.json();

      setFamilyData(result)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    GetData();
  }, [fetch]);




  const updateName = (name, cpan) => {
    // Log the selected value and name to the console
    console.log("Selected Name:", name);
    console.log("Selected PAN:", cpan);
    setClinentName(name.split(" ")[0])
    // setClinentPan(cpan)


    const keysToRemove = Object.keys(localStorage);
    const keysToKeep = ['jwtToken', 'Login_fRelation'];
    keysToRemove.forEach(key => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });

    setIsActive1(!isActive1)

    GetClientData(cpan);
  };
  const GetClientData = async (ClientPAN) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(`${url_}/pan?pan=${ClientPAN}`, requestOptions)
      const result = await response.json();
      console.log(result);
      // console.log(result.users[0].clientId)
      // console.log(result.users[0].fRelation)
      // console.log(result.users[0].familyId)
      // localStorage.setItem("fRelation", result.users[0].fRelation);
      // localStorage.setItem("familyId", result.users[0].familyId);
      // if (data.users.length > 0)
      result.users.map((item) => {
        localStorage.setItem("fRelation", item.fRelation);
        localStorage.setItem("familyId", item.familyId);
        // console.log(item.category);
        switch (item.category) {
          case "Income_Tax":
            localStorage.setItem("client_id_it", item.clientId);
            localStorage.setItem("user_id_it", item.userid);
            break;
          case "GST":
            localStorage.setItem("client_id_gst", item.clientId);
            localStorage.setItem("user_id_gst", item.userid);
            break;
          case "Both":
            console.log("both")
            localStorage.setItem("client_id_it", item.clientId);
            localStorage.setItem("client_id_gst", item.clientId);

            localStorage.setItem("user_id_it", item.userid);
            localStorage.setItem("user_id_gst", item.userid);
            break;
          default:
        }
      })
      //const client_id = data.client.clientId;            
      //localStorage.setItem("client_id", client_id);
      storeJwtData(result.users[0]);




    } catch (error) {
      console.log(error)
    }
  }
  function storeJwtData(jwtData) {
    Object.keys(jwtData).forEach((key) => {
      localStorage.setItem(key, jwtData[key]);
    });

  }

  return (
    <>

      {/* First dropdown */}
      <div className={`${style.wrapper} ${isActive1 ? 'active' : ''} `}>
        <div className={style.select_btn} onClick={() => setIsActive1(!isActive1)}>
          <span>{clientName} </span>
          {isActive1 ?
            <i className="uil uil-angle-down"></i>
            :
            <i className="uil uil-angle-up"></i>}
        </div>
        {isActive1 && <>
          <span className={style.dropdown_square}></span>
          <div className={style.content}>
            <ul className={style.options}>


              {familyData.map((items, index) => (
                <li onClick={() => updateName(items.name, items.pan)}>{items.name.split(" ")[0]}</li>
              ))}




            </ul>
          </div>
        </>}
      </div>
    </>
  );
}

export default ClientsFamilyDropdown;
