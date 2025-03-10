import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AuthSchema from "../mongodbSchema/authSchema";
import { StatusCode, UserDataType } from "../types";
import ErrorHandler from "../utils/ErrorHandler";
import { mongooseErrorHandler } from "../utils/mongooseErrorHandler";
import { fieldError, randomUsernameGenerator } from "../utils/utilityFunctions";


class AuthController {


  // signUp method
  static async signUp(req: Request, res: Response, next: NextFunction) {


    const { firstName, lastName, email, password, number } = req.body;

    // Checking Field data

    if (!firstName) return next(fieldError("First Name Required!"));

    if (!lastName) return next(fieldError("Last Name Required!"));

    if (!email) return next(fieldError("Email Required!"));

    if (!password) return next(fieldError("Password Required!"));

    if (!number) return next(fieldError("Number Required!"));

    if (!/^\d{10}$/.test(number)) return next(fieldError("Enter a Valid Number"));



    try {

      const hashedPass: string = await bcrypt.hash(password, 10);

      const user = new AuthSchema({
        firstName,
        lastName,
        email,
        password: hashedPass,
        username: randomUsernameGenerator(firstName),
        number,
        avatar: "https://firebasestorage.googleapis.com/v0/b/nest-finder-da0f4.appspot.com/o/image.png?alt=media&token=a46aacfe-3829-489b-8f4b-429a7ec87695",
      });

      await user.save();

      const { password: _, ...userData } = user.toObject();

      res.status(StatusCode.OK).json({
        success: true,
        message: "Account registered successfully!",
        data: userData,
      });
    } catch (err: any) {
      return next(mongooseErrorHandler(err));
    }

  }



  // signIn method
  static async signIn(req: Request, res: Response, next: NextFunction) {

    const { email, password } = req.body;

    if (!email) return next(fieldError("Email Required!"));

    if (!password) return next(fieldError("Password Required!"));

    try {

      const existingUser: UserDataType | null = await AuthSchema.findOne({ email });

      if (!existingUser) {

        return next(new ErrorHandler({ status: StatusCode.UNAUTHORIZED, success: false, message: "No user found!" }));

      } else {

        const validatePassword = await bcrypt.compare(password, existingUser.password);

        if (!validatePassword) {

          return next(new ErrorHandler({ status: StatusCode.UNAUTHORIZED, success: false, message: "Wrong password!" }));

        } else {

          const secretKey = process.env.JWT_SECRET_KEY!;

          const token = jwt.sign({ id: existingUser._id }, secretKey);

          const { password, ...userInfo } = existingUser._doc;

          res
            .status(StatusCode.OK)
            .cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              maxAge: 24 * 60 * 60 * 1000, // 24 hour
              sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            })
            .json({
              success: true,
              message: "Logged in successfully!",
              data: userInfo,
            });

        }

      }

    } catch (err) {

      return next(mongooseErrorHandler(err));

    }

  }



  // SignOut method
  static async signOut(req: Request, res: Response, next: NextFunction) {

    const token: string = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(fieldError("No active session found!"));
    }

    try {
      res.clearCookie("token").status(StatusCode.OK).json({ status: StatusCode.OK, message: "Logged Out!", success: true });
    } catch (err) {
      return next(new ErrorHandler({ status: StatusCode.NOT_FOUND, success: false, message: "Unable to logout!" }))
    }

  }



  // verifyToken method and middleWare
  static async verifyToken(req: Request, res: Response, next: NextFunction) {

    try {

      const token: string = req.cookies.token || req.headers.authorization?.split(" ")[1];

      if (!token) {
        return next(new ErrorHandler({ success: false, status: StatusCode.FORBIDDEN, message: "Please login!" }));
      }

      // Verify token
      const secretKey = process.env.JWT_SECRET_KEY!;

      const decoded = jwt.verify(token, secretKey) as JwtPayload;

      if (!decoded?.id) {
        return next(new ErrorHandler({ success: false, status: StatusCode.UNAUTHORIZED, message: "Invalid token!" }));
      }

      // Find user
      const user = await AuthSchema.findById(decoded.id).select("-password").lean();

      if (!user) {
        return next(new ErrorHandler({ success: false, status: StatusCode.NOT_FOUND, message: "User not found!" }));
      }

      res.status(StatusCode.OK).json({
        success: true,
        message: "User data fetched successfully.",
        data: user,
      });

    } catch (err: any) {

      if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
        return next(new ErrorHandler({ success: false, status: StatusCode.UNAUTHORIZED, message: "Invalid or expired token!" }));
      }

      return next(mongooseErrorHandler(err));
    }

  }

}

export default AuthController;
