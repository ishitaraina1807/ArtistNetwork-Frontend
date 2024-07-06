import React, { useState } from "react";
import axios from "axios";
import Input from "../components/Input";

axios.defaults.baseURL = "http://localhost:4000";

const PostArtworkForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [location, setLocation] = useState("");
  const [cost, setCost] = useState("");
  const [artworkType, setArtworkType] = useState("");
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const selectedImages = Array.from(e.target.files);
    console.log(selectedImages);
    setImages((prevImages) => [...prevImages, ...selectedImages]);
  };

  const clearUploads = () => {
    setImages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "userToken",
      JSON.parse(localStorage.getArtwork("details")).token
    );
    formData.append(
      "userName",
      JSON.parse(localStorage.getArtwork("details")).name
    );
    formData.append("title", title);
    formData.append("cost", cost);
    formData.append("description", description);
    formData.append("contactNumber", contactNumber);
    formData.append("location", location);
    formData.append("artworkType", artworkType);

    Array.from(images).forEach((file) => {
      formData.append("images", file);
    });

    console.log("Form Data to be sent:", ...formData);

    try {
      const response = await axios.post("/api/sell", formData);

      console.log("Response from server:", response.data);

      setTitle("");
      setCost("");
      setDescription("");
      setContactNumber("");
      setLocation("");
      setArtworkType("");
      setImages([]);
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
          action="/api/sell"
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
          </div>
          <div className="mb-4">
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
            <label htmlFor="artworkType">Artwork Type</label>
            <select
              name="artworkType"
              className="w-full p-2 rounded-lg"
              value={artworkType}
              onChange={(e) => setArtworkType(e.target.value)}
            >
              <option value="">Select artwork type</option>
              <option value="Water painting">Water painting</option>
              <option value="Acrylic painting">Acrylic painting</option>
              <option value="Oil painting">Oil painting</option>
              <option value="Graphite">Graphite</option>
              <option value="Colored pencil">Colored pencil</option>
              <option value="Markers">Markers</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="images"
              className="block text-black text-sm mb-2"
            >
              Add Image of your artwork
            </label>
            <button
              htmlFor="images"
              className="border border-black border-2 hover:border-gray-600 px-3 py-2 rounded-lg cursor-pointer transition duration-100 ease-in-out"
            >
              Upload Images
            </button>
            <button
              className="border border-red-600 text-red-600 border-2 ml-8 hover:border-red-400 hover:text-red-400 px-3 py-2 rounded-lg cursor-pointer transition duration-100 ease-in-out"
              onClick={clearUploads}
            >
              Clear Uploads
            </button>
            <input
              type="file"
              name="images"
              id="images"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
            {images.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold text-black text-sm mb-2 mt-5">
                  Uploaded Images:
                </p>
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded ${index + 1}`}
                    className="mt-2 max-h-40"
                  />
                ))}
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
