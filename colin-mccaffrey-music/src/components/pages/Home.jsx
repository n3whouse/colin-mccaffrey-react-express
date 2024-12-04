import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import BannerImage from "../../assets/ColinTeleBarnBust.png";

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
