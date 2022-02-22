function sortTracksByAttribute(
  e,
  trackDetails,
  setAscendOrDescending,
  ascendOrDescending
) {
  let selection = e.target.innerText.toLowerCase();

  // The sort function does not create a new array, it mutates the old one. So you're rearranging the existing state, and then setting state with the same array. Since it's the same array, react thinks the state hasn't changed and skips rendering.
  // Instead, you will need to make a copy of the array and then sort that. For example:
  //   let sorted = [];
  const exitstingSearchData = [...trackDetails];

  if (selection && ascendOrDescending[selection] === "ASC") {
    setAscendOrDescending(() => {
      return {
        ...ascendOrDescending,
        ...{ [selection]: "DSC" },
      };
    });
  } else {
    setAscendOrDescending(() => {
      return {
        ...ascendOrDescending,
        ...{ [selection]: "ASC" },
      };
    });
  }
  if (
    selection !== "title" &&
    selection !== "artist" &&
    selection !== "album"
  ) {
    return exitstingSearchData.sort((prevTrack, nextTrack) => {
      if (ascendOrDescending[selection] === "DSC") {
        return prevTrack[selection] - nextTrack[selection];
      } else {
        return nextTrack[selection] - prevTrack[selection];
      }
    });
  } else {
    return exitstingSearchData.sort((a, b) => {
      const alphabetical = a[selection].toUpperCase();
      const nextAlphabetical = b[selection].toUpperCase();
      //We have to pass either -1, 0 or 1 to the sort function
      //alphabetical expressions "a" > "b" will be true or false
      //if a > b will be false because its not b<a based on where they start in the alphabet

      if (alphabetical > nextAlphabetical) {
        return ascendOrDescending[selection] === "DSC" ? 1 : -1;
      }
      if (alphabetical < nextAlphabetical) {
        return ascendOrDescending[selection] === "DSC" ? -1 : 1;
      }

      return 0;
    });
  }
}
export default sortTracksByAttribute;
