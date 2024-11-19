import React, { useState } from "react";
import { Link } from "react-router-dom";
import Streaming from "./pages/Streaming";
import ColinsCredits from "./pages/ColinsCredits";
import "./Songwriter.css";

function Songwriter() {
  const [selectedComponent, setSelectedComponent] = useState("streaming");

  const handleSongwriterLinks = (component) => {
    setSelectedComponent(component);
  };
  return (
    <div>
      <hr />
      <h2>
        <Link
          to="#"
          className={`component ${
            selectedComponent === "streaming" ? "bold" : "faded"
          }`}
          onClick={() => handleSongwriterLinks("streaming")}
        >
          Streaming
        </Link>{" "}
        <span className="divider">|</span>
        <Link
          to="#"
          className={`component ${
            selectedComponent === "credits" ? "bold" : "faded"
          }`}
          onClick={() => handleSongwriterLinks("credits")}
        >
          {" "}
          Credits
        </Link>
        {selectedComponent === "streaming" && <Streaming />}
        {selectedComponent === "credits" && <ColinsCredits />}
      </h2>
    </div>
  );
}

export default Songwriter;
