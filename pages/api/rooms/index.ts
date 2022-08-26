import nc from "next-connect";
import { allRooms, createRoom } from "../../../controllers/controllers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = nc();

handler.get(allRooms);
handler.post(createRoom);

export default handler;
