import React from "react";
import { Badge, Table } from "react-bootstrap";
const TrackSearchResult = ({ track, chooseTrack }) => {
  const handlePlay = () => {
    chooseTrack(track);
  };
  // return (
  //   // <div className="d-flex m-2 align-items-center">
  //   //   <img
  //   //     src={track.albumUrl}
  //   //     style={{ height: "64px", width: "64px", cursor: "pointer" }}
  //   //     onClick={handlePlay}
  //   //   />
  //     {/* "danceability" : 0.719,
  //   "energy" : 0.797,
  //   "key" : 3,
  //   "loudness" : -3.890,
  //   "mode" : 1,
  //   "speechiness" : 0.0515,
  //   "acousticness" : 0.244,
  //   "instrumentalness" : 0,
  //   "liveness" : 0.0780,
  //   "valence" : 0.729, */}

  //     {/* <div style={{ marginLeft: "20px" }}>
  //       <div>{track.title}</div>
  //       <Badge pill bg="secondary">
  //         popularity {track.popularity}
  //       </Badge>
  //       <div>energy</div>
  //       <Badge pill bg="secondary">
  //         {track.energy}
  //       </Badge>
  //       <Badge pill bg="success">
  //         danceability {track.danceability}
  //       </Badge>
  //       <Badge pill bg="warning" text="dark">
  //         loudness {track.loudness}{" "}
  //       </Badge>
  //       <Badge pill bg="light" text="dark">
  //         speechiness {track.speechiness}
  //       </Badge>
  //       <Badge pill bg="dark">
  //         acousticness {track.acousticness}
  //       </Badge>
  //       <Badge pill bg="dark">
  //         instrumentalness {track.instrumentalness}
  //       </Badge>
  //       <Badge pill bg="dark">
  //         liveness {track.liveness}
  //       </Badge>{" "}
  //       <Badge pill bg="dark">
  //         valence {track.valence}
  //       </Badge>
  //     </div>
  //   </div> */}
  // );
  return (
    <tr>
      <td>
        <img
          src={track.albumUrl}
          style={{ height: "64px", width: "64px", cursor: "pointer" }}
          onClick={handlePlay}
        />
      </td>
      <td>{track.artist}</td>
      <td>{track.title}</td>
      <td>{track.popularity}</td>
      <td>{track.energy}</td>
      <td>{track.danceability}</td>
      <td>{track.loudness}</td>
    </tr>
  );
};

export default TrackSearchResult;
