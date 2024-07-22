import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { MainButton } from "../components/Buttons";
import acrylic from "../Images/acrylicpainting.jpeg";
import oil from "../Images/oilpainting.jpg";
import water from "../Images/watercolor.jpg";
import colorpencil from "../Images/coloredpencil.jpg";
import graphite from "../Images/graphite.jpg";
import pencil from "../Images/pencil.jpg";

const Dashboard = () => {

  const artworks = [
    { src: acrylic, alt: "Acrylic Artwork", route: "/acrylic-details", label: "Acrylic Paintings" },
    { src: oil, alt: "Oil Painting", route: "/oil-details", label: "Oil Paintings" },
    { src: water, alt: "Water Color Artwork", route: "/water-details", label: "Water Color Paintings" },
    { src: colorpencil, alt: "Color Pencil Artwork", route: "/colorpencil-details", label: "Color Pencil Artworks" },
    { src: graphite, alt: "Graphite Artwork", route: "/graphite-details", label: "Graphite Artworks" },
    { src: pencil, alt: "Pencil Artwork", route: "/pencil-details", label: "Pencil Artworks" },
  ];

  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100vh',
      width: '100%'
    }}>
      <Navbar />
      <div className="dashboard-bg text-center flex justify-center items-center px-4">
        <div className="content h-[100vh] flex flex-col justify-center items-center">
          <div className="text-white text-xs md:text-xl tracking-widest mb-6">
            The People's Gallery
          </div>
          <div className="text-white w-2/3 font-semibold text-center md:text-3xl tracking-widest mb-8">
            Experience the beauty of art through the eyes of artists from various genres and styles.
          </div>
          <div className="space-x-4">
            <MainButton val="START EXPLORING" navigation="/gallery" />
          </div>
        </div>
      </div>
      <div className="h-[100vh]">
        <div className="flex justify-center items-center h-full">
          <h1 className="text-2xl w-1/2 text-center font-bold my-16">The Art Gallery with it’s unique collection is among those who love art and museums that attracts a wide array of people.</h1>
        </div>
      </div>


      <div className="grid grid-cols-3 gap-4 mx-20">
        {artworks.map((artwork, index) => (
          <div key={index} className="relative h-56 mb-4">
            <img
              src={artwork.src}
              alt={artwork.alt}
              className="w-full h-full object-cover transition duration-300 ease-in-out"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition duration-300 ease-in-out flex flex-col justify-center items-center text-white">
              {/* Hover Text */}
              <Link to={artwork.route}>
                <button className="text-white text-3xl px-4 py-2 transition duration-300">
                  {artwork.label}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Dashboard;
