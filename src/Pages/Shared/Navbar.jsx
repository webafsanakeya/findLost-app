import React, { useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';


const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);

  const handleLogOut = async () => {
    try {
      await logOutUser();
      console.log('User logged out');
    } catch (error) {
      console.error(error);
    }
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? 'text-blue-700 font-semibold border-b-2 border-blue-700 transition duration-150'
      : 'text-gray-700 hover:text-blue-600 transition duration-150';

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkStyle}>
          Home
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/allRecovered" className={navLinkStyle}>
              My Items
            </NavLink>
          </li>
          <li>
            <NavLink to="/addItems" className={navLinkStyle}>
              Add Lost & Found
            </NavLink>
          </li>
          <li>
            <NavLink to="/myItems" className={navLinkStyle}>
              Manage My Items
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/faq" className={navLinkStyle}>
          FAQ
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-white shadow-md sticky top-0 z-50 px-4 py-3">
      {/* Logo */}
      <div className="navbar-start">
        <NavLink
          to="/"
          className="text-2xl md:text-3xl font-bold text-blue-700 flex items-center gap-2"
        >
          🔍 FindLost
        </NavLink>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6">{links}</ul>
      </div>

      {/* Mobile Dropdown */}
      <div className="navbar-start lg:hidden">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-3 shadow bg-white rounded-box w-52 gap-2"
          >
            {links}
          </ul>
        </div>
      </div>

      {/* User/Profile Section */}
      <div className="navbar-end flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            {user.photoURL ? (
              <div className="tooltip tooltip-bottom" data-tip={user.displayName || 'User'}>
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-blue-700 object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-lg">
                {user.displayName?.charAt(0)}
              </div>
            )}
            <span className="font-medium hidden sm:inline">{user.displayName}</span>
            <button onClick={handleLogOut} className="btn btn-sm btn-outline text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/register" className="btn btn-outline btn-sm text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white">
              Register
            </NavLink>
            <NavLink to="/logIn" className="btn btn-primary btn-sm bg-blue-700 hover:bg-blue-800">
              Login
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
