import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

export const VideoPlayer = (props) => {
  const { src, sub } = props;
  const [subs, setSubs] = useState(false);

  axios.get(sub).then((res) => {
    if (res.data) {
      setSubs(true);
    }
  });

  return (
    <video id="videoPlayer" width="650" controls crossOrigin="use-credentials" controlsList="nodownload">
      <source src={src} type="video/mp4" />
      {subs ? <track label="English" kind="subtitles" srcLang="en" src={sub} /> : null}
    </video>
  );
};

export default VideoPlayer;
