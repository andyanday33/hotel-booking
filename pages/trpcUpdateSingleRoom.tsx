import { NextPage } from "next";
import { trpc } from "../utils/trpc";

type ImageType = {
  publicId: string;
  url: string;
};

const TrpcTestMutation: NextPage = (props) => {
  const mutation = trpc.useMutation("room.post.postNewRoom");

  const handleMutation = async () => {
    mutation.mutate({
      name: "Charming Studio < 10 Miles to Wells' Beaches!!!!",
      pricePerNight: 168,
      description:
        "A friendly atmosphere and natural delights await your visit to the town of Wells! Stay at this well-equipped 1-bath studio and enjoy easy access to several beaches, including Wells Beach and Drakes Island Beach, as well as Rachel Carson National Wildlife Refuge - the best spot for wildlife viewing just 8 miles away. Not to mention, with the downtown area just 10 minutes from the vacation rental,",
      address: "4667 Bicetown Street, New York, NY, 10004",
      guestCapacity: 1,
      numOfBeds: 1,
      internet: true,
      breakfast: true,
      airconditioned: false,
      petsAllowed: false,
      roomCleaning: true,
      ratings: 0,
      numOfReviews: 0,
      images: [
        {
          publicId: "bookit/rooms/1_bzynlv",
          url: "https://res.cloudinary.com/bookit/image/upload/v1618590762/bookit/rooms/1_bzynlv.jpg",
        },
        {
          publicId: "bookit/rooms/2_s1u52n",
          url: "https://res.cloudinary.com/bookit/image/upload/v1618590761/bookit/rooms/2_s1u52n.jpg",
        },
      ] as Array<ImageType>,
      category: "KING",
    });
  };

  return (
    <>
      <div>{mutation.error && <p>Error! {mutation.error.message}</p>}</div>
      <div>{mutation.isLoading && <p>Loading...</p>}</div>
      <div>{mutation.data && mutation.data.name}</div>
      <button onClick={handleMutation}>Mutate!</button>
    </>
  );
};

export default TrpcTestMutation;
