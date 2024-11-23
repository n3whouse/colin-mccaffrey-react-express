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
  // Add more cases here if you have other block types (e.g., images, lists, etc.)
  return null;
};

const ShowModal = ({ show, onClose }) => {
  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h1>{show.name}</h1>
          <hr />
          <h4>
            <a href={show.venue.link} target="_blank" rel="noopener noreferrer">
              {show.venue?.name || "Venue not specified"}
            </a>
          </h4>
          <h5>
            {show.venue
              ? `${show.venue.address}, ${show.venue.city}, ${show.venue.state}`
              : "Address not specified"}
          </h5>
          <div className="showDetails">
            {show.details && show.details.map(renderBlock)}
          </div>
          <p>{new Date(show.date).toLocaleString()}</p>
          <p>{show.price > 0 ? `$${show.price}` : "Free"}</p>
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
