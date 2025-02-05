import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Studio from "../Producer Subnav/pages/Studio";
import GearAndPrograms from "../Producer Subnav/pages/GearAndPrograms";
import ProductionCredits from "../Producer Subnav/pages/ProductionCredits";
import DocumentMeta from "react-document-meta";

function Engineer() {
  const meta = {
    title: "Colin McCaffrey: Producer",
    description:
      "Colin McCaffrey is an award-winning Vermont producer and recording engineer. Here you can find details about his studio and equipment.",
    canonical: "https://colinmccaffrey.com/producer",
    meta: {
      charset: "utf-8",
      name: {
        keywords:
          "Colin McCaffrey, performer, calendar, shows, videos, audio, media clips, upcoming shows",
      },
      property: {
        "og:title": "Colin McCaffrey: Producer",
        "og:description":
          "Colin McCaffrey is an award-winning Vermont producer and recording engineer. Here you can find details about his studio and equipment.",
        "og:image": `https://colinmccaffrey.com/static/media/ColinTeleBarnBust.9e8f0e7a98f8872e4385.png`,
        "og:type": "website",
        "og:url": "https://colinmccaffrey.com/producer",
      },
    },
  };

  const location = useLocation();

  return (
    <>
      <DocumentMeta {...meta}>
        <div className="subnav">
          {location.pathname === "/producer" && (
            <>
              <Studio />
              <GearAndPrograms />
              <ProductionCredits />
            </>
          )}
          <Outlet />
        </div>
      </DocumentMeta>
    </>
  );
}

export default Engineer;
