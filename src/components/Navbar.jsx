import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import {AuthContext} from "../Auth/AuthContext";

const Navbar = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('details');
    navigate('/login');
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="bg-gray-100 sticky p-6 flex justify-between items-center relative z-50">
        {/* Left Section */}
        <Link to="/" className="text-black cursive text-xl font-bold ml-8 flex items-center">
          ArtistsNetwork
        </Link>

        <button className="text-black hover:text-gray-600 block md:hidden" onClick={toggleDropdown}>
          {isDropdownOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`flex-col md:flex-row items-center md:static inset-x-0 top-full gap-6 py-2 md:py-0 ${isDropdownOpen ? "flex absolute bg-gray-100 w-full z-40" : "hidden md:flex"}`}>
          {/* Tab Section */}
          <div className="flex justify-center space-y-2 md:space-x-8 md:space-y-0 flex-col md:flex-row items-center">
            <Link to="/gallery" className="text-gray-900 underlined text-md px-4">
              Gallery
            </Link>
            <Link to="/explore" className="text-gray-900 underlined text-md px-4">
              Explore
            </Link>
            <Link to="/dashboard/profile" className="text-gray-900 underlined text-md px-4">
              Profile
            </Link>
          </div>

          {/* Right Section */}
          <div className="mt-4 md:mt-0">
            <Link to="/dashboard/upload" className="text-gray-900 underlined text-md px-4">
              Post Artwork
            </Link>
          </div>
          <div className="mt-4 md:mt-0">
            <button onClick={handleLogout} className="text-gray-900 block md:hidden underlined text-md px-4">
              Logout
            </button>
          </div>
        </div> 
  {/* logout with bordered button */}
  <div>
    <button
    onClick={handleLogout}
    className="border-2 hidden md:block border-gray-900 px-4 py-2 rounded-lg hover:bg-gray-900 hover:text-white duration-200">
      Logout
    </button>
  </div>

      </nav>
    </>
  );
};

export default Navbar;
