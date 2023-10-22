// import "./HomePage.css";
import style from "./HomePage.module.css";
import taxko from "../Images/Taxko.jpg";
import company from "../Images/company.jpg";
import save from "../Images/save.jpg";
import introduction from "../Images/introduction.jpg";
import arkpnet from "../Images/Arkonet.jpg";
import { useNavigate,Link } from "react-router-dom";
function HomePage() {
    const navigate=useNavigate();
  return (
    <div className={` ${style.mainrow}`}>

    <div className={`${style.header}`}>
 
     <div className={`${style.leftyear}`}>
       <img src={taxko} alt="" />
     </div>
 
     <div className={`${style.rightear}`}>
     <div><h4  className={`${style.h4}`}>LOGIN</h4></div>
     <div><button className={`${style.grey}`}  onClick={(e)=>{
      e.preventDefault();
      navigate("/admin")
     }}><Link >TAX PROFESSIONAL</Link></button></div>
     <div><button className={`${style.yellow}`}
     onClick={(e)=>{
      e.preventDefault();
      navigate("/client")
     }}
     ><Link>TAX PAYER</Link></button></div>
     </div>
 
    </div>
 
 
     <div className={`${style.neckbar}`}>
       <div><a href="##">HOME</a></div>
       <div>|</div>
       <div><a href="##">PRODUCTS</a></div>
       <div>|</div>
       <div><a href="##">KNOWLEDGE</a></div>
       <div>|</div>
       <div><a href="##">DOWNLOAD</a></div>
     </div>
 
     <div id="carouselExampleControls" className={`carousel slide ${style.slider}`} data-ride="carousel">
   <div class="carousel-inner">
     <div class="carousel-item active">
       <img class="d-block w-100" src={introduction} alt="First slide"/>
     </div>
     <div class="carousel-item">
       <img class="d-block w-100" src={save} alt="Second slide"/>
     </div>
     <div class="carousel-item">
       <img class="d-block w-100" src={company} alt="Third slide"/>
     </div>
   </div>
   <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
     <span class="sr-only">Previous</span>
   </a>
   <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
     <span class="carousel-control-next-icon" aria-hidden="true"></span>
     <span class="sr-only">Next</span>
   </a>
 </div>
 
 
     <div className={`${style.para}`}>
       <p className={`${style.p}`}>
       TAXKO is the Best cloud based storage platform for all Corporate and Individual to access and manage Tax Filing data.
 We have vision of developing a software to make the Tax practicing professional life easier like Chartered Accountant/ Tax /Consultant/ Tax Return Preparer/ Accountant/ Certified Consultants/ Advocate or any person files Income Tax Return, GST or any other indirect tax practice in India and abroad.
 Our mission is to simplify finances, save money and time for millions of Indian tax professionals alongwith associated businesses and people. TAXKO is a flagship product designed and developed by ARKONET. ARKONET is a technology company that builds trusted, useful and insightful platforms for clients in India and international regions. ARKONET is a leading and most trusted IT service provider company in India.
       </p>
     </div>
 
     <div className={`${style.copyright}`}>
       <div className={`${style.dev}`}><p>Developed & Managed By</p></div>
       <div className={`${style.logoimage}`}><img src={arkpnet} alt="" /></div>
       <div className={`${style.version}`}><p>Version 1.0</p></div>
     </div>
     </div>
  );
}
export default HomePage;
