import React, { useState, useEffect } from "react";
import "../../components/styles/Bio.css";
import "../styles/Home.css";
import { client } from "../../sanity/client";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import DocumentMeta from "react-document-meta";

const builder = imageUrlBuilder(client);

const Bio = () => {
  const [bio, setBio] = useState("");
  const [bioPic, setBioPic] = useState(null);

  function urlFor(source) {
    return builder.image(source);
  }

  const meta = {
    title: "Colin McCaffrey: Bio",
    description: "About Colin McCaffrey",
    canonical: "https://colinmccaffrey.com/bio",
    meta: {
      charSet: "utf-8",
      name: {
        keywords: "Colin, McCaffrey, engineer, producer, biography, bio",
      },
      property: {
        "og:title": "Colin McCaffrey: Bio",
        "og:description": "About Colin McCaffrey",
        "og:type": "website",
        "og:url": "https://colinmccaffrey.com/bio",
      },
    },
  };

  useEffect(() => {
    const fetchBioAndBioPic = async () => {
      try {
        const data = await client.fetch(`*[_type == 'siteSettings'][0]`);
        setBio(data.bio);

        // Check if the profilePicture exists and set the image object
        if (data.profilePicture) {
          setBioPic(data.profilePicture); // Set the entire object, not just the URL
        }
      } catch (error) {
        console.error({ message: "bio fetch failed", error });
      }
    };

    fetchBioAndBioPic();
  }, []);

  const bioPicUrl = urlFor(bioPic).url();
  return (
    <DocumentMeta {...meta}>
      <div className="bio-text">
        {bioPic && (
          <img
            src={bioPicUrl}
            className="portrait"
            alt="Headshot of Colin smiling while holding his electric guitar"
          />
        )}
        <PortableText className="bioBody" value={bio} />
      </div>
    </DocumentMeta>
  );
};

export default Bio;
