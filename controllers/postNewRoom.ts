import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";

const createRouter = () => {
  return trpc.router();
};

const ImageSchema = z.object({
  publicId: z.string(),
  url: z.string(),
});

const postNewRoom = createRouter().mutation("postNewRoom", {
  input: z.object({
    name: z.string(),
    address: z.string(),
    pricePerNight: z.number().optional(),
    description: z.string(),
    guestCapacity: z.number(),
    numOfBeds: z.number(),
    internet: z.boolean(),
    breakfast: z.boolean(),
    airconditioned: z.boolean(),
    petsAllowed: z.boolean(),
    roomCleaning: z.boolean(),
    ratings: z.number().optional(),
    numOfReviews: z.number().optional(),
    category: z.enum(["KING", "TWINS", "SINGLE"]),
    creatorId: z.string().optional(),
    createdAt: z.string().optional(),
    images: z.array(ImageSchema).optional(),
  }),
  resolve({ input }) {
    const images = input?.images as Prisma.RoomImageCreateManyInput[];
    let { ...data } = input as Prisma.RoomCreateInput;
    data.images = {
      createMany: {
        data: images,
        skipDuplicates: true,
      },
    };
    return prisma.room.create({
      data,
    });
  },
});

export default postNewRoom;
