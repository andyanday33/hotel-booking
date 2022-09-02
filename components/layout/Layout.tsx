import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-w-full min-h-screen bg-gray-800">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
