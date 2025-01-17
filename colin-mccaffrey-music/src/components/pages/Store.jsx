import React, { useEffect, useState } from "react";
import client from "../../sanity/client";
import "../styles/Store.css"; // Keep your existing styles
import imageUrlBuilder from "@sanity/image-url";
import DocumentMeta from "react-document-meta";
import PaypalAndShipping from "../../utils/PaypalAndShipping/PaypalAndShipping";

function Store() {
  const builder = imageUrlBuilder(client);

  function urlFor(source) {
    return builder.image(source);
  }

  const meta = {
    title: "Colin McCaffrey: Store",
    description:
      "Peruse and purchase from the discography of Vermont native and award-winning singer-songwriter and recording engineer, Colin McCaffrey.",
    canonical: "https://colinmccaffrey.com/store",
    meta: {
      charset: "utf-8",
      name: {
        keywords:
          "Colin McCaffrey, engineer, songwriter, performer, shows, musician",
      },
      property: {
        "og:title": "Colin McCaffrey: Store",
        "og:description":
          "Peruse and purchase from the discography of Vermont native and award-winning singer-songwriter and recording engineer, Colin McCaffrey.",
        "og:image": `https://colinmccaffrey.com/static/media/ColinTeleBarnBust.9e8f0e7a98f8872e4385.png`,
        "og:type": "website",
        "og:url": "https://colinmccaffrey.com/store",
      },
    },
  };

  const [releases, setReleases] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchStoreItems = async () => {
      const data = await client.fetch(`*[_type == 'release']{
        releaseList[]{
        _id,
          releaseTitle,
          releaseYear,
          releaseDescription,
          coverArt {
            asset->{
              _id,
              url
            }
          },
          purchaseLink,
          _key,
        }
      }`);
      const flattenedReleases = data.flatMap((release) => release.releaseList);
      setReleases(flattenedReleases);
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
    (release) => release._key === selectedItem
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
    <DocumentMeta {...meta}>
      <div className="componentContainer">
        <div className="flexCard">
          {releases.map((release) => (
            <div
              key={release._key}
              className={`flexItem item${release._key} ${
                selectedItem === release._key ? "selected" : ""
              }`}
              onClick={() => handleItemClick(release._key)}
            >
              <div>
                <img
                  src={urlFor(release.coverArt.asset).url()}
                  className={`album-art`}
                  alt={release.releaseTitle}
                />
                <div className="releaseTitle">{release.releaseTitle}</div>
              </div>
            </div>
          ))}
        </div>
        <hr />
      </div>

      {selectedRelease && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={urlFor(selectedRelease.coverArt.asset).url()}
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
              <PaypalAndShipping />
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
    </DocumentMeta>
  );
}

export default Store;
