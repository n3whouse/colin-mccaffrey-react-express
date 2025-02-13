import React, { useState, useEffect } from "react";
import "../styles/Calendar.css";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../../../sanity/client";

// This renders the any block type in the incoming show props by taking in the block and mapping through the children and joining them.
const renderBlock = (block) => {
  if (block._type === "block") {
    return (
      <p key={block._key}>
        {block.children.map((child) => child.text).join("")}
      </p>
    );
  }
  return null;
};

// builder variable is used to store the imageUrlBuilder tool i imported...
const builder = imageUrlBuilder(client);

// ..to be used in this function to generate the image url for any asset being pulled from the backend (source/client).
function urlFor(source) {
  return builder.image(source);
}

// the ShowModal takes in the show props and renders the show details in a modal.
const ShowModal = ({ show, onClose }) => {
  // useStates conditionally render the show details and the image credits.
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [imageCredit, setImageCredit] = useState("");

  const showImageUrl = show.image ? urlFor(show.image.asset).url() : "";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const fetchCreditLine = async () => {
      if (show.image && show.image.asset) {
        setImageCredit(show.image.asset.creditLine);
      }
    };
    fetchCreditLine();
  }, [show]);

  const toggleDetails = () => {
    setDetailsVisible((prev) => !prev);
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="show-modal" onClick={(e) => e.stopPropagation()}>
          {!detailsVisible && (
            <>
              <div id="modalShowTitle">
                <h2>{show.name}</h2>
              </div>
              {showImageUrl ? (
                <div className="image-wrapper showImageWrapper">
                  <img
                    src={showImageUrl}
                    className="showImage"
                    alt="A header for the currently selected show"
                  />
                  {imageCredit && (
                    <div className="creditContent">
                      <p className="photoCredit">Photo by: {imageCredit}</p>
                    </div>
                  )}
                </div>
              ) : null}
              <h4>{show.headline?.name ? `with ${show.headline.name}` : ""}</h4>
              <br />
              <hr id="titleDivider" />

              {/* Conditionally render venue and address based on detailsVisible */}
              <a
                id="modalVenue"
                href={show.venue?.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                {show.venue?.name || "Venue not specified"}
              </a>
              <br />
              <p id="modalAddress">
                {show.venue
                  ? `${show.venue.address}, ${show.venue.city}, ${show.venue.state}`
                  : "Address not specified"}
              </p>
            </>
          )}
          {show.details ? (
            <button className="btn" onClick={toggleDetails}>
              {detailsVisible ? "Hide Details" : "Show Details"}
            </button>
          ) : null}

          {detailsVisible && (
            <div className="showDetails">
              {show.details && show.details.map(renderBlock)}
            </div>
          )}

          {/* Conditionally render time and price based on detailsVisible */}
          {!detailsVisible && (
            <>
              <p id="modalTime">{new Date(show.date).toLocaleString()}</p>
              <p id="modalPrice">
                {show.price > 0 ? `$${show.price}` : "Free"}
              </p>
            </>
          )}

          <div className="modal-buttons">
            {show.tickets ? (
              <button className="btn">
                <a
                  href={show.tickets}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy Tickets
                </a>
              </button>
            ) : null}
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowModal;
