function getAudioFeaturesForTracks(spotifyApi, searchResults) {
  return spotifyApi
    .getAudioFeaturesForTracks([...searchResults.map((item) => item.id)])
    .then(
      function (data) {
        let combineAudioFeaturesWithSearchResults = data.body.audio_features.map(
          (item, i) => Object.assign({}, item, searchResults[i])
        );

        return combineAudioFeaturesWithSearchResults;
      },
      function (err) {
        console.log(err);
      }
    );
}

export default getAudioFeaturesForTracks;
