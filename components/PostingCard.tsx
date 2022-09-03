import { Room, RoomImage } from "@prisma/client";
import React from "react";

type Props = {
  room: Room & { images: RoomImage[] };
};

const PostingCard: React.FC<Props> = ({ room }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
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
          {room.internet && <div className="badge badge-outline">Internet</div>}
          {room.breakfast && (
            <div className="badge badge-outline">Breakfast</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostingCard;
