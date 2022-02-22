import { React, useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Container, Form, ListGroup, Table } from "react-bootstrap";
import Sidebar from "./Sidebar";
import SpotifyWebApi from "spotify-web-api-node";
import PlaylistTable from "./PlaylistTable";
import getPlaylistsById from "./getPlaylistsById";
import getSearchTracks from "./getSearchTracks";
import getAudioFeaturesForTracks from "./getAudioFeaturesForTracks";
import sortTracksByAttribute from "./sortByTracksByAttribute";
import Player from "./Player";
import axios from "axios";
import ShowAllPlaylists from "./ShowAllPlaylists";

const spotifyApi = new SpotifyWebApi({
  client_id: "7fb4bc48ebea4e04bb63a3b76a5fc6c2",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const initialState = {
    popularity: "",
    energy: "",
    danceability: "",
    loudness: "",
  };
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [trackDetails, setTrackDetails] = useState([]);
  const [lyrics, setLyrics] = useState("");
  const [ascendOrDescending, setAscendOrDescending] = useState(initialState);

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }
  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => setLyrics(res.data.lyrics));
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    let cancel = false; // Get the authenticated user
    getSearchTracks(spotifyApi, cancel, search).then((searchResults) => {
      setSearchResults(searchResults);
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  useEffect(() => {
    if (searchResults[0]) {
      getAudioFeaturesForTracks(spotifyApi, searchResults).then(
        (tracksWithAudioFeatures) => {
          setTrackDetails(tracksWithAudioFeatures);
        }
      );
    }
  }, [searchResults]);

  const sortByValue = (e) => {
    const sortedTracks = sortTracksByAttribute(
      e,
      trackDetails,
      setAscendOrDescending,
      ascendOrDescending
    );
    setTrackDetails(() => sortedTracks);
  };

  function handlePlaylistSelection(e, accessToken) {
    getPlaylistsById(e, accessToken).then((playlists) => {
      setSearchResults(playlists);
    });
  }

  return (
    <Container
      fluid
      className="d-flex flex-column"
      style={{ paddingTop: "20px", height: "100vh", paddingLeft: "0" }}
    >
      <Container
        fluid
        className="d-flex flex-row py-2"
        style={{ height: "100vh" }}
      >
        <Container fluid className="d-flex flex-row">
          <Sidebar
            accessToken={accessToken}
            handlePlaylistSelection={(e) =>
              handlePlaylistSelection(e, accessToken)
            }
          />
          <div
            className="d-flex flex-column"
            style={{ paddingLeft: "3%", width: "50%" }}
          >
            <Form.Control
              type="search"
              placeholder="Search Songs/Artists"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <ShowAllPlaylists
              accessToken={accessToken}
              handlePlaylistSelection={(e) =>
                handlePlaylistSelection(e, accessToken)
              }
            />
            <div className="flex-grow-1 my-2" style={{ overFlowY: "auto" }}>
              {trackDetails.length > 0 ? (
                <PlaylistTable
                  trackDetails={trackDetails}
                  sortByValue={sortByValue}
                  chooseTrack={chooseTrack}
                />
              ) : (
                ""
              )}
              {searchResults.length === 0 && (
                <div className="text-center" style={{ whiteSpace: "pre" }}>
                  {lyrics}
                </div>
              )}
            </div>
          </div>
        </Container>
      </Container>
      <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
    </Container>
  );
}
