import React from "react";
import "../styles/UnderConstruction.css";
import UNDERCONSTRUCTION from "../../assets/UNDERCONSTRUCTION.jpg";
function UnderConstruction() {
  return (
    <>
      <div className="underConstruction">
        <h2>This page is down for maintenance for now.</h2>
        <img src={UNDERCONSTRUCTION} alt="under construction" />
        <h3>We will be back soon!</h3>
      </div>
    </>
  );
}

export default UnderConstruction;
