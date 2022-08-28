import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import {
  deleteSingleRoom,
  getSingleRoom,
  updateSingleRoom,
} from "../../../controllers/controllers";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(getSingleRoom);
handler.put(updateSingleRoom);
handler.delete(deleteSingleRoom);

export default handler;
