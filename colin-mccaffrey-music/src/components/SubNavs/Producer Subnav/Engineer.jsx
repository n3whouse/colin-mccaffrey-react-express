import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Studio from "./pages/Studio";
import "../../styles/Home.css";
import "./styles/Engineer.css";
import ProductionCredits from "./pages/ProductionCredits";
import GearAndPrograms from "./pages/GearAndPrograms";
import { client } from "../../../sanity/client";

function Engineer() {
  const [activeMenuItem, setActiveMenuItem] = useState("studio");
  const [selectedItem, setSelectedItem] = useState(null);

  const [firstSublinkName, setFirstSublinkName] = useState("");
  const [secondSublinkName, setSecondSublinkName] = useState("");
  const [thirdSublinkName, setThirdSublinkName] = useState("");

  useEffect(() => {
    const fetchLinkNames = async () => {
      const data = await client.fetch(`*[_type == 'producer'][0]`);
      if (data && data.subnavLinks) {
        setFirstSublinkName(data.subnavLinks.subLinkOne);
        setSecondSublinkName(data.subnavLinks.subLinkTwo);
        setThirdSublinkName(data.subnavLinks.subLinkThree);
      }
    };
    fetchLinkNames();
  }, []);

  const handleItemClick = (item) => {
    setActiveMenuItem(item);
    setSelectedItem(item);
  };
  return (
    <div className="producer subnav bodyContainer">
      <hr />
      <h2>
        <Link
          to="#"
          className={`component ${
            selectedItem === "studio" ? "bold" : "faded"
          }`}
          onClick={() => handleItemClick("studio")}
        >
          {firstSublinkName}
        </Link>{" "}
        <span className="divider">|</span>
        <Link
          to="#"
          className={`component ${
            selectedItem === "gear and programs" ? "bold" : "faded"
          }`}
          onClick={() => handleItemClick("gear and programs")}
        >
          {" "}
          {secondSublinkName}
        </Link>{" "}
        <span className="divider">|</span>
        <Link
          to="#"
          className={`component ${
            selectedItem === "credits" ? "bold" : "faded"
          }`}
          onClick={() => handleItemClick("credits")}
        >
          {" "}
          {thirdSublinkName}
        </Link>
      </h2>

      {activeMenuItem === "studio" && <Studio />}
      {activeMenuItem === "gear and programs" && <GearAndPrograms />}
      {activeMenuItem === "credits" && <ProductionCredits />}
    </div>
  );
}

export default Engineer;
