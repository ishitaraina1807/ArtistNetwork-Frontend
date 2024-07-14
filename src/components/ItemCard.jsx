import React from "react";
import { useNavigate } from "react-router-dom";
import { MainButton } from "./Buttons";

const ItemCard = ({ rest }) => {
  const navigate = useNavigate();

  // Check if rest exists before trying to access its properties
  if (!rest) {
    console.error("ItemCard received undefined props");
    return null; // or return a placeholder component
  }

  let src;
  if (rest.image) {
    if (rest.image.buffer && rest.image.mimetype) {
      const base64Image = rest.image.buffer;
      const imageType = rest.image.mimetype;
      src = `data:${imageType};base64,${base64Image}`;
    } else if (typeof rest.image === 'string') {
      // If image is already a string (URL or base64), use it directly
      src = rest.image;
    } else {
      console.warn("Unexpected image data structure:", rest.image);
      src = 'path/to/placeholder-image.jpg';
    }
  } else {
    console.warn("No image data for artwork:", rest.title);
    src = 'path/to/placeholder-image.jpg';
  }

  const moreInfo = () => {
    if (rest._id) {
      navigate(`/dashboard/item/${rest._id}`);
    } else {
      console.error("No _id available for this artwork");
    }
  };

  return (
    <div
      onClick={moreInfo}
      className="relative hover:cursor-pointer hover:text-white rounded-xl overflow-hidden flex flex-col justify-center items-center my-3"
    >
      {/* Product Image */}
      <img
        src={src}
        alt={rest.title || 'Artwork'}
        className="w-full object-cover rounded-xl transition duration-300 ease-in-out"
        style={{ maxHeight: "400px" }}
      />

      {/* Overlay on hover */}
      <div className="absolute h-[85%] rounded-lg inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300 ease-in-out flex flex-col justify-center items-center text-white">
        {/* Hover Text */}
        <h2 className="text-lg font-semibold">
          <MainButton val="view details" navigation=""/>
        </h2>
      </div>

      {/* Product Details */}
      <div className="p-2 w-full text-left">
        <h2 className="text-2xl font-semibold uppercase">{rest.title || 'Untitled'}</h2>
        <p className="text-md">{rest.userName || 'Unknown Artist'}</p>
      </div>
    </div>
  );
};

export default ItemCard;