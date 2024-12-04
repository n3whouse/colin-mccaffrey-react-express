import React, { useEffect, useState } from "react";
import client from "../../sanity/client";
import "../styles/Store.css";
import "../styles/Home.css";
import imageUrlBuilder from "@sanity/image-url";

function Store() {
  const [releases, setReleases] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const builder = imageUrlBuilder(client);

  function urlFor(source) {
    return builder.image(source);
  }

  useEffect(() => {
    const fetchStoreItems = async () => {
      const data =
        await client.fetch(`*[_type == 'release'] | order(order asc) {
        _id,
        releaseTitle,
        coverArt,
        releaseDescription,
        purchaseLink,
        order,
      }`);

      setReleases(data);
    };
    fetchStoreItems();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(selectedItem === item ? null : item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const selectedRelease = releases.find(
    (release) => release._id === selectedItem
  );

  useEffect(() => {
    const handleClickOut = (e) => {
      if (selectedItem && !e.target.closest(`.item${selectedItem}`)) {
        setSelectedItem(null);
      }
    };
    document.addEventListener("click", handleClickOut);
    return () => {
      document.removeEventListener("click", handleClickOut);
    };
  }, [selectedItem]);

  return (
    <>
      <div className="bodyContainer">
        <hr />
        <div className="gridCard">
          {releases.map((release) => (
            <div
              key={release._id}
              className={`gridItem item${release._id} ${
                selectedItem === release._id ? "selected" : ""
              }`}
              onClick={() => handleItemClick(release._id)}
            >
              <div>
                <img
                  src={urlFor(release.coverArt).url()}
                  className={`album-art`}
                  alt={release.releaseTitle}
                />
                <div className="releaseTitle">{release.releaseTitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedRelease && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={urlFor(selectedRelease.coverArt).url()}
              id={`modal-album-art`}
              alt={selectedRelease.releaseTitle}
            />

            <h4>{selectedRelease.releaseTitle}</h4>
            <a
              href={selectedRelease.purchaseLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn">Buy Now</button>
            </a>
            <br />
            {selectedRelease.releaseDescription && (
              <div className="description-container">
                {selectedRelease.releaseDescription.map((block) => {
                  switch (block._type) {
                    case "block":
                      return (
                        <p key={block._key} className={block.style}>
                          {block.children.map((child) => child.text).join("")}
                        </p>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            )}
            <br />
            <button className="btn" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Store;
