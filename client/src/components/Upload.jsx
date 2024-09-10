import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [file, setFile] = useState(null);
  const [uploadState, setUploadState] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      setUploadError("Please select a file to upload.");
      return;
    }

    // Create FormData and append the file
    const formData = new FormData();
    formData.append("file", file);

    setUploadState(true); // Set uploading state
    setUploadError(null); // Clear any previous errors

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/videos/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadState(false);
      console.log("Upload successful:", response.data);
      navigate("/video");
    } catch (error) {
      console.error("Error during file upload:", error);
      setUploadError("File upload failed. Please try again.");
      setUploadState(false);
    }
  };

  return (
    <div>
      <h1 className="text-6xl font-bold text-green-400 mb-8 drop-shadow-lg select-none">
        MongoDB Video Upload
      </h1>

      <div className="flex items-center justify-center mt-5">
        <input
          type="file"
          id="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setUploadError(null);
          }}
          className="block w-64 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-600 transition-colors duration-300 ease-in-out"
        />
        <button
          onClick={handleUpload}
          className="px-8 py-2 rounded-lg select-none h-fit w-fit bg-teal-500 text-white font-semibold text-lg hover:bg-teal-600 transition duration-200 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
        >
          Upload
        </button>
      </div>

      {uploadError && (
        <p className="text-red-500 absolute left-[650px] top-[480px] select-none">
          {uploadError}
        </p>
      )}
      {uploadState && (
        <p className="text-green-500 absolute left-[700px] top-[480px] select-none">
          Uploading...
        </p>
      )}
    </div>
  );
}

export default Upload;
