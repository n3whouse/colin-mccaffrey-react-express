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
        const data = await client.fetch(`*[_id == 'siteSettings']{
          bio,
          profilePicture {
            asset->{
              _id,
              _ref,
              _type,
              altText,
              description,
              creditLine,
              "tags": opt.media.tags[]->name.current,
              title
            }
          }
        }`);

        if (data.length > 0) {
          const siteSettings = data[0]; // Access the first item in the array
          if (siteSettings.bio || "") {
            setBio(siteSettings.bio || null);
            setBioPic(siteSettings.profilePicture?.asset || null);
          }

          // Check if the profilePicture exists and set the asset object
          if (
            siteSettings.profilePicture &&
            siteSettings.profilePicture.asset
          ) {
            setBioPic(siteSettings.profilePicture.asset); // Set the entire asset object
          }
        }
      } catch (error) {
        console.error({ message: "Bio fetch failed", error });
      }
    };

    fetchBioAndBioPic();
  }, []);

  return (
    <DocumentMeta {...meta}>
      <div className="bio-text">
        <div className="image-wrapper">
          {bioPic && (
            <img
              src={urlFor(bioPic).url()}
              className="portrait"
              alt="Headshot of Colin smiling while holding his electric guitar"
            ></img>
          )}
          {bioPic && bioPic.creditLine && (
            <div className="creditContent">
              <h4>{bioPic.creditLine}</h4>
            </div>
          )}
        </div>
        <PortableText className="bioBody" value={bio} />
      </div>
    </DocumentMeta>
  );
};

export default Bio;
