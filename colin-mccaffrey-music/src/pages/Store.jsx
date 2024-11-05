import React, { useEffect, useState } from "react";
import "../styles/Store.css";

/* 
⁡⁢⁣⁣NEXT UP...
I have added at least one release to the database via Insomnia. This means that the endpoints are working. There is CRUD functionality. The problem is that when we were serving from the static 'releases.js' helper file before we established the endpoints, the store items were displaying just fine. Now the issue is trying to get the releases to come back up on the store again.⁡
*/

function Store() {
  const [releases, setReleases] = useState([]); //the reason the map wasn't working was because I was trying to initiate it as an object and maps only work on arrays.
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_RELEASES_API_URL}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Parsed Data", data);
        setReleases(data);
        console.log("Updated State:", data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
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
              src={release.coverFile}
              className={`album-art item${release._id} ${
                selectedItem === release._id ? "" : "coverFile"
              }`}
              alt={release.title}
            />

            {selectedItem === release._id && (
              <div className="album-details">
                <button>Buy Now</button>
                <button>See Credits</button>
                <h2>{release.title}</h2>
                <p>{release.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Store;
