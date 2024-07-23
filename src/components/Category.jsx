import React from 'react';
import { useNavigate } from "react-router-dom";
import acrylic from "../Images/acrylicpainting.jpeg";
import oil from "../Images/oilpainting.jpg";
import water from "../Images/watercolor.jpg";
import colorpencil from "../Images/coloredpencil.jpg";
import graphite from "../Images/graphite.jpg";
import pencil from "../Images/pencil.jpg";

const Category = () => {
  const navigate = useNavigate();

  const artworks = [
    { src: acrylic, alt: "Acrylic Artwork", route: "/gallery/acrylic", label: "Acrylic Paintings" },
    { src: oil, alt: "Oil Painting", route: "/gallery/oil", label: "Oil Paintings" },
    { src: water, alt: "Water Color Artwork", route: "/gallery/watercolor", label: "Water Color Paintings" },
    { src: colorpencil, alt: "Color Pencil Artwork", route: "/gallery/colorpencil", label: "Color Pencil Artworks" },
    { src: graphite, alt: "Graphite Artwork", route: "/gallery/graphite", label: "Graphite Artworks" },
    { src: pencil, alt: "Pencil Artwork", route: "/gallery/pencil", label: "Pencil Artworks" },
  ];

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mx-20 mt-4">
      {artworks.map((artwork, index) => (
        <div key={index} className="relative h-56 mb-4" onClick={() => navigate(artwork.route)}>
          <img
            src={artwork.src}
            alt={artwork.alt}
            className="w-full h-full object-cover transition duration-300 ease-in-out"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300 ease-in-out flex flex-col justify-center items-center text-white">
            {/* Hover Text */}
            <button className="text-white text-3xl px-4 py-2 transition duration-300">
              {artwork.label}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
