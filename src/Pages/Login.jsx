import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { MainButton2 } from "../components/Buttons";
import { AuthContext } from "../Auth/AuthContext";

axios.defaults.baseURL = "https://artists-network-backend.vercel.app";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      console.log("Full server response:", res);
      console.log("Response data:", res.data);
      const { name } = res.data;
      localStorage.setItem('details', JSON.stringify({ name }));
      dispatch({
        type: "LOGIN",
        payload: { name },
      });
      console.log("Navigating to /gallery");
      navigate("/gallery");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to ArtistsNetwork</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-center">
            <MainButton2 val="Login" loading={loading} />
          </div>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
