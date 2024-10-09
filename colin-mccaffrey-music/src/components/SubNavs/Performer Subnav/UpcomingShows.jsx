import React, { useState, useEffect } from 'react'
import "../subnav-styles/UpcomingShows.css";

function UpcomingShows() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/shows")
      .then(response => response.json())
      .then(data => {
        console.log("Parsed Data:", data);
        setShows(data);
        console.log("Updated State:", shows);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      
      });
  }, [shows]);

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
        <tr key={show.id}>
          <td>{new Date(Date.parse(show.date)).toLocaleDateString()}</td>
          <td>{show.title} @ {new Date(Date.parse(show.date)).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})}</td>
          <td>{show.location}</td>
          <td>${show.price}</td>
          <td>
            <button id="rsvp">RSVP</button>
            <button id="tickets">Buy Tickets</button>
          </td>
        </tr>

        //⁡⁢⁣⁣// Next Up:
        /* 
        2. Now that the frontend and backend are connected, time to hash out the admin middleware. Dependencies we will need to install are dotenv, JSONwebtoken, Bcrypt... so far that's it.
        3. Address Colin once project loose ends are finalized and ask if RSVP/Tickets buttons are necessary/if there are ways to purchase tickets online for shows. If not, shelve them. Either way, they look pretty f'n cool */

        ))}
    </tbody>
  </table>
</div>
  )
}

export default UpcomingShows;