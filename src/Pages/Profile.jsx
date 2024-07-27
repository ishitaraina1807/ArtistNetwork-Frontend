import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";
import { InfinitySpin } from "react-loader-spinner";
import ItemCard from "../components/ItemCard";
import Navbar from "../components/Navbar";
import { MainButton } from "../components/Buttons";
import { Link } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem('details'));
    if (!details || !details.name) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const userResponse = await axios.post("/api/profile", { name: details.name });
        if (userResponse.data) {
          setUser(userResponse.data);
        } else {
          console.error("No user data returned from API");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response && error.response.status === 404) {
          console.error("User not found");
        }
      }

      try {
        const artworksResponse = await axios.post("/api/artworksByUser", { name: details.name });
        if (artworksResponse.data) {
          setArtworks(artworksResponse.data);
        } else {
          console.error("No artworks returned from API");
        }
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, dispatch]);

  const deleteArtwork = async (id) => {
    const details = JSON.parse(localStorage.getItem('details'));
    const confirmDeletion = window.confirm("Are you sure you want to delete this artwork?");
    if (!confirmDeletion) {
      return;
    }

    try {
      await axios.post("/api/deleteArtwork", { id, name: details.name });
      setArtworks(artworks.filter((artwork) => artwork._id !== id));
    } catch (error) {
      console.error("Error deleting artwork:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("details");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <InfinitySpin width="200" color="#4B5563" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error loading user data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow bg-white  container mx-auto px-4 py-8">
        <div className="rounded-lg overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-300">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={`https://i.pinimg.com/736x/72/9e/5f/729e5fed250718f259568781cfd6c06b.jpg`}
                  alt={user.name}
                />
              </div>
              <div>
                <h1 className="text-3xl text-center font-bold text-gray-900 mb-1">{user.name}</h1>
                <p className="text-sm text-center font-medium text-gray-500 mb-4">{user.email}</p>
                <Link to="/dashboard/upload"
                  className="border-2 text-center hidden md:block border-gray-900 px-4 py-2 rounded-lg hover:bg-gray-900 hover:text-white duration-200">
                  Add Artwork
                </Link>
              </div>
            </div>
          </div>

          <div className="px-6 py-8">
            <h2 className="text-2xl text-center underline font-semibold text-gray-800 mb-6">Your Artworks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {artworks.map((artwork) => (
                <div key={artwork._id} className="bg-gray-50 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <ItemCard rest={artwork} />
                  <div className="p-1 flex justify-between items-center">
                    <button
                      onClick={() => deleteArtwork(artwork._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete Post
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
