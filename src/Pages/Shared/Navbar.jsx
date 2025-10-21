import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { ThemeContext } from "../../Contexts/ThemeContext/ThemeContext";


const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-white font-semibold border-b-2 border-white"
      : "text-gray-200 hover:text-white";

  return (
    <nav className={`w-screen sticky top-0 z-50 shadow-lg ${darkMode ? "bg-gray-800" : "bg-gradient-to-r from-purple-800 to-indigo-900"}`}>
      <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
        <NavLink to="/" className="text-2xl font-bold text-white flex items-center gap-2">
          🔍 FindLost
        </NavLink>

        {/* Desktop menu */}
        <ul className="hidden lg:flex gap-6">
          <li><NavLink to="/" className={navLinkStyle}>Home</NavLink></li>
          {user && (
            <>
              <li><NavLink to="/allRecovered" className={navLinkStyle}>My Items</NavLink></li>
              <li><NavLink to="/addItems" className={navLinkStyle}>Add Lost & Found</NavLink></li>
              <li><NavLink to="/myItems" className={navLinkStyle}>Manage My Items</NavLink></li>
            </>
          )}
          <li><NavLink to="/faq" className={navLinkStyle}>FAQ</NavLink></li>
        </ul>

        {/* Right section */}
        <div className="hidden lg:flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          {user ? (
            <button onClick={logOutUser} className="px-4 py-1 rounded-lg bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/register" className="px-4 py-1 rounded-lg bg-gray-500 text-white">Register</NavLink>
              <NavLink to="/logIn" className="px-4 py-1 rounded-lg bg-purple-600 text-white">Login</NavLink>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white text-2xl">
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={`${darkMode ? "bg-gray-800" : "bg-gradient-to-r from-purple-800 to-indigo-900"} lg:hidden px-6 py-4`}>
          <ul className="flex flex-col gap-4">
            <li><NavLink to="/" className={navLinkStyle}>Home</NavLink></li>
            {user && (
              <>
                <li><NavLink to="/allRecovered" className={navLinkStyle}>My Items</NavLink></li>
                <li><NavLink to="/addItems" className={navLinkStyle}>Add Lost & Found</NavLink></li>
                <li><NavLink to="/myItems" className={navLinkStyle}>Manage My Items</NavLink></li>
              </>
            )}
            <li><NavLink to="/faq" className={navLinkStyle}>FAQ</NavLink></li>
            <li>
              <button onClick={toggleTheme} className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 w-full">
                {darkMode ? <FaSun /> : <FaMoon />} Toggle Theme
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
