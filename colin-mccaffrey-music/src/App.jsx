import "./App.css";
import "./components/styles/Home.css";
import Bio from "./components/pages/Bio";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Store from "./components/pages/Store";
import BookingAndContact from "./components/pages/BookingAndContact";
import Navigation from "./components/pages/Navigation";
import Footer from "./components/Footer";
import Performer from "./components/SubNavs/Performer Subnav/Performer";
import Engineer from "./components/SubNavs/Producer Subnav/Engineer";
import Songwriter from "./components/SubNavs/Songwriter Subnav/Songwriter";
import DocumentMeta from "react-document-meta";
import Media from "./components/SubNavs/Performer Subnav/pages/Media";
import Calendar from "./components/SubNavs/Performer Subnav/pages/Calendar";
import GearAndPrograms from "./components/SubNavs/Producer Subnav/pages/GearAndPrograms";
import ProductionCredits from "./components/SubNavs/Producer Subnav/pages/ProductionCredits";
import ColinsCredits from "./components/SubNavs/Songwriter Subnav/pages/ColinsCredits";
import Streaming from "./components/SubNavs/Songwriter Subnav/pages/Streaming";
import Studio from "./components/SubNavs/Producer Subnav/pages/Studio";

function App() {
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
        "og:image": `https://colinmccaffrey.com/static/media/ColinTeleBarnBust.9e8f0e7a98f8872e4385.png`, //change to dynamic url if possible once home page has a link to change img
        "og:type": "website",
        "og:url": "https://colinmccaffrey.com",
      },
    },
  };

  return (
    <DocumentMeta {...meta}>
      <div className="home">
        <Router>
          <Navigation />
          <Routes>
            {/* Main pages */}
            <Route path="/" element={<Home />} />
            <Route path="/bio" element={<Bio />} />
            <Route path="/store" element={<Store />} />
            <Route path="/booking" element={<BookingAndContact />} />

            {/* Performer Subnav */}
            <Route path="/performer" element={<Performer />}>
              <Route path="calendar" element={<Calendar />} />
              <Route path="media" element={<Media />} />
            </Route>

            {/* Engineer Subnav */}
            <Route path="/engineer" element={<Engineer />}>
              <Route path="studio" element={<Studio />} />
              <Route path="gear" element={<GearAndPrograms />} />
              <Route
                path="/engineer/production-credits"
                element={<ProductionCredits />}
              />
            </Route>

            {/* Songwriter Subnav */}
            <Route path="/songwriter" element={<Songwriter />}>
              <Route path="colins-credits" element={<ColinsCredits />} />
              <Route path="streaming" element={<Streaming />} />
            </Route>
          </Routes>
          <Footer />
        </Router>
      </div>
    </DocumentMeta>
  );
}

export default App;
