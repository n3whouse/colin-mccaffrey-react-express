import React, { useState, useEffect } from "react";
import "../styles/Producer.css";
import { client } from "../../../../sanity/client";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

function GearAndPrograms() {
  const [gearAndPrograms, setGearAndPrograms] = useState("");

  function urlFor(source) {
    return builder.image(source);
  }

  useEffect(() => {
    const fetchGearAndProgramsPage = async () => {
      try {
        const data = await client.fetch(
          `*[_type == 'engineer'][0]{gearAndPrograms}`
        );
        setGearAndPrograms(data.gearAndPrograms);
      } catch (error) {
        console.error({
          message: "Error fetching Gear and Programs page: ",
          error,
        });
      }
    };
    fetchGearAndProgramsPage();
  }, []);

  return (
    <div className="gearAndPrograms">
      <div className="studioContainer">
        <h2>{gearAndPrograms.gearHeadline}</h2>
      </div>

      <PortableText value={gearAndPrograms.gearDescription} />
    </div>
  );
}

export default GearAndPrograms;
