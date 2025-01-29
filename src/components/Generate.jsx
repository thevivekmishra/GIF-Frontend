import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Generate = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [gif, setGif] = useState("");
  const [tag, setTag] = useState(""); 
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 

  async function fetchData() {
    setLoading(true); 
    const tagToUse = tag || ""; 
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tagToUse}`;

    try {
      const output = await axios.get(url);
      const gifSource = output.data.data.images.downsized_large.url;
      setGif(gifSource);
      setError(""); 
    } catch (error) {
      console.error("Error fetching GIF:", error);
      // Check if the error is due to a 429 status code
      if (error.response && error.response.status === 429) {
        setError("Too many attempts, please try after some time.");
      } else {
        setError("Oops! Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [tag]); 

  const clickHandler = () => {
    fetchData(); 
  };

  return (
    <div className="flex justify-center items-center pt-20 pb-10 max-h-screen bg-gray-200">
      <div className="bg-white w-[550px] h-[450px] rounded-lg p-4 shadow-2xl flex flex-col justify-center items-center">
        <h1 className="text-2xl text-gray-800 font-semibold text-center mb-4">
          Generate GIF by Tag
        </h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white p-2 rounded-md mb-4">
            <p>{error}</p>
          </div>
        )}

        <div className="flex justify-center items-center h-[300px] bg-white rounded-lg overflow-hidden mb-4">
          {gif ? (
            <img
              src={gif}
              alt="Generated Gif"
              className="w-full h-full object-cover transition-all duration-500 ease-in-out transform hover:scale-105"
            />
          ) : loading ? (
            <p className="text-lg text-gray-400">Loading...</p>
          ) : (
            <p className="text-lg text-gray-400">No GIF to display</p>
          )}
        </div>

        <div className="flex flex-col justify-center items-center space-y-4">
          <input
            onChange={(e) => setTag(e.target.value)}
            value={tag}
            type="text"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter a GIF tag (e.g., funny)"
          />
          <button
            onClick={clickHandler}
            className="bg-blue-500 p-3 rounded-lg text-white font-semibold hover:bg-blue-600 transition-all"
          >
            Generate GIF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Generate;
