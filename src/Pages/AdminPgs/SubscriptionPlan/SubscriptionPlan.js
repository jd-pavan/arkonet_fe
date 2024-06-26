import React, { useEffect, useState } from 'react';
import style from './SubscriptionPlan.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
import { url_ } from '../../../Config';
import PaymentGateway from '../../../PaymentGateway';
import Subscription from '../Subscription/Subscription';

const SubscriptionPlan = () => {
  const user_subStatus = useLocation().state.USER_SUB_STATUS;
  const Navigate = useNavigate();
  const location = useLocation();
  const userPAN = localStorage.getItem("pan");
  const userName = localStorage.getItem("user_name");
  const userContact = localStorage.getItem("mobile");
  const userEmail = localStorage.getItem("email");

  // console.log(localStorage.getItem("user_name"))
  const [isVisiting, setIsVisiting] = useState(false);
  const [clientCount, setClientCount] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [plans, setPlans] = useState([]);

  const storedToken = localStorage.getItem("jwtToken")
  useEffect(() => {
    if (
      location.pathname === "/subscriptionplan" || location.pathname === "/"
    ) {
      console.log()
      setIsVisiting(true)
      // getSubscriptionPlan(true);

    }
    else {
      checkNoOfClients();
      // getSubscriptionPlan(false);
    }
    getSubscriptionPlan();

  }, [isVisiting, isPaid, clientCount])

  async function getSubscriptionPlan() {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(`${url_}/subscriptionPacks`, requestOptions);
      const result = await response.json();
      if (response.status === 200) {

        if (isPaid) {
          setPlans(result)
        }
        else if (!isVisiting && !isPaid) {
          const finalPlanArray = result.filter((item) => {
            const subtype = item.subtype.toLowerCase();
            // console.log(subtype)
            return !subtype.includes("Extra".toLowerCase())
          })
          //console.log(finalPlanArray)
          setPlans(finalPlanArray);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }


  async function checkNoOfClients() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${url_}/checkstatus/sufficient/${userPAN}`,
        requestOptions
      );
      const result = await response.json();
      if (response.status === 200) {

        setClientCount(parseInt(result.count));
        // setClientCount(800);
        setIsPaid(result.isPaid);
        // setIsPaid(true);
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }


  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleCheckboxChange = (event, index) => {


    const planHigherClient = plans[index].subtype.split("-")[1];
    // console.log(clientCount,planHigherClient)
    if (clientCount > planHigherClient) {
      swal.fire(
        {
          icon: "info",
          text: `Your existing client count ${clientCount} is which is higher than selected plan. Please select higher plan.`
        }
      )
    }
    else {
      if (selectedCheckbox === index) {
        setSelectedCheckbox(null);
      } else {
        setSelectedCheckbox(index);
      }
    }
  };

  const GOTO = () => {

    if (selectedCheckbox === null) {
      swal.fire("Please select a plan.")

    }
    else {
      // console.log(plans[selectedCheckbox])
      Navigate('subcription',
        {
          state: {
            subs_pack: plans[selectedCheckbox].subtype,
            subs_amount: plans[selectedCheckbox].subscriptionprice,
            no_of_client: plans[selectedCheckbox].accesscliet,
            user_subStatus: user_subStatus
          }
        })
    }



  }
  return (
    <div style={{ margin: "10px 70px" }} className={(location.pathname === "/subscriptionplan" || location.pathname === "/") && style.box_shadow}>

      <div className={`${style.Subplan_title}  mt-4 mb-2`}>


        <span className='font-weight-bold h4' style={{ fontSize: "3rem", cursor: "pointer" }} onClick={() => Navigate(-1)}> &#8617;&nbsp;</span>

        <h5><b>SUBSCRIPTION PLAN</b></h5>
        <span></span>
        {(
          location.pathname === "/subscriptionplan" || location.pathname === "/"
        ) && <span className={`${style.seperator}`}></span>}
      </div>

      <div className={`${style.Subplan_para} text-center display-6 mt-1`}>
        <p>
          In this digital world, subscribe to TAXKO at less than your printing paper cost. Serve your clients in a more efficient manner. Access anytime and anywhere.
        </p>
      </div>
      <div className={`${style.sub_table}`}>
        <table className="table table-striped ">
          <thead>
            <tr>
              {!isVisiting && <th scope="col" className="text-center"></th>}
              <th scope="col" className="text-center">TOTAL CLIENTS</th>
              <th scope="col" className="text-center">SUBSCRIPTIONS</th>

            </tr>
          </thead>
          <tbody>
            {plans.map((item, index) => (
              <tr key={index}>
                {!isVisiting && <td scope="row" className="text-center">
                  <input type="checkbox" name={item.subsplan} id="" checked={selectedCheckbox === index}
                    onChange={(e) => handleCheckboxChange(e, index)} value={item.value} /></td>}
                <td className='text-center'>{item.subtype}</td>
                <td className='text-center'>&#8377;{(item.subscriptionprice).toLocaleString('en-IN')}/-</td>
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
        {!isVisiting && <>

          {selectedCheckbox === null ? (

            // <div className={`d-flex justify-content-center ${style.sub_paybtn}`} onClick={GOTO}>
            //   <button>PAY NOW</button>
            // </div>
            <div className={`d-flex justify-content-center ${style.sub_paybtn}`} onClick={() => swal.fire("Please select a plan.")}>
              <button>PAY NOW</button>
            </div>
          ) : (
            // <Subscription SubTYPE={plans[selectedCheckbox].subtype} SubPRICE={plans[selectedCheckbox].subscriptionprice} AccessCLIENT={plans[selectedCheckbox].accesscliet}>
            //   <div className={`d-flex justify-content-center ${style.sub_paybtn}`} >
            //     <button>PAY NOW</button>
            //   </div>
            // </Subscription>
            <div className={`d-flex justify-content-center ${style.sub_paybtn}`} onClick={GOTO}>
              <button>PAY NOW</button>
            </div>
          )}


        </>}
      </div>
    </div>
  );
}

export default SubscriptionPlan;
