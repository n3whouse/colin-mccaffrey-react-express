import React, { useEffect, useState } from "react";
import "../Songwriter.css";
import { client } from "../../../../sanity/client";
import { PortableText } from "@portabletext/react";

const CustomParagraph = ({ children }) => (
  <div>
    <p id="credit">{children}</p>
    <hr id="creditDivider" />
  </div>
);

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

      {creditsData.details && (
        <PortableText
          value={creditsData.details}
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

export default ColinsCredits;
