import { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import ImageWithFallback from "../../components/ImageWithFallback";
import { Room, RoomImage } from "@prisma/client";
import Carousel from "../../components/Carousel";

type FeatureProps = {
  feature: string;
  exists: boolean;
};

type RoomDetalsProps = {
  room: Room & { images: RoomImage[] };
};

const FeatureIndicator: React.FC<FeatureProps> = ({ feature, exists }) => (
  <li>
    {feature}: {exists ? <span>&#10003;</span> : <span>&#10060;</span>}
  </li>
);

const RoomDetails: React.FC<RoomDetalsProps> = ({ room }) => {
  console.log("roomImages", room.images);
  return (
    <>
      <section
        className="room-details text-center sm:text-start row-[2] mx-4 sm:mx-0 sm:max-w-[50%] mr-4
  divide-y divide-gray-700"
      >
        <div className="room-header pb-4">
          <h2 className="text-4xl mb-2">{room.name}</h2>
          <p className="text-sm mb-4">
            &#9733; {room.ratings.toFixed(2)} | {room.numOfReviews} reviews |{" "}
            {room.address}
          </p>
          {/* TODO: Configure user queries on tRPC */}
          {room.creatorId && <p>Hosted by {room.creatorId}</p>}
          <p>{room.description}</p>
        </div>
        <div className="room-features pt-4">
          <h2 className="text-xl mb-4">Room Features</h2>
          <div className="container divide-x divide-gray-700 grid grid-cols-2">
            <ul>
              <FeatureIndicator feature="Breakfast" exists={room.breakfast} />
              <FeatureIndicator feature="Internet" exists={room.internet} />
              <FeatureIndicator
                feature="Pets Allowed"
                exists={room.petsAllowed}
              />
              <FeatureIndicator
                feature="Room Cleaning"
                exists={room.roomCleaning}
              />
              <FeatureIndicator
                feature="Air Conditioned"
                exists={room.airconditioned}
              />
            </ul>
            <ul className="pl-2">
              <li>Number of Beds: {room.numOfBeds}</li>
              <li>
                Room Category:{" "}
                {room.category.charAt(0) + room.category.slice(1).toLowerCase()}
              </li>
            </ul>
          </div>
        </div>
      </section>
      {room.images.length > 1 ? (
        <Carousel images={room.images} width={1000} height={1000} />
      ) : (
        <ImageWithFallback
          src={room?.images[0]?.url}
          fallBackSrc={"/placeholder.jpeg"}
          layout="intrinsic"
          width={1000}
          height={1000}
        />
      )}
    </>
  );
};

const SingleRoom: NextPage = (props) => {
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

      <div className="grid border-b-2 border-gray-600 pb-2 sm:my-14 sm:mx-16">
        <section className="grid grid-cols-1 gap-4 post-header sm:flex sm:justify-between">
          {/* TODO: add a spinner here */}
          {!room && !error && <p>Loading</p>}
          {error && !room && <p>Error: {error.message}</p>}
          {room && <RoomDetails room={room} />}
        </section>
        <section></section>
      </div>
    </Layout>
  );
};

export default SingleRoom;
