import React from "react";
import { useNavigate } from "react-router-dom";
import { MainButton } from "./Buttons";

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
      className="relative hover:cursor-pointer hover:text-white rounded-xl overflow-hidden flex flex-col justify-center items-center my-3"
    >
      {/* Product Image */}
      <img
        src={src}
        alt={props.rest.title}
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
        <h2 className="text-2xl font-semibold uppercase">{props.rest.title}</h2>
        <p className="text-md">{props.rest.userName}</p>
      </div>
    </div>
  );
};

export default ItemCard;
