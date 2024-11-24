import React, { useEffect, useState } from "react";

import { client } from "../../../../sanity/client";

function ColinsCredits() {
  const [creditsData, setCreditsData] = useState(null);

  useEffect(() => {
    const fetchCreditsData = async () => {
      // Fetch the first songwriter document

      const data = await client.fetch(`*[_type == 'songwriter'][0]{credits}`);

      if (data && data.credits) {
        setCreditsData(data.credits);

        console.log(data.credits); // Log the credits data
      }
    };

    fetchCreditsData();
  }, []);

  if (!creditsData) {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <div className="creditsContainer">
      <h3>{creditsData.linkTwoHeadline || "Colin's Credits"}</h3>

      {creditsData.details &&
        creditsData.details.map((detail, index) => (
          <p key={index}>
            {detail.children.map((child) => child.text).join(" ")}
          </p>
        ))}
    </div>
  );
}

export default ColinsCredits;
