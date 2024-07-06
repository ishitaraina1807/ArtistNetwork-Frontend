import React from "react";
import { useNavigate } from "react-router-dom";
import { MainButton } from "./Buttons";

const ArtworkCard = (props) => {
  const navigate = useNavigate();

  // Assuming props.rest.image is properly structured
  const base64Image = props.rest.image ? props.rest.image.buffer : "";
  const imageType = props.rest.image ? props.rest.image.mimetype : "";
  const src = `data:${imageType};base64,${base64Image}`;

  const moreInfo = () => {
    navigate(`/dashboard/artwork/${props.rest._id}`);
  };

  return (
    <div
      onClick={moreInfo}
      className="relative hover:cursor-pointer rounded-xl overflow-hidden flex flex-col justify-center Artworks-center my-3"
    >
      <img
        src={src}
        alt={props.rest.artworkName}
        className="w-full object-cover rounded-xl transition duration-300 ease-in-out"
        style={{ maxHeight: "400px" }}
      />

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300 ease-in-out flex flex-col justify-center Artworks-center text-white">
        {/* Hover Text */}
        <h2 className="text-lg font-semibold">
          <MainButton val="View Details" navigation="" />
        </h2>
      </div>

      {/* Product Details */}
      <div className="p-2 w-full text-left">
        <h2 className="text-sm font-semibold">{props.rest.ArtworkName}</h2>
        <p className="text-sm">By: {props.rest.userName}</p>
      </div>
    </div>
  );
};

export default ArtworkCard;
