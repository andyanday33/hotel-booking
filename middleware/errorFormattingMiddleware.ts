import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import ErrorHandler from "../utils/errorHandler";

export default (
  err:
    | ErrorHandler
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientValidationError,
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  if (err instanceof ErrorHandler) {
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(400).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack,
      code: err.code,
    });
  }
  if (err instanceof Prisma.PrismaClientValidationError) {
    // Missing field

    // Process message
    let message = err.message.split("\n");
    // Take the sentence "Argument x for data.x is missing"
    let sentence = message[message.length - 4];
    // Take the name of x in the sentence
    let missingArg = sentence.split(" ")[1];

    res.status(400).json({
      success: false,
      error: err,
      message: `Property "${missingArg}" is missing in request body.`,
      stack: err.stack,
    });
  }
};
