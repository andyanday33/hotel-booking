import nc from "next-connect";
import { allRooms, createRoom } from "../../../controllers/controllers";

const handler = nc();

handler.get(allRooms);
handler.post(createRoom);

export default handler;
