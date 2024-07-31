import React from "react";
import Navbar from "../components/Navbar";
import { MainButton } from "../components/Buttons";
import Category from "../components/Category";
import Landing from "../Images/Landing.png"
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Dashboard = () => {

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
            <MainButton val="START EXPLORING" navigation="/explore" />
          </div>
        </div>
      </div>
      <div className="h-[100vh]">
        <div className="flex justify-center items-center h-full">
          <h1 className="text-2xl md:w-1/2  text-center font-bold my-16">The Art Gallery with it’s unique collection is among those who love art and museums that attracts a wide array of people.</h1>
        </div>
      </div>
      <Category />
      <div className="md:flex gap-40 items-center justify-center mx-4 md:mx-8 my-8">
        <div>
          <h1 className="text-4xl font-bold">Post Artworks</h1>
          <p className="mt-2 text-2xl">and showcase your talent</p>
          <p className="text-lg mt-8">Post your best or even the worst artwork because every art is appreciated.</p>
          <p className="text-lg mt-4">Add:</p>
          <ul className="list-disc list-inside text-lg flex flex-col gap-2">
            <li>Title of the artwork</li>
            <li>Description</li>
            <li>Tags (Acrylic, pencil, oil, etc.)</li>
            <li>Upload picture</li>
          </ul>
          <p className="text-2xl mt-8"> And Voila! Your artwork will be showcased on our platform.</p>
          <Link to="/dashboard/upload"
            className="border-2 w-1/4 mt-4 text-center hidden md:block border-gray-900 px-4 py-2 rounded-lg bg-gray-900 text-white hover:text-black hover:bg-white duration-200">
            Add Artwork
          </Link>
        </div>
        <div className="md:w-1/5 mt-4 md:mt-0">
          <img src={Landing} alt="Artwork illustration" />
        </div>
      </div>

      <Footer />

    </div>
  );
};

export default Dashboard;
