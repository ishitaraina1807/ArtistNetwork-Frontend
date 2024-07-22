import React, { useState } from "react";
import axios from "axios";
import Input from "../components/Input";

axios.defaults.baseURL = "https://artists-network-backend.vercel.app";

const PostArtworkForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const clearUpload = () => {
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "userToken",
      JSON.parse(localStorage.getItem("details")).token
    );
    formData.append(
      "userName",
      JSON.parse(localStorage.getItem("details")).name
    );
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("image", image);

    console.log("Form Data to be sent:", ...formData);

    try {
      const response = await axios.post("/api/upload", formData);

      console.log("Response from server:", response.data);

      setTitle("");
      setDescription("");
      setTags("");
      setImage(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.split(" ").length <= 300) {
      setDescription(e.target.value);
    }
  };

  return (
    <div className="bg-gray-200">
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
            <label htmlFor="tags">Tags (comma-separated)</label>
            <Input
              name="tags"
              type="text"
              placeholder="painting, abstract, modern"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
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
            />
            <button
              type="button"
              onClick={() => document.getElementById('image').click()}
              className="border border-black border-2 hover:border-gray-600 px-3 py-2 rounded-lg cursor-pointer transition duration-100 ease-in-out"
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
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-700 text-white py-2 rounded-lg transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostArtworkForm;