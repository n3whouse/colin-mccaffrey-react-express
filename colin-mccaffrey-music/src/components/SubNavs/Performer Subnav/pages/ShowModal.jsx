import React, { useState, useEffect } from "react";
import "../styles/Calendar.css";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../../../sanity/client";
// Function to render the blocks
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
const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

const ShowModal = ({ show, onClose }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const showImageUrl = show.image ? urlFor(show.image.asset).url() : "";

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const toggleDetails = () => {
    setDetailsVisible((prev) => !prev);
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {!detailsVisible && (
            <>
              <div id="modalShowTitle">
                <h2>{show.name}</h2>
                {showImageUrl ? (
                  <img
                    src={showImageUrl}
                    id="showImage"
                    alt="A header for the currently selected show"
                  />
                ) : (
                  " "
                )}
                <h4>
                  {show.headline?.name ? `with ${show.headline.name}` : ""}
                </h4>
              </div>
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
