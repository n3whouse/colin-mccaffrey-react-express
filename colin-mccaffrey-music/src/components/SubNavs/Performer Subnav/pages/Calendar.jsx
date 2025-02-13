import React, { useState, useEffect } from "react";
import client from "../../../../sanity/client.js";
import "../styles/Calendar.css";
import ShowModal from "./ShowModal.jsx"; // Import the modal component

const Calendar = () => {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const showData = await client.fetch(`*[_type == 'show']{
        _id,
        name,
        image {
          asset->{
            _id,
            creditLine,
            }
          },
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

      // this sorts the shows soonest to furthest out and saves them as sortedShows, then passing sortedShows to the shows state
      const sortedShows = showData.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setShows(sortedShows);
    };
    fetchData();
  }, []);

  // if show is clicked, set selected calendar show and pass it to the modal, then open the modal.
  const handleShowClick = (show) => {
    setSelectedShow(show);
    setIsModalOpen(true);
  };

  // if the modal is closed, set selected show to null and close the modal.
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedShow(null);
  };

  return (
    <>
      <div className="componentContainer">
        <div className="table-container">
          <h1 className="showsTitle">Calendar</h1>
          <table>
            <tbody>
              {shows.map((show) => (
                <tr
                  className="tableRows"
                  key={show._id}
                  onClick={() => handleShowClick(show)}
                >
                  <td>{new Date(show.date).toLocaleDateString()}</td>
                  <td id="venue">
                    <div id="venueDetails">
                      <p id="showName">{show.name}</p>
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
                    </div>
                  </td>
                  <td className="showPrice">
                    {show.price > 0 ? `$${show.price}` : "Free"}
                  </td>
                  <td>
                    {show.tickets ? (
                      <button id="tickets">
                        <a
                          href={show.tickets}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Buy Tickets
                        </a>
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isModalOpen && selectedShow && (
            <ShowModal show={selectedShow} onClose={handleCloseModal} />
          )}
        </div>
      </div>
    </>
  );
};

export default Calendar;
