import { Table } from "react-bootstrap";
import React from "react";
import TrackSearchResult from "./TrackSearchResult";

const PlaylistTable = ({ trackDetails, sortByValue, chooseTrack }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Album</th>
        <th onClick={(e) => sortByValue(e)}>Artist</th>
        <th onClick={(e) => sortByValue(e)}>Title</th>
        <th onClick={(e) => sortByValue(e)}>Popularity</th>
        <th onClick={(e) => sortByValue(e)}>Energy</th>
        <th onClick={(e) => sortByValue(e)}>Danceability</th>
        <th onClick={(e) => sortByValue(e)}>Loudness</th>
      </tr>
    </thead>
    <tbody>
      {trackDetails &&
        trackDetails.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.id}
            chooseTrack={chooseTrack}
          />
        ))}
    </tbody>
  </Table>
);

export default PlaylistTable;
