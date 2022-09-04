import { Room, RoomImage } from "@prisma/client";
import React from "react";
import Link from "next/link";
import Rating from "./Rating";
import ImageWithFallback from "./ImageWithFallback";
import Image from "next/image";

type Props = {
  room: Room & { images: RoomImage[] };
};

const PostingCard: React.FC<Props> = ({ room }) => {
  return (
    <Link href={`/rooms/${room.id}`}>
      <a className="">
        <div className="card border-2 border-gray-600 bg-base-100 h-full shadow-xl motion-safe:hover:scale-105 duration-500">
          <div className="container min-h-[30%] max-h-[60%] xs:h-[40%]">
            <figure className="flex h-full">
              {/* There are images for this room */}
              {room.images && room.images[0] && (
                <ImageWithFallback
                  src={room.images[0].url}
                  alt="Hotel-House Posting Image"
                  className="m-auto"
                  fallBackSrc="/placeholder.jpeg"
                  layout="intrinsic"
                  width={500}
                  height={500}
                  unoptimized
                />
              )}
              {/* Images are loaded but there are none */}
              {room.images && !room.images[0] && (
                <Image
                  src="/placeholder.jpeg"
                  alt="Hotel-House Posting Placeholder Image"
                  className="m-auto"
                  layout="intrinsic"
                  width={500}
                  height={500}
                  unoptimized
                />
              )}
            </figure>
          </div>

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
