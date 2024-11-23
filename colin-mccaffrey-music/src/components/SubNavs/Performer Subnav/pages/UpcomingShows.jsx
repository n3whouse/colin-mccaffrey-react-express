import React, { useState, useEffect } from "react";
import client from "../../../../sanity/client.js";
import "../styles/UpcomingShows.css";
import ShowModal from "./ShowModal"; // Import the modal component

const UpcomingShows = () => {
  const [shows, setShows] = useState([]);
  const [venues, setVenues] = useState({});
  const [performerData, setPerformerData] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      // Fetch shows first
      const showsData = await client.fetch(`*[_type == 'show']{
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
      }
    }`);
      setShows(showsData);

      // Fetch performer data
      const performerData = await client.fetch(`*[_type == 'performer'][0]{
        upcomingShows {
          upcomingShowsHeadline,
          upcomingShowsSubtitle
        }
      }`);
      setPerformerData(performerData);

      // Extract unique venue IDs from shows
      const venueIds = showsData.map((show) => show.venue._ref);
      const venuesData = await client.fetch(`*[_id in $venueIds]`, {
        venueIds,
      });

      // Map venue data for easy access
      const venuesMap = venuesData.reduce((acc, venue) => {
        acc[venue._id] = venue.name;
        return acc;
      }, {});
      setVenues(venuesMap);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
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
      <h1 className="showsTitle">
        {performerData?.upcomingShows?.upcomingShowsHeadline}
      </h1>
      <h3 className="showsSubtitle">
        {performerData?.upcomingShows?.upcomingShowsSubtitle}
      </h3>
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
                })}
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
