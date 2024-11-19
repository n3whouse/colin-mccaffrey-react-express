import React from "react";
import "../styles/Media.css";

function Media() {
  return (
    <div className="mediaContainer">
      <h2>
        Watch Colin McCaffrey & Doug Perkins' Thursday Rumney Barn Session at
        Fable Farm:
      </h2>
      <iframe
        src="https://www.youtube.com/embed/sJzfhZcWQ50?si=RC56bNFeAs8lbE5J"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default Media;
