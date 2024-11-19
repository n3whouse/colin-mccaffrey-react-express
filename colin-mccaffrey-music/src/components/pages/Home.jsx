import React, { useState } from "react";
import "../styles/Home.css";
import BannerImage from "../../assets/ColinTeleBarnBust.png";
import Bio from "./Bio";
import Performer from "../SubNavs/Performer Subnav/Performer";
import Engineer from "../SubNavs/Engineer Subnav/Engineer";
import Songwriter from "../SubNavs/Songwriter Subnav/Songwriter";
import BookingAndContact from './BookingAndContact';
import Store from "./Store";
import { Link } from "react-router-dom";
import Footer from "../Footer";


function Home() {
  const [activeComponent, setActiveComponent] = useState("bio");
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleLinkClick = (component) => {
    setActiveComponent(component);
    setSelectedComponent(component);
  };

  return (

    <>
      <div className="home">

        <div className="bodyContainer">

          <img id = "headshot" src={BannerImage} alt="Colin with his Telecaster" />
            <h1 className="header">Colin McCaffrey</h1>
            <div className="nav" >
              <h1>
                <Link to="#" className={`component ${selectedComponent === 'bio' ? 'bold' : 'faded'}`} onClick={() => handleLinkClick("bio")
                }>BIO</Link> <span className="divider">|</span>
                <Link to="#" className={`component ${selectedComponent === "store" ? 'bold' : 'faded'}`} onClick={() => handleLinkClick("store")}> STORE</Link> <span className="divider">|</span>
                <Link to="#" className={`component ${selectedComponent === "booking" ? 'bold' : 'faded'}`} onClick={() => handleLinkClick("booking")}> BOOKING & CONTACT</Link><span className="divider"><br /></span>
                <Link to="#" className={`component ${selectedComponent === "performer" ? 'bold' : 'faded'}`} onClick={() => handleLinkClick("performer")}> PERFORMER</Link>  <span className="divider">|</span>
                <Link to="#" className={`component ${selectedComponent === "engineer" ? 'bold' : 'faded'}`} onClick={() => handleLinkClick("engineer")}> ENGINEER</Link> <span className="divider">|</span>
                <Link to="#" className={`component ${selectedComponent === "songwriter" ? 'bold' : 'faded'}`} onClick={() => handleLinkClick("songwriter")}> SONGWRITER</Link> 
              </h1>

              {activeComponent === "bio" && <Bio />}
              {activeComponent === "store" && <Store />}
              {activeComponent === "booking" && <BookingAndContact />}
              {activeComponent === "performer" && <Performer />}
              {activeComponent === "engineer" && <Engineer />}
              {activeComponent === "songwriter" && <Songwriter />}

            </div>

          </div>

        </div>
<Footer />
    </>


  );
}
export default Home;
