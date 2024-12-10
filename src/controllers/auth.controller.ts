import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import AuthSchema from "../schema.models/auth.schema";
import { randomUsernameGenerator } from "../utils/utilityFunctions.ts";
import { AuthModelType } from "../types/index.types.ts";
import ErrorHandler from "../utils/ErrorHandler";
import { mongooseErrorHandler } from "../utils/mongooseErrorHandler.ts";


// SignUp Controller

export const signUpController = async ( req: Request, res: Response, next: NextFunction ) => {
  const { firstName, lastName, email, password, userName, number, avatar } = req.body;

  // Checking Field data
  if (!firstName)
    return next(new ErrorHandler({ status: 400, message: "First Name Required" }));
  if (!lastName)
    return next(new ErrorHandler({ status: 400, message: "Last Name Required" }));
  if (!email)
    return next(new ErrorHandler({ status: 400, message: "Email Required" }));
  if (!password)
    return next(new ErrorHandler({ status: 400, message: "Password Required" }));
  if (!number)
    return next(new ErrorHandler({ status: 400, message: "Phone Number Required" }));


  const hashedPass: string = await bcrypt.hash(password, 10);


  try {
    const user = new AuthSchema({
      firstName,
      lastName,
      email,
      password: hashedPass,
      username: userName ?? randomUsernameGenerator(firstName),
      number,
      avatar,
    });

    await user.save();

    const { password: _, ...userData } = user.toObject();

    res.status(201).json({
      message: "Account registered successfully!",
      data: userData,
    });
  } catch (err: any) {

    if (err.code === 11000) return next(mongooseErrorHandler(err));

    next(new ErrorHandler({ status: 500, message: "Internal Server Error" }));
  }
};



export const signInController = (req: Request, res: Response, next: NextFunction) => {

}


export const googleAuthController = (req: Request, res: Response, next: NextFunction) => {

}


export const signOutController = (req: Request, res: Response, next: NextFunction) => {

}
