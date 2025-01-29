import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <div className="flex justify-between px-10 p-4 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% text-center items-center">
      <h1 className="text-white font-semibold font-mono text-3xl cursor-default">GIPHY</h1>
      
      <div className="flex gap-10 text-white text-lg">
        {isLoggedIn ? (
          <>
            <NavLink to="/random" className="hover:bg-gray-500 p-1 rounded-lg cursor-pointer">
              Random GIF
            </NavLink>
            <NavLink to="/generate" className="hover:bg-gray-500 p-1 rounded-lg cursor-pointer">
              Generate GIF
            </NavLink>

            <NavLink to="/ai" className="hover:bg-gray-500 p-1 rounded-lg cursor-pointer">
              AI
            </NavLink>
          </>
        ) : null} 
      </div>

      <div>
        {isLoggedIn ? (
          <button
            className="bg-red-600 hover:bg-red-500 p-1 rounded-lg text-white px-3"
            onClick={onLogout}
          >
            Logout
          </button>
        ) : (
        ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
