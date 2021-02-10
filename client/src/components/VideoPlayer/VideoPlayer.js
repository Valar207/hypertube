import React from "react";

export const VideoPlayer = (props) => {
  const { src, sub } = props;
  return (
    <video id="videoPlayer" width="650" controls crossOrigin="use-credentials">
      <source src={src} type="video/mp4" />
      <track label="English" kind="subtitles" srcLang="en" src={sub} />
    </video>
  );
};

export default VideoPlayer;
