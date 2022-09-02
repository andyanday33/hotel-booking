import { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const TrpcTest: NextPage = (props) => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || isNaN(+id)) {
    return <div>Please provide a valid id.</div>;
  }

  const { data: room, error } = trpc.useQuery(["getSingleRoom", { id: +id }]);
  return (
    <>
      {/* TODO: consider extracting layout
      TODO: pass down data as a prop if not initial request */}
      <Header />
      <main className="min-w-full min-h-screen bg-gray-800">
        <ul>
          {/* TODO: add a spinner here */}
          {!room && !error && <p>Loading</p>}
          {error && <p>Error: {error.message}</p>}
          {room && (
            <li key={room.id}>
              {room.name} - ${room.pricePerNight} - {room.category}
            </li>
          )}
        </ul>
      </main>
      <Footer />
    </>
  );
};

export default TrpcTest;
