import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../prisma";

const createRouter = () => {
  return trpc.router();
};

const RESULTS_PER_PAGE = 5;
const getAllRooms = createRouter().query("getAllRooms", {
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

export default getAllRooms;
