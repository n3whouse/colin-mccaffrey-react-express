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
        "og:image": `https://colinmccaffrey.com/static/media/ColinTeleBarnBust.9e8f0e7a98f8872e4385.png`, //change to dynamic url if possible once home page has a link to change img
        "og:type": "website",
        "og:url": "https://colinmccaffrey.com/home",
      },
    },
  };

  return (
    <DocumentMeta {...meta}>
      <div className="bodyContainer">
        {/* <div className=""> */}
        <img id="headshot" src={BannerImage} alt="Colin with his Telecaster" />
        <h1 id="headerTitle">Colin McCaffrey</h1>
      </div>
      {/* </div> */}
    </DocumentMeta>
  );
}
export default Home;
