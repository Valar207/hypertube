import React from "react";

export const VideoPlayer = (props) => {
  const { src } = props;
  return (
    <video id="videoPlayer" width="650" controls muted="muted">
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default VideoPlayer;
