import React, { useState, useEffect } from "react";
import client from "../../../../sanity/client.js";
import "../styles/UpcomingShows.css";
import ShowModal from "./ShowModal"; // Import the modal component

const UpcomingShows = () => {
  const [shows, setShows] = useState([]);
  const [artistNames, setArtistNames] = useState({});
  const [selectedShow, setSelectedShow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const showData = await client.fetch(`*[_type == 'show']{
        _id,
        name,
        date,
        price,
        tickets,
        details,
        venue-> {
          _id,
          name,
          address,
          city,
          state,
          link
        },
        headline-> {
          name
        }
      }`);

      const artistData = await client.fetch(`*[_type == 'artist']{name}`);

      // Create a mapping of artist IDs to names
      const names = artistData.map((artist) => artist.name);
      setArtistNames(names);
      setShows(showData);
    };
    fetchData();
  }, []);

  const handleShowClick = (show) => {
    setSelectedShow(show);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedShow(null);
  };

  return (
    <div className="table-container">
      <h1 className="showsTitle">Upcoming Shows</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Venue</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shows.map((show) => (
            <tr key={show._id} onClick={() => handleShowClick(show)}>
              <td>{new Date(show.date).toLocaleDateString()}</td>
              <td>
                {show.venue?.name || "Venue not specified"} @{" "}
                {new Date(show.date).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                {show.headline ? (
                  <p id="headliner">with {show.headline.name}</p>
                ) : (
                  ""
                )}
              </td>
              <td>{show.price > 0 ? `$${show.price}` : "Free"}</td>
              <td>
                <button id="tickets">
                  <a
                    href={show.tickets}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy Tickets
                  </a>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedShow && (
        <ShowModal show={selectedShow} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default UpcomingShows;
