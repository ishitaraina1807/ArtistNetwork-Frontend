import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { SearchContext } from "../Contexts/SearchContext";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { searchDispatch } = useContext(SearchContext);

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const searchSubmitHandler = () => {
    searchDispatch({
      type: "SEARCHSTARTED",
      payload: { value: searchInput },
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="bg-gray-100 p-6 flex justify-around items-center relative">
        {/* Left Section */}
        <div className="text-black cursive text-xl font-bold ml-8 flex items-center">
          ArtistsNetwork
        </div>

        <div
          className={`flex-col md:flex-row items-center absolute md:static inset-x-0 top-full gap-6 py-2 md:py-0 ${isDropdownOpen ? "flex" : "hidden md:flex"
            }`}
        >
          {/* Tab Section */}
          <div className="box flex justify-center space-y-2 md:space-x-8 md:space-y-0 relative flex-col md:flex-row items-center">
            <Link
              to="/gallery"
              className="text-gray-900 underlined text-lg px-4"
            >
              Gallery
            </Link>
            <Link
              to="/explore"
              className="text-gray-900 underlined text-lg px-4"
            >
              Explore
            </Link>
            <Link
              to="/dashboard/profile"
              className="text-gray-900 underlined text-lg px-4"
            >
              Profile
            </Link>
          </div>

          {/* Right Section */}
          <div>
            <Link
              to="/dashboard/sell-item"
              className="text-gray-900 text-lg border border-black px-4 py-1 hover:scale-110 hover:border-gray-400 transition duration-300 ease-in-out"
            >
              Post Artwork
            </Link>
          </div>
        </div>
        <button
          className="text-white hover:text-slate-200 block md:hidden"
          onClick={toggleDropdown}
        >
          {isDropdownOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>


    </>
  );
};

export default Navbar;
