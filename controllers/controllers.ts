import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, Room } from "@prisma/client";
import Error from "next/error";
import { prisma } from "../db";
import ErrorHandler from "../utils/errorHandler";
import { NextHandler } from "next-connect";

type AllRoomsData = {
  success: boolean;
  count?: number;
  rooms?: Room[];
  error?: unknown;
};

// GET all rooms /api/rooms
const allRooms = async (
  req: NextApiRequest,
  res: NextApiResponse<AllRoomsData>,
  next: NextHandler
) => {
  try {
    const rooms = await prisma.room.findMany();
    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    });
  } catch (e: unknown) {
    return next(new ErrorHandler("A server-side error has occured.", 500));
  }
};

// POST a new room /api/rooms
const createRoom = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  try {
    // cast the type
    const roomBody = req.body as Prisma.RoomCreateInput;

    if (!["KING", "TWINS", "SINGLE"].includes(roomBody.category)) {
      return next(new ErrorHandler("Invalid category", 400));
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
    return next(new ErrorHandler("A server-side error has occured.", 500));
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
  res: NextApiResponse<SingleRoomData>,
  next: NextHandler
) => {
  try {
    if (!req.query.id || isNaN(+req.query.id)) {
      return next(new ErrorHandler("Invalid Id Format.", 400));
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
    return next(new ErrorHandler("Room not found.", 404));
  } catch (e: unknown) {
    return next(new ErrorHandler("A server-side error has occured", 500));
  }
};

// PUT room details /api/rooms/[id]
const updateSingleRoom = async (
  req: NextApiRequest,
  res: NextApiResponse<SingleRoomData>,
  next: NextHandler
) => {
  try {
    if (!req.query.id || isNaN(+req.query.id)) {
      return next(new ErrorHandler("Invalid Id Format.", 400));
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
    return next(new ErrorHandler("Room not found", 404));
  } catch (e: unknown) {
    return next(new ErrorHandler("A server-side error has occured.", 500));
  }
};

// PUT room details /api/rooms/[id]
const deleteSingleRoom = async (
  req: NextApiRequest,
  res: NextApiResponse<SingleRoomData>,
  next: NextHandler
) => {
  try {
    if (!req.query.id || isNaN(+req.query.id)) {
      return next(new ErrorHandler("Invalid Id Format.", 400));
    }
    const id = +req.query.id;
    const newRoomDetails = req.body;
    console.log(newRoomDetails);
    const room = await prisma.room.delete({
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
    return next(new ErrorHandler("Room not found.", 404));
  } catch (e: unknown) {
    return next(new ErrorHandler("A server-side error has occured.", 500));
  }
};

export {
  allRooms,
  createRoom,
  getSingleRoom,
  updateSingleRoom,
  deleteSingleRoom,
};
