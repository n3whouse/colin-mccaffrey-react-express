import React, { useState } from "react";
import { Link } from "react-router-dom";
import Studio from "./pages/Studio";
import "../../styles/Home.css";
import ProductionCredits from "./pages/ProductionCredits";
import GearAndPrograms from "./pages/GearAndPrograms";

function Engineer() {
  const [activeMenuItem, setActiveMenuItem] = useState("studio");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveMenuItem(item);
    setSelectedItem(item);
  };
  return (
    <div className="engineer subnav">
      <hr />
      <h2>
        <Link
          to="#"
          className={`component ${
            selectedItem === "studio" ? "bold" : "faded"
          }`}
          onClick={() => handleItemClick("studio")}
        >
          Studio
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
          Gear & Programs
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
          Production Credits
        </Link>
      </h2>

      {activeMenuItem === "studio" && <Studio />}
      {activeMenuItem === "gear and programs" && <GearAndPrograms />}
      {activeMenuItem === "credits" && <ProductionCredits />}
    </div>
  );
}

export default Engineer;
