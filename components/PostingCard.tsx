import { Room, RoomImage } from "@prisma/client";
import React from "react";
import Link from "next/link";
import Rating from "./Rating";
import ImageWithFallback from "./ImageWithFallback";
import Image from "next/image";

type PostingCardProps = {
  room: Room & { images: RoomImage[] };
};

type BadgesProps = {
  internet: boolean;
  breakfast: boolean;
  petsAllowed: boolean;
  airconditioned: boolean;
  roomCleaning: boolean;
};

const Badges: React.FC<BadgesProps> = ({
  internet,
  breakfast,
  petsAllowed,
  airconditioned,
  roomCleaning,
}) => (
  <div className="min-h-[0.5rem] xs:min-h-[1rem] card-actions justify-end pb-4">
    {/* TODO: add other badges here */}
    {internet && <div className="badge badge-outline text-sm">Internet</div>}
    {breakfast && <div className="badge badge-outline text-sm">Breakfast</div>}
    {petsAllowed && (
      <div className="badge badge-outline text-sm">Pets Allowed</div>
    )}
    {airconditioned && (
      <div className="badge badge-outline text-sm">Air Conditioned</div>
    )}
    {roomCleaning && (
      <div className="badge badge-outline text-sm">Room Cleaning</div>
    )}
  </div>
);

const PostingCard: React.FC<PostingCardProps> = ({ room }) => {
  return (
    <Link href={`/rooms/${room.id}`}>
      <a className="">
        <div className="card border-2 border-gray-600 bg-gray-800 text-gray-300 h-full shadow-xl motion-safe:hover:scale-105 duration-500">
          <div className="container min-h-[30%] max-h-[60%] md:h-[40%]">
            <figure className="flex h-full">
              {/* There are images for this room */}
              {room.images && (
                <ImageWithFallback
                  src={room.images[0]?.url}
                  alt="Hotel-House Posting Image"
                  className="m-auto"
                  fallBackSrc="/placeholder.jpeg"
                  layout="intrinsic"
                  width={500}
                  height={500}
                  unoptimized
                />
              )}
            </figure>
          </div>

          <div className="flex card-body">
            <h2 className="card-title text-gray-300 text-sm min-h-[35%] md:text-xs">
              <strong>{room.name}</strong>
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <section className="min-h-1/6 price text-sm">
              <p className="text-xs">{room.address}</p>
              <p>
                <span>
                  <strong>£{room.pricePerNight.toFixed(2)}</strong>
                </span>{" "}
                / Night
              </p>
            </section>
            <Rating
              roomId={room.id}
              rating={room.ratings}
              numberOfReviews={room.numOfReviews}
              readOnly={true}
            />
            <Badges
              internet={room.internet}
              breakfast={room.breakfast}
              airconditioned={room.airconditioned}
              petsAllowed={room.petsAllowed}
              roomCleaning={room.roomCleaning}
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default PostingCard;
