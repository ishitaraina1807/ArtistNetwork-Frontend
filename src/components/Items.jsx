import React, { useContext, useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import axios from "axios";
import { SearchContext } from "../Contexts/SearchContext";
import { InfinitySpin } from "react-loader-spinner";
import Navbar from "./Navbar";

export default function Items() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchedItems, setSearchedItems] = useState([]);
  const { currentSearch } = useContext(SearchContext);

  axios.defaults.baseURL = "http://localhost:4000/";

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

  return (
    <>
      {" "}
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <InfinitySpin width="200" color="#424242" />
        </div>
      ) : (
        <div>
          <Navbar />
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {searchedItems.map((item) => (
              <ItemCard key={item._id} rest={item} />
            ))}
          </div>

        </div>

      )}
    </>
  );
}
