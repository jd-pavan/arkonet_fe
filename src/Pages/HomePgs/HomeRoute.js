import { useNavigate, Link, Routes, Route } from "react-router-dom";
import { useRef, useState } from "react";

import HomePage from "./HomePage/HomePage"
import SubscriptionPlan from "../AdminPgs/SubscriptionPlan/SubscriptionPlan";
import AboutUs from "./AboutUs/AboutUs";
import ContactUs from "./ContactUs/ContactUs";
import Konwledge from "./Knowledge/Knowledge";

import style from "./HomeRoute.module.css";
import arkpnet from "../../Images/Arkonet.jpg";
import taxko from "../../Images/Taxko.jpg";

import ClientAccount from "./ClientAccount/ClientAccount";
import HomePgClientRegister from "./HomePgClientRegister/HomePgClientRegister";
import Registration from "../AdminPgs/Registration/Registration";
import DemoVideo from "./DemoVideo/DemoVideo";
import ChatBot from "../../components/ChatBot/ChatBot"
import WhatsappChat from "../../components/WhatsappChat/WhatsappChat";
import Careers from "./Careers/Careers";

import HandShake from "./HandShake/HandShake";
import TermsPolicy from "./TermsPolicy/TermsPolicy";
import Footer from "./Footer/Footer"


function HomeRoute() {
  const navigate = useNavigate();

  const homeRef = useRef(null);
  const featureRef = useRef(null);
  const subscriptionRef = useRef(null);
  const contactRef = useRef(null);
  const sliderRef = useRef(null);
  const videoRef = useRef(null);
  const presentationRef = useRef(null);
  const aboutusRef = useRef(null);
  const ourTeamRef = useRef(null);

  const [isPanelActive, setIsPanelActive] = useState(false);

  const [isTermOpen, setisTermOpen] = useState(false);
  const [termOrPrivacy, setTermOrPrivacy] = useState();

  const [slideInformation, setSlideInformation] = useState(null);
  const year = new Date().getFullYear()

  const handleClick = (id, slideInfo) => {
    setIsPanelActive(false);
    switch (id) {
      case "home":
        homeRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "feature":
        featureRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "subscribe":
        subscriptionRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "contact":
        contactRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "demovideo":
        videoRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "abouttaxco":
        presentationRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "aboutus":
        aboutusRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "ourteam":
        ourTeamRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "slider":
        console.log(slideInfo);
        sliderRef.current?.scrollIntoView({ behavior: "smooth" });
        setSlideInformation(slideInfo);
        setIsPanelActive(true);
        break;
      default:
        break;
    }

    // ref.current?.scrollIntoView({behavior: 'smooth'});
  };
  function openBookDemoForm() {
    window.open("https://share.hsforms.com/1Q_HmHyIsQWeBF1G1KQ3kNQqcgs4", '_blank');
  }



  return (
    <>
      <div className={` ${style.mainrow}`}>
        <div>
          <p className={style.book_now} onClick={openBookDemoForm}>
            Book Demo
          </p>
        </div>

        <div className={`${style.header}`}>
          <div className={`${style.leftyear}`}>
            <img src={taxko} alt="" />
          </div>

          <div className={`${style.rightear}`}>
            <div className={`${style.righteartop} row`}>
              <div className="col-4">
                <h4 className={`${style.h4}`}>
                  LOGIN
                  <i
                    class="fa-solid fa-caret-right"
                    style={{ color: "#a0a7af" }}
                  ></i>
                </h4>
              </div>
              <div className="col-4">
                <button
                  className={`${style.grey}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/admin");
                  }}
                >
                  <Link>TAX PROFESSIONAL</Link>
                </button>
              </div>
              <div className="col-4">
                <button
                  className={`${style.yellow}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/client");
                  }}
                >
                  <Link>TAX PAYER</Link>
                </button>
              </div>
            </div>

            <div className={`${style.rightearbottom}`}>
              <div className="col-4">
                <h6 className={`${style.h6}`}>
                  New on TAXKO?
                  <i
                    class="fa-solid fa-caret-right"
                    style={{ color: "#a0a7af" }}
                  ></i>
                </h6>
              </div>
              <div className="col-4">
                <button className={`${style.grey}`}>
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("admin/User_registration");
                    }}
                  >
                    CREATE NEW ACCOUNT
                  </Link>
                </button>
              </div>
              <div className="col-4">
                <HomePgClientRegister />
              </div>

            </div>
          </div>
        </div>

        <div className={`${style.neckbar}`}>
          <div className={`${style.dropdown}`}>
            <Link
              className={`${style.dropbtn} ${style.neckancher}`}
              onClick={(e) => {
                e.preventDefault();
                navigate("");
              }}
              id="home"
            >
              HOME
            </Link>
            <div className={`${style.dropdowncontent} ${style.dropdown1}`}>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  navigate("aboutus");
                }}
                id="aboutus"
              >
                ABOUT US
              </Link>
            </div>
          </div>
          <div>|</div>
          <div className={`${style.neckancher}`}>
            <Link
              onClick={(e) => {
                e.preventDefault();
                navigate("feature");
              }}
              id="feature"
            >
              FEATURES
            </Link>
          </div>
          <div>|</div>
          <div className={`${style.neckancher}`}>
            <Link
              onClick={(e) => {
                e.preventDefault();
                navigate("subscriptionplan");
              }}
              id="subscriptionplan"
            >
              SUBSCRIPTION PLAN
            </Link>
          </div>
          <div>|</div>
          <div className={`${style.dropdown}`}>
            <Link className={`${style.dropbtn} ${style.neckancher}`}>
              PRODUCTS
            </Link>
            <div className={`${style.dropdowncontent} ${style.dropdown1}`}>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  navigate("abouttaxko");
                }}
                id="abouttaxko"
                className={`${style.dropbtn1} ${style.neckancher} ${style.acherline}`}
              >
                TAXKO
              </Link>
              <Link
                id="taxkoenterprise"
                className={`${style.dropbtn1} ${style.neckancher} ${style.acherline} ${style.tooltip}`}
              >
                TAXKO ENTERPRISE
                <div className={`${style.tooltiptext}`}>Comming Soon..</div>
              </Link>

              <Link className={`${style.ddancher} ${style.tooltip}`}>REVIEWS
                <div className={`${style.tooltiptext}`}>Comming Soon..</div>
              </Link>
            </div>
          </div>
          <div>|</div>
          {/* <div className={`${style.neckancher}`}>
            <Link
              onClick={(e) => {
                e.preventDefault();
                navigate("aboutus");
              }}
              id="aboutus"
            >
              ABOUT US
            </Link>
          </div>
          <div>|</div> */}
          <div className={`${style.neckancher}`}>
            <Link
              onClick={(e) => {
                e.preventDefault();
                navigate("contactus");
              }}
              id="contactus"
            >
              CONTACT US
            </Link>
          </div>
          <div>|</div>
          <div className={`${style.neckancher}`}>
            <Link
              onClick={(e) => {
                e.preventDefault();
                navigate("careers");
              }}
              id="careers"
            >
              CAREERS
            </Link>
          </div>
        </div>
        {/* </div> */}




        <Routes>
          <Route path="admin/User_registration" element={<Registration />} />
          <Route path="/HomePgClientRegister" element={<HomePgClientRegister />} />
          <Route path="" element={<HomePage />} />
          <Route path="/feature" element={<Konwledge />} />
          <Route path="/subscriptionplan" element={<SubscriptionPlan />} />
          <Route path="/abouttaxko" element={<DemoVideo />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/careers" element={<Careers />} />
        </Routes>

        <ChatBot />
        <WhatsappChat />
        <HandShake />
        {/* <TermsPolicy isOpen={isTermOpen} onClose={()=>{setisTermOpen(false)}} name={termOrPrivacy}/> */}

        {/* <div class="container">
  <footer class="py-2 my-2">
    <ul class="nav justify-content-center border-bottom pb-1 mb-1">
      <li class="nav-item"><Link to="" class="nav-link px-2 text-muted">Home</Link></li>
      <li class="nav-item"><Link class="nav-link px-2 text-muted" onClick={()=>{setTermOrPrivacy("Terms of Service");setisTermOpen(true);}}>Terms of Service</Link></li>
      <li class="nav-item"><Link class="nav-link px-2 text-muted" onClick={()=>{setTermOrPrivacy("Privacy Policy");setisTermOpen(true);}}>Privacy Policy</Link></li>
      <li class="nav-item"><Link class="nav-link px-2 text-muted">FAQs</Link></li>
      <li class="nav-item"><Link to="/aboutus" class="nav-link px-2 text-muted">About</Link></li>
    </ul>
   
  </footer>
</div> */}
        <div className={`${style.copyright}`}>
          {/* <div className={`${style.dev}`}>
            <p>Developed & Managed By</p>
          </div>
          <div className={`${style.logoimage}`}>
            <img src={arkpnet} alt="" />
          </div>
          <div className={`${style.version}`}>
            <p>Version 1.0</p>
          </div> */}
          <Footer />

        </div>
      </div>
    </>
  );
}
export default HomeRoute;
