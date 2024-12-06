import React, { useState, useEffect } from "react";
import { client } from "../../../../sanity/client";
import { Spotify } from "react-spotify-embed";
import YouTube from "react-youtube";
import SanityBlockContent from "@sanity/block-content-to-react";
import "../Songwriter.css";

// Define default serializers
const serializers = {
  types: {
    block: (props) => <p>{props.children}</p>, // Default block serializer for paragraphs
    // You can add more custom serializers for different block types here
  },
};

function Streaming() {
  const [streamingItems, setStreamingItems] = useState([]);

  useEffect(() => {
    const fetchStreaming = async () => {
      const data = await client.fetch(`*[_type == 'songwriter']{streaming}`);
      const flattenedStreamingItems = data.flatMap(
        (songwriter) => songwriter.streaming || []
      );
      console.log(flattenedStreamingItems); // Log data for verification
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
          <h2>
            {stream.mediaHeadline && (
              <SanityBlockContent
                blocks={stream.mediaHeadline}
                id="streamingHeader"
                serializers={serializers} // Pass serializers here
              />
            )}
          </h2>
          {stream.mediaType === "spotify" && stream.spotifyUrl && (
            <Spotify link={stream.spotifyUrl} id="spotifyPlayer" />
          )}
          {stream.mediaType === "appleMusic" && stream.appleMusicUrl && (
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
          {stream.mediaType === "youtube" && stream.youtubeUrl && (
            <YouTube videoId={getYouTubeVideoId(stream.youtubeUrl)} />
          )}
          {stream.mediaType === "livestream" && stream.livestreamUrl && (
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
