import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import {
  deleteSingleRoom,
  getSingleRoom,
  updateSingleRoom,
} from "../../../controllers/controllers";
import onError from "../../../middleware/errorMiddleware";

const handler = nc<NextApiRequest, NextApiResponse>({ onError });

handler.get(getSingleRoom);
handler.put(updateSingleRoom);
handler.delete(deleteSingleRoom);

export default handler;
