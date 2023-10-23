"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import Plyr from "plyr";

export default function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const player = useRef(null);
  const [playerPlay, setPlayerPlay] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  const hls = new Hls({ maxBufferSize: 1 * 1000 * 100 });
  let defaultOptions = null;

  const controlsMobile = `
    <div class="plyr__controls plyr__controls_c">

    <div>
      <div class="plyr__timers_c">
        <div class="plyr__time plyr__time--current" aria-label="Current time">00:00</div>
        <div> &nbsp/&nbsp</div>
        <div class="plyr__time plyr__time--duration" aria-label="Duration">00:00</div>
      </div>
      <div class="plyr__progress">
        <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
        <progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
        <span role="tooltip" class="plyr__tooltip">00:00</span>
      </div>
    </div>

    <div class="plyr__controls_tools__c">

      <div class="plyr__controls_tools_main__c">
        <button type="button" class="plyr__control" data-plyr="rewind">
          <svg role="presentation"><use xlink:href="#plyr-rewind"></use></svg>
          <span class="plyr__tooltip" role="tooltip">Rewind {seektime} secs</span>
        </button>

        <button type="button" class="plyr__control" aria-label="Play, {title}" data-plyr="play">
          <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
          <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>
          <span class="label--pressed plyr__tooltip" role="tooltip">Pause</span>
          <span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span>
        </button>

        <button type="button" class="plyr__control" data-plyr="fast-forward">
          <svg role="presentation"><use xlink:href="#plyr-fast-forward"></use></svg>
          <span class="plyr__tooltip" role="tooltip">Forward {seektime} secs</span>
        </button>

        <button type="button" class="plyr__control" data-plyr="captions">
          <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-captions-on"></use></svg>
          <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-captions-off"></use></svg>
          <span class="label--pressed plyr__tooltip" role="tooltip">Disable captions</span>
          <span class="label--not-pressed plyr__tooltip" role="tooltip">Enable captions</span>
        </button>
      </div>

      <button type="button" class="plyr__control" data-plyr="fullscreen">
        <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-exit-fullscreen"></use></svg>
        <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-enter-fullscreen"></use></svg>
        <span class="label--pressed plyr__tooltip" role="tooltip">Exit fullscreen</span>
        <span class="label--not-pressed plyr__tooltip" role="tooltip">Enter fullscreen</span>
      </button>
      </div>
    </div>
  `;

  const controlsDefault = [
    "play-large",
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
  ];

  if (videoRef.current && !Hls.isSupported()) {
    console.error(
      "This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API"
    );
  }

  if (!playerPlay && playerReady) {
    setPlayerPlay(true);
  }

  useEffect(() => {
    if (
      videoRef.current &&
      videoRef.current.canPlayType("application/vnd.apple.mpegurl")
    ) {
      // This will run in safari, where HLS is supported natively
      videoRef.current.src = src;
    }

    if (!videoRef.current && Hls.isSupported()) {
      hls.loadSource(src);

      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        // This will run in all other modern browsers

        var qualityHls = hls.levels.map((l) => l.height);

        qualityHls.unshift(0);
        qualityHls = qualityHls.reverse();

        defaultOptions = {
          debug: true,
          controls: controlsDefault,
          settings: ["quality", "speed"],
          muted: false,
          // hideControls: true,
          loadSprite: true,
          quality: {
            default: 0,
            forced: true,
            options: qualityHls,
            onChange: (e) => updateQUality(e),
          },
          i18n: {
            qualityLabel: {
              0: "Auto",
            },
          },
          speed: {
            selected: 1,
            options: [0.5, 1, 1.25, 1.5, 2],
          },
          loadSprite: true,
          // iconUrl: "/assets/icon/logo.svg",
          iconPrefix: "plyr",
          previewThumbnails: {
            enabled: true,
            src: "https://image.mux.com/cUuQuJAebliWu34zXBotfdMrStoytkJ00JtjUgwjzgyU/storyboard.vtt",
          },
          // listeners: {
          //   play(e) {
          //     if (player.playing) {
          //       // player.error();
          //       console.log(e);
          //     } else {
          //     }
          //   },
          // },
        };

        if (!player.current) {
          player.current = new Plyr("#video", defaultOptions);

          // player.current.once("canplaythrough", (event) => {
          // setPlayerReady(true);
          // });
        }

        hls.attachMedia(videoRef.current);
      });

      setPlayerReady(true);
    }

    return () => {
      if (player.current) player.current.destroyPlayer();
    };
  }, []);

  useEffect(() => {
    if (!player.current) return;

    const a = setInterval(() => {
      if (player.current.playing) {
        console.log(player.current.currentTime);
        // player.current.togglePlay();
      }
    }, 2000);

    return () => clearInterval(a);
  }, [playerReady]);

  function updateQUality(e) {
    if (e == 0) {
      hls.currentLevel = -1;
      return;
    }

    hls.levels.forEach((element, index) => {
      if (element.height == e) {
        hls.currentLevel = index;
      }
    });
  }

  return (
    <>
      <svg
        style={{ position: "absolute" }}
        width="700px"
        viewBox="0 0 1000 500"
        fill="black"
      >
        <use href="/assets/icon/logo.svg#123" />
      </svg>
      <div>video</div>
      <div className="text-slate-300">
        {playerPlay ? (
          <video
            id="video"
            className={`hidden ${playerReady ? "flex" : ""}`}
            playsInline
            controls
            ref={videoRef}
            poster="https://image.mux.com/cUuQuJAebliWu34zXBotfdMrStoytkJ00JtjUgwjzgyU/thumbnail.png?width=214&height=121&time=2"
          />
        ) : (
          <div>oiii</div>
        )}
      </div>
    </>
  );
}
