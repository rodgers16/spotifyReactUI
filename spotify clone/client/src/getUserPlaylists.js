import axios from "axios";
function getUserPlaylists(accessToken, { data }) {
  return axios
    .get(
      "https://api.spotify.com/v1/users/" + data.id + "/playlists?limit=50",
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    )
    .then((response) => {
      return response.data;
    });
}

export default getUserPlaylists;
