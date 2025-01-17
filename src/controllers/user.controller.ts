import { NextFunction, Request, Response } from "express";
import { mongooseErrorHandler } from "../utils/mongooseErrorHandler.ts";
import ErrorHandler from "../utils/ErrorHandler.ts";
import AuthSchema from "../schema.models/auth.schema.ts";

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {

  // if (req?.user?.id !== req.params.id) return next(new ErrorHandler({ status: 401, message: "Unauthenticated!" }));

  try {

  } catch (err) {
    return next(mongooseErrorHandler(err));
  }

};


export const deleteUserController = async (req: Request, res: Response, next: NextFunction)=> {
  const { id } = req.body;

  const user = await AuthSchema.findByIdAndDelete(id);

  res.status(200).json(user);
}