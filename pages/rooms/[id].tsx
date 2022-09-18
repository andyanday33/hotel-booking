import { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import ImageWithFallback from "../../components/ImageWithFallback";
import { Room, RoomImage, User } from "@prisma/client";
import Carousel from "../../components/Carousel";
import { DateRange, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import ButtonWithLoadingState from "../../components/ButtonWithLoadingState";
import { useSession } from "next-auth/react";

type FeatureProps = {
  feature: string;
  exists: boolean;
};

type RoomDetailsProps = {
  room: Room & { images: RoomImage[]; creator: User | null };
};

type ReservationDatePickerProps = {
  pricePerNight: number;
};

const FeatureIndicator: React.FC<FeatureProps> = ({ feature, exists }) => (
  <li>
    {feature}: {exists ? <span>&#10003;</span> : <span>&#10060;</span>}
  </li>
);

const ReservationDatePicker: React.FC<ReservationDatePickerProps> = ({
  pricePerNight,
}) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [days, setDays] = useState(0);

  const handleSelect = (ranges: RangeKeyDict) => {
    // Date selection range
    setSelectionRange((prev) => {
      return { ...prev, ...ranges.selection };
    });

    // Calculate days
    if (ranges.selection.endDate && ranges.selection.startDate) {
      const diffTime = Math.abs(
        +ranges.selection.endDate - +ranges.selection.startDate
      );
      setDays(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }
  };

  return (
    <section className="date-picker mt-4 pt-4 mb-4 border-t-2 border-gray-700 lg:flex">
      {/* TODO: Update styling */}
      <DateRange
        ranges={[selectionRange]}
        onChange={handleSelect}
        minDate={new Date()}
        className="rounded-lg"
      />
      <div className="price-payment mt-2 lg:ml-2 lg:mt-auto">
        <p>
          Total: <strong>£{days * pricePerNight}</strong>
        </p>
        <button className="btn btn-primary mt-2">Reserve and Pay</button>
      </div>
    </section>
  );
};

const RoomDetails: React.FC<RoomDetailsProps> = ({ room }) => {
  const deleteMutation = trpc.useMutation(["room.post.deleteSingleRoom"]);
  const router = useRouter();
  const { data } = useSession();

  const [isCreator, setIsCreator] = useState(false);
  useEffect(() => {
    if (data?.user?.email === room.creator?.email && data?.user?.email) {
      setIsCreator(true);
    }
  }, [data?.user?.email]);

  const handleDeletion = () => {
    deleteMutation.mutate({ id: room.id });
  };

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      router.push("/profile/postings");
    }
    if (deleteMutation.isError) {
      alert("Error deleting room: " + deleteMutation.error);
      router.reload();
    }
  }, [deleteMutation.isSuccess, deleteMutation.isError, deleteMutation.error]);

  return (
    <>
      <section
        className="room-details text-center md:text-start row-[3] mx-4 md:mx-0 md:max-w-[50%] mr-4
  divide-y divide-gray-700"
      >
        <div className="room-header pb-4">
          <h2 className="text-4xl mb-2">{room.name}</h2>
          <p className="text-sm mb-4">
            &#9733; {room.ratings.toFixed(2)} | {room.numOfReviews} reviews |{" "}
            {room.address}
          </p>
          {isCreator && (
            <ButtonWithLoadingState
              text="Delete Posting"
              className="btn-error btn-outline my-4"
              onClick={handleDeletion}
            />
          )}
          {room?.creator?.name && (
            <p className="my-4 text-accent">
              Hosted by {room.creator.name} <br /> Contact at{" "}
              {room.creator.email}
            </p>
          )}
          <p>{room.description}</p>
        </div>
        <div className="room-features pt-4">
          <h2 className="text-xl mb-4">Room Features</h2>
          <div className="container divide-x divide-gray-700 grid grid-cols-2 min-w-full">
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
              <li>Guests: {room.guestCapacity}</li>
            </ul>
          </div>
        </div>
        <ReservationDatePicker pricePerNight={room.pricePerNight} />
      </section>
      {room.images.length > 1 ? (
        <Carousel images={room.images} width={500} height={500} />
      ) : (
        <ImageWithFallback
          src={room?.images[0]?.url}
          fallBackSrc={"/placeholder.jpeg"}
          layout="intrinsic"
          width={500}
          height={500}
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
    "room.get.getSingleRoom",
    { id: +id },
  ]);

  return (
    <Layout>
      {/* TODO: consider extracting layout
      TODO: pass down data as a prop if not initial request */}
      <>
        {!room && !error && (
          <div className="min-w-screen min-h-screen flex">
            <HashLoader color="#fffffff" className="my-auto mx-auto" />
          </div>
        )}
        {error && !room && <p>Error: {error.message}</p>}
        {room && (
          <div className="grid border-b-2 text-gray-300 border-gray-600 pb-2 md:my-14 md:mx-16">
            <section className="grid grid-cols-1 gap-4 post-header md:flex md:justify-between">
              <RoomDetails room={room} />
            </section>
            <section></section>
          </div>
        )}
      </>
    </Layout>
  );
};

export default SingleRoom;
