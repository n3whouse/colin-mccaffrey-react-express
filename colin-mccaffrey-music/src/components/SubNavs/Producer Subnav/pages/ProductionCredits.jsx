import React, { useState, useEffect } from "react";
import "../styles/Engineer.css";
import { client } from "../../../../sanity/client";

function ProductionCredits() {
  const [creditsData, setCreditsData] = useState(null);

  useEffect(() => {
    const fetchCreditsData = async () => {
      const data = await client.fetch(
        `*[_type == 'engineer'][0]{productionCredits}`
      );

      if (data && data.productionCredits) {
        setCreditsData(data.productionCredits);

        console.log(data.productionCredits);
      }
    };

    fetchCreditsData();
  }, []);

  if (!creditsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="creditsContainer">
      <h2>{creditsData.productionHeadline || "Production Credits"}</h2>

      {creditsData.productionDetails &&
        creditsData.productionDetails.map((detail, index) => (
          <p id="credit" key={index}>
            {detail.children.map((child) => child.text).join(" ")}
            <hr id="creditDivider" />
          </p>
        ))}
    </div>
  );
}

export default ProductionCredits;
