import { React, useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import getUserId from "./getUserId";
import getUserPlaylists from "./getUserPlaylists";

const Sidebar = ({ accessToken, handlePlaylistSelection }) => {
  const [playlist, setPlaylist] = useState();

  useEffect(() => {
    if (!accessToken) return;
    getUserId(accessToken).then((userId) => {
      getUserPlaylists(accessToken, userId).then((userPlaylists) => {
        setPlaylist(userPlaylists);
      });
    });
  }, [accessToken]);

  return (
    <div>
      <ListGroup style={{ width: "30vh" }}>
        {playlist &&
          playlist.items.map((item) => (
            <ListGroup.Item
              onClick={handlePlaylistSelection}
              name={item.name}
              id={item.id}
            >
              {item.name}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
};

export default Sidebar;
