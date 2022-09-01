import { prisma } from "../../../prisma";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const createRouter = () => {
  return trpc.router();
};

const RESULTS_PER_PAGE = 5;
const allRooms = createRouter().query("getAllRooms", {
  input: z.object({
    id: z.number().optional(),
    name: z.string().optional(),
    location: z.string().optional(),
    pricePerNight: z.string().optional(),
    description: z.string().optional(),
    guestCapacity: z.string().optional(),
    numOfBeds: z.string().optional(),
    internet: z.string().optional(),
    breakfast: z.string().optional(),
    airconditioned: z.string().optional(),
    petsAllowed: z.string().optional(),
    roomCleaning: z.string().optional(),
    ratings: z.string().optional(),
    numOfReviews: z.string().optional(),
    category: z.string().optional(),
    creatorId: z.string().optional(),
    createdAt: z.string().optional(),
    page: z.number().optional(),
  }),
  resolve({ input }) {
    const paginationOptions = input.page
      ? {
          skip: (input.page - 1) * RESULTS_PER_PAGE,
          take: RESULTS_PER_PAGE,
        }
      : ({
          take: RESULTS_PER_PAGE,
        } as { skip?: number; take: number });

    return prisma.room.findMany({
      where: {
        id: input.id,
        name: {
          contains: input.name, // replace null with undefined
        },
        address: {
          contains: input.location,
        },
      },
      ...paginationOptions,
    });
  },
});

const ImageSchema = z.object({
  publicId: z.string(),
  url: z.string(),
});

const createRoom = createRouter().mutation("postNewRoom", {
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

const appRouter = createRouter()
  .merge("rooms.", allRooms)
  .merge("rooms.", createRoom);

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
