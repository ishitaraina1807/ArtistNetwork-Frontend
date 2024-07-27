import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";
import Navbar from "./Navbar";

axios.defaults.baseURL = "https://artists-network-backend.vercel.app/"; // Use http for local development

const ItemInfo = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({
    image: {},
    itemName: "",
    itemDescription: "",
    userName: "",
  });

  let blobURLs = [];

  useEffect(() => {
    axios
      .post("/api/artworkDetails", { id: id })
      .then((res) => {
        console.log(res.data); // Log the server response to inspect the data
        localStorage.setItem("item", JSON.stringify(res.data));
        setItem(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

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

  // Convert the single image to a blob URL
  if (!loading && item.image && item.image.buffer && item.image.mimetype) {
    const base64Image = item.image.buffer;
    const imageType = item.image.mimetype;
    const arrayBuffer = base64ToArrayBuffer(base64Image);
    const blob = new Blob([arrayBuffer], { type: imageType });
    const blobUrl = URL.createObjectURL(blob);
    blobURLs.push(blobUrl);
  }

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <InfinitySpin width="200" color="#424242" />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="flex flex-col md:flex-row items-center justify-center md:h-[90vh] md:px-20 px-2 gap-10">
            <div className="w-full md:w-1/2">
            <Carousel
                infiniteLoop
                autoPlay
                swipeable
                onClickItem={(index) => {
                  window.open(blobURLs[index], "_blank");
                }}
                showArrows={true}
                showThumbs={false}
                className="cursor-pointer"
              >
                {blobURLs.map((url, index) => (
                  <div key={index} className="flex justify-center">
                    <img
                      src={url}
                      className="h-[80vh] object-contain"
                      alt={`Product ${index}`}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="w-full md:w-1/2 p-4 rounded-lg">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-semibold uppercase">{item.title}</h2>
                <span className="underline">Artwork by: {item.userName}</span>
                <hr className="w-full mt-4 border-black" />
                <p className="text-gray-700 text-2xl mt-4">{item.description}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ItemInfo;
