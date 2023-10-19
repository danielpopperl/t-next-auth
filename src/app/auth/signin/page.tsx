"use client";

import React, { Suspense, useEffect, useState } from "react";
import VideoPlayer from "../../components/video-player";
import Modal from "react-modal";

export default function Home() {
  const [isModal, setIsOpen] = useState(false);
  const [isWatchNow, setIsWatchNow] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    console.log("comming");
    setVideoUrl(newvideoUrl);
  });

  let newvideoUrl =
    "https://stream.mux.com/vuFiGm3QrXkIoeRePvjIf6nBI1FFC01mgOaZvmnaz82s.m3u8";

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const playVideo = (type: any) => {
    if (type === "trailer") {
    } else if (type === "teaser") {
      setIsWatchNow(true);
      setVideoUrl(newvideoUrl);
    } else {
      setIsWatchNow(false);
    }
  };

  const closeVideoModal = () => {
    setIsWatchNow(false);
  };

  return (
    <>
      {/* <Head>
        <title>Next.js & HLS.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      <div className="grid">
        <Suspense fallback={<p>Loading feed...</p>}>
          {videoUrl !== "" && <VideoPlayer src={videoUrl} />}
        </Suspense>
      </div>
      {/* <main>
         <div className="grid">
          <Link
            href="/"
            className="btn btn-watchnow btn-booknow watchnow mr-3"
            onClick={(e) => {
              e.preventDefault();
              playVideo("trailer");
            }}
          >
            Watch Now
          </Link>
        </div>

        <Modal
          isOpen={isWatchNow}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeVideoModal}
          contentLabel="Video Modal"
        >
          <div className="text-center mt-4">
            <button
              onClick={() => closeVideoModal()}
              className="btn btn-danger"
            >
              Close
            </button>
          </div>
        </Modal> 
      </main>
        */}

      {/* <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer .separator {
          width: 20px;
          height: 20px;
          text-align: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .video-wrapper {
          max-width: 800px;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style> */}
    </>
  );
}
