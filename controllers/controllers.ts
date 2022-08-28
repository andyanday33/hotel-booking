import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, Room } from "@prisma/client";
import Error from "next/error";
import { prisma } from "../db";
import ErrorHandler from "../utils/errorHandler";
import { NextHandler } from "next-connect";

export type ControllerFunctionType = (
  req: NextApiRequest,
  res: NextApiResponse<AllRoomsData | SingleRoomData>,
  next: NextHandler
) => Promise<void>;

type AllRoomsData = {
  success: boolean;
  count?: number;
  rooms?: Room[];
  error?: unknown;
};

type SingleRoomData = {
  success: boolean;
  error?: unknown;
  data?: Room;
};

// GET all rooms /api/rooms
const allRooms: ControllerFunctionType = async (req, res, next) => {
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
const createRoom: ControllerFunctionType = async (req, res, next) => {
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
      data: newRoom,
    });
  } catch (e: unknown) {
    console.log(e);
    return next(new ErrorHandler("A server-side error has occured.", 500));
  }
};

// GET room details /api/rooms/[id]
const getSingleRoom: ControllerFunctionType = async (req, res, next) => {
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
const updateSingleRoom: ControllerFunctionType = async (req, res, next) => {
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
const deleteSingleRoom: ControllerFunctionType = async (req, res, next) => {
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
