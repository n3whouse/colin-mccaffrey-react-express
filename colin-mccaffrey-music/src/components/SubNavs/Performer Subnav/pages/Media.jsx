import React, { useState, useEffect } from "react";
import "../styles/Media.css";
import { client } from "../../../../sanity/client";

function Media() {
  const [mediaItems, setMediaItems] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      const data = await client.fetch(`*[_type == 'performer']{media}`);
      const flattenedMediaItems = data.flatMap(
        (performer) => performer.media || []
      );
      setMediaItems(flattenedMediaItems);
    };
    fetchMedia();
  }, []);

  const getYouTubeVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  };

  return (
    <div className="mediaContainer">
      {mediaItems.map((media, index) => (
        <div key={index} className="mediaItem">
          <h2>{media.mediaHeadline}</h2>
          {media.mediaType === "audio" && (
            <audio controls>
              <source src={media.audioFile?.asset?.url} type="audio/mp3" />
              Your browser does not support this audio element.
            </audio>
          )}
          {media.mediaType === "video" && (
            <video controls>
              <source src={media.videoFile?.asset?.url} type="video/mp4" />
              Your browser does not support this video element.
            </video>
          )}
          {media.mediaType === "youtube" && (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                media.youtubeUrl
              )}`}
              title={media.mediaHeadline}
              allowFullScreen
            ></iframe>
          )}
          {media.description && <p>{media.description}</p>}
          {media.publishedAt && (
            <p>
              Published on: {new Date(media.publishedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Media;
