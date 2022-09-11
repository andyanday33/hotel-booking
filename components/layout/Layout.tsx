import React from "react";
import Footer from "./Footer";
import Link from "next/link";
import Head from "next/head";
import { useSession, signOut } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
  title?: string;
};

type ProfileComponentProps = {
  classNames?: {
    label?: string;
    button?: string;
  };
};

const ProfileComponent: React.FC<ProfileComponentProps> = ({ classNames }) => {
  const { data: session, status } = useSession();
  return (
    <>
      {status === "authenticated" ? (
        <>
          <li className={`self-center ${classNames?.label}`}>
            Signed in as {session.user?.name}
          </li>
          <li className={`${classNames?.button}`}>
            <button onClick={() => signOut()}>Sign Out</button>
          </li>
        </>
      ) : (
        <li className={`${classNames?.button}`}>
          <Link href="/api/auth/signin">
            <a>Sign In</a>
          </Link>
        </li>
      )}
    </>
  );
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
                <ProfileComponent />
              </ul>
            </div>
          </nav>
          {/* <!-- Page content here --> */}
          <main className="bg-gray-800">{children}</main>
        </div>
        <aside className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-gray-800 text-gray-300">
            {/* <!-- Sidebar content here --> */}
            <li className="hover:bg-gray-700 rounded-lg duration-500 transition-colors">
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className="hover:bg-gray-700 rounded-lg duration-500 transition-colors">
              <Link href="/rooms">
                <a>Hotel and Home Postings</a>
              </Link>
            </li>
            <ProfileComponent
              classNames={{
                label: "p-4 w-full",
                button:
                  "hover:bg-gray-700 rounded-lg duration-500 transition-colors",
              }}
            />
          </ul>
        </aside>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
