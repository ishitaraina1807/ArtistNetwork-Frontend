import React, { useContext, useEffect, useState } from "react";
import ArtworkCard from "./ArtworkCard";
import axios from "axios";
import { SearchContext } from "../Contexts/SearchContext";
import { InfinitySpin } from "react-loader-spinner";
import Navbar from "./Navbar";
import Masonry from "react-masonry-css";

export default function Artworks() {
  const [Artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchedArtworks, setSearchedArtworks] = useState([]);
  const { currentSearch } = useContext(SearchContext);

  axios.defaults.baseURL = "http://localhost:4000/";

  useEffect(() => {
    axios
      .get("/api/dashboard")
      .then((res) => {
        setArtworks(res.data);
        setSearchedArtworks(res.data);
        console.log("In Artworks rendered on dashboard : ", res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (Artworks) {
      const filteredArtworks = Artworks.filter((Artwork) => {
        return Artwork.ArtworkName
          .toLowerCase()
          .includes(currentSearch.value.toLowerCase());
      });
      setSearchedArtworks(filteredArtworks);
    }
  }, [currentSearch]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <>
      {loading ? (
        <div className=" flex Artworks-center justify-center h-[100vh]">
          <InfinitySpin width="160" color="black" />
        </div>
      ) : (
        <div>
          <Navbar />
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid m-4"
            columnClassName="my-masonry-grid_column"
          >
            {searchedArtworks.map((Artwork) => (
              <ArtworkCard key={Artwork._id} rest={Artwork} />
            ))}
          </Masonry>
        </div>
      )}
    </>
  );
}
