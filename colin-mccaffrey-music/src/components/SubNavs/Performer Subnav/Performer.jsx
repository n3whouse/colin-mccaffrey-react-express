import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Media from "./pages/Media";
import Calendar from "./pages/Calendar";
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
        "og:image": `https://colinmccaffrey.com/static/media/ColinTeleBarnBust.9e8f0e7a98f8872e4385.png`,
        "og:type": "website",
        "og:url": "https://colinmccaffrey.com/performer",
      },
    },
  };

  const location = useLocation();

  // Determine which component to display based on the current path
  const isCalendarSelected = location.pathname === "/performer/calendar";
  const isMediaSelected = location.pathname === "/performer/media";

  return (
    <>
      <DocumentMeta {...meta}>
        <div className="bodyContainer">
          {/* Render both components if on the main performer page */}
          {location.pathname === "/performer" && (
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
