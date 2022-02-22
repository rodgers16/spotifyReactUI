const getSearchTracks = (spotifyApi, cancel, search) => {
  return spotifyApi.searchTracks(search).then((res) => {
    if (cancel) return;
    console.log(JSON.stringify(res.body));
    return res.body.tracks.items.map((track) => {
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
};
export default getSearchTracks;
