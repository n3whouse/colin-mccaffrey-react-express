import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import BannerImage from "../../assets/ColinTeleBarnBust.png";
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
        </div>
      </div>
    </>
  );
}
export default Home;
