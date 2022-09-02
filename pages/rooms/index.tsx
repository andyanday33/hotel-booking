import { NextPage } from "next";
import Link from "next/link";
import { trpc } from "../../utils/trpc";

const TrpcTest: NextPage = (props) => {
  const { data, error } = trpc.useQuery(["getAllRooms", { name: "" }]);
  if (!data && !error) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error?.message}</div>;
  }
  return (
    <div>
      <ul>
        {data &&
          data.map((room) => (
            <Link href={`/rooms/${room.id}`}>
              <a>
                <li key={room.id}>
                  {room.name} - ${room.pricePerNight} - {room.category}
                </li>
              </a>
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default TrpcTest;
