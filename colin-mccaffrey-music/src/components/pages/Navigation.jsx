import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { client } from "../../sanity/client";
import "../styles/Navigation.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

function Navigation() {
  const [selectedComponent, setSelectedComponent] = useState("home"); // Default to "bio"
  const [menuVisible, setMenuVisible] = useState(false);

  const [linkNames, setLinkNames] = useState({
    home: "",
    bio: "",
    store: "",
    booking: "",
    performer: "",
    engineer: "",
    songwriter: "",
  });

  useEffect(() => {
    const fetchLinkNames = async () => {
      const data = await client.fetch(
        `*[_type == 'siteSettings'][0]{linkNames}`
      );

      if (data && data.linkNames) {
        setLinkNames({
          home: data.linkNames.home,
          bio: data.linkNames.linkOne,
          store: data.linkNames.linkTwo,
          booking: data.linkNames.linkThree,
          performer: data.linkNames.linkFour,
          engineer: data.linkNames.linkFive,
          songwriter: data.linkNames.linkSix,
        });
      }
      console.log("Home: ", linkNames);
    };
    fetchLinkNames();
  }, []);

  const handleLinkClick = (component) => {
    setSelectedComponent(component);
    setMenuVisible(false); // Close the menu when a link is clicked
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Toggle menu visibility
  };

  return (
    <div className="nav">
      <div className="desktop-nav">
        <h1>
          <Link
            to="/"
            className={`component ${
              selectedComponent === "home" ? "bold" : "faded"
            }`}
            onClick={() => handleLinkClick("home")}
          >
            {linkNames.home}
          </Link>

          <span className="divider">|</span>

          <Link
            to="/bio"
            className={`component ${
              selectedComponent === "bio" ? "bold" : "faded"
            }`}
            onClick={() => handleLinkClick("bio")}
          >
            {linkNames.bio}
          </Link>

          <span className="divider">|</span>

          <Link
            to="/store"
            className={`component ${
              selectedComponent === "store" ? "bold" : "faded"
            }`}
            onClick={() => handleLinkClick("store")}
          >
            {linkNames.store}
          </Link>

          <span className="divider">|</span>

          <Link
            to="/booking"
            className={`component ${
              selectedComponent === "booking" ? "bold" : "faded"
            }`}
            onClick={() => handleLinkClick("booking")}
          >
            {linkNames.booking}
          </Link>

          <span className="divider">
            <br />
          </span>

          <Link
            to="/performer"
            className={`component ${
              selectedComponent === "performer" ? "bold" : "faded"
            }`}
            onClick={() => handleLinkClick("performer")}
          >
            {linkNames.performer}
          </Link>

          <span className="divider">|</span>

          <Link
            to="/engineer"
            className={`component ${
              selectedComponent === "engineer" ? "bold" : "faded"
            }`}
            onClick={() => handleLinkClick("engineer")}
          >
            {linkNames.engineer}
          </Link>

          <span className="divider">|</span>

          <Link
            to="/songwriter"
            className={`component ${
              selectedComponent === "songwriter" ? "bold" : "faded"
            }`}
            onClick={() => handleLinkClick("songwriter")}
          >
            {linkNames.songwriter}
          </Link>
        </h1>
      </div>

      <div className="mobile-nav">
        <h1 id="mobileMenu">
          <Link
            to={`/${selectedComponent}`}
            className="selected component bold"
          >
            {linkNames[selectedComponent]}
          </Link>
          <div className="dropdown-arrow" onClick={toggleMenu}>
            {menuVisible ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </h1>

        {/* Show the full menu when the menu is visible */}
        {menuVisible && (
          <div className="menu-items">
            {Object.keys(linkNames).map((key) => {
              if (key !== selectedComponent) {
                return (
                  <Link
                    to={`/${key === "home" ? "" : key}`}
                    className="component"
                    onClick={() => handleLinkClick(key)}
                    key={key}
                  >
                    {linkNames[key]}
                  </Link>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
