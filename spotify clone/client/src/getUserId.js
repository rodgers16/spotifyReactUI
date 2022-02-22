import axios from "axios";

const getUserId = (accessToken) => {
  return axios
    .get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      alert(error);
    });
};

export default getUserId;
