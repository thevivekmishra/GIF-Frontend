import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Random = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [gif, setGif] = useState("");
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 

  async function fetchData() {
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
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
    }
  }

  useEffect(() => {
    fetchData();
  }, []); 

  const clickHandler = () => {
    fetchData(); 
  };

  return (
    <div className="flex justify-center items-center pt-20 pb-10 max-h-screen bg-gray-200">
      <div className="bg-white w-[550px] h-[450px] rounded-lg p-4 shadow-2xl flex flex-col justify-center items-center">
        <h1 className="text-2xl text-gray-800 font-semibold text-center mb-4">
          Get Your Random GIF!
        </h1>

       
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
          <button
            onClick={clickHandler}
            className="bg-pink-500 p-3 rounded-lg text-white font-semibold hover:bg-pink-600 transition-all"
          >
            Generate Random GIF
          </button>
          <p className="text-sm text-gray-700 opacity-70">
            Click to get a random GIF!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Random;
