import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UpcomingShows from "./pages/UpcomingShows";
import Media from "./pages/Media";
import "../../styles/Home.css";
import { client } from "../../../sanity/client";

function Performer() {
  const [selectedComponent, setSelectedComponent] = useState("upcoming shows");

  const [firstSublinkName, setFirstSublinkName] = useState("");
  const [secondSublinkName, setSecondSublinkName] = useState("");

  useEffect(() => {
    const fetchLinkNames = async () => {
      const data = await client.fetch(`*[_type == 'performer'][0]`);
      if (data && data.subnavLinks) {
        setFirstSublinkName(data.subnavLinks.subLinkOne);
        setSecondSublinkName(data.subnavLinks.subLinkTwo);
      }
    };
    fetchLinkNames();
  }, []);

  const handlePerformerLinks = (component) => {
    setSelectedComponent(component);
  };
  return (
    <>
      <div>
        <hr />
        <h2>
          <Link
            to="#"
            className={`component ${
              selectedComponent === "upcoming shows" ? "bold" : "faded"
            }`}
            onClick={() => handlePerformerLinks("upcoming shows")}
          >
            Upcoming Shows
          </Link>{" "}
          <span className="divider">|</span>
          <Link
            to="#"
            className={`component ${
              selectedComponent === "media" ? "bold" : "faded"
            }`}
            onClick={() => handlePerformerLinks("media")}
          >
            {" "}
            Media
          </Link>
        </h2>
        {/* <Link to="#" className={`component ${selectedComponent === "credits" ? 'bold' : 'faded'}`} onClick={() => handlePerformerLinks("credits")}> Credits </Link></h2> */}

        {selectedComponent === "upcoming shows" && <UpcomingShows />}
        {selectedComponent === "media" && <Media />}
        {/* {selectedComponent === "credits" && <Credits />} */}
      </div>
    </>
  );
}

export default Performer;
