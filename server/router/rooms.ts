import { Prisma } from "@prisma/client";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { prisma } from "../prisma";

const createRouter = () => {
  return trpc.router();
};

const ImageSchema = z.object({
  publicId: z.string(),
  url: z.string(),
});

const RESULTS_PER_PAGE = 5;
export const roomRouter = createRouter()
  .query("getAllRooms", {
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

      return prisma.$transaction([
        prisma.room.count(),
        prisma.room.findMany({
          where: {
            id: input.id,
            name: {
              contains: input.name, // replace null with undefined
            },
            address: {
              contains: input.location,
            },
          },
          include: {
            images: true,
          },
          ...paginationOptions,
        }),
      ]);
    },
  })
  .query("getSingleRoom", {
    input: z.object({
      id: z.number(),
    }),
    resolve({ input }) {
      return prisma.room.findUnique({
        where: {
          id: input.id,
        },
        include: {
          images: true,
        },
      });
    },
  })
  .mutation("postNewRoom", {
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
  })
  .mutation("putUpdateRoom", {
    input: z.object({
      id: z.number(),
      name: z.string().optional(),
      address: z.string().optional(),
      pricePerNight: z.number().optional(),
      description: z.string().optional(),
      guestCapacity: z.number().optional(),
      numOfBeds: z.number().optional(),
      internet: z.boolean().optional(),
      breakfast: z.boolean().optional(),
      airconditioned: z.boolean().optional(),
      petsAllowed: z.boolean().optional(),
      roomCleaning: z.boolean().optional(),
      ratings: z.number().optional(),
      numOfReviews: z.number().optional(),
      category: z.enum(["KING", "TWINS", "SINGLE"]).optional(),
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
      return prisma.room.update({
        where: {
          id: input.id,
        },
        data: {
          ...data,
        },
      });
    },
  })
  .mutation("deleteSingleRoom", {
    input: z.object({
      id: z.number(),
    }),
    resolve({ input }) {
      return prisma.room.delete({
        where: {
          id: input.id,
        },
      });
    },
  });
