import { NextFunction, Request, Response } from "express";
import { mongooseErrorHandler } from "../utils/mongooseErrorHandler.ts";
import ErrorHandler from "../utils/ErrorHandler.ts";
import AuthSchema from "../schema.models/auth.schema.ts";


// Update User
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
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
          status: 401,
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

    res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    next(mongooseErrorHandler(error));
  }
};


// Update profile picture
export const updateProfilePicture = async (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;

  try {
    // Update avatar
    const updatedUser = await AuthSchema.findByIdAndUpdate(
      req.user?._id,
      { $set: { avatar } },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    next(mongooseErrorHandler(error));
  }
}



// Change Password
// export const changePassword = (req: Request, res: Response, next: NextFunction) => {

// };




// Delete Account
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {

  try {

    const deletedUser = await AuthSchema.findByIdAndDelete(req.user?._id).select("-password");

    res.clearCookie("token").status(200).json({ success: true, message: "Account Deleted Successfully!", status: 201, data: deletedUser });

  } catch (err) {

    return next(mongooseErrorHandler(err));

  }
}
