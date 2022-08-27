import nc from "next-connect";
import { getSingleRoom } from "../../../controllers/controllers";

const handler = nc();

handler.get(getSingleRoom);

export default handler;
