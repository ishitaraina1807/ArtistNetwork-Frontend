import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";
import { InfinitySpin } from "react-loader-spinner";
import ArtworkCard from "../components/ArtworkCard";
import Navbar from "../components/Navbar";
import { MainButton } from "../components/Buttons";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [Artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    axios.post("/api/profile", { token: currentUser.token }).then((res) => {
      setUser(res.data);
      console.log(res.data);
    });
    axios
      .post("/api/listedArtworksByUser", { token: currentUser.token })
      .then((res) => {
        setArtworks(res.data);
        setLoading(false);
        console.log("List of Artworks : ", res.data);
      });
  }, []);

  const deleteArtwork = (id) => {
    axios.post("/api/deleteArtwork", { id: id }).then((res) => {
      console.log(res.data);
      setArtworks(Artworks.filter((Artwork) => Artwork._id !== id));
    });
  };

  const handleLogout = () => {
    localStorage.removeArtwork("details");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex Artworks-center justify-center h-96">
            <InfinitySpin width="200" color="#4B5563" />
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-8 border-b border-gray-200">
              <div className="flex Artworks-center">
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
                {Artworks.map((Artwork) => (
                  <div key={Artwork._id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                    <ArtworkCard rest={Artwork} />
                    <div className="p-4 flex justify-between Artworks-center">
                      <span className="text-sm font-medium text-gray-500">{new Date(Artwork.createdAt).toLocaleDateString()}</span>
                      <MainButton 
                        val="Delete" 
                        onClick={() => deleteArtwork(Artwork._id)}
                        className="text-sm py-1 px-3"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
