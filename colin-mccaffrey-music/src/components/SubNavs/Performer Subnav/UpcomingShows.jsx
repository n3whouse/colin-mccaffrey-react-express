import React, { useState, useEffect } from 'react'
import "../subnav-styles/UpcomingShows.css";

function UpcomingShows() {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);

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
        setError(error);
      });
  }, []);

  return (
    <div>
      <h1>Upcoming Shows</h1>
      
        {shows.map(show => (
          <div className="shows-container" key={show.id}>
            <h2>{show.title}</h2>
            <p>
              <span>Date:</span> {new Date(Date.parse(show.date)).toLocaleDateString()}
              <br />
              <span>Time:</span> {new Date(Date.parse(show.date)).toLocaleTimeString()}
              <br />
              <span>Location: </span>{show.location}
              <br />
              <span>{show.description}</span></p>
          </div>
        ))}
      
    </div>
  )
}

export default UpcomingShows;