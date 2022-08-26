import { NextApiRequest, NextApiResponse } from "next";
import {
  Category,
  Prisma,
  PrismaClient,
  PrismaPromise,
  Room,
} from "@prisma/client";
import Error from "next/error";

const prisma = new PrismaClient();

type AllRoomsData = {
  success: boolean;
  rooms: Room[];
};

const allRooms = async (
  req: NextApiRequest,
  res: NextApiResponse<AllRoomsData>
) => {
  const rooms = await prisma.room.findMany();
  res.status(200).json({
    success: true,
    rooms,
  });
};

const createRoom = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // cast the type
    const roomBody = req.body as Prisma.RoomCreateInput;

    if (!["KING", "TWINS", "SINGLE"].includes(roomBody.category)) {
      throw Error;
    }

    // extract and process image objects for prisma creation
    let images = roomBody.images as Prisma.RoomImageCreateManyRoomInput[];
    roomBody.images = {
      createMany: {
        data: images,
        skipDuplicates: true,
      },
    };

    const newRoom = await prisma.room.create({
      data: roomBody,
    });
    console.log("passed room");

    res.status(200).json({
      success: true,
      newRoom,
    });
  } catch (e: unknown) {
    console.log(e);
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

export { allRooms, createRoom };
