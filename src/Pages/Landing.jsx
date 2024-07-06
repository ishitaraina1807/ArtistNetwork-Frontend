import React from "react";
import { MainButton } from "../components/Buttons";

const LandingPage = () => {
  return (
    <div className="home-bg min-h-screen text-center flex justify-center Artworks-center px-4">
      <div className="content flex flex-col justify-center Artworks-center">
        <div className="text-white text-xs md:text-xl tracking-widest mb-6">
          Welcome To The World Of Art
        </div>
        <div className="text-white w-2/3 font-semibold text-center md:text-3xl tracking-widest mb-8">
        The Art Gallery with it’s unique collection is among those who love art and museums that attracts a wide array of people.
        </div>
        <div className="space-x-4">
          <MainButton val="START EXPLORING" navigation="/signup" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
