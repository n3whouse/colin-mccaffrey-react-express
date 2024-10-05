import React from 'react'
import { Spotify } from "react-spotify-embed";

function Streaming() {
  return (
    <div className="playerContainer">
      <h2 className="playerTitle">Listen to Colin's latest album, <em>The Cobbler's Child,</em> on Spotify</h2>
      <Spotify link="https://open.spotify.com/album/5jT5uiHM81RqLTfDgOkhyJ?si=kvUOF9Q7ReOq3AGTk_AHQw" id="spotifyPlayer"></Spotify>
    </div>
  )
}

export default Streaming