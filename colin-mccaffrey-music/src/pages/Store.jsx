import React, { useEffect, useState } from "react";
import client from "../sanity/client";
import "../styles/Store.css";
import imageUrlBuilder from '@sanity/image-url';




function Store() {
  const [releases, setReleases] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const builder = imageUrlBuilder(client);
  
  function urlFor(source) {
    return builder.image(source);
  }
  
  useEffect(() => {
    const fetchStoreItems = async () => {

      const data = await client.fetch(`*[_type == 'release']{
        _id,
        releaseTitle,
        coverArt,
        releaseDescription,
        purchaseLink,
        }`)
      
      
      setReleases(data)
    };
    fetchStoreItems();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(selectedItem === item ? null : item); // for toggling selection logic
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
    <>
      <div className="gridContainer">
        {releases.map((release) => (
          <div
            key={release._id}
            className={`gridItem item${release._id} ${
              selectedItem === release._id ? "selected" : ""
            }`}
            onClick={() => handleItemClick(release._id)}
          >
            <img
              src={urlFor(release.coverArt).url()}
              className={`album-art`}
              alt={release.releaseTitle}
            />

            {selectedItem === release._id && (
              <div className="album-details">
                <button>Buy Now</button>
                <button>See Credits</button>
                <h2>{release.releaseTitle}</h2>
                <p>{release.releaseDescription}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Store;
