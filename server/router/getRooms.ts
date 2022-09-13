import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../prisma";
import { createRouter } from "./context";

const RESULTS_PER_PAGE = 5;
export const getRoomsRouter = createRouter()
  .query("getAllRooms", {
    input: z.object({
      name: z.string().optional(),
      address: z.string().optional(),
      minPrice: z.number().optional(),
      maxPrice: z.number().optional(),
      beds: z.number().optional(),
      guests: z.number().optional(),
      minRating: z.number().optional(),
      guestCapacity: z.string().optional(),
      numOfBeds: z.string().optional(),
      creatorEmail: z.string().optional(),
      features: z.string().array().optional(),
      category: z.enum(["KING", "TWINS", "SINGLE", ""]).optional(),
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

      type categoryType = "KING" | "TWINS" | "SINGLE";

      const features = new Set(input.features);

      const queryOptions = {
        where: {
          name: {
            contains: input?.name,
          },
          address: {
            contains: input?.address,
          },
          pricePerNight: {
            lte: input?.maxPrice || Number.MAX_VALUE,
            gte: input?.minPrice,
          },
          numOfBeds: {
            gte: input?.beds,
          },
          guestCapacity: {
            gte: input?.guests,
          },
          ratings: {
            gte: input?.minRating,
          },
          category:
            input?.category === ""
              ? undefined
              : (input.category as categoryType),
          breakfast: {
            equals: features.has("breakfast") ? true : undefined,
          },
          internet: {
            equals: features.has("internet") ? true : undefined,
          },
          airconditioned: {
            equals: features.has("air conditioning") ? true : undefined,
          },
          petsAllowed: {
            equals: features.has("pets allowed") ? true : undefined,
          },
          roomCleaning: {
            equals: features.has("room cleaning") ? true : undefined,
          },
          creator: input.creatorEmail
            ? {
                email: {
                  equals: input?.creatorEmail,
                },
              }
            : undefined,
        },
      };

      return prisma.$transaction([
        prisma.room.count({
          ...queryOptions,
        }),
        prisma.room.findMany({
          ...queryOptions,
          select: {
            id: true,
            name: true,
            ratings: true,
            reviews: true,
            numOfReviews: true,
            address: true,
            breakfast: true,
            pricePerNight: true,
            internet: true,
            airconditioned: true,
            petsAllowed: true,
            roomCleaning: true,
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
  });
