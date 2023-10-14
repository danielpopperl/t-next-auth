export default async function SignIn() {
  return (
    <>
      {/* {Object.values(options.providers).map((provider: any) => (
        <div key={provider.name}>
          <button onClick={() => signIn("azure-ad")}>
            Sign in with {provider.name}
          </button>
        </div>
      ))} */}

      <div>
        <iframe
          id="myVideo"
          src="https://iframe.mediadelivery.net/embed/161168/3692e87b-e322-4bb5-bb8a-fb93f72523c8?autoplay=false&loop=false&muted=false&preload=false"
          loading="lazy"
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
        ></iframe>
      </div>

      <div>
        <video width="320" height="240" id="myVideo2">
          <source
            src="https://iframe.mediadelivery.net/play/161168/3692e87b-e322-4bb5-bb8a-fb93f72523c8"
            type="video/webm"
          ></source>
        </video>
      </div>
    </>
  );
}
