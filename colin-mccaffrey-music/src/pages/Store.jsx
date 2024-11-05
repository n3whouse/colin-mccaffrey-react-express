import React, { useEffect, useState } from 'react';
import "../styles/Store.css";
import axios from 'axios';

/* 
⁡⁢⁣⁣NEXT UP...
I have added at least one release to the database via Insomnia. This means that the endpoints are working. There is CRUD functionality. The problem is that when we were serving from the static 'releases.js' helper file before we established the endpoints, the store items were displaying just fine. Now the issue is trying to get the releases to come back up on the store again.⁡
*/


function Store() {
  const [releases, setReleases] = useState([]); //the reason the map wasn't working was because I was trying to initiate it as an object and maps only work on arrays.
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_RELEASES_API_URL}`);
        setReleases(response.data);
      } catch (error) {
        console.error("Error fetching releases:", error);
      }
    }

    fetchReleases();
  }, []);

    const handleItemClick = (item) => {
      setSelectedItem(item);
    }

  
    useEffect(() => {
      const handleClickOut = (e) => {
        if (selectedItem && !e.target.closest(`.item${selectedItem}`)) {
          setSelectedItem(null);
        }
      };
      document.addEventListener('click', handleClickOut);
      return () => {
        document.removeEventListener('click', handleClickOut);
      }
    }, [selectedItem])
  
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
            
              <img src={release.coverFile} className={`album-art item${release.id} ${selectedItem === release.id ? '' : 'coverFile'}`} alt={release.title} />


              {selectedItem === release.id && (
                <div className="album-details">
                  <button>Buy Now</button>
                  <button>See Credits</button>
                  <h2>{release.title}</h2>
                  <p>{release.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    )
  }

export default Store;