import type { NextPage } from "next";
import Layout from "../components/layout/Layout";
import Hero from "../components/Hero";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <Hero />
      </Layout>
    </>
  );
};

export default Home;
