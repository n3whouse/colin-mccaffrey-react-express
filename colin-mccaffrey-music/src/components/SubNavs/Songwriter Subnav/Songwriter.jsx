import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Streaming from "./pages/Streaming";
import ColinsCredits from "./pages/ColinsCredits";
import "./Songwriter.css";
import SongwriterNavigation from "./SongwriterNavigation";
import DocumentMeta from "react-document-meta";

function Songwriter() {
  const meta = {
    title: "Colin McCaffrey: Songwriter",
    description: `"Colin's music is steeped in a lifetime of knowledge and love for a number of great American musical traditions, and in his own musical adventures he shows keen respect for them without in the least being bound by them." -Pete Sutherland"`,
    canonical: "https://colinmccaffrey.com/songwriter",
    meta: {
      charset: "utf-8",
      name: {
        keywords:
          "Colin McCaffrey, performer, calendar, shows, videos, audio, media clips, upcoming shows",
      },
      property: {
        "og:title": "Colin McCaffrey: Songwriter",
        "og:description": `"Colin's music is steeped in a lifetime of knowledge and love for a number of great American musical traditions, and in his own musical adventures he shows keen respect for them without in the least being bound by them." -Pete Sutherland"`,
        "og:image": `https://colinmccaffrey.com/static/media/ColinTeleBarnBust.9e8f0e7a98f8872e4385.png`, //change to dynamic url if possible once home page has a link to change img
        "og:type": "website",
        "og:url": "https://colinmccaffrey.com/songwriter",
      },
    },
  };

  const location = useLocation();

  const isCreditsSelected = location.pathname === "/songwriter/credits";
  const isStreamingSelected = location.pathname === "/songwriter/streaming";

  return (
    <>
      <DocumentMeta {...meta}>
        <div className="componentContainer">
          {!isCreditsSelected && !isStreamingSelected && (
            <>
              <ColinsCredits />
              <Streaming />
            </>
          )}
          <hr />
          <Outlet />
        </div>
      </DocumentMeta>
    </>
  );
}

export default Songwriter;
