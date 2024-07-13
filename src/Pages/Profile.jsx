import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";
import { InfinitySpin } from "react-loader-spinner";
import ArtworkCard from "../components/ItemCard";
import Navbar from "../components/Navbar";
import { MainButton } from "../components/Buttons";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
  
    const fetchData = async () => {
      try {
        const userResponse = await axios.post("/api/profile", { token });
        if (userResponse.data && userResponse.data!== "") {
          setUser(userResponse.data);
        } else {
          console.error("No user data returned from API");
          console.error("API Response:", userResponse);
          if (userResponse.status === 200) {
            console.error("API returned an empty response");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
      }
    
      try {
        const artworksResponse = await axios.post("/api/artworksByUser", { token });
        if (artworksResponse.data && artworksResponse.data!== "") {
          setArtworks(artworksResponse.data);
        } else {
          console.error("No artworks returned from API");
          console.error("API Response:", artworksResponse);
          if (artworksResponse.status === 200) {
            console.error("API returned an empty response");
          }
        }
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [navigate]);

  const deleteArtwork = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post("/api/deleteArtwork", { id, token });
      setArtworks(artworks.filter((artwork) => artwork._id !== id));
    } catch (error) {
      console.error("Error deleting artwork:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
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
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mr-6">
                <img
                  className="w-full h-full object-cover"
                  src={`https://avatars.dicebear.com/api/initials/${user.name}.svg`}
                  alt={user.name}
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{user.name}</h1>
                <p className="text-sm font-medium text-gray-500 mb-4">{user.email}</p>
                <div className="flex space-x-3">
                  <MainButton val="Edit Profile" />
                  <MainButton val="Log out" onClick={handleLogout} />
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Artworks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {artworks.map((artwork) => (
                <div key={artwork._id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <ArtworkCard artwork={artwork} />
                  <div className="p-4 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">{new Date(artwork.createdAt).toLocaleDateString()}</span>
                    <MainButton 
                      val="Delete" 
                      onClick={() => deleteArtwork(artwork._id)}
                      className="text-sm py-1 px-3"
                    />
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