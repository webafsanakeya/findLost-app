import React, { use } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';

const Navbar = () => {

  const {user, logOutUser} = use(AuthContext);

  const handleLogOut = () =>{
    logOutUser()
    .then(()=>{
      console.log('log out user');
    })
    .catch(error =>{
      console.log(error);
    })
  }

     const links = (
    <>
      <li>
        <NavLink to="/" className="hover:text-primary font-medium">
          Home
        </NavLink>
      </li>

       <li>
        <NavLink to="/allItems" className="hover:text-primary font-medium">
         All Items
        </NavLink>
      </li>

      {
        user && 
        <>
        <li>
        <NavLink to="/myItems" className="hover:text-primary font-medium">
         My Items
        </NavLink>
      </li>

        </>
      }
    </>
  );

    
    return (
      <div className="navbar bg-white shadow-md px-4 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl font-bold text-primary">FindLost</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
      </div>
      <div className="navbar-end gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            {user.photoURL ? (
              <div
                className="tooltip tooltip-bottom"
                data-tip={user.displayName || "User"}
              >
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-primary cursor-pointer"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-lg">
                {user.displayName?.charAt(0)}
              </div>
            )}

            <span className="font-semibold hidden sm:block">
              {user.displayName}
            </span>
            <button onClick={handleLogOut} className="btn btn-outline btn-sm">
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/register" className="btn btn-sm btn-outline">
              Register
            </NavLink>
            <NavLink to="/logIn" className="btn btn-sm btn-primary">
              Login
            </NavLink>
          </div>
        )}
      </div>
    </div>

    );
};

export default Navbar;