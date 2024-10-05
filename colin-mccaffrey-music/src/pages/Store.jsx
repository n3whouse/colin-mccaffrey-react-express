import React, { useEffect, useState } from 'react';
import "../styles/Store.css";
import releases from "../helpers/releases";
// import { Link } from 'react-router-dom';

//TODO: finish Store blurb


function Store() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  }

  
  useEffect(() => {
    const handleClickOut = (event) => {
      if (selectedItem && !event.target.closest(`.item${selectedItem}`)) {
        setSelectedItem(null);
      }
    };
    document.addEventListener('click', handleClickOut);
    return () => {
      document.removeEventListener('click', handleClickOut);
    }
  }, [selectedItem])
  
  /*TODO: After finished microwaving head, 
  1. find out why ALL classes are getting selected with clicks now 
  2.  */
  return (
    <>
      <div className="gridContainer">
        {/* <div className="gridItem menu">
        <h1>LINKS</h1>
          <Link>Bandcamp</Link>
          
          <Link>Spotify</Link>
        </div> */}
        {releases.map((release) => (
          <div
            key={release.id}
            className={`gridItem item${release.id} ${selectedItem === release.id ? 'selected' : ''}`}
            onClick={() => handleItemClick(release.id)}>
            
            <img src={release.cover} className={`album-art item${release.id} ${selectedItem === release.id ? '' : 'cover'}`} alt={release.title} />


            {selectedItem === release.id && (
              <div className="album-details">
                <h2>{release.title}</h2>
                <p>{release.description}</p>
                <button>Buy Now</button>
                <button>See Credits</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default Store