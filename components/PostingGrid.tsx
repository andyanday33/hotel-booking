import { Review, RoomImage } from "@prisma/client";
import React, { Dispatch, SetStateAction } from "react";
import { SearchParamsType } from "../pages/rooms";
import Pagination from "./Pagination";
import PostingCard from "./PostingCard";

type Props = {
  data: [
    number,
    {
      address: string;
      id: number;
      name: string;
      images: RoomImage[];
      breakfast: boolean;
      internet: boolean;
      reviews: Review[];
      ratings: number;
      numOfReviews: number;
      pricePerNight: number;
      airconditioned: boolean;
      petsAllowed: boolean;
      roomCleaning: boolean;
    }[]
  ];
  searchParams: SearchParamsType;
  setSearchParams: Dispatch<SetStateAction<SearchParamsType>>;
};

const PostingGrid = ({ data, searchParams, setSearchParams }: Props) => {
  return (
    <>
      <section className="mb-16 mx-[10%] grid grid-cols-1 gap-6 xs:mx-[5%] xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data[1].map((room) => (
          <PostingCard key={room.id} room={room} />
        ))}
      </section>
      <div className="flex mb-8">
        <Pagination
          roomCount={data[0]}
          roomsPerPage={5}
          page={searchParams.page || 1}
          setPage={setSearchParams}
          className="mx-auto"
        />
      </div>
    </>
  );
};

export default PostingGrid;
