import nc from "next-connect";
import { allRooms } from "../../../controllers/controllers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = nc();

handler.get(allRooms);

export default handler;
