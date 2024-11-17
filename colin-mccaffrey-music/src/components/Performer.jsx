import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UpcomingShows from './SubNavs/Performer Subnav/UpcomingShows';
import Media from './SubNavs/Performer Subnav/Media';

function Performer() {
  const [selectedComponent, setSelectedComponent] = useState("upcoming shows");

  const handlePerformerLinks = (component) => {
    setSelectedComponent(component)
  }
  return (
    <>
      <div>
        <hr />
        <h2>
          <Link to="#" className={`component ${selectedComponent === 'upcoming shows' ? 'bold' : 'faded'}`} onClick={() => handlePerformerLinks("upcoming shows")
          }>Upcoming Shows</Link> <span className="divider">|</span>
          <Link to="#" className={`component ${selectedComponent === "media" ? 'bold' : 'faded'}`} onClick={() => handlePerformerLinks("media")}> Media</Link>
        </h2>
        {/* <Link to="#" className={`component ${selectedComponent === "credits" ? 'bold' : 'faded'}`} onClick={() => handlePerformerLinks("credits")}> Credits </Link></h2> */}

        {selectedComponent === "upcoming shows" && <UpcomingShows />}
        {selectedComponent === "media" && <Media />}
        {/* {selectedComponent === "credits" && <Credits />} */}

        <div data-events-calendar-app data-project-id="proj_bxCpMFt26M5XU9etGkMv4" ></div>
        <script type="text/javascript" src="//dist.eventscalendar.co/embed.js"></script>
      </div>

    </>
  )
}

export default Performer