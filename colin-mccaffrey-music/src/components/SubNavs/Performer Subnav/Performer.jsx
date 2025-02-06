import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Media from "./pages/Media";
import Calendar from "./pages/Calendar";
import DocumentMeta from "react-document-meta";

function Performer() {
  //meta info for site indexing
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

  //import the useLocation tool and call it location
  const location = useLocation();

  return (
    <>
      <DocumentMeta {...meta}>
        <div className="componentContainer">
          {/* do i even need this ? check pls */}
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
