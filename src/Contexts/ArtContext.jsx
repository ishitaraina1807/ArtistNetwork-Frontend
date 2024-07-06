import { createContext, useEffect, useReducer } from "react";
import ArtworkReducer from "./ArtReducer.jsx";

const INITIAL_STATE = {
  currentArtwork: JSON.parse(localStorage.getArtwork("Artwork")) || null,
};

export const ArtworkContext = createContext(INITIAL_STATE);

export const ArtworkContextProvider = ({ children }) => {
  const [ArtworkState, ArtworkDispatch] = useReducer(ArtworkReducer, INITIAL_STATE);

  useEffect(() => {
    console.log("useEffect in ArtworkContextProvider is running");
    ArtworkState.currentArtwork &&
      localStorage.setArtwork("Artwork", JSON.stringify(ArtworkState.currentArtwork));
  }, [ArtworkState.currentArtwork]);  

  return (
    <ArtworkContext.Provider value={{ currentArtwork: ArtworkState.currentArtwork, ArtworkDispatch }}>
      {children}
    </ArtworkContext.Provider>
  );
};
