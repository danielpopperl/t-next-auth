import { useEffect, useRef } from "react";
import Hls from "hls.js";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { Halant } from "next/font/google";

export default function VideoPlayer({ src }) {
  const videoRef = useRef(null);

  const hls = new Hls();

  function updateQUalityy(e) {
    hls.levels.forEach((element, index) => {
      if (element.height == e) {
        console.log(index);
        hls.currentLevel = index;
        return;
      }
    });

    // console.log(hls.currentLevel);
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.controls = true;
    const defaultOptions = {
      debug: true,
      controls: [
        "rewind",
        "play",
        "fast-forward",
        "progress",
        "restart",
        "current-time",
        "mute",
        "volume",
        "captions",
        "settings",
        "pip",
        "airplay",
        "fullscreen",
      ],
      settings: ["quality"],
      quality: {
        default: 720,
        forced: true,
        options: [720, 480, 360, 240],
        onChange: (e) => updateQUalityy(e),
      },
    };
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // This will run in safari, where HLS is supported natively
      video.src = src;
    } else if (Hls.isSupported()) {
      // This will run in all other modern browsers

      //   hs;
      hls.loadSource(src);
      new Plyr(video, defaultOptions);
      hls.attachMedia(video);
    } else {
      console.error(
        "This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API"
      );
    }
  }, [src, videoRef]);

  return (
    <>
      <video data-displaymaxtap ref={videoRef} />
      <style jsx>{`
        video {
          max-width: 100%;
        }
      `}</style>
    </>
  );
}
