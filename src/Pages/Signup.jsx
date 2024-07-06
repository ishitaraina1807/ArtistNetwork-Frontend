import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { MainButton2 } from "../components/Buttons";

axios.defaults.baseURL = "http://localhost:4000";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!name) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (!confirmPassword) {
      tempErrors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (confirmPassword !== password) {
      tempErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setLoading(true);
    axios
      .post("/api/auth/signup", { name, email, password })
      .then((res) => {
        alert("Signup successful. You can now log in.");
        console.log(res.data);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          alert("User already exists. Please login.");
        } else {
          console.error("Signup error:", err);
          console.error("Error response:", err.response);
          alert("An error occurred. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex Artworks-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup to ArtistsNetwork</h2>
        <form onSubmit={handleSignup}>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          
          <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          
          <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700">Confirm Password</label>
          <Input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          
          <div className="text-center">
            <MainButton2 val="Sign Up" loading={loading} />
          </div>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
