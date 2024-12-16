import React, { useState, useEffect } from "react";
import "../styles/Engineer.css";
import { client } from "../../../../sanity/client";
import { PortableText } from "@portabletext/react";

// Custom component to render paragraphs with a divider
const CustomParagraph = ({ children }) => (
  <div>
    <p id="credit">{children}</p>
    <hr id="creditDivider" />
  </div>
);

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
      <h1>{creditsData.productionHeadline || "Production Credits"}</h1>
      {creditsData.productionDetails && (
        <PortableText
          value={creditsData.productionDetails}
          components={{
            block: (props) => {
              if (
                props.node._type === "block" &&
                props.node.style === "normal"
              ) {
                return <CustomParagraph>{props.children}</CustomParagraph>;
              }
              return <p>{props.children}</p>;
            },
          }}
        />
      )}
    </div>
  );
}

export default ProductionCredits;
