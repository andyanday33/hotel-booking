import { NextPage } from "next";
import Link from "next/link";
import { trpc } from "../../utils/trpc";
import Layout from "../../components/layout/Layout";
import PostingCard from "../../components/PostingCard";

const TrpcTest: NextPage = (props) => {
  const { data, error } = trpc.useQuery(["room.getAllRooms", { name: "" }]);
  return (
    <Layout>
      <h2 className="text-center xs:text-start my-14 mx-[5%] text-4xl">
        All Stays
      </h2>
      <section className="mx-[10%] grid grid-cols-1 gap-6 xs:mx-[5%] xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {/* TODO: add a spinner here */}
        {!data && !error && <p>Loading</p>}
        {error && <p>Error: {error.message}</p>}
        {data && data.map((room) => <PostingCard key={room.id} room={room} />)}
      </section>
    </Layout>
  );
};

export default TrpcTest;
