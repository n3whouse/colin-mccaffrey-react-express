import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Media from "./pages/Media";
import "../../styles/Home.css";
import "../../styles/Navigation.css";
import { client } from "../../../sanity/client";
import Calendar from "./pages/Calendar";
import Performer from "./Performer";

function PerformerNavigation() {
  const [firstSublinkName, setFirstSublinkName] = useState("");
  const [secondSublinkName, setSecondSublinkName] = useState("");

  const location = useLocation();

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

  return (
    <>
      <div className="nav">
        <h2>
          <Link
            to="/performer/calendar"
            className={`component ${
              location.pathname === "/performer/calendar" ? "bold" : "faded"
            }`}
            // element={<Calendar />}
          >
            {firstSublinkName || "Calendar"}
          </Link>{" "}
          <span className="divider">|</span>
          <Link
            to="/performer/media"
            className={`component ${
              location.pathname === "/performer/media" ? "bold" : "faded"
            }`}
            // element={<Media />}
          >
            {" "}
            {secondSublinkName || "Media"}
          </Link>
        </h2>
      </div>
    </>
  );
}

export default PerformerNavigation;
