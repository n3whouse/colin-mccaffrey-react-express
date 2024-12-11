import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DocumentMeta from "react-document-meta";

import Navigation from "./components/pages/Navigation";
import Footer from "./components/Footer";

import Home from "./components/pages/Home";
import Bio from "./components/pages/Bio";
import Store from "./components/pages/Store";
import BookingAndContact from "./components/pages/BookingAndContact";
import Performer from "./components/SubNavs/Performer Subnav/Performer";
import Engineer from "./components/SubNavs/Producer Subnav/Engineer";
import Songwriter from "./components/SubNavs/Songwriter Subnav/Songwriter";
import Media from "./components/SubNavs/Performer Subnav/pages/Media";
import Calendar from "./components/SubNavs/Performer Subnav/pages/Calendar";
import GearAndPrograms from "./components/SubNavs/Producer Subnav/pages/GearAndPrograms";
import ProductionCredits from "./components/SubNavs/Producer Subnav/pages/ProductionCredits";
import ColinsCredits from "./components/SubNavs/Songwriter Subnav/pages/ColinsCredits";
import Streaming from "./components/SubNavs/Songwriter Subnav/pages/Streaming";

import Studio from "./components/SubNavs/Producer Subnav/pages/Studio";
import { client } from "./sanity/client";

import "./App.css";
import "./components/styles/Home.css";

function App() {
  const [linkNames, setLinkNames] = useState({});

  useEffect(() => {
    const fetchLinkNames = async () => {
      const data = await client.fetch(
        `*[_type == 'siteSettings'][0]{linkNames}`
      );
      if (data && data.linkNames) {
        setLinkNames(data.linkNames);
      }
    };
    fetchLinkNames();
  }, []);

  // Extracting link names with fallback if undefined
  let {
    home = "home",
    bio = "bio",
    store = "store",
    booking = "booking",
    linkFour = {},
    linkFive = {},
    linkSix = {},
  } = linkNames;

  const { calendar = "calendar", media = "media" } = linkFour;
  const {
    studio = "studio",
    gear = "gear",
    productionCredits = "production-credits",
  } = linkFive;
  const { colinsCredits = "credits", streaming = "streaming" } = linkSix;

  booking = booking.split(" ")[0];
  // Meta info for SEO
  const meta = {
    title: "Colin McCaffrey",
    description:
      "Official website of Vermont native and award-winning singer-songwriter and recording engineer, Colin McCaffrey.",
    canonical: "https://colinmccaffrey.com",
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
        "og:image":
          "https://colinmccaffrey.com/static/media/ColinTeleBarnBust.9e8f0e7a98f8872e4385.png",
        "og:type": "website",
        "og:url": "https://colinmccaffrey.com",
      },
    },
  };
  return (
    <DocumentMeta {...meta}>
      <div className="bodyContainer">
        <Router>
          <Navigation linkNames={linkNames} />
          <Routes>
            {/* Main pages */}
            <Route path="/" element={<Home />} />
            <Route path={`${home}`} element={<Home />} />
            <Route path={`${bio}`} element={<Bio />} />
            <Route path={`${store}`} element={<Store />} />
            <Route path={"booking"} element={<BookingAndContact />} />

            {/* Performer Subnav */}
            <Route path={`/${linkFour.mainLink}`} element={<Performer />}>
              <Route path={`${calendar}`} element={<Calendar />} />
              <Route path={`${media}`} element={<Media />} />
            </Route>

            {/* Engineer Subnav */}
            <Route path={`${linkFive.mainLink}`} element={<Engineer />}>
              <Route path={`${studio}`} element={<Studio />} />
              <Route path={`${gear}`} element={<GearAndPrograms />} />
              <Route
                path={`${productionCredits}`}
                element={<ProductionCredits />}
              />
            </Route>

            {/* Songwriter Subnav */}
            <Route path={`${linkSix.mainLink}`} element={<Songwriter />}>
              <Route path={`${colinsCredits}`} element={<ColinsCredits />} />
              <Route path={`${streaming}`} element={<Streaming />} />
            </Route>
          </Routes>
          <Footer />
        </Router>
      </div>
    </DocumentMeta>
  );
}

export default App;
