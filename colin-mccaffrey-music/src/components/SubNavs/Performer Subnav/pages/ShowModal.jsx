import React from "react";
import "../styles/Calendar.css";

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
          <div id="modalShowTitle">
            <h1>{show.name}</h1>
            <br />
            <h3>
              {show.headline.name
                ? `with ${show.headline?.name}`
                : show.headline.name}
            </h3>
          </div>
          <br />
          <hr id="titleDivider" />

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
          <p id="modalTime">{new Date(show.date).toLocaleString()}</p>
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
