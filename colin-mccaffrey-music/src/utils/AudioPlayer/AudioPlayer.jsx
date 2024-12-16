import React, { useState, useRef, useEffect } from "react";
import { client } from "../../sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import "./AudioPlayer.css";
import {
  PlayIcon,
  PauseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@sanity/icons";

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [musicItems, setMusicItems] = useState([]);
  const [trackDurations, setTrackDurations] = useState([]); // State to hold track durations

  useEffect(() => {
    const fetchMusic = async () => {
      const data = await client.fetch(
        `*[_type == 'audioFile']{
          audioFiles[]{
            albumArt{
              asset->{
                url
              }
            },
            audioFile{
              asset->{
                url
              }
            },
            title,
            creditLine->{
              name
            }
          }
        }`
      );

      const audioFiles = data[0]?.audioFiles || [];
      setMusicItems(audioFiles);
      setTrackDurations(new Array(audioFiles.length).fill(0)); // Initialize durations array
    };
    fetchMusic();
  }, []);

  useEffect(() => {
    // Load each audio file to get its duration
    const loadTrackDurations = async () => {
      const durations = await Promise.all(
        musicItems.map((item) => {
          return new Promise((resolve) => {
            const audio = new Audio(item.audioFile.asset.url);
            audio.onloadedmetadata = () => {
              resolve(audio.duration); // Get the duration when metadata is loaded
            };
          });
        })
      );
      setTrackDurations(durations);
    };

    if (musicItems.length > 0) {
      loadTrackDurations();
    }
  }, [musicItems]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    }
    setIsPlaying((prev) => !prev);
  };

  const handleNext = () => {
    setCurrentAudioIndex((prev) => (prev + 1) % musicItems.length);
  };

  const handlePrevious = () => {
    setCurrentAudioIndex((prev) =>
      prev === 0 ? musicItems.length - 1 : prev - 1
    );
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []); // Only set up the listener once

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && musicItems.length > 0) {
      audio.src = musicItems[currentAudioIndex]?.audioFile.asset.url; // Set the audio source
      audio.currentTime = currentTime; // Set the current time to maintain position
      if (isPlaying) {
        audio
          .play()
          .catch((error) => console.error("Error playing audio:", error));
      }
    }
  }, [currentAudioIndex, musicItems, currentTime, isPlaying]); // Only run when currentAudioIndex or musicItems change

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progress = (currentTime / duration) * 100 || 0;

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const newTime = (e.target.value / 100) * duration; // Convert percentage to seconds
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="audio-player">
      {musicItems.length > 0 && (
        <div className="track-info">
          <div className="track-details">
            <img
              src={urlFor(musicItems[currentAudioIndex].albumArt.asset.url)}
              alt={musicItems[currentAudioIndex].altText || "Album Art"}
              className="album-art"
            />
            <h3 className="track-title">
              {musicItems[currentAudioIndex].title}
            </h3>
            <p className="track-artist">
              {musicItems[currentAudioIndex].creditLine?.name ||
                "Unknown Artist"}
            </p>
          </div>
        </div>
      )}
      <audio ref={audioRef} />
      <div className="controls">
        <button className="play-pause-next" onClick={handlePrevious}>
          <p id="previous">
            <ChevronLeftIcon />
          </p>
        </button>
        <button className="play-pause-next" onClick={handlePlayPause}>
          <p id="playpause">{isPlaying ? <PauseIcon /> : <PlayIcon />}</p>
        </button>
        <button className="play-pause-next" onClick={handleNext}>
          <p id="next">
            <ChevronRightIcon />
          </p>
        </button>
        <div className="volume-control">
          <p id="volume-label">VOL</p>
          <input
            id="volumeControl"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
      <div className="progress-bar">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
        />
        <div className="time-display">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
      <div className="track-list">
        <table id="tracklist-table">
          <thead>
            <tr>
              <th className="tracklist-item">Track</th>
              <th className="tracklist-item">Contributing Artist(s)</th>
              <th className="tracklist-item">Duration</th>
            </tr>
          </thead>
          <tbody>
            {musicItems.map((item, index) => (
              <tr
                key={index}
                className={`track-item ${currentAudioIndex === index ? "active" : ""}`}
                onClick={() => setCurrentAudioIndex(index)}
              >
                <td id="song-name">{item.title}</td>
                <td id="artist-name ">{item.creditLine?.name}</td>
                <td id="duration">{formatTime(trackDurations[index])}</td>{" "}
                {/* Display dynamic duration */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AudioPlayer;
