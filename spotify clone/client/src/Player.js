import { React, useState, useEffect } from "react";

import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState(false);
  useEffect(() => setPlay(true), [trackUri]);
  if (!accessToken) {
    return null;
  }
  return (
    <div
      style={{
        bottom: "0",
        width: "100%",
        position: "fixed",
        padding: "40px",

        backgroundColor: "white",
      }}
    >
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={(state) => {
          if (!state.isPlaying) setPlay(false);
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
      />
    </div>
  );
};

export default Player;
