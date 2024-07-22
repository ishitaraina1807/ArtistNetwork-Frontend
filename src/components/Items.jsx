import React, { useContext, useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import axios from "axios";
import { SearchContext } from "../Contexts/SearchContext";
import { InfinitySpin } from "react-loader-spinner";
import Navbar from "./Navbar";
import Masonry from "react-masonry-css";

export default function Items() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchedItems, setSearchedItems] = useState([]);
  const { currentSearch } = useContext(SearchContext);

  axios.defaults.baseURL = "https://artists-network-backend.vercel.app/";

  useEffect(() => {
    axios
      .get("/api/dashboard")
      .then((res) => {
        setItems(res.data);
        setSearchedItems(res.data);
        console.log("In Items rendered on dashboard : ", res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (items) {
      const filteredItems = items.filter((item) => {
        return item.itemName
          .toLowerCase()
          .includes(currentSearch.value.toLowerCase());
      });
      setSearchedItems(filteredItems);
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
        <div className=" flex items-center justify-center h-[100vh]">
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
