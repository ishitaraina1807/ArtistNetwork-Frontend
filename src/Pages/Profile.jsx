import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";
import { InfinitySpin } from "react-loader-spinner";
import ItemCard from "../components/ItemCard";
import Navbar from "../components/Navbar";
import { MainButton } from "../components/Buttons";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    axios.post("/api/profile", { token: currentUser.token }).then((res) => {
      setUser(res.data);
      console.log(res.data);
    });
    axios
      .post("/api/listedItemsByUser", { token: currentUser.token })
      .then((res) => {
        setItems(res.data);
        setLoading(false);
        console.log("List of Items : ", res.data);
      });
  }, []);

  const deleteItem = (id) => {
    axios.post("/api/deleteItem", { id: id }).then((res) => {
      console.log(res.data);
      setItems(items.filter((item) => item._id !== id));
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("details");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <InfinitySpin width="200" color="#4B5563" />
          </div>
        ) : (
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
                {items.map((item) => (
                  <div key={item._id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                    <ItemCard rest={item} />
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                      <MainButton 
                        val="Delete" 
                        onClick={() => deleteItem(item._id)}
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
