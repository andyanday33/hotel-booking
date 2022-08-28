import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { ControllerFunctionType } from "../controllers/controllers";

export default (func: ControllerFunctionType) =>
  async (req: NextApiRequest, res: NextApiResponse<any>, next: NextHandler) =>
    Promise.resolve(func(req, res, next)).catch(next);
