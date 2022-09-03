import React from "react";
import Footer from "./Footer";
import Link from "next/link";

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* <!-- Navbar --> */}
          <nav className="w-full navbar bg-blue-700 text-white">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">BOOK-IT</div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {/* <!-- Navbar menu content here --> */}
                <li>
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/rooms">
                    <a>Hotel and Home Postings</a>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          {/* <!-- Page content here --> */}
          <main className="bg-gray-800">{children}</main>
        </div>
        <aside className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100">
            {/* <!-- Sidebar content here --> */}
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/rooms">
                <a>Hotel and Home Postings</a>
              </Link>
            </li>
          </ul>
        </aside>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
