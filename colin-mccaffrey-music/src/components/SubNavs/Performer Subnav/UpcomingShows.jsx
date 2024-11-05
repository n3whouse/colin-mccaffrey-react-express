import React, { useState, useEffect } from "react";
import "../subnav-styles/UpcomingShows.css";

function UpcomingShows() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SHOWS_API_URL}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response did a sad");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Parsed Data:", data);
        setShows(data);
        console.log("Updated State:", shows);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); //Leave dependency array empty. Putting in 'shows' as dependency causes infinite loop on GET

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Venue</th>
            <th>Location</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {shows.map((show, index) => (
            <tr key={show._id}>
              <td>{new Date(Date.parse(show.date)).toLocaleDateString()}</td>
              <td>
                {show.title} @{" "}
                {new Date(Date.parse(show.date)).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td>{show.location}</td>
              <td>${show.price}</td>
              <td>
                <button id="rsvp">RSVP</button>
                <button id="tickets">Buy Tickets</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UpcomingShows;
