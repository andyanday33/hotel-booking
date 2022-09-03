import { Room, RoomImage } from "@prisma/client";
import React from "react";
import Link from "next/link";

type Props = {
  room: Room & { images: RoomImage[] };
};

const PostingCard: React.FC<Props> = ({ room }) => {
  return (
    <Link href={`/rooms/${room.id}`}>
      <a className="w-80">
        <div className="card border-2 border-gray-600 bg-base-100 h-full shadow-xl motion-safe:hover:scale-105 duration-500">
          <figure className="min-h-[16rem]">
            {room.images && (
              <img src={room.images[0]?.url} alt="Hotel-House Posting Image" />
            )}
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {room.name}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p className="text-xs">{room.description.substring(0, 100)}...</p>
            <div className="card-actions justify-end">
              {/* TODO: add other badges here */}
              {room.internet && (
                <div className="badge badge-outline">Internet</div>
              )}
              {room.breakfast && (
                <div className="badge badge-outline">Breakfast</div>
              )}
              {room.petsAllowed && (
                <div className="badge badge-outline">Pets Allowed</div>
              )}
              {room.airconditioned && (
                <div className="badge badge-outline">Air Conditioned</div>
              )}
              {room.roomCleaning && (
                <div className="badge badge-outline">Room Cleaning</div>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default PostingCard;
