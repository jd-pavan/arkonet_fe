import React, { useState } from 'react';
import style from './SubscriptionPlan.module.css'
import { useNavigate } from 'react-router-dom';

const SubscriptionPlan = () => {
  const Navigate = useNavigate()
  const Plans = [
    {
      ttota_clients: "1-250",
      subscription: "4,000",
      subsplan: "subsName"
    },
    {
      ttota_clients: "251-500",
      subscription: "6,000",
      subsplan: "subsName"
    },
    {
      ttota_clients: "501-1000",
      subscription: "9,000",
      subsplan: "subsName"
    },
    {
      ttota_clients: "1001-1500",
      subscription: "12,000",
      subsplan: "subsName"
    },
    {
      ttota_clients: "1501-2000",
      subscription: "15,000",
      subsplan: "subsName"
    },
    {
      ttota_clients: "2001-3000",
      subscription: "20,000",
      subsplan: "subsName"
    },
    {
      ttota_clients: "3001-4000",
      subscription: "25,000",
      subsplan: "subsName"
    },
    {
      ttota_clients: "4001-5000",
      subscription: "30,000",
      subsplan: "subsName"
    },


  ]
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleCheckboxChange = (event, index) => {
    if (selectedCheckbox === index) {
      setSelectedCheckbox(null);
    } else {
      setSelectedCheckbox(index);
    }
  };

  const GOTO = (title) => {
    Navigate('subcription')
    //   , {
    //   state: {
    //     clientId: clientid,
    //     Year: year,
    //     Title: title
    //   },
    // })

  }
  return (
    <div style={{ margin: "0 70px" }}>
      <div className={`${style.Subplan_title} text-center mt-4 mb-2`}>
        <h2><b>SUBSCRIPTION PLAN</b></h2>
      </div>
      <div className={`${style.Subplan_para} text-center display-6 mt-1`}>
        <p>
          In this digital world, subscribe TAXKO at less than your printing paper cost. Serve your clients with more efficient manner. Access anytime & anywhere.
        </p>
      </div>
      <div className={`${style.sub_table}`}>
        <table class="table table-striped ">
          <thead>
            <tr>
              <th scope="col" class="text-center"></th>
              <th scope="col" class="text-center">TOTAL CLIENTS</th>
              <th scope="col" class="text-center">SUBSCRIPTIONS</th>

            </tr>
          </thead>
          <tbody>
            {Plans.map((item, index) => (
              <tr key={index}>
                <td scope="row" class="text-center"><input type="checkbox" name={item.subsplan} id="" checked={selectedCheckbox === index}
                  onChange={(e) => handleCheckboxChange(e, index)} /></td>
                <td className='text-center'>{item.ttota_clients}</td>
                <td className='text-center'>&#8377;{item.subscription}/-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>

        <div className='d-flex justify-content-end'>
          <p className={style.Subplan_para}>
            Above prices are exclusive of GST
          </p>
        </div>
        <div className={`d-flex justify-content-center ${style.sub_paybtn}`}>
          <button onClick={GOTO}>PAY NOW</button>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPlan;
