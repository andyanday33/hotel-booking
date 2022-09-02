import { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";

const TrpcTest: NextPage = (props) => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || isNaN(+id)) {
    return <div>Please provide a valid id.</div>;
  }

  const { data: room, error } = trpc.useQuery(["getSingleRoom", { id: +id }]);
  if (!room && !error) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error?.message}</div>;
  }
  return (
    <div>
      <ul>
        {room && (
          <li key={room.id}>
            {room.name} - ${room.pricePerNight} - {room.category}
          </li>
        )}
      </ul>
    </div>
  );
};

export default TrpcTest;
