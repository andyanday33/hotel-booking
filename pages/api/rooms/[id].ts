import nc from "next-connect";
import {
  getSingleRoom,
  updateSingleRoom,
} from "../../../controllers/controllers";

const handler = nc();

handler.get(getSingleRoom);
handler.put(updateSingleRoom);

export default handler;
