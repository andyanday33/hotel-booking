import Link from "next/link";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <nav className="navbar bg-indigo-700 text-white">
      <div className="navbar-start hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/rooms">
              <a>Rooms and Hotels</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-center" id="bookit-logo">
        <p
          className="p-2 text-xl normal-case border-b-2 border-gray-800 rounded-lg shadow-xl
        hover:border-l-2 hover:border-r-2 transition-all duration-100"
        >
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
