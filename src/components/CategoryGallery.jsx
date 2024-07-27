import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "./ItemCard";
import axios from "axios";
import { SearchContext } from "../Contexts/SearchContext";
import { InfinitySpin } from "react-loader-spinner";
import Navbar from "./Navbar";
import Masonry from "react-masonry-css";

export default function CategoryGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchedItems, setSearchedItems] = useState([]);
  const { currentSearch } = useContext(SearchContext);
  const { category } = useParams(); // Extract the tag from the URL

  axios.defaults.baseURL = "https://artists-network-backend.vercel.app/";

  useEffect(() => {
    axios
      .get("/api/dashboard")
      .then((res) => {
        const filteredItems = res.data.filter((item) =>
          item.tags.includes(category) // Filter items based on the tag
        );
        setItems(filteredItems);
        setSearchedItems(filteredItems);
        console.log("In Items rendered on dashboard : ", filteredItems);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category]);

  useEffect(() => {
    if (items) {
      const searchValue = currentSearch?.value?.toLowerCase() || ""; // Handle null or undefined values
      const filteredItems = items.filter((item) => 
        item.title.toLowerCase().includes(searchValue)
      );
      setSearchedItems(filteredItems);
    }
  }, [currentSearch, items]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[100vh]">
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
            {searchedItems.map((item) => (
              <ItemCard key={item._id} rest={item} />
            ))}
          </Masonry>
        </div>
      )}
    </>
  );
}
