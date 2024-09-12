import React, { useState, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Timelayout from "./TimeAgo";
import { useNavigate } from "react-router-dom";

function VideoComponent() {
  const [videos, setVideos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  // Fetch videos when component mounts
  useEffect(() => {
    const fetchDate = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/videos/");
        setVideos(response.data); // Update state with fetched videos
        console.log("Fetched videos", response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchDate();
  }, []); // Empty dependency array to run only once on mount

  // Toggle function for each video card
  const handleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Handle delete action
  const handleDelete = async (index) => {
    try {
      const deleteDate = axios.delete(
        `http://127.0.0.1:5000/api/videos/${index}`
      );
      console.log(`Delete video ${index}`);
      setVideos((prevVideos) =>
        prevVideos.filter((video) => video._id !== index)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-green-400 mb-8 drop-shadow-lg select-none">
        Videos
      </h1>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center">
        {/* Video Cards */}
        {videos.map((video, index) => (
          <div
            key={index}
            className="relative bg-gray-700 p-5 rounded-lg h-[240px] w-[300px] flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer group"
          >
            {/* Video Info */}
            <div
              className="h-full w-full bg-transparent"
              onClick={() => navigate(`/video/${video._id}`)}
            >
              <h1 className="text-center text-white text-2xl select-none mt-14">
                {video.filename || `Video ${index + 1}`}
              </h1>
            </div>

            {activeIndex === index && (
              <div
                className="bg-slate-800  hover:bg-slate-900 hover:text-white p-3  rounded-lg absolute top-[120px] left-[215px] transform -translate-x-1/2 z-20 flex items-center justify-center gap-4"
                onClick={() => handleDelete(video._id)}
              >
                <button className="text-red-500 hover:text-red-700 transition-colors duration-300 w-full">
                  <MdDelete size={24} />
                </button>
                <label htmlFor="btn" className="text-white">
                  Delete
                </label>
              </div>
            )}

            <div className="flex items-center justify-between w-full mt-auto">
              <div className="flex flex-col gap-2">
                <h2 className="text-white text-lg select-none">
                  {video.filename.match(/^[^.\\-]+/)[0] || "Title"}
                </h2>

                <Timelayout time={video.uploadDate} />
              </div>
              <button
                className="hover:bg-gray-800 p-2 rounded-full"
                onClick={() => handleToggle(index)}
              >
                <CiMenuKebab color="white" size={25} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoComponent;
