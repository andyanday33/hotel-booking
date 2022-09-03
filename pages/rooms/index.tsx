import { NextPage } from "next";
import Link from "next/link";
import { trpc } from "../../utils/trpc";
import Layout from "../../components/layout/Layout";
import PostingCard from "../../components/PostingCard";

const TrpcTest: NextPage = (props) => {
  const { data, error } = trpc.useQuery(["room.getAllRooms", { name: "" }]);
  return (
    <Layout>
      <ul>
        {/* TODO: add a spinner here */}
        {!data && !error && <p>Loading</p>}
        {error && <p>Error: {error.message}</p>}
        {data &&
          data.map((room) => (
            <Link href={`/rooms/${room.id}`}>
              <a>
                <li key={room.id}>
                  {room.name} - ${room.pricePerNight} - {room.category}
                  <PostingCard room={room} />
                </li>
              </a>
            </Link>
          ))}
      </ul>
    </Layout>
  );
};

export default TrpcTest;
