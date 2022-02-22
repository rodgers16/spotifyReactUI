import axios from "axios";
const getFeaturedPlaylists = (accessToken) => {
  return axios
    .get("https://api.spotify.com/v1/browse/featured-playlists?limit=50", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => {
      return res;
    });
};

export default getFeaturedPlaylists;
