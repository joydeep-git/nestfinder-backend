import { NextFunction, Request, Response } from "express";
import { mongooseErrorHandler } from "../utils/mongooseErrorHandler.ts";
import ErrorHandler from "../utils/ErrorHandler.ts";

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {

  // if (req?.user?.id !== req.params.id) return next(new ErrorHandler({ status: 401, message: "Unauthenticated!" }));

  try {

  } catch (err) {
    return next(mongooseErrorHandler(err));
  }

};