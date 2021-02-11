import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

export const VideoPlayer = (props) => {
  const { src, sub } = props;
  const [subs, setSubs] = useState(false);

  const [test, setTest] = useState();

  useEffect(() => {
    axios.get(sub).then((res) => {
      console.log(res);

      if (res.data) {
        setSubs(true);
        const url = URL.createObjectURL(new Blob([res.data], { type: "text/plain" }));
        setTest(url);
      }
    });
  }, []);

  return (
    <video id="videoPlayer" width="650" controls crossOrigin="use-credentials" controlsList="nodownload">
      <source src={src} type="video/mp4" />
      {subs ? <track label="English" kind="subtitles" srcLang="en" src={test} /> : null}
    </video>
  );
};

export default VideoPlayer;
