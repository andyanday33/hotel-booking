import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <nav className="navbar bg-indigo-700 text-white">
      <div className="navbar-start hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <a>Home</a>
          </li>
        </ul>
      </div>
      <div className="navbar-center text-2xl" id="bookit-logo">
        <p className="p-2 border-b-2 border-gray-800 rounded-lg shadow-xl">
          Book-IT
        </p>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <a>Login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
