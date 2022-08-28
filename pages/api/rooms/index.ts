import nc from "next-connect";
import { allRooms, createRoom } from "../../../controllers/controllers";
import onError from "../../../middleware/errorFormattingMiddleware";

const handler = nc({ onError });

handler.get(allRooms);
handler.post(createRoom);

export default handler;
