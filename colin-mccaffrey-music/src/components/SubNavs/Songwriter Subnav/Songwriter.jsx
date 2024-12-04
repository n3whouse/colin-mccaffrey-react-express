import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Streaming from "./pages/Streaming";
import ColinsCredits from "./pages/ColinsCredits";
import { client } from "../../../sanity/client"; // Adjust the path as necessary
import "./Songwriter.css";

function Songwriter() {
  const [selectedComponent, setSelectedComponent] = useState("credits");
  const [linkNames, setLinkNames] = useState({ streaming: "", credits: "" });

  useEffect(() => {
    const fetchLinkNames = async () => {
      const data = await client.fetch(`*[_type == 'songwriter'][0]`);
      if (data && data.subnavLinks) {
        setLinkNames({
          linkOne: data.subnavLinks.linkOne,
          linkTwo: data.subnavLinks.linkTwo,
        });
      }
    };
    fetchLinkNames();
  }, []);

  const handleSongwriterLinks = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="bodyContainer">
      <hr />
      <h2>
        <Link
          to="#"
          className={`component ${
            selectedComponent === "credits" ? "bold" : "faded"
          }`}
          onClick={() => handleSongwriterLinks("credits")}
        >
          {linkNames.linkOne}
        </Link>{" "}
        <span className="divider">|</span>
        <Link
          to="#"
          className={`component ${
            selectedComponent === "streaming" ? "bold" : "faded"
          }`}
          onClick={() => handleSongwriterLinks("streaming")}
        >
          {linkNames.linkTwo}
        </Link>
        {selectedComponent === "streaming" && <Streaming />}
        {selectedComponent === "credits" && <ColinsCredits />}
      </h2>
    </div>
  );
}

export default Songwriter;
