import { React, useState, useEffect } from "react";
import getFeaturedPlaylists from "./getFeaturedPlaylists";
import getUserId from "./getUserId";
import getUserPlaylists from "./getUserPlaylists";
import { Container } from "react-bootstrap";
import PlaylistRow from "./PlaylistRow";

const ShowAllPlaylists = ({ accessToken, handlePlaylistSelection }) => {
  const [featuredPlaylists, setFeaturedPlaylists] = useState("");
  const [userPlaylists, setUserPlaylists] = useState();
  useEffect(() => {
    if (!accessToken) return;
    getFeaturedPlaylists(accessToken).then((res) => {
      setFeaturedPlaylists(res);
    });
    getUserId(accessToken).then((userId) => {
      getUserPlaylists(accessToken, userId).then((res) => {
        setUserPlaylists(res);
      });
    });
  }, [accessToken]);

  return (
    <div>
      <Container className="d-flex flex-row p-0" style={{ overflow: "scroll" }}>
        {featuredPlaylists
          ? featuredPlaylists.data.playlists.items.map((playlist) => {
              return playlist.images.map((image, index) => (
                <PlaylistRow
                  accessToken={accessToken}
                  playlist={playlist}
                  index={index}
                  image={image}
                  handlePlaylistSelection={handlePlaylistSelection}
                />
              ));
            })
          : ""}
      </Container>
      <Container className="d-flex flex-row p-0" style={{ overflow: "scroll" }}>
        {userPlaylists
          ? userPlaylists.items.map((playlist) => {
              return playlist.images.map((image, index) => (
                <PlaylistRow
                  accessToken={accessToken}
                  playlist={playlist}
                  index={index}
                  image={image}
                  handlePlaylistSelection={handlePlaylistSelection}
                />
              ));
            })
          : ""}
      </Container>
    </div>
  );
};

export default ShowAllPlaylists;
