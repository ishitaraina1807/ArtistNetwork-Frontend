import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapPin,
  faPhoneVolume,
  faUser,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";

axios.defaults.baseURL = "https://joyous-beret-worm.cyclic.app";

const ArtworkInfo = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [Artwork, setArtwork] = useState({});
  let blobURLs = [];

  useEffect(() => {
    axios
      .post("/api/ArtworkDetails", { id: id })
      .then((res) => {
        localStorage.setArtwork("Artwork", JSON.stringify(res.data));
        setArtwork(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Function to convert base64 string to ArrayBuffer
  function base64ToArrayBuffer(base64) {
    let binaryString = window.atob(base64);
    let len = binaryString.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  // Map function to convert each image to a blob URL
  if (!loading) {
    blobURLs = Artwork.images.map((img) => {
      const base64Image = img.buffer;
      const imageType = img.mimetype;
      const arrayBuffer = base64ToArrayBuffer(base64Image);
      const blob = new Blob([arrayBuffer], { type: imageType });
      const blobUrl = URL.createObjectURL(blob);
      return blobUrl;
    });
  }

  return (
    <>
      {loading ? (
        <div className="flex Artworks-center justify-center h-screen">
          <InfinitySpin width="200" color="#424242" />
        </div>
      ) : (
        <div className="overflow-hidden flex-col flex Artworks-center h-screen justify-center bg-gray-800 ">
          <div className=" Artworks-start w-full m-5 px-14">
            <Link
              to="/dashboard"
              onClick={() => {
                localStorage.removeArtwork("Artwork");
              }}
              className="text-white bg-red-500 rounded-3xl hover:bg-red-700 px-6 py-2 transition duration-300 ease-in-out"
            >
              Dashboard
            </Link>
          </div>
          <div className="bg-white shadow-lg rounded-lg flex Artworks-center mx-8 md:mx-14 flex-col md:flex-row">
            {/* Image Carousel */}
            <Carousel
              infiniteLoop
              autoPlay
              swipeable
              onClickArtwork={(index) => {
                window.open(blobURLs[index], "_blank");
              }}
              showArrows={true}
              showThumbs={false}
              className="md:w-1/4 p-2 cursor-pointer bg-gray-800 m-5"
            >
              <div>
                <img
                  src={blobURLs[0]}
                  className=" h-40 object-cover"
                  alt="Product"
                />
              </div>
              <div>
                <img
                  src={blobURLs[1]}
                  className="h-40 object-cover"
                  alt="Product"
                />
              </div>
              <div>
                <img
                  src={blobURLs[2]}
                  className="h-40 object-cover"
                  alt="Product"
                />
              </div>
            </Carousel>
            {/* Product Details */}
            <div className="p-4 md:px-10 md:w-3/4 ">
              {/* Product Name */}
              <h2 className="text-2xl font-semibold">{Artwork.ArtworkName}</h2>

              {/* Price */}
              <p className="text-red-600 text-md mb-4">
                {" "}
                <FontAwesomeIcon icon={faIndianRupeeSign} /> {Artwork.ArtworkCost}
              </p>
              <hr />

              {/* Description */}
              <p className="text-gray-700 mt-2">{Artwork.ArtworkDescription}</p>

              {/* Provider Details */}
              <div className="mt-4">
                <p className="font-semibold text-xl mb-3">Provider Details</p>
                <p className="py-1 ">
                  {" "}
                  <FontAwesomeIcon icon={faUser} size="xl" />{" "}
                  <span className="mx-2"> {Artwork.userName} </span>
                </p>
                <p className="py-1 ">
                  {" "}
                  <FontAwesomeIcon icon={faPhoneVolume} fade size="xl" />{" "}
                  <span className="mx-2"> {Artwork.contactNumber}</span>
                </p>
                <p className="py-1 ">
                  <FontAwesomeIcon icon={faMapPin} flip size="2xl" />{" "}
                  <span className="mx-2">{Artwork.pickupLocation}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArtworkInfo;
