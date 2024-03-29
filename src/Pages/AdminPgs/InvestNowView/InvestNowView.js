import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { url_ } from '../../../Config';


const InvestNowView = () => {
  const { category } = useParams();
  const { title } = useParams();
  useEffect(() => {

    InvestNowMailView();
  }, []);

  const user_id = window.localStorage.getItem('user_id');
  const storedToken = window.localStorage.getItem('jwtToken');
  const [InvestNowClientdata, setInvestNowClientdata] = useState([]);
  // const Intitle = useLocation().state.Investnowtitle;
  // const Investnowdbname = useLocation().state.Investnowdb;
  const InvestNowMailView = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${url_}/Invest/allrecords?userId=${user_id}&category=${title}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setInvestNowClientdata(result)
      })
      .catch(error => console.log('error', error));
  }
  function GoBack() {
    window.history.back(); // This will navigate to the previous page in the browser's history
  }

  return (
    <div>
      <div className='d-flex align-items-center mt-4 mb-5'>
        <div style={{ fontSize: "xxx-large", cursor: "pointer" }} onClick={GoBack}>
          &#8617;&nbsp;
        </div>
        <h4 className='align-item-ceter' style={{"minWidth":"300px"}}><b>{title}</b></h4>
        
      </div>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Subject</th>
              <th scope="col">Mobile</th>
              <th scope="col">Date</th>

            </tr>
          </thead>
          <tbody>
            {InvestNowClientdata.map(item => (
              <tr>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.subject}</td>
                <td>{item.mobile}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InvestNowView;
