import React, { useState, useEffect } from "react";
import Bio from "./Bio";
import Performer from "../SubNavs/Performer Subnav/Performer";
import Engineer from "../SubNavs/Producer Subnav/Engineer";
import Songwriter from "../SubNavs/Songwriter Subnav/Songwriter";
import BookingAndContact from "./BookingAndContact";
import Store from "./Store";
import { Link, useNavigate } from "react-router-dom";
import { client } from "../../sanity/client";
import Footer from "../Footer";
// import "../styles/Bio.css";
import UnderConstruction from "./UnderConstruction";

function Navigation() {
  const [activeComponent, setActiveComponent] = useState("");
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

  // const handleLinkClick = (component) => {
  //   setActiveComponent(component);
  //   setSelectedComponent(component);
  // };

  return (
    <div className="nav">
      <h1>
        <Link
          to="/bio"
          className={`component ${
            selectedComponent === "bio" ? "bold" : "faded"
          }`}
          // onClick={() => handleLinkClick("bio")}
        >
          {firstLinkName}
        </Link>

        <span className="divider">|</span>

        <Link
          to="/store"
          className={`component ${
            selectedComponent === "store" ? "bold" : "faded"
          }`}
          // onClick={() => handleLinkClick("store")}
        >
          {secondLinkName}
        </Link>

        <span className="divider">|</span>

        <Link
          to="/booking-and-contact"
          className={`component ${
            selectedComponent === "booking" ? "bold" : "faded"
          }`}
          // onClick={() => handleLinkClick("booking")}
        >
          {thirdLinkName}
        </Link>

        <span className="divider">
          <br />
        </span>

        <Link
          to="/performer"
          className={`component ${
            selectedComponent === "performer" ? "bold" : "faded"
          }`}
          // onClick={() => handleLinkClick("performer")}
        >
          {fourthLinkName}
        </Link>

        <span className="divider">|</span>

        <Link
          to="/engineer"
          className={`component ${
            selectedComponent === "engineer" ? "bold" : "faded"
          }`}
          // onClick={() => handleLinkClick("engineer")}
        >
          {fifthLinkName}
        </Link>

        <span className="divider">|</span>

        <Link
          to="/songwriter"
          className={`component ${
            selectedComponent === "songwriter" ? "bold" : "faded"
          }`}
          // onClick={() => handleLinkClick("songwriter")}
        >
          {sixthLinkName}
        </Link>
      </h1>

      {activeComponent === "bio" && <Bio />}
      {activeComponent === "booking" && <BookingAndContact />}
      {activeComponent === "performer" && <Performer />}
      {activeComponent === "engineer" && <Engineer />}
      {activeComponent === "songwriter" && <Songwriter />}
      {activeComponent === "store" && <Store />}

      {/* UNDER CONSTRUCTION ----------- */}
    </div>
  );
}

export default Navigation;
