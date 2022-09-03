import { NextPage } from "next";
import Link from "next/link";
import { trpc } from "../../utils/trpc";
import Layout from "../../components/layout/Layout";
import PostingCard from "../../components/PostingCard";

const TrpcTest: NextPage = (props) => {
  const { data, error } = trpc.useQuery(["room.getAllRooms", { name: "" }]);
  return (
    <Layout>
      <section className="grid gap-3 my-6 xs:grid-cols-1 xs:grid-rows-6 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 justify-items-center">
        {/* TODO: add a spinner here */}
        {!data && !error && <p>Loading</p>}
        {error && <p>Error: {error.message}</p>}
        {data && data.map((room) => <PostingCard room={room} />)}
      </section>
    </Layout>
  );
};

export default TrpcTest;
