import React from "react";

const PlaylistRow = (props) => {
  return (
    <div>
      <img
        src={props.image.url}
        className="me-3 mt-3"
        key={props.index}
        style={{ width: "150px" }}
        onClick={props.handlePlaylistSelection}
        id={props.playlist.id}
      />
      <a onClick={props.handlePlaylistSelection} id={props.playlist.id}>
        {props.playlist.name}
      </a>
    </div>
  );
};

export default PlaylistRow;
