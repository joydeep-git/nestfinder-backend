import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import AuthSchema from "../schema.models/auth.schema.ts";
import { randomUsernameGenerator } from "../utils/utilityFunctions.ts";
import { AuthModelType, UserDataType } from "../types/index.types.ts";
import ErrorHandler from "../utils/ErrorHandler.ts";
import { mongooseErrorHandler } from "../utils/mongooseErrorHandler.ts";
import jwt from "jsonwebtoken";


// User SignUp
export const signUpController = async (req: Request, res: Response, next: NextFunction) => {


  const { firstName, lastName, email, password, username, number, avatar } = req.body;

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
  if(!username)
    return next(new ErrorHandler({status: 400, message: "Username Required"}));


  try {

    const hashedPass: string = await bcrypt.hash(password, 10);

    const user = new AuthSchema({
      firstName,
      lastName,
      email,
      password: hashedPass,
      username: username ?? randomUsernameGenerator(firstName),
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
    return next(mongooseErrorHandler(err));
  }
};


// User Login
export const signInController = async (req: Request, res: Response, next: NextFunction) => {

  const { email, password } = req.body;

  try {

    const existingUser: UserDataType | null = await AuthSchema.findOne({ email });

    if (!existingUser) {
      return next(new ErrorHandler({ status: 401, message: "No user found!" }))
    } else {

      const validatePassword = await bcrypt.compare(password, existingUser.password);

      if (!validatePassword) {

        return next(new ErrorHandler({ status: 404, message: "Wrong password!" }));

      } else {

        const secretKey = process.env.JWT_SECRET_KEY || "secret_key";

        const token = jwt.sign({ id: existingUser._id }, secretKey);

        const { password, ...userInfo } = existingUser._doc;

        res
          .status(200)
          .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000, // 24 hour
            sameSite: "strict"
          })
          .json({
            message: "Logged In!",
            user: userInfo
          });

      }

    }

  } catch (err) {
    return next(mongooseErrorHandler(err));
  }

}


// User SignOut
export const signOutController = (req: Request, res: Response, next: NextFunction) => {

  if (!req.cookies.token) {
    return next(new ErrorHandler({ status: 400, message: "No active session found!" }));
  }

  try {
    res.clearCookie("token").status(200).json({ message: "User Logged Out" });
  } catch (err) {
    return next(new ErrorHandler({status: 404, message: "Unable to logout!"}))
  }

}
