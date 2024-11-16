import React, { useState, useEffect } from "react";
import client from '../../../sanity/client.js';
import "../subnav-styles/UpcomingShows.css";

console.log(process.env)


const UpcomingShows = () => {
  const [shows, setShows] = useState([]);
  const [venues, setVenues] = useState({});

  // Function to fetch shows and their corresponding venues
  const fetchShowsAndVenues = async () => {
    try {
      const showsData = await client.fetch(`*[_type == 'event']`);
      setShows(showsData);

      // Extract unique venue IDs
      const venueIds = [...new Set(showsData.map(show => show.venue._ref))];
      const venuesData = await client.fetch(`*[_id in $venueIds]`, { venueIds });

      // Map venue data for easy access
      const venuesMap = venuesData.reduce((acc, venue) => {
        acc[venue._id] = venue.name; // Assuming venue has a 'name' field
        return acc;
      }, {});

      setVenues(venuesMap);
    } catch (error) {
      console.error('Error fetching shows:', error);
    }
  };

  useEffect(() => {
    fetchShowsAndVenues();
  }, []);

  return (
    <div className="table-container">
      <h1>Upcoming Shows (UNDER TESTING - NOT REAL DATES)</h1>
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
          {shows.map(show => (
            <tr key={show._id}>
              <td>{new Date(show.date).toLocaleDateString()}</td>
              <td>
                {venues[show.venue._ref] || 'Venue not specified'} @{" "}
                {new Date(show.date).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td>
                {show.price > 0 ? "$" + show.price
                  : 'Free'}
              </td>
              <td>
                <button id="rsvp">RSVP</button>
                <button id="tickets">
                  <a href={show.tickets} target="_blank" rel="noopener noreferrer">Buy Tickets</a>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


    //--------------------------------

//     <div className="table-container">
//       <h1>Upcoming Shows</h1>
//       <ul>
//         {shows.map(show => (
//           <li key={show._id}>{show.name}</li>
//         ))}
//       </ul>
    //     </div>
    

    

export default UpcomingShows;