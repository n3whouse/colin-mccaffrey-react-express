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

function App() {
  return (
    <div className="home">
      <Router>
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/store" element={<Store />} />
          <Route path="/booking-and-contact" element={<BookingAndContact />} />
          <Route path="/performer" element={<Performer />} />
          <Route path="/engineer" element={<Engineer />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
