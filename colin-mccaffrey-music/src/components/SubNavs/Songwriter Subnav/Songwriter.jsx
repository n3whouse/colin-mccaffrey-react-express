import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Streaming from './pages/Streaming';

function Songwriter() {
  const [selectedComponent, setSelectedComponent] = useState("streaming");

  const handleSongwriterLinks = (component) => {
    setSelectedComponent(component)
  }
  return (
    <div>
      <hr />
      <h2><Link to="#" className={`component ${selectedComponent === 'streaming' ? 'bold' : 'faded'}`} onClick={() => handleSongwriterLinks("streaming")
      }>Streaming</Link> <span className="divider">|</span>

        <Link to="#" className={`component ${selectedComponent === "credits" ? 'bold' : 'faded'}`} onClick={() => handleSongwriterLinks("credits")}> Credits</Link>

        {selectedComponent === 'streaming' && <Streaming />}
      </h2>


      <h2>Colin's Credits:</h2>
      <p>
        Christine Malcom covered Colin's song Gypsy Boy on her 2015 release Crickets, Coyotes and the Big Yellow Moon
      </p>

      <p>December 3rd, 2012: Colin won 1st Prize in the USA Songwriting Competition Jazz song category with his song Old Porch Swing. Hear it on Old Porch Swing - Simple
      </p>

      <p>2011: Housetop did a great version of Colin's tune Your Feet Look Good</p>

      <p>December 2010: Colin ended up a finalist in the USA Songwriting Competition folk category with his song Blue Mt. Whiskey</p>

      <p>January 1st 2010: Colin won a Tammie for Artist of the Year.</p>

      <p>May 2009: Colin won First place in the Merlefest Bluegrass Category - Chris Austin Songwriting Contest. LOVE GONE BY co-written with Carol Hausner. That's a mess o' guitar strings, mister!</p>

      <p>2003: Colin placed 3rd in the Solarfest Singer-Songwriter competition.</p>


      <p>Colin's song "Never Get The Nerve To Call" was sung by Shauna Antoniuc on I Heard The Highway a great record by Vermont Western Swing and Country legend Rick Norcross and the Ramblers.</p>

      <p>Colin appeared in and co-arranged music for the 1997 independently released film "Letters From My Mother's Early Lover's" Directed by Nora Jacobson. Colin's playing can also be heard on the documentary series "Colonial Life For Children " by Stonehouse Productions in Greenwich, CT. Both of these projects were recorded at Noteworthy Studios in Granville, VT.</p>

      <p>
        Colin co-produced Mother Goose's Never-Ending Tea Party a new children's record with Rebop Records and the Vermont Center For The Book. The project features old folk songs, Mother Goose Rhymes put to new music, as well as new songs by Colin and his daughters.
      </p>

      <p>Colin wrote and arranged music for the 1999 Circus Smirkus Production "The Adventures of Robin Hood", which is the focus of a British documentary film series entitled "Circus Kids" aired on the Disney Channel 2000. To hear some of these pieces, download samples from the Record Store.</p>

      <p>
        If you're in the WDEV or WNCS listening area, you've probably heard Colin's jingles for Capitol grounds, Onion River Sports, The Shoe Horn, Planned Parenthood, and Cabot Creamery.
      </p>
    </div>
  )
}

export default Songwriter