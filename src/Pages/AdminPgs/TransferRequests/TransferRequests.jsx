import React, { useEffect, useState } from 'react';
import styles from './TransferRequests.module.css'
import { url_ } from '../../../Config';
import Swal from 'sweetalert2';

const TransferRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const storedToken = window.localStorage.getItem('jwtToken');
  const user_id = window.localStorage.getItem('user_id');
  const [clientNewRequests, setclientNewRequests] = useState([]);

  const ApproveClienttoNewUser = async (clientid) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`${url_}/change/client/updateUserId/${clientid}/${user_id}`, requestOptions)
      const result = await response.text();
      console.log(result)
      if (response.status === 200) {
        Swal.fire("Success.", "Client transfered successfully", "success")
        GetTransferRequests();
      } else {
        Swal.fire("Failed!.", "Failed to add new client", "error")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const GetTransferRequests = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${storedToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`${url_}/get/ca/client/request/${user_id}`, requestOptions)
      const result = await response.json();

      const notApprovedClients = result.filter(entry => entry.status === false);
      setclientNewRequests(notApprovedClients)
      console.log(notApprovedClients)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    GetTransferRequests();
  }, [])
  return (
    <div>
      <div className=" m-4 d-flex justify-content-center">
        <h4>Transfer Requests</h4>
      </div>
      <div className=" m-4 d-flex justify-content-center">
        <div className="col-9">
          <input
            type="text"
            className={`form - control ${styles.round}`}
            placeholder="Search Client by Name/PAN"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className={styles.search}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.transferTble} >


        <table class="table text-center">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">PAN</th>
              <th scope="col">Mobile</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>

            {clientNewRequests.filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.pan.toLowerCase().includes(searchTerm.toLowerCase())
            )
              .map((item, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.pan}</td>
                  <td>{item.mobile}</td>

                  <td className={styles.Action_Icons}>
                    {/* <i class="bi bi-x-circle-fill text-danger"></i> */}
                    <i class="bi bi-check-circle-fill text-success" onClick={() => ApproveClienttoNewUser(item.clientId)}></i>
                  </td>
                </tr>
              ))}


          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransferRequests;
