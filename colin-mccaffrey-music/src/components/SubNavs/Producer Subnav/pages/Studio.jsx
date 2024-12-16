import React, { useState, useEffect } from "react";
import "../styles/Engineer.css";
import { client } from "../../../../sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";

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
        <PortableText id="studioBlurb" value={studioData.studioBlurb} />
      </div>
    </div>
  );
}

export default Studio;
