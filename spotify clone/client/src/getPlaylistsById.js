import axios from "axios";
function getPlaylistsById(e, accessToken) {
  return axios
    .get("https://api.spotify.com/v1/playlists/" + e.target.id + "/tracks", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((response) => {
      return response.data.items.map(({ track }) => {
        const smallestAlbumImage = track.album.images.reduce(
          (smallest, image) => {
            if (image.height < smallest.height) return image;
            return smallest;
          },
          track.album.images[0]
        );

        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestAlbumImage.url,
          id: track.id,
          popularity: track.popularity,
        };
      });
    });
}
export default getPlaylistsById;
