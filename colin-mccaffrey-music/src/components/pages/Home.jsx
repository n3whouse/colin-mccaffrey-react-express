import React from "react";
import "../styles/Home.css";
import BannerImage from "../../assets/ColinTeleBarnBust.png";
import DocumentMeta from "react-document-meta";

function Home() {
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

  return (
    <DocumentMeta {...meta}>
      <div className="homeContainer">
        <img id="headshot" src={BannerImage} alt="Colin with his Telecaster" />
        <h1 id="headerTitle">Colin McCaffrey</h1>
      </div>
    </DocumentMeta>
  );
}
export default Home;
