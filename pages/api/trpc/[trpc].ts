import { prisma } from "../../../prisma";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";

export const appRouter = trpc.router().query("getAllRooms", {
  input: z.object({
    name: z.string().nullish(),
    location: z.string().nullish(),
    pricePerNight: z.string().nullish(),
    description: z.string().nullish(),
    guestCapacity: z.string().nullish(),
    numOfBeds: z.string().nullish(),
    internet: z.string().nullish(),
    breakfast: z.string().nullish(),
    airconditioned: z.string().nullish(),
    petsAllowed: z.string().nullish(),
    roomCleaning: z.string().nullish(),
    ratings: z.string().nullish(),
    numOfReviews: z.string().nullish(),
    category: z.string().nullish(),
    creatorId: z.string().nullish(),
    createdAt: z.string().nullish(),
  }),
  resolve({ input }) {
    return prisma.room.findMany({
      where: {
        name: {
          contains: input.name || undefined, // replace null with undefined
        },
        address: {
          contains: input.location || undefined,
        },
      },
    });
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
