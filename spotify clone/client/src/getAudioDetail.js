// function getAudioDetails(key, searchResults) {
//   let trackDetails;
//   const data = key
//     .getAudioFeaturesForTracks([...searchResults.map((item) => item.id)])
//     .then(
//       function (data) {
//         return data.body.audio_features.map((item, i) =>
//           Object.assign({}, item, searchResults[i])
//         );
//         //   alert(trackDetails);
//         // alert(JSON.stringify(trackDetails));}
//       },
//       function (err) {
//         alert("eror" + err);
//       }
//     );
//   return data;
// }

// export default getAudioDetails;
