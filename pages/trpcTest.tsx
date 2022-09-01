import { NextPage } from "next";
import { trpc } from "../utils/trpc";

const TrpcTest: NextPage = (props) => {
  const { data, error } = trpc.useQuery(["rooms.getAllRooms", { name: "" }]);
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
            <li key={room.id}>
              {room.name} - ${room.pricePerNight} - {room.category}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TrpcTest;
