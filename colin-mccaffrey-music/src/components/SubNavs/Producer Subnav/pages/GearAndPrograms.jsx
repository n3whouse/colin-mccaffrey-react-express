import React, { useState, useEffect } from "react";
import "../styles/Engineer.css";
import { client } from "../../../../sanity/client";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

const CustomBoldWithDivider = ({ children }) => (
  <div>
    <strong>{children}</strong>
    <hr className="textDivider" /> {/* Divider only below the bold text */}
  </div>
);

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
          message: "Error fetching page: ",
          error,
        });
      }
    };
    fetchGearAndProgramsPage();
  }, []);

  return (
    <div className="studioContainer">
      <h1>{gearAndPrograms.gearHeadline}</h1>

      <PortableText
        value={gearAndPrograms.gearDetails}
        components={{
          // Custom rendering for bold text
          marks: {
            strong: (props) => (
              <CustomBoldWithDivider>{props.children}</CustomBoldWithDivider>
            ),
          },
          // Default rendering for other block types
          block: (props) => {
            return <p>{props.children}</p>; // Render normal text as a paragraph
          },
        }}
      />
    </div>
  );
}

export default GearAndPrograms;
