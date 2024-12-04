import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import BannerImage from "../../assets/ColinTeleBarnBust.png";
<<<<<<< HEAD
import Bio from "./Bio";
import Performer from "../SubNavs/Performer Subnav/Performer";
import Songwriter from "../SubNavs/Songwriter Subnav/Songwriter";
import BookingAndContact from "./BookingAndContact";
import Store from "./Store";
import { Link } from "react-router-dom";
import { client } from "../../sanity/client";
import Footer from "../Footer";
import UnderConstruction from "./UnderConstruction";
import Producer from "../SubNavs/Producer Subnav/Producer";
=======
// import Bio from "./Bio";
// import Performer from "../SubNavs/Performer Subnav/Performer";
// import Producer from "../SubNavs/Producer Subnav/Producer";
// import Songwriter from "../SubNavs/Songwriter Subnav/Songwriter";
// import BookingAndContact from "./BookingAndContact";
// import Store from "./Store";
// import { Link, useNavigate } from "react-router-dom";
import { client } from "../../sanity/client";
import Footer from "../Footer";
// import UnderConstruction from "./UnderConstruction";
import Navigation from "./Navigation";
>>>>>>> 14236bab68ee23a52e33e463aea92fde5972ae71

function Home() {
  return (
    <>
      <div className="home">
        <div className="bodyContainer">
          <img
            id="headshot"
            src={BannerImage}
            alt="Colin with his Telecaster"
          />
          <h1 className="header">Colin McCaffrey</h1>
<<<<<<< HEAD
          <div className="nav">
            <h1>
              <Link
                to="#"
                className={`component ${
                  selectedComponent === "bio" ? "bold" : "faded"
                }`}
                onClick={() => handleLinkClick("bio")}
              >
                {firstLinkName}
              </Link>

              <span className="divider">|</span>

              <Link
                to="#"
                className={`component ${
                  selectedComponent === "store" ? "bold" : "faded"
                }`}
                onClick={() => handleLinkClick("store")}
              >
                {secondLinkName}
              </Link>

              <span className="divider">|</span>

              <Link
                to="#"
                className={`component ${
                  selectedComponent === "booking" ? "bold" : "faded"
                }`}
                onClick={() => handleLinkClick("booking")}
              >
                {thirdLinkName}
              </Link>

              <span className="divider">
                <br />
              </span>

              <Link
                to="#"
                className={`component ${
                  selectedComponent === "performer" ? "bold" : "faded"
                }`}
                onClick={() => handleLinkClick("performer")}
              >
                {fourthLinkName}
              </Link>

              <span className="divider">|</span>

              <Link
                to="#"
                className={`component ${
                  selectedComponent === "producer" ? "bold" : "faded"
                }`}
                onClick={() => handleLinkClick("producer")}
              >
                {fifthLinkName}
              </Link>

              <span className="divider">|</span>

              <Link
                to="#"
                className={`component ${
                  selectedComponent === "songwriter" ? "bold" : "faded"
                }`}
                onClick={() => handleLinkClick("songwriter")}
              >
                {sixthLinkName}
              </Link>
            </h1>

            {activeComponent === "bio" && <Bio />}
            {activeComponent === "store" && <Store />}
            {activeComponent === "booking" && <BookingAndContact />}
            {activeComponent === "performer" && <Performer />}
            {activeComponent === "producer" && <Producer />}
            {activeComponent === "songwriter" && <Songwriter />}

            {/* UNDER CONSTRUCTION ----------- */}
          </div>
=======
>>>>>>> 14236bab68ee23a52e33e463aea92fde5972ae71
        </div>
      </div>
    </>
  );
}
export default Home;
