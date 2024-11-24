import React from "react";
import "../styles/UpcomingShows.css";

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

const ShowModal = ({ show, onClose }) => {
  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h1>
            {show.headline.name
              ? `${show.headline.name}: ${show.name}`
              : show.headline.name}
          </h1>
          <hr />

          <a
            id="modalVenue"
            href={show.venue.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {show.venue?.name || ""}
          </a>
          <br />
          <p id="modalAddress">
            {show.venue
              ? `${show.venue.address}, ${show.venue.city}, ${show.venue.state}`
              : "Address not specified"}
          </p>
          <div className="showDetails">
            {show.details && show.details.map(renderBlock)}
          </div>
          <p>{new Date(show.date).toLocaleString()}</p>
          <p id="modalPrice">{show.price > 0 ? `$${show.price}` : "Free"}</p>
          <button className="btn">
            <a href={show.tickets} target="_blank" rel="noopener noreferrer">
              Buy Tickets
            </a>
          </button>
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default ShowModal;
