import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "../../styles/Home.css";
import "./styles/Engineer.css";
import EngineerNavigation from "./EngineerNavigation";
import Studio from "./pages/Studio";
import GearAndPrograms from "./pages/GearAndPrograms";
import ProductionCredits from "./pages/ProductionCredits";
import DocumentMeta from "react-document-meta";

function Engineer() {
  const meta = {
    title: "Colin McCaffrey: Producer",
    description:
      "Colin McCaffrey is a highly-skilled and award winning recording engineer with a long list of works. Here you can get a peek of the studio, his equipment, and his production resume.",
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
          "Colin McCaffrey is a highly-skilled and award winning recording engineer with a long list of works. Here you can get a peek of the studio, his equipment, and his production resume.",
        "og:image": `https://colinmccaffrey.com/static/media/ColinTeleBarnBust.9e8f0e7a98f8872e4385.png`, //change to dynamic url if possible once home page has a link to change img
        "og:type": "website",
        "og:url": "https://colinmccaffrey.com/producer",
      },
    },
  };

  const location = useLocation();

  const isStudioSelected = location.pathname === "/producer/studio";
  const isGearSelected = location.pathname === "/producer/gear";
  const isProductionCreditsSelected =
    location.pathname === "/producer/production-credits";

  return (
    <>
      <EngineerNavigation />
      <DocumentMeta {...meta}>
        <div className="producer subnav bodyContainer">
          {!isStudioSelected &&
            !isGearSelected &&
            !isProductionCreditsSelected && (
              <>
                <Studio />
                <GearAndPrograms />
                <ProductionCredits />
              </>
            )}
          <hr />
          <Outlet />
        </div>
      </DocumentMeta>
    </>
  );
}

export default Engineer;
