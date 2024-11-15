import React, { useState, useEffect } from "react";
import { client } from '@/sanity/client';
import "../subnav-styles/UpcomingShows.css";

console.log(process.env)


function UpcomingShows() {
  const [events, setEvents] = useState([]);

   useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await client.fetch(`*[_type == 'event']`);
        if (!data.ok) {
          throw new Error('Network response was not ok');
        }
        setEvents(data);
      } catch (error) {
        console.error('Error fetching shows:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    // <div className="table-container">
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Date</th>
    //         <th>Venue</th>
    //         <th>Location</th>
    //         <th>Price</th>
    //         <th></th>
    //       </tr>
    //     </thead>

    //     <tbody>
    //       {shows.map((show, index) => (
    //         <tr key={show._id}>
    //           <td>{new Date(Date.parse(show.date)).toLocaleDateString()}</td>
    //           <td>
    //             {show.title} @{" "}
    //             {new Date(Date.parse(show.date)).toLocaleTimeString("en-US", {
    //               hour: "2-digit",
    //               minute: "2-digit",
    //             })}
    //           </td>
    //           <td>{show.location}</td>
    //           <td>${show.price}</td>
    //           <td>
    //             <button id="rsvp">RSVP</button>
    //             <button id="tickets">Buy Tickets</button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>

    //--------------------------------

    <div className="table-container">
      <h1>Upcoming Shows</h1>
      <ul>
        {events.map(event => (
          <li key={event._id}>{event.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingShows;