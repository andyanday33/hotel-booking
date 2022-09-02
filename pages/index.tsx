import type { NextPage } from "next";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <main className="min-w-full min-h-screen bg-gray-800">
        <h1>Test</h1>
      </main>
      <Footer />
    </>
  );
};

export default Home;
