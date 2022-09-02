import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../prisma";

const createRouter = () => {
  return trpc.router();
};

const getSingleRoom = createRouter().query("getSingleRoom", {
  input: z.object({
    id: z.number(),
  }),
  resolve({ input }) {
    return prisma.room.findUnique({
      where: {
        id: input.id,
      },
    });
  },
});

export default getSingleRoom;
