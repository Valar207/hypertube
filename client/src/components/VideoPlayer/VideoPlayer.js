import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

export const VideoPlayer = (props) => {
  const { src, sub } = props;
  const [subs, setSubs] = useState(false);

  const [test, setTest] = useState();

  const [subInfos, setSubInfos] = useState([]);

  useEffect(() => {
    axios.get(sub).then((res) => {
      if (res.data) {
        setSubs(true);
      }
      console.log(res);
      if (res.data._streams) {
        var rData = res.data._streams;
        let subTmp = {};
        let arrayTmp = [];

        for (const r of rData) {
          console.log(r);
          if (typeof r === "string") {
            var rParse = r.split(`"`);

            const name = rParse[1];
            const lang = rParse[3].split(".")[0];

            subTmp = { name, lang };
            // subTmp.name = name;
            // subTmp.lang = lang;
          }

          if (r?.type) {
            // console.log(r);
            var subB64 = new Buffer.from(r.data).toString();
            console.log(subB64);
            const url = URL.createObjectURL(new Blob([subB64], { type: "text/plain" }));
            subTmp.src = url;
            // console.log(subInfos)
            subTmp = { ...subTmp, src: url };
            arrayTmp.push(subTmp);
          }
        }
        // console.log(arrayTmp);
        setSubInfos(arrayTmp);

        // if (res.data) {
        //   setSubs(true);
        //   const url = URL.createObjectURL(new Blob([res.data], { type: "text/plain" }));
        //   setTest(url);
        // }
      }
    });
  }, []);

  // useEffect(() => {
  //   console.log(subInfos);
  // }, [subInfos]);

  return (
    <video id="videoPlayer" width="650" controls crossOrigin="use-credentials" controlsList="nodownload">
      <source src={src} type="video/mp4" />
      {subs ? <track label="English" kind="subtitles" srcLang="en" src={sub} /> : null}
      {subInfos.map((s) => (
        <track label={s.name} kind="subtitles" srcLang={s.lang} src={s.src} />
      ))}
    </video>
  );
};

export default VideoPlayer;
