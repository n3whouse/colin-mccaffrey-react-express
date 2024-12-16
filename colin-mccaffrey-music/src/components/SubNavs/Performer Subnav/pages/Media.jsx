import React, { useState, useEffect } from "react";
import "../styles/Media.css";
import "../styles/Calendar.css";
import { client } from "../../../../sanity/client";
import { PortableText } from "@portabletext/react";
import AudioPlayer from "../../../../utils/AudioPlayer/AudioPlayer";

function Media() {
  const [mediaItems, setMediaItems] = useState([]);
  // const [audioFiles, setAudioFiles] = useState([]);

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
    <>
      <h1>Media</h1>
      <AudioPlayer />
      <div className="media">
        {mediaItems.map((media, index) => (
          <div key={index} className="mediaItem">
            <h2 id="mediaHeadline">
              {media.mediaHeadline && (
                <PortableText blocks={media.mediaHeadline} />
              )}
            </h2>
            {media.mediaType === "video" && (
              <video controls>
                <source src={media.videoFile?.asset?.url} type="video/mp4" />
                Your browser does not support this video element.
              </video>
            )}
            {media.mediaType === "youtube" && (
              <iframe
                width="500"
                height="315"
                src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                  media.youtubeUrl
                )}`}
                title={media.mediaHeadline}
                allowFullScreen
              ></iframe>
            )}
            {media.description && <PortableText blocks={media.description} />}
            {media.publishedAt && (
              <p id="publishDate">
                Published on: {new Date(media.publishedAt).toLocaleDateString()}
              </p>
            )}
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}

export default Media;
