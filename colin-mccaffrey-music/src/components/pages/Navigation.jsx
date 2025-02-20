import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { client } from "../../sanity/client";
import "../styles/Navigation.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import PerformerNavigation from "../SubNavs/Performer Subnav/PerformerNavigation";
import EngineerNavigation from "../SubNavs/Producer Subnav/EngineerNavigation";
import SongwriterNavigation from "../SubNavs/Songwriter Subnav/SongwriterNavigation";

function Navigation() {
  const [selectedComponent, setSelectedComponent] = useState("home");
  const [menuVisible, setMenuVisible] = useState(false);
  const [linkNames, setLinkNames] = useState({
    home: "",
    bio: "",
    store: "",
    booking: "",
    linkFour: { mainLink: "", subLinks: [] },
    linkFive: { mainLink: "", subLinks: [] },
    linkSix: { mainLink: "", subLinks: [] },
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
          booking: data.linkNames.linkThree.split(" ")[0],
          linkFour: {
            mainLink: data.linkNames.linkFour.mainLink,
            subLinks: data.linkNames.linkFour.subLinks || [],
          },
          linkFive: {
            mainLink: data.linkNames.linkFive.mainLink,
            subLinks: data.linkNames.linkFive.subLinks || [],
          },
          linkSix: {
            mainLink: data.linkNames.linkSix.mainLink,
            subLinks: data.linkNames.linkSix.subLinks || [],
          },
        });
      }
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
          {/* Main Navigation Links */}
          <Link
            to={`/${linkNames.home.toLowerCase()}`}
            className={`component ${
              selectedComponent === "home" ? "bold" : "faded"
            }`}
            onClick={() => handleLinkClick("home")}
          >
            {linkNames.home}
          </Link>
          <span className="divider">|</span>

          <Link
            to={`/${linkNames.bio.toLowerCase()}`}
            className={`component ${
              selectedComponent === "bio" ? "bold" : "faded"
            }`}
            onClick={() => handleLinkClick("bio")}
          >
            {linkNames.bio}
          </Link>
          <span className="divider">|</span>

          <Link
            to={`/${linkNames.store.toLowerCase()}`}
            className={`component ${
              selectedComponent === "store" ? "bold" : "faded"
            }`}
            onClick={() => handleLinkClick("store")}
          >
            {linkNames.store}
          </Link>
          <span className="divider">|</span>

          <Link
            to={`/${linkNames.booking.toLowerCase()}`}
            className={`component ${
              selectedComponent === "booking" ? "bold" : "faded"
            }`}
            onClick={() => handleLinkClick("booking")}
          >
            {linkNames.booking}
          </Link>
          <br />
          {/* Conditional rendering of subnav links for Performer, Engineer, and Songwriter */}
          <Link
            to={`/${linkNames.linkFour.mainLink.toLowerCase()}`}
            className={`component ${
              selectedComponent === linkNames.linkFour.mainLink.toLowerCase()
                ? "bold"
                : "faded"
            }`}
            onClick={() =>
              handleLinkClick(linkNames.linkFour.mainLink.toLowerCase())
            }
          >
            {linkNames.linkFour.mainLink}
          </Link>
          <span className="divider">|</span>

          <Link
            to={`/${linkNames.linkFive.mainLink.toLowerCase()}`}
            className={`component ${
              selectedComponent === linkNames.linkFive.mainLink.toLowerCase()
                ? "bold"
                : "faded"
            }`}
            onClick={() =>
              handleLinkClick(linkNames.linkFive.mainLink.toLowerCase())
            }
          >
            {linkNames.linkFive.mainLink}
          </Link>
          <span className="divider">|</span>

          <Link
            to={`/${linkNames.linkSix.mainLink.toLowerCase()}`}
            className={`component ${
              selectedComponent === linkNames.linkSix.mainLink.toLowerCase()
                ? "bold"
                : "faded"
            }`}
            onClick={() =>
              handleLinkClick(linkNames.linkSix.mainLink.toLowerCase())
            }
          >
            {linkNames.linkSix.mainLink}
          </Link>
        </h1>

        {/* This displays the Subnav Menus under Performer, Producer, and Songwriter tabs on desktop */}
        <div className="subnavMenu">
          {selectedComponent === linkNames.linkFour.mainLink.toLowerCase() && (
            <PerformerNavigation />
          )}
          {selectedComponent === linkNames.linkFive.mainLink.toLowerCase() && (
            <EngineerNavigation />
          )}
          {selectedComponent === linkNames.linkSix.mainLink.toLowerCase() && (
            <SongwriterNavigation />
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="mobile-nav">
        <h1 id="mobileMenu">
          <Link
            to={`/${selectedComponent}`}
            className="selected component bold"
          >
            {selectedComponent === "home"
              ? linkNames.home
              : linkNames[selectedComponent] || selectedComponent}
          </Link>
          <div className="dropdown-arrow" onClick={toggleMenu}>
            {menuVisible ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </h1>

        {/* Show the full menu when the menu is visible */}
        {menuVisible && (
          <div className="menu-items">
            {/* Main links */}
            {Object.keys(linkNames).map((key) => {
              if (typeof linkNames[key] === "string") {
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
              } else {
                return (
                  <Link
                    to={`/${linkNames[key].mainLink.toLowerCase()}`}
                    className="component"
                    onClick={() => handleLinkClick(linkNames[key].mainLink)}
                    key={key}
                  >
                    {linkNames[key].mainLink}
                  </Link>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
