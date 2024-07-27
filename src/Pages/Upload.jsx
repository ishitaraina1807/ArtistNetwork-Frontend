import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../components/Input";
import { InfinitySpin } from "react-loader-spinner";
import Navbar from "../components/Navbar";

axios.defaults.baseURL = "https://artists-network-backend.vercel.app";

const PostArtworkForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const imageInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage.size > 500 * 1024) {
      setError("Please upload an image of less than 500KB.");
      setImage(null);
      return;
    }
    setImage(selectedImage);
    setError("");
  };

  const clearUpload = () => {
    setImage(null);
    setError("");
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const userDetails = JSON.parse(localStorage.getItem("details"));

    formData.append("userToken", userDetails.token);
    formData.append("userName", userDetails.name);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("image", image);

    setLoading(true);

    try {
      const response = await axios.post("/api/upload", formData);

      console.log("Response from server:", response.data);

      setTitle("");
      setDescription("");
      setTags("");
      setImage(null);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }

      // Navigate to the profile page after successful upload
      navigate("/dashboard/profile");
    } catch (error) {
      console.error("Error:", error);
      setError("Error uploading image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.split(" ").length <= 300) {
      setDescription(e.target.value);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        <div className="container mx-auto md:w-1/3 p-6">
          <h2 className="text-2xl text-black opacity-95 font-semibold mb-4">
            Post your artwork
          </h2>
          <form
            onSubmit={handleSubmit}
            action="/api/upload"
            method="post"
            encType="multipart/form-data"
          >
            <div className="mb-4">
              <label htmlFor="title">Title of the artwork</label>
              <Input
                name="title"
                type="text"
                placeholder="Vase on the floor..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-black text-sm mb-2"
              >
                Description (300 words max)
              </label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                className="w-full p-2 rounded-lg"
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="tags">Tags</label>
              <select
                name="tags"
                id="tags"
                className="w-full p-2 rounded-lg"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              >
                <option value="">Select a tag</option>
                <option value="acrylic">Acrylic</option>
                <option value="oil">Oil</option>
                <option value="water">Water</option>
                <option value="graphite">Graphite</option>
                <option value="colored pencil">Colored Pencil</option>
                <option value="pencil">Pencil</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-black text-sm mb-2"
              >
                Add Image of your artwork
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageInputRef}
              />
              <button
                type="button"
                onClick={() => document.getElementById('image').click()}
                className="border border-black border-2 hover:bg-black hover:text-white px-3 py-2 rounded-lg cursor-pointer transition duration-100 ease-in-out"
              >
                Upload Image
              </button>
              {image && (
                <button
                  type="button"
                  className="border border-red-600 text-red-600 border-2 ml-8 hover:border-red-400 hover:text-red-400 px-3 py-2 rounded-lg cursor-pointer transition duration-100 ease-in-out"
                  onClick={clearUpload}
                >
                  Clear Upload
                </button>
              )}
              {image && (
                <div className="mt-2">
                  <p className="font-semibold text-black text-sm mb-2 mt-5">
                    Uploaded Image:
                  </p>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Uploaded artwork"
                    className="mt-2 max-h-40"
                  />
                </div>
              )}
              {error && (
                <div className="mt-2 text-red-600">
                  {error}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-700 text-white py-2 rounded-lg transition duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <InfinitySpin width="30" color="#FFFFFF" />
                  <span className="ml-2">Uploading...</span>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostArtworkForm;
