import { useNavigate } from "react-router-dom";
import style from "./UserSubscriptionPage.module.css";
// import taxko from "../../Images/Taxko.jpg";
// import arkonet from "../../Images/Arkonet.jpg";

const UserSubscriptionPage = () => {
  const Navigate = useNavigate();

  const GOTO = () => {
    Navigate('subscriptionplan')
    // , {
    //   state: {
    //     clientId: cid,
    //     clientname: cname,
    //     clientpan: cpan,
    //     clientCategory: ccategory,
    //     clientProfession: cprofession,
    //   },
    // });

  }
  return (
    <div className={`${style.workport}`}>

      <div className={`${style.maincont}`}>
        <div className={`${style.mainhair}`}>
          <h4 className={`${style.h31}`}>SUBSCRIPTION</h4>
        </div>

        <div className={`${style.mainhead}`}>
          <div className={`${style.circular}`}>
            <div className={`${style.card1}`}>
              <h3 className={`${style.h31}`}>244</h3>
              <p className={`${style.p1}`}>Days Left</p>
            </div>
          </div>
          <div className={`${style.mainheadtextual}`}>
            <p className={`${style.p1}`}>Subscription Ends on</p>
            <p className={`${style.p2}`}>14 April 2024</p>
          </div>
          <div className={`${style.card2}`}>
            <p className={`${style.cardp}`} onClick={GOTO}> RENEW</p>
          </div>
        </div>

        <div className={`${style.mainneck}`}>
          <div className={`${style.neckgraycard}`} >
            <div className={`${style.title}`}><p className={`${style.titlep}`}>Referred By</p></div>
            <div className={`${style.value}`}><p className={`${style.titlev}`}>Sonali Shyamkumar Goel</p></div>
          </div>
          <div className={`${style.neckgraycard}`} >
            <div className={`${style.title}`}><p className={`${style.titlep}`}>Registration Date</p></div>
            <div className={`${style.value}`}><p className={`${style.titlev}`}>27 April 2023</p></div>
          </div>
        </div>

        <div className={`${style.mainadbominal}`}>
          <div className={`${style.card3}`}>
            <p className={`${style.cardp}`} > REFER A FRIEND</p>
            <h1><i class="fa-solid fa-caret-down" style={{ color: "#707070" }}></i></h1>
          </div>
          <div className={`${style.card3}`}>
            <p className={`${style.cardp}`} > COPY REFERAL LINK</p>
          </div>
          <div className={`${style.card3}`}>
            <p className={`${style.cardp}`} > SUGGESSION</p>
          </div>
        </div>

        <div className={`${style.mainlow}`}>
          <div className={`${style.card4}`}>

            <div className={`${style.singleinput}`}>
              <div className={`${style.formtitle}`}><p className={`${style.formtitlep}`}>Name</p></div>
              <div className={`${style.formvalue}`}><input className={`${style.formvalueinput}`} type="text" /></div>
            </div>
            <div className={`${style.singleinput}`}>
              <div className={`${style.formtitle}`}><p className={`${style.formtitlep}`}>Contact Number</p></div>
              <div className={`${style.formvalue}`}><input className={`${style.formvalueinput}`} type="text" /></div>
            </div>
            <div className={`${style.singleinput}`}>
              <div className={`${style.formtitle}`}><p className={`${style.formtitlep}`}>Name</p></div>
              <div className={`${style.formvalue}`}><input className={`${style.formvalueinput}`} type="text" /></div>
            </div>

            <div className={`${style.bottomdown}`}>
              <button className={`${style.bottombtn}`}>SUMBIT</button>
            </div>

          </div>


        </div>

      </div>
    </div>
  );
}

export default UserSubscriptionPage;
