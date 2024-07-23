import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";
import VerifyEmail from "./Pages/VerifyEmail";
import ItemInfo from "./components/ItemInfo";
import Seller from "./Pages/Seller";
import Explore from "./Pages/Explore";
import { AuthContext } from "./Contexts/AuthContext";
import { ItemContextProvider } from "./Contexts/ItemContext";
import { SearchContextProvider } from "./Contexts/SearchContext";
import Items from "./components/Items";
import CategoryGallery from "./components/CategoryGallery";
import Category from "./components/Category";

const App = () => {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div>
      <ItemContextProvider>
        <SearchContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
              <Route path="/dashboard/profile" element={<RequireAuth><Profile /></RequireAuth>} />
              <Route path="/dashboard/itemInfo" element={<RequireAuth><ItemInfo /></RequireAuth>} />
              <Route path="/dashboard/upload" element={<RequireAuth><Seller /></RequireAuth>} />
              <Route path="/dashboard/item/:id" element={<RequireAuth><ItemInfo /></RequireAuth>} />
              <Route path="/gallery" element={<RequireAuth><Items /></RequireAuth>} />
              <Route path="/gallery/:category" element={<RequireAuth><CategoryGallery /></RequireAuth>} />
              <Route path="/explore" element={<RequireAuth><Explore /></RequireAuth>} />
              <Route path="/categories" element={<RequireAuth><Category /></RequireAuth>} />
            </Routes>
          </BrowserRouter>
        </SearchContextProvider>
      </ItemContextProvider>
    </div>
  );
};

export default App;
