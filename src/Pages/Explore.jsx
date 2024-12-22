import React, { useEffect, useState } from "react";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";
import Navbar from "../components/Navbar";
import Masonry from "react-masonry-css";

const FamousArtwork = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Track current page for pagination
  const [hasMore, setHasMore] = useState(true); // Track if there are more items to load

  const handleScroll = (scrollWhere) => {
    if (scrollWhere === "top") {
      window.scrollTo({
        top: 0, // Scroll to the top of the document
        left: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.artic.edu/api/v1/artworks?page=${page}&limit=12&fields=id,title,artist_display,image_id`
        );
        const { data } = res.data;

        // Prepare array of promises to fetch IIIF URLs for each artwork
        const iiifUrlPromises = data.map((artwork) => {
          if (artwork.image_id) {
            return axios
              .get(
                `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
              )
              .then((res) => ({
                ...artwork,
                imageUrl: res.request.responseURL, // Store the IIIF image URL
              }))
              .catch((error) => ({
                ...artwork,
                imageUrl: null, // Handle error or missing image gracefully
              }));
          } else {
            return Promise.resolve({
              ...artwork,
              imageUrl: null, // Handle artworks without image gracefully
            });
          }
        });

        // Resolve all promises
        const artworksWithImages = await Promise.all(iiifUrlPromises);

        setArtworks((prevArtworks) => [...prevArtworks, ...artworksWithImages]);
        setLoading(false);

        if (data.length === 0 || data.length < 12) {
          setHasMore(false); // No more items to load
        }
      } catch (error) {
        console.error("Error fetching artworks:", error);
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <>
      <Navbar />
      <div className="masonry-grid mt-10">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {artworks.map((artwork, index) => (
            <div key={index} className="masonry-item">
              {artwork.imageUrl ? (
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-60 bg-gray-200 rounded-lg"></div> // Placeholder for missing images
              )}
              <div className="masonry-item-content p-4">
                <h3 className="text-lg font-semibold mb-2">{artwork.title}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {artwork.artist_display}
                </p>
                <a
                  href={`https://www.artic.edu/artworks/${artwork.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 underline"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </Masonry>
      </div>
      <button
        className="fixed bottom-5 right-5 bg-black text-white w-12 h-12 flex items-center justify-center rounded-full shadow-md hover:bg-gray-800 transition-all duration-200 ease-in-out"
        onClick={() => handleScroll("top")}
      >
        ⬆
      </button>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <InfinitySpin width="200" color="#424242" />
        </div>
      )}
      {hasMore && !loading && (
        <div className="flex justify-center my-4">
          <button
            className="bg-gray-900 text-white px-4 py-2 rounded-md"
            onClick={loadMore}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default FamousArtwork;
