import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Studio from "../Producer Subnav/pages/Studio";
import GearAndPrograms from "../Producer Subnav/pages/GearAndPrograms";
import ProductionCredits from "../Producer Subnav/pages/ProductionCredits";

function Engineer() {
  const location = useLocation();

  return (
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
  );
}

export default Engineer;
