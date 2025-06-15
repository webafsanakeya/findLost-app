import React, { use } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';

const Navbar = () => {
  const { user, logOutUser } = use(AuthContext);

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        console.log('User logged out');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? 'text-primary font-semibold border-b-2 border-primary transition duration-150'
      : 'hover:text-primary transition duration-150';

  const links = (
    <>
      <li><NavLink to="/" className={navLinkStyle}>Home</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/allRecovered" className={navLinkStyle}>My Items</NavLink></li>
          <li><NavLink to="/addItems" className={navLinkStyle}>Add Lost & Found</NavLink></li>
          <li><NavLink to="/myItems" className={navLinkStyle}>Manage My Items</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-white shadow-md sticky top-0 z-50 px-4 py-2">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-white rounded-box w-52">
            {links}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost normal-case text-2xl font-bold text-primary">
          🔍 FindLost
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">{links}</ul>
      </div>

      <div className="navbar-end gap-3">
        {user ? (
          <div className="flex items-center gap-4">
            {user.photoURL ? (
              <div className="tooltip tooltip-bottom" data-tip={user.displayName || 'User'}>
                <img src={user.photoURL} alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-primary object-cover" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-lg">
                {user.displayName?.charAt(0)}
              </div>
            )}
            <span className="font-medium hidden sm:inline">{user.displayName}</span>
            <button onClick={handleLogOut} className="btn btn-sm btn-outline">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/register" className="btn btn-outline btn-sm">Register</NavLink>
            <NavLink to="/logIn" className="btn btn-primary btn-sm">Login</NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
