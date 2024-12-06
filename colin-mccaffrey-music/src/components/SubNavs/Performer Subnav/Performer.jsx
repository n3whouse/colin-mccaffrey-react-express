import React from "react";
// import { Link } from "react-router-dom";
import Media from "./pages/Media";
import "../../styles/Home.css";
// import { client } from "../../../sanity/client";
import Calendar from "./pages/Calendar";
import PerformerNavigation from "./PerformerNavigation";
import { Outlet, useLocation } from "react-router-dom";
import DocumentMeta from "react-document-meta";

function Performer() {
  const meta = {
    title: "Colin McCaffrey: Performer",
    description:
      "Colin McCaffrey is a seasoned veteran of the Vermont music scene. Here you can find a collection of videos, audio files, and other tidbits of his work.",
    canonical: "https://colinmccaffrey.com/performer",
    meta: {
      charset: "utf-8",
      name: {
        keywords:
          "Colin McCaffrey, performer, calendar, shows, videos, audio, media clips, upcoming shows",
      },
      property: {
        "og:title": "Colin McCaffrey: Performer",
        "og:description":
          "Colin McCaffrey is a seasoned veteran of the Vermont music scene. Here you can find a collection of videos, audio files, and other tidbits of his work.",
        "og:image": `https://colinmccaffrey.com/static/media/ColinTeleBarnBust.9e8f0e7a98f8872e4385.png`, //change to dynamic url if possible once home page has a link to change img
        "og:type": "website",
        "og:url": "https://colinmccaffrey.com/performer",
      },
    },
  };

  const location = useLocation();

  const isCalendarSelected = location.pathname === "/performer/calendar";
  const isMediaSelected = location.pathname === "/performer/media";

  return (
    <>
      <PerformerNavigation />
      <DocumentMeta {...meta}>
        <div className="bodyContainer">
          {!isCalendarSelected && !isMediaSelected && (
            <>
              <Calendar />
              <Media />
            </>
          )}

          <Outlet />
        </div>
      </DocumentMeta>
    </>
  );
}

export default Performer;
