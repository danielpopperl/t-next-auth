import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import Plyr from "plyr";

export default function VideoPlayer2({ src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    new Plyr(videoRef.current);
  }, [src, videoRef]);

  return (
    <>
      <video id="video" playsInline controls ref={videoRef} />
      <style jsx>{`
        video {
          max-width: 100%;
        }
      `}</style>
    </>
  );
}
