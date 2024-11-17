import React, { useState } from "react";
import "../styles/Home.css";
import BannerImage from "../assets/ColinTeleBarnBust.png";
import Bio from "../components/Bio";
import Performer from "../components/Performer";
import Engineer from "../components/Engineer";
import Songwriter from "../components/Songwriter";
import BookingAndContact from '../components/BookingAndContact';
import Store from "../pages/Store";
import { Link } from "react-router-dom";

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
          <div className="bioContainer">
            <h1 className="header">Colin McCaffrey</h1>
            <div className="bio nav" >
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

      </div >

    </>


  );
}
export default Home;
