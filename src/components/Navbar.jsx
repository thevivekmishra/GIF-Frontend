import React, { useState } from 'react';
import { IoMdMenu } from "react-icons/io";
import { NavLink } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [menu, setMenu] = useState(false);

  // Toggle the menu visibility
  const toggleMenu = () => setMenu(!menu);

  return (
    <>
      <div className="flex justify-between fixed top-0 w-full px-10 py-2 bg-gradient-to-r from-[#d1d5db] via-[#6b7280] to-[#374151] text-center items-center">
        {/* Show "GIPHY" if not logged in, hide otherwise */}
        <h1 className={`text-white font-semibold font-mono ml-[-20px] text-3xl cursor-default ${!isLoggedIn ? 'block' : 'hidden'} md:block`}>
          GIPHY
        </h1>

        {/* Show menu icon when logged in */}
        {isLoggedIn && (
          <div className="md:hidden text-3xl ml-[-25px]">
            <button onClick={toggleMenu}>
              <IoMdMenu />
            </button>
          </div>
        )}

        {/* Main Navigation Links (visible on large screens) */}
        <div className="hidden md:flex gap-10 text-white text-lg">
          {isLoggedIn ? (
            <>
              <NavLink to="/random" className="hover:bg-gray-500 p-1 rounded-lg cursor-pointer">
                Random GIF
              </NavLink>
              <NavLink to="/generate" className="hover:bg-gray-500 p-1 rounded-lg cursor-pointer">
                Generate GIF
              </NavLink>
              <NavLink to="/ai" className="hover:bg-gray-500 p-1 rounded-lg cursor-pointer">
               Chat AI
              </NavLink>
           
            </>
          ) : null}
        </div>

        {/* Logout Button */}
        <div>
          {isLoggedIn ? (
            <button
              className="bg-red-600 hover:bg-red-500 p-1 rounded-lg text-white px-3 "
              onClick={onLogout}
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>

      {/* Mobile Menu (Hamburger Popup Menu) */}
      {menu && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-3/4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">GIPHY</h2>
              <button onClick={toggleMenu} className="text-3xl text-gray-800">
                &times;
              </button>
            </div>
            <div className="flex flex-col items-center mt-6">
              {isLoggedIn ? (
                <>
                  <NavLink to="/random" className="hover:bg-gray-500 p-2 rounded-lg w-full text-center mb-2">
                    Random GIF
                  </NavLink>
                  <NavLink to="/generate" className="hover:bg-gray-500 p-2 rounded-lg w-full text-center mb-2">
                    Generate GIF
                  </NavLink>
                  <NavLink to="/ai" className="hover:bg-gray-500 p-2 rounded-lg w-full text-center mb-2">
                   Chat AI
                  </NavLink>
               
                </>
              ) : null}

              {/* Logout Button */}
              {isLoggedIn ? (
                <button
                  className="bg-red-600 hover:bg-red-500 p-2 rounded-lg w-full text-center mt-4"
                  onClick={onLogout}
                >
                  Logout
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
