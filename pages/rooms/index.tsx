import { NextPage } from "next";
import Link from "next/link";
import { trpc } from "../../utils/trpc";
import Layout from "../../components/layout/Layout";
import PostingCard from "../../components/PostingCard";

const TrpcTest: NextPage = (props) => {
  const { data, error } = trpc.useQuery(["room.getAllRooms", { name: "" }]);
  return (
    <Layout>
      <h2 className="text-center sm:text-start mx-14 md:mx-40 my-14 lg:mx-14 text-4xl">
        All Stays
      </h2>
      <section className="mx-14 md:mx-40 lg:mx-14 flex gap-6 flex-wrap justify-evenly sm:justify-between">
        {/* TODO: add a spinner here */}
        {!data && !error && <p>Loading</p>}
        {error && <p>Error: {error.message}</p>}
        {data && data.map((room) => <PostingCard key={room.id} room={room} />)}
      </section>
    </Layout>
  );
};

export default TrpcTest;
