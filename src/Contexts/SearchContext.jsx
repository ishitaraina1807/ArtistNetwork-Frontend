import { createContext, useEffect, useReducer } from "react";
import SearchReducer from "./SearchReducer.jsx";

const INITIAL_STATE = {
  currentSearch: null,
};

export const SearchContext = createContext(INITIAL_STATE);

export const SearchContextProvider = ({ children }) => {
  const [searchState, searchDispatch] = useReducer(SearchReducer, INITIAL_STATE);

  useEffect(() => {
    console.log("useEffect in SearchContextProvider is running");
    searchState.currentSearch &&
      localStorage.setArtwork("search", JSON.stringify(searchState.currentSearch));
  }, [searchState.currentSearch]);  

  return (
    <SearchContext.Provider value={{ currentSearch: searchState.currentSearch, searchDispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
