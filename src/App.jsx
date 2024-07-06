import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";
import VerifyEmail from "./Pages/VerifyEmail";
import ArtworkInfo from "./components/ArtworkInfo";
import Seller from "./Pages/Seller";
import About from "./Pages/Explore";
import { AuthContext } from "./Contexts/AuthContext";
import { ArtworkContextProvider } from "./Contexts/ArtContext";
import { SearchContextProvider } from "./Contexts/SearchContext";
import Artworks from "./components/Artworks";

const App = () => {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div>
      <ArtworkContextProvider>
        <SearchContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route path="/dashboard/ArtworkInfo" element={<ArtworkInfo />} />
              <Route path="/dashboard/sell-Artwork" element={<Seller />} />
              <Route path="/dashboard/Artwork/:id" element={<ArtworkInfo />} />
              <Route path="/gallery" element={<Artworks/>} />
              <Route path="/explore" element={<About />} />
            </Routes>
          </BrowserRouter>
        </SearchContextProvider>
      </ArtworkContextProvider>
    </div>
  );
};

export default App;
