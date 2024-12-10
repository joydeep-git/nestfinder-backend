import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import errorMiddleware from "../middlewares/errorMiddleware";
import bcrypt from "bcryptjs";
import AuthSchema from "../schema.models/auth.schema";
import { randomUsernameGenerator } from "../utils/utilityFunctions.ts";


export const signUpController = async (req: Request, res: Response, next: NextFunction) => {

  const { firstName, lastName, email, password, userName, number } = req.body;


  // Checking Field data
  if (!firstName) return next(new ErrorHandler({ status: 400, message: "First Name Required" }));
  if (!lastName) return next(new ErrorHandler({ status: 400, message: "Last Name Required" }));
  if (!email) return next(new ErrorHandler({ status: 400, message: "Email Required" }));
  if (!password) return next(new ErrorHandler({ status: 400, message: "Password Required" }));
  if (!number) return next(new ErrorHandler({ status: 400, message: "Phone Number Required" }));


  const hashedPass: string = await bcrypt.hash(password, 10);

  try {
    const user = new AuthSchema({
      firstName,
      lastName,
      email,
      password: hashedPass,
      username: userName ?? randomUsernameGenerator(firstName),
      number
    });

    await user.save();

    res.status(201).json({message: "User Created!", data: user});

  } catch (err: unknown) {

    next(new ErrorHandler({ status: 500, message: JSON.stringify(err) }));

  }

}


export const signInController = (req: Request, res: Response, next: NextFunction) => {

}


export const googleAuthController = (req: Request, res: Response, next: NextFunction) => {

}


export const signOutController = (req: Request, res: Response, next: NextFunction) => {

}
