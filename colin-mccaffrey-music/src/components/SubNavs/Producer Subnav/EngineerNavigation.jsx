import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { client } from "../../../sanity/client";
import "../../styles/Home.css";
import "../../styles/Navigation.css";

function EngineerNavigation() {
  const [firstSublinkName, setFirstSublinkName] = useState("");
  const [secondSublinkName, setSecondSublinkName] = useState("");
  const [thirdSublinkName, setThirdSublinkName] = useState("");

  const meta = {
    title: "Colin McCaffrey: Producer",
    description:
      "Colin McCaffrey is an award-winning and highly-educated Vermont record producer, and here you can find his production credits and details about his studio and equipment.",
    canonical: "https://colinmccaffrey.com/producer",
    meta: {
      charSet: "utf-8",
      name: {
        keywords:
          "Colin, McCaffrey, engineer, producer, biography, bio, studio info, greenroom, gear and programs",
      },
      property: {
        "og:title": "Colin McCaffrey: Producer",
        "og:description":
          "Colin McCaffrey is an award-winning and highly-educated Vermont record producer, and here you can find his production credits and details about his studio and equipment.",
        "og:type": "website",
        "og:url": "https://colinmccaffrey.com/producer",
      },
    },
  };

  const location = useLocation();

  useEffect(() => {
    const fetchLinkNames = async () => {
      const data = await client.fetch(`*[_type == 'engineer'][0]`);
      if (data && data.subnavLinks) {
        setFirstSublinkName(data.subnavLinks.subLinkOne);
        setSecondSublinkName(data.subnavLinks.subLinkTwo);
        setThirdSublinkName(data.subnavLinks.subLinkThree);
      }
    };
    fetchLinkNames();
  }, []);

  return (
    <>
      <div className="nav">
        <h2>
          <Link
            to="/producer/studio"
            className={`component ${
              location.pathname === "/producer/studio" ? "bold" : "faded"
            }`}
          >
            {"Studio" || firstSublinkName}
          </Link>{" "}
          <span className="divider">|</span>
          <Link
            to="/producer/gear"
            className={`component ${
              location.pathname === "/producer/gear" ? "bold" : "faded"
            }`}
          >
            {" "}
            {"Gear & Software" || secondSublinkName}
          </Link>{" "}
          <span className="divider">|</span>
          <Link
            to="/producer/production-credits"
            className={`component ${
              location.pathname === "/producer/production-credits"
                ? "bold"
                : "faded"
            }`}
          >
            {" "}
            {"Production Credits" || thirdSublinkName}
          </Link>
        </h2>
      </div>
    </>
  );
}

export default EngineerNavigation;
