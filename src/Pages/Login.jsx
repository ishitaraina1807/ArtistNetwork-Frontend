import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { MainButton2 } from "../components/Buttons";
import { AuthContext } from "../Contexts/AuthContext";

axios.defaults.baseURL = "http://localhost:4000";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/auth/login", { email, password })
      .then((res) => {
        console.log("Full server response:", res);
        console.log("Response data:", res.data);
        const { name, token } = res.data;
        
        if (!token) {
          console.warn("Token not received from server. Using name for authentication.");
          localStorage.setItem('details', JSON.stringify({ name }));
          
          dispatch({
            type: "LOGIN",
            payload: { name },
          });
        } else {
          console.log("Received token:", token);
          localStorage.setItem('token', token);
          localStorage.setItem('details', JSON.stringify({ name }));
          
          dispatch({
            type: "LOGIN",
            payload: { name, token },
          });
        }
        
        navigate("/dashboard");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.error("Login error:", err);
        if (err.response) {
          console.error("Error response:", err.response.data);
          console.error("Error status:", err.response.status);
          console.error("Error headers:", err.response.headers);
        } else if (err.request) {
          console.error("Error request:", err.request);
        } else {
          console.error("Error message:", err.message);
        }
        alert(err.response?.data?.message || err.message || "An error occurred during login");
      })
      .finally(() => {
        setLoading(false);
      });
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