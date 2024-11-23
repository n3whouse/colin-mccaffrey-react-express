import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import BannerImage from "../../assets/ColinTeleBarnBust.png";
import Bio from "./Bio";
import Performer from "../SubNavs/Performer Subnav/Performer";
import Producer from "../SubNavs/Producer Subnav/Producer";
import Songwriter from "../SubNavs/Songwriter Subnav/Songwriter";
import BookingAndContact from "./BookingAndContact";
import Store from "./Store";
import { Link } from "react-router-dom";
import { client } from "../../sanity/client";
import Footer from "../Footer";
import UnderConstruction from "./UnderConstruction";

function Home() {
  const [activeComponent, setActiveComponent] = useState("bio");
  const [selectedComponent, setSelectedComponent] = useState(null);

  const [firstLinkName, setFirstLinkName] = useState("");
  const [secondLinkName, setSecondLinkName] = useState("");
  const [thirdLinkName, setThirdLinkName] = useState("");
  const [fourthLinkName, setFourthLinkName] = useState("");
  const [fifthLinkName, setFifthLinkName] = useState("");
  const [sixthLinkName, setSixthLinkName] = useState("");

  useEffect(() => {
    const fetchLinkNames = async () => {
      // console.log(data);
      const data = await client.fetch(
        `*[_type == 'siteSettings']{linkNames}[0]`
      );
      if (data && data.linkNames) {
        setFirstLinkName(data.linkNames.linkOne);
        setSecondLinkName(data.linkNames.linkTwo);
        setThirdLinkName(data.linkNames.linkThree);
        setFourthLinkName(data.linkNames.linkFour);
        setFifthLinkName(data.linkNames.linkFive);
        setSixthLinkName(data.linkNames.linkSix);
      }
    };
    fetchLinkNames();
  }, []);

  const handleLinkClick = (component) => {
    setActiveComponent(component);
    setSelectedComponent(component);
  };

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
            {activeComponent === "performer" && <Performer />}
            {activeComponent === "producer" && <Producer />}
            {activeComponent === "songwriter" && <Songwriter />}

            {/* UNDER CONSTRUCTION ----------- */}
            {activeComponent === "booking" && <UnderConstruction />}
            {activeComponent === "store" && <UnderConstruction />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Home;
