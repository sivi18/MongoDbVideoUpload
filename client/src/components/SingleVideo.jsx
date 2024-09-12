import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SingleVideo() {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/videos/${id}`
        );
        setVideoData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video:", error);
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <h1 className="text-4xl text-white animate-pulse">Loading...</h1>
      </div>
    );
  }

  if (!videoData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-4xl text-white">Video not found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10 w-full">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg shadow-teal-500/50">
        <h1 className="text-4xl font-bold text-teal-400 mb-8 animate-fade-in">
          {videoData.filename}
        </h1>
        <video
          controls
          className="w-full max-w-4xl h-auto rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          src={`http://127.0.0.1:5000/api/videos/${id}`}
        />
        <p className="mt-4 text-xl">{videoData?.description}</p>
      </div>
    </div>
  );
}

export default SingleVideo;
