import mongoose, { Model } from "mongoose";
import { AuthModelType } from "../types/index.types";

const auth = new mongoose.Schema(
  {
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
    avatar: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  },
  { timestamps: true }
);

const AuthSchema: Model<AuthModelType> = mongoose.model<AuthModelType>("Auth", auth);

export default AuthSchema;
