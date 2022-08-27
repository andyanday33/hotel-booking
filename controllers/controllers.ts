import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient, Room } from "@prisma/client";
import Error from "next/error";
import { prisma } from "../db";

type AllRoomsData = {
  success: boolean;
  count?: number;
  rooms?: Room[];
  error?: unknown;
};

// GET all rooms /api/rooms
const allRooms = async (
  req: NextApiRequest,
  res: NextApiResponse<AllRoomsData>
) => {
  try {
    const rooms = await prisma.room.findMany();
    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    });
  } catch (e: unknown) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

// POST a new room /api/rooms
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

type SingleRoomData = {
  success: boolean;
  error?: unknown;
  data?: Room;
};

// GET room details /api/rooms/[id]
const getSingleRoom = async (
  req: NextApiRequest,
  res: NextApiResponse<SingleRoomData>
) => {
  try {
    if (!req.query.id || isNaN(+req.query.id)) {
      res.status(400).json({
        success: false,
        error: {
          message: "Incorrect Id Format",
        },
      });
      return;
    }
    const id = +req.query.id;
    const room = await prisma.room.findUnique({
      where: {
        id,
      },
    });
    if (room) {
      res.status(200).json({
        success: true,
        data: room,
      });
      return;
    }

    // Room not found
    res.status(404).json({
      success: false,
      error: {
        message: "Not Found",
      },
    });
  } catch (e: unknown) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

// PUT room details /api/rooms/[id]
const updateSingleRoom = async (
  req: NextApiRequest,
  res: NextApiResponse<SingleRoomData>
) => {
  try {
    if (!req.query.id || isNaN(+req.query.id)) {
      res.status(400).json({
        success: false,
        error: {
          message: "Incorrect Id Format",
        },
      });
      return;
    }
    const id = +req.query.id;
    const newRoomDetails = req.body;
    console.log(newRoomDetails);
    const room = await prisma.room.update({
      where: {
        id,
      },
      data: newRoomDetails,
    });

    if (room) {
      res.status(200).json({
        success: true,
        data: room,
      });
      return;
    }

    // Room not found
    res.status(404).json({
      success: false,
      error: {
        message: "Not Found",
      },
    });
  } catch (e: unknown) {
    res.status(400).json({
      success: false,
      error: e,
    });
  }
};

export { allRooms, createRoom, getSingleRoom };
