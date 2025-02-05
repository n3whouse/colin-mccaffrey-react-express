import React, { useEffect, useState } from "react";
import client from "../../sanity/client";
import "../styles/Store.css";
import imageUrlBuilder from "@sanity/image-url";
import DocumentMeta from "react-document-meta";
import PaypalAndShipping from "../../utils/PaypalAndShipping/PaypalAndShipping";

const builder = imageUrlBuilder(client);

function Store() {
  const [photoCredit, setPhotoCredit] = useState("");
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
  const [showShippingInfo, setShowShippingInfo] = useState(false);

  useEffect(() => {
    const fetchStoreItems = async () => {
      const data = await client.fetch(`*[_type == 'release']{
        releaseList[]{
        _id,
          releaseTitle,
          releaseType,
          releaseYear,
          releaseDescription,
          coverArt {
            asset->{
              _id,
              creditLine,
              url
            }
          },
          purchaseLink,
          price,
          _key,
        }
      }`);
      const flattenedReleases = data.flatMap((release) => release.releaseList);
      setReleases(flattenedReleases);
    };
    fetchStoreItems();
  }, []);

  const selectedRelease = releases.find(
    (release) => release._key === selectedItem
  );

  const handleItemClick = (item) => {
    setSelectedItem(selectedItem === item ? null : item);
    setShowShippingInfo(false);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowShippingInfo(false);
  };

  const handlePhysicalOrder = () => {
    setShowShippingInfo((prev) => !prev);
  };

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

      {/* Begin Modal */}

      {selectedRelease && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Begin album art wrapper */}
            <div className="image-wrapper albumArt">
              <img
                src={urlFor(selectedRelease.coverArt.asset).url()}
                id={`modal-album-art`}
                alt={selectedRelease.releaseTitle}
              />

              {selectedRelease && selectedRelease.coverArt.asset ? (
                <div className="creditContent">
                  <p className="photoCredit">
                    Album Art:
                    <br />
                    {selectedRelease.coverArt.asset.creditLine}
                  </p>
                </div>
              ) : null}
            </div>
            {/* End album art wrapper */}

            <h4>{selectedRelease.releaseTitle}</h4>
            <a
              href={selectedRelease.purchaseLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn">Buy Now</button>
            </a>

            {selectedRelease.releaseType === "album" && (
              <button className="btn" onClick={handlePhysicalOrder}>
                Order Physical Copy
              </button>
            )}
            <br />
            {showShippingInfo && selectedRelease.releaseType === "album" && (
              <PaypalAndShipping props={selectedRelease} />
            )}

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
