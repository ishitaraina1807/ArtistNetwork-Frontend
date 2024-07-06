const ArtworkReducer = (ArtworkState, action) => {
  switch (action.type) {
    case "DETAILSOPENED": {
      return {
        currentArtwork: action.payload,
      };
    }
    case "DETAILSCLOSED": {
      return {
        currentArtwork: null,
      };
    }
    default:
      return ArtworkState;
  }
};

export default ArtworkReducer;
