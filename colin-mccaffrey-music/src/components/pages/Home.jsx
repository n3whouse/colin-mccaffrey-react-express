import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import "../../App.css";
import BannerImage from "../../assets/ColinTeleBarnBust.png";
import DocumentMeta from "react-document-meta";
import { client } from "../../sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

const Home = () => {
  const [headshot, setHeadshot] = useState(null);
  const [photoCredit, setPhotoCredit] = useState("");

  function urlFor(source) {
    return builder.image(source);
  }

  // meta for site indexing
  const meta = {
    title: "Colin McCaffrey",
    description:
      "Official website of Vermont native and award-winning singer-songwriter and recording engineer, Colin McCaffrey.",
    canonical: "https://colinmccaffrey.com/home",
    meta: {
      charset: "utf-8",
      name: {
        keywords:
          "Colin McCaffrey, engineer, songwriter, performer, shows, musician",
      },
      property: {
        "og:title": "Colin McCaffrey: Home",
        "og:description":
          "Official website of Vermont native and award-winning singer-songwriter and recording engineer, Colin McCaffrey.",
        "og:image": `${BannerImage}`,
        "og:type": "website",
        "og:url": "https://colinmccaffrey.com/home",
      },
    },
  };

  useEffect(() => {
    const fetchHeadshot = async () => {
      try {
        const data = await client.fetch(`*[_type == 'siteSettings'][0]{
          homeImage{
          asset->{
            _id,
            creditLine
            }
          }
        }`);
        if (data) {
          setHeadshot(data.homeImage?.asset || BannerImage);
          setPhotoCredit(data.homeImage.asset.creditLine);
          console.log(photoCredit);
        }
      } catch (error) {}
    };
    fetchHeadshot();
  }, []);

  return (
    <DocumentMeta {...meta}>
      <div className="homeContainer">
        <div className="image-wrapper">
          <img
            id="headshot"
            src={headshot ? urlFor(headshot).url() : BannerImage}
            alt="Colin McCaffrey"
          />
          {photoCredit && (
            <div className="creditContent">
              <p className="photoCredit">Photo by: {photoCredit}</p>
            </div>
          )}
        </div>
        <h1 id="headerTitle">Colin McCaffrey</h1>
      </div>
    </DocumentMeta>
  );
};
export default Home;
