import { Room, RoomImage } from "@prisma/client";
import React from "react";
import Link from "next/link";
import Rating from "./Rating";

type Props = {
  room: Room & { images: RoomImage[] };
};

const PostingCard: React.FC<Props> = ({ room }) => {
  return (
    <Link href={`/rooms/${room.id}`}>
      <a className="">
        <div className="card border-2 border-gray-600 bg-base-100 h-full shadow-xl motion-safe:hover:scale-105 duration-500">
          <figure className="object-cover flex h-[75%] xs:h-[50%]">
            {room.images && (
              <img
                src={room.images[0]?.url}
                alt="Hotel-House Posting Image"
                className="m-auto"
              />
            )}
          </figure>
          <div className="flex card-body">
            <h2 className="card-title text-sm h-[35%]">
              {room.name}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <section className="h-1/6 price mt-2 text-sm">
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
            <div className="h-[1rem] xs:h-[3rem] card-actions justify-end">
              {/* TODO: add other badges here */}
              {room.internet && (
                <div className="badge badge-outline text-xs">Internet</div>
              )}
              {room.breakfast && (
                <div className="badge badge-outline text-xs">Breakfast</div>
              )}
              {room.petsAllowed && (
                <div className="badge badge-outline text-xs">Pets Allowed</div>
              )}
              {room.airconditioned && (
                <div className="badge badge-outline text-xs">
                  Air Conditioned
                </div>
              )}
              {room.roomCleaning && (
                <div className="badge badge-outline text-xs">Room Cleaning</div>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default PostingCard;
