import React, { useState, useEffect } from 'react'

function UpcomingShows() {
  const [shows, setShows] = useState({});

  useEffect(() => {
    fetch("/api/shows")
      .then(response => response.json())
      .then(data => setShows(data));
  }, []);

  return (
    <div>
      <h1>Upcoming Shows</h1>
      

    </div>
  )
}

export default UpcomingShows