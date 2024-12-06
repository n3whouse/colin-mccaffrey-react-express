import React, { useState, useEffect } from "react";
import { client } from "../../../sanity/client";
import { useLocation, Link } from "react-router-dom";
import "../../styles/Home.css";
import "../../styles/Navigation.css";

function SongwriterNavigation() {
  const [firstSublinkName, setFirstSublinkName] = useState("");
  const [secondSublinkName, setSecondSublinkName] = useState("");

  const location = useLocation();

  useEffect(() => {
    const fetchLinkNames = async () => {
      const data = await client.fetch(`*[_type == 'songwriter'][0]`);
      if (data && data.subnavLinks) {
        setFirstSublinkName(data.subnavLinks.subLinkOne);
        setSecondSublinkName(data.subnavLinks.subLinkTwo);
      }
    };
    fetchLinkNames();
  }, []);

  return (
    <div className="nav">
      <h2>
        <Link
          to="colins-credits"
          className={`component ${
            location.pathname === "/songwriter/colins-credits"
              ? "bold"
              : "faded"
          }`}
        >
          {"Colin's Credits" || firstSublinkName}
        </Link>{" "}
        <span className="divider">|</span>
        <Link
          to="/songwriter/streaming"
          className={`component ${
            location.pathname === "/songwriter/streaming" ? "bold" : "faded"
          }`}
        >
          {"Streaming" || secondSublinkName}
        </Link>
      </h2>
    </div>
  );
}

export default SongwriterNavigation;
