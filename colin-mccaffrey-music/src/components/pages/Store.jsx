import React, { useEffect, useState } from "react";
import client from "../../sanity/client";
import "../styles/Store.css";
import imageUrlBuilder from "@sanity/image-url";
import DocumentMeta from "react-document-meta";
import PaypalAndShipping from "../../utils/PaypalAndShipping/PaypalAndShipping";

// to build URLs for static assets
const builder = imageUrlBuilder(client);

function Store() {
  //may or may not be useful
  // const [photoCredit, setPhotoCredit] = useState("");

  // using urlFor() uses imageUrlBuilder (builder) to take image asset from query and build a URL for it to display it correctly.
  function urlFor(source) {
    return builder.image(source);
  }

  // Information for internet crawlers and indexing
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

  // useStates to control open and closed modal states, release adding, and showing shipping info in the modal
  const [releases, setReleases] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showShippingInfo, setShowShippingInfo] = useState(false);

  //GROQ query extracts releaseList as an array from _type release by ID, title, type, year, description, purhcase link if available, price, _key for mapping, accesses the coverArt as an asset to extract _id to let it be read and creditLine for photo credit,
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
      // flattens the release list to make nested array of data a single array of release items out of the content of each release.
      const flattenedReleases = data.flatMap((release) => release.releaseList);
      setReleases(flattenedReleases);
    };
    fetchStoreItems();
  }, []);

  // function to find the selected item in the releases array by _key and check if it is equal to selectedItem's key to assign it to the selectedRelease variable
  const selectedRelease = releases.find(
    (release) => release._key === selectedItem
  );

  //if an item is clicked and the selectedItem is the same as the item, set selectedItem to null. If it is not the same, set it to item and hide Shipping Info
  const handleItemClick = (item) => {
    setSelectedItem(selectedItem === item ? null : item);
    setShowShippingInfo(false);
  };

  // if user clicks outside the modal, set selectedItem to null and shipping info to false (check if this is not redundant with handleItemClick)
  const handleCloseModal = () => {
    setSelectedItem(null);
    setShowShippingInfo(false);
  };

  // callback function for when user clicks "Order Physical Copy" button one way or another to check previous state and change it to the opposite. (if open, close and vice versa)
  const handlePhysicalOrder = () => {
    setShowShippingInfo((prev) => !prev);
  };

  // dependent on selectedItem, listens when a modal is selected for user clicking anywhere but the modal to close it
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
        {/* here down is being controlled by storeFlexMenu.css as grid did not work for intended outcome */}
        <div className="flexCard">
          {releases.map((release) => (
            <div
              key={release._key}
              className={`flexItem item${release._key} ${
                selectedItem === release._key ? "selected" : ""
              }`}
              onClick={() => handleItemClick(release._key)}
            >
              {/* img src is set to urlFor function to dynamically apply whatever asset is uploaded to backend and give it a url */}
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
