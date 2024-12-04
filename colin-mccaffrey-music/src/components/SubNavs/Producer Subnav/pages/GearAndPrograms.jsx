<<<<<<< HEAD
import React from "react";
import "../styles/Engineer.css";

function GearAndPrograms() {
  return (
    <div className="gearAndPrograms">
      <p>
        Colin does spoken word (podcast, audio books), ADR, commercial music,
        film-scoring and online content. Whether you record in your own home
        project studio or have tracks from a professional studio, Colin can
        edit, process and mix them to professional quality.
      </p>

      <p>
        Colin uses Pro Tools software with excellent professional level
        front-end microphones, preamps and interfaces. A host of topnotch
        plugins are at his disposal: Waves Mercury Bundle, Sony Oxford reverb
        and EQ, Melodyne pitch editing software and many more.
      </p>

      <p>
        Colin is proficient on acoustic and electric guitar, upright and
        electric bass, lap steel, dobro, mandolin, violin, viola, cello, keys,
        banjo and percussion. Colin often does overdubs for people and projects
        from all over the world. Contact him regarding rates and file sharing
        prototcol.
      </p>
=======
import React, { useState, useEffect } from "react";
import "../styles/Engineer.css";
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
          message: "Error fetching page: ",
          error,
        });
      }
    };
    fetchGearAndProgramsPage();
  }, []);

  return (
    <div className="studioContainer">
      <h2>{gearAndPrograms.gearHeadline}</h2>

      <PortableText value={gearAndPrograms.gearDetails} />
>>>>>>> 14236bab68ee23a52e33e463aea92fde5972ae71
    </div>
  );
}

export default GearAndPrograms;
