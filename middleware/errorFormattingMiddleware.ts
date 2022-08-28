import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import ErrorHandler from "../utils/errorHandler";

export default (
  err: ErrorHandler,
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    success: false,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
