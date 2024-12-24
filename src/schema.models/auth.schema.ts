import mongoose, { Model } from "mongoose";
import { AuthModelType } from "../types/index.types.ts";


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
      validate: {
        validator: (v: string) => /^\S+@\S+\.\S+$/.test(v),
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^\d{10}$/.test(v),
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
