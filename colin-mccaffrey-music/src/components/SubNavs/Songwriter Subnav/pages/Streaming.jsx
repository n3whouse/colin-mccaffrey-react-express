import React, { useState, useEffect } from "react";
import { client } from "../../../../sanity/client";
import { Spotify } from "react-spotify-embed";
import YouTube from "react-youtube";
import SanityBlockContent from "@sanity/block-content-to-react";
import "../Songwriter.css";

function Streaming() {
  const [streamingItems, setStreamingItems] = useState([]);

  useEffect(() => {
    const fetchStreaming = async () => {
      const data = await client.fetch(`*[_type == 'songwriter']{streaming}`);
      const flattenedStreamingItems = data.flatMap(
        (songwriter) => songwriter.streaming || []
      );
      setStreamingItems(flattenedStreamingItems);
    };
    fetchStreaming();
  }, []);

  const getYouTubeVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  };

  return (
    <div className="streamingContainer">
      {streamingItems.map((stream, index) => (
        <div key={index} className="streamItem">
          <p>
            <SanityBlockContent
              blocks={stream.mediaHeadline}
              id="streamingHeader"
            />
          </p>
          {stream.mediaType === "spotify" && (
            <Spotify link={stream.spotifyUrl} id="spotifyPlayer" />
          )}
          {stream.mediaType === "appleMusic" && (
            <iframe
              src={`https://embed.music.apple.com/us/album/${stream.appleMusicUrl
                .split("/")
                .pop()}`}
              width="100%"
              height="450"
              frameBorder="0"
              allow="autoplay"
              title="Apple Music Player"
            ></iframe>
          )}
          {stream.mediaType === "youtube" && (
            <YouTube videoId={getYouTubeVideoId(stream.youtubeUrl)} />
          )}
          {stream.mediaType === "livestream" && (
            <iframe
              src={stream.livestreamUrl}
              width="100%"
              height="450"
              frameBorder="0"
              allowFullScreen
              title="Livestream"
            ></iframe>
          )}
          {stream.description && <p>{stream.description}</p>}
          <hr id="streamDivider" />
        </div>
      ))}
    </div>
  );
}

export default Streaming;
