import React, { useState, useEffect } from "react";
import "../styles/Producer.css";
import { client } from "../../../../sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function Studio() {
  const [studioData, setStudioData] = useState(null);

  function urlFor(source) {
    return builder.image(source);
  }

  useEffect(() => {
    const fetchStudioPage = async () => {
      try {
        const data = await client.fetch(
          `*[_type == 'engineer'][0]{studio{studioTitle, studioPhoto, studioBlurb}}`
        );
        setStudioData(data.studio);
      } catch (error) {
        console.error({ message: "Error fetching studio data: ", error });
      }
    };

    fetchStudioPage();
  }, []);

  if (!studioData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="studioContainer">
      <h1>{studioData.studioTitle}</h1>
      <div className="studio info">
        {studioData.studioPhoto && (
          <img
            className="greenRoom"
            src={urlFor(studioData.studioPhoto).url()}
            alt={studioData.studioTitle}
          />
        )}
        {studioData.studioBlurb &&
          studioData.studioBlurb.map((block, index) => (
            <p key={index}>
              {block.children.map((child) => child.text).join(" ")}
            </p>
          ))}
      </div>
    </div>
  );
}

export default Studio;
