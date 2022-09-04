import { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import ImageWithFallback from "../../components/ImageWithFallback";

const TrpcTest: NextPage = (props) => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || isNaN(+id)) {
    // Do not send a request for non-numeric id;
    return (
      <Layout>
        <div>Please provide a valid id.</div>
      </Layout>
    );
  }

  const { data: room, error } = trpc.useQuery([
    "room.getSingleRoom",
    { id: +id },
  ]);
  return (
    <Layout>
      {/* TODO: consider extracting layout
      TODO: pass down data as a prop if not initial request */}
      <main className="min-w-full min-h-screen bg-gray-800">
        <section className="room-details my-14 mx-16">
          {/* TODO: add a spinner here */}
          {!room && !error && <p>Loading</p>}
          {error && <p>Error: {error.message}</p>}
          {room && (
            <>
              <h2 className="text-2xl">{room.name}</h2>
              <ImageWithFallback
                src={room.images[0].url}
                fallBackSrc={"/placeholder.jpeg"}
              />
            </>
          )}
        </section>
      </main>
    </Layout>
  );
};

export default TrpcTest;
