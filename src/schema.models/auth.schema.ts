import mongoose, { Model } from "mongoose";
import { AuthModelType } from "../types/index.types";

const auth = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
      validate: {
        validator: (v: number) => v.toString().length === 10,
        message: "Please enter a valid 10-digit number",
      },
      unique: true,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  },
  { timestamps: true }
);

const AuthSchema: Model<AuthModelType> = mongoose.model<AuthModelType>("auth", auth);

export default AuthSchema;
