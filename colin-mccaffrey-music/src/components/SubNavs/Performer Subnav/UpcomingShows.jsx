import React, { useState, useEffect } from "react";
import "../subnav-styles/UpcomingShows.css";

console.log(process.env)
const showUrl = process.env.REACT_APP_SHOWS_API_URL;


function UpcomingShows() {
  const [shows, setShows] = useState([]);

   useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(`${showUrl}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setShows(data);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchShows();
  }, [showUrl]);

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
