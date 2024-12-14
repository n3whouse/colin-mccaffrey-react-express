import React, { useEffect, useState } from "react";
import "../Songwriter.css";
import { client } from "../../../../sanity/client";

function ColinsCredits() {
  const [creditsData, setCreditsData] = useState(null);

  useEffect(() => {
    const fetchCreditsData = async () => {
      const data = await client.fetch(`*[_type == 'songwriter'][0]{credits}`);

      if (data && data.credits) {
        setCreditsData(data.credits);

        console.log(data.credits);
      }
    };

    fetchCreditsData();
  }, []);

  if (!creditsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="creditsContainer">
      <h2>{creditsData.linkTwoHeadline || "Colin's Credits"}</h2>

      {creditsData.details &&
        creditsData.details.map((detail, index) => (
          <p id="credit" key={index}>
            {detail.children.map((child) => child.text).join(" ")}
            <hr id="creditDivider" />
          </p>
        ))}
    </div>
  );
}

export default ColinsCredits;
