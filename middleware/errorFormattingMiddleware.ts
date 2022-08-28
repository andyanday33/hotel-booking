import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import ErrorHandler from "../utils/errorHandler";

/**
 * Responsible for formatting errors to return meaningful errors to the front-end
 */
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
    // Check and process error code
    res.status(400).json({
      success: false,
      error: err,
      message: err.message,
      stack: err.stack,
      code: err.code,
    });
  }
  if (err instanceof Prisma.PrismaClientValidationError) {
    // Missing field error

    // Process error message -------------------------------
    let message = err.message.split("\n");
    console.log(message);
    // Take the sentences "Argument x for data.x is missing"
    const errorSentenceRegex = /Argument .* for data\..* is missing\./g;
    const missingArgs: string[] = [];
    message.forEach((sentence) => {
      if (sentence.match(errorSentenceRegex)) {
        // Take x from array "[Argument, x, for, data.x, is, missing]"
        missingArgs.push(sentence.split(" ")[1]);
      }
    });

    const responseMessage =
      missingArgs.length === 1
        ? `Property ${missingArgs[0]} is missing from the request body.`
        : `Properties ${missingArgs.toString()} are missing from the request body`;
    // END Processing error message ------------------------
    res.status(400).json({
      success: false,
      error: err,
      message: responseMessage,
      stack: err.stack,
    });
  }
};
