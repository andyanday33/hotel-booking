import React from "react";
import Footer from "./Footer";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: React.ReactNode;
  title?: string;
};

const Layout: React.FC<Props> = ({
  children,
  title = "BOOK-IT: Book Best Hotels for your Holiday",
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2 text-2xl">BOOK-IT</div>
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
                <li>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-secondary rounded-lg w-full max-w-xs"
                  />
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
            <li>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-secondary w-full max-w-xs"
              />
            </li>
          </ul>
        </aside>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
