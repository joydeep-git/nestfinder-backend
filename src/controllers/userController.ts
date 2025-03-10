import { NextFunction, Request, Response } from "express";
import AuthSchema from "../mongodbSchema/authSchema";
import ProductSchema from "../mongodbSchema/productSchema";
import { StatusCode } from "../types";
import ErrorHandler from "../utils/ErrorHandler";
import { mongooseErrorHandler } from "../utils/mongooseErrorHandler";



class UserController {


  // fetch user details
  static async getUser(req: Request, res: Response, next: NextFunction) {

    try {
      const user = await AuthSchema.findById(req.params.id).select("-password").lean();

      if (user) {
        res.status(StatusCode.OK).json({ success: true, message: "User Details Fetched!", data: user });
      } else {
        return next(new ErrorHandler({ status: StatusCode.NOT_FOUND, message: "User not found!", success: false }));
      }

    } catch (error) {
      next(mongooseErrorHandler(error));
    }

  }



  // update user details
  static async updateUser(req: Request, res: Response, next: NextFunction) {

    const { firstName, lastName, number, username } = req.body;

    try {
      // Check if another user has the same username or number
      const existingUser = await AuthSchema.findOne({

        $or: [{ username }, { number }], // username or number, anyone

        _id: { $ne: req.user?._id }, // dont count current user

      }).select("-password");

      if (existingUser) {
        return next(
          new ErrorHandler({
            status: StatusCode.FORBIDDEN,
            message: "User already exists with same credentials.",
            success: false,
          })
        );
      }

      // Update user details
      const updatedUser = await AuthSchema.findByIdAndUpdate(
        req.user?._id,
        { $set: { firstName, lastName, number, username } },
        { new: true }
      ).select("-password");

      res.status(StatusCode.OK).json({
        success: true,
        message: "Profile updated successfully!",
        data: updatedUser,
      });

    } catch (error) {
      next(mongooseErrorHandler(error));
    }

  }




  // update profile picture
  static async updateProfilePicture(req: Request, res: Response, next: NextFunction) {

    const { avatar } = req.body;

    try {
      // Update avatar
      const updatedUser = await AuthSchema.findByIdAndUpdate(
        req.user?._id,
        { $set: { avatar } },
        { new: true }
      ).select("-password");

      res.status(StatusCode.OK).json({
        success: true,
        message: "Profile updated successfully!",
        data: updatedUser,
      });
    } catch (error) {
      next(mongooseErrorHandler(error));
    }

  }




  // delete user profile and registered properties
  static async deleteUser(req: Request, res: Response, next: NextFunction) {

    try {

      const deletedUser = await AuthSchema.findByIdAndDelete(req.user?._id).select("-password").lean();

      if(!deletedUser) return next(new ErrorHandler({status: StatusCode.NOT_FOUND, success: false, message: "No user found!"}));

      if(deletedUser?._id) {

        // delete registered properties
         await ProductSchema.deleteMany({ userRef: deletedUser._id });

      }

      res.clearCookie("token").status(StatusCode.OK).json({ success: true, message: "Account Deleted Successfully!", status: StatusCode.OK, data: deletedUser });

    } catch (err) {

      return next(mongooseErrorHandler(err));

    }

  }


}

export default UserController;
