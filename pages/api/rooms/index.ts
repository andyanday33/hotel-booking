import nc from "next-connect";
import { allRooms } from "../../../controllers/controllers";

const handler = nc();

handler.get(allRooms);

export default handler;
