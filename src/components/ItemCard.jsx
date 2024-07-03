import React from "react";
import { useNavigate } from "react-router-dom";

const ItemCard = (props) => {
  const navigate = useNavigate();

  const base64Image = props.rest.image.buffer;
  const imageType = props.rest.image.mimetype;
  const src = `data:${imageType};base64,${base64Image}`;

  const moreInfo = async () => {
    navigate(`/dashboard/item/${props.rest._id}`);
  };

  return (
    <div
      onClick={moreInfo}
      className="relative hover:cursor-pointer overflow-hidden flex flex-col justify-center items-center my-6 mx-6"
    >
      {/* Product Image */}
      <img
        src={src}
        alt={props.rest.itemName}
        className="w-60 h-60 object-cover transition duration-300 ease-in-out"
      />

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300 ease-in-out flex flex-col justify-center items-center text-white">
        {/* Product Name */}
        <h2 className="text-lg font-semibold">
          {props.rest.itemName}
        </h2>
        <hr className="w-1/2 my-2" />
        {/* Product Provider */}
        <p>By: {props.rest.userName}</p>
      </div>
    </div>
  );
};

export default ItemCard;
