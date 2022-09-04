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

      <div className="grid after:content-[ ] after:border-t-2 after:border-gray-600 after:mt-4 sm:my-14 sm:mx-16">
        <section className="grid grid-cols-1 gap-4 post-header sm:flex sm:justify-between">
          {/* TODO: add a spinner here */}
          {!room && !error && <p>Loading</p>}
          {error && <p>Error: {error.message}</p>}
          {room && (
            <>
              <section className="room-details text-center sm:text-start row-[2] mx-4 sm:mx-0 sm:max-w-[50%] mr-4">
                <h2 className="text-4xl mb-4">{room.name}</h2>
                <p>{room.description}</p>
              </section>

              <ImageWithFallback
                src={room?.images[0]?.url}
                fallBackSrc={"/placeholder.jpeg"}
                layout="intrinsic"
                width={1000}
                height={1000}
              />
            </>
          )}
        </section>
        <section></section>
      </div>
    </Layout>
  );
};

export default TrpcTest;
