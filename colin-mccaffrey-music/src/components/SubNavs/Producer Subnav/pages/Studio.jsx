<<<<<<< HEAD
import React from "react";
import GreenRoom from "../../../../assets/Greenroom2.jpg";
import "../styles/Engineer.css";

function Studio() {
  return (
    <div className="studioContainer">
      <h1>THE GREENROOM</h1>
      <div className="studio info">
        <img
          className="greenRoom"
          src={GreenRoom}
          alt="Colin hanging out in the Green Room surrounded by music studio equipment"
        />
        <p>
          <em>
            "Colin's music is steeped in a lifetime of knowledge and love for a
            number of great American musical traditions, and in his own musical
            adventures he shows keen respect for them without in the least being
            bound by them."
          </em>
          <br />- Pete Sutherland
        </p>

        <p>
          Colin offers his services as a producer, engineer, session musician,
          publisher and co-writer with many of the artists he works with.
          Equipped at his home studio THE GREENROOM he has the tools,
          experience, and connections to make your music come to life at a price
          you can afford.
        </p>

        <p>
          Contact Colin with questions and quotes on anything from a simple
          one-song demo to a full-length feature album project. With more than
          three decades of experience on the stage and in the studio, Colin runs
          a one-stop shop for music production. His skills include everything
          from pre-production song refinement, chart writing and arranging,
          basic tracking, overdubbing, mixing, mastering and graphic design.
        </p>
=======
import React, { useState, useEffect } from "react";
import "../styles/Engineer.css";
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
>>>>>>> 14236bab68ee23a52e33e463aea92fde5972ae71
      </div>
    </div>
  );
}

export default Studio;
