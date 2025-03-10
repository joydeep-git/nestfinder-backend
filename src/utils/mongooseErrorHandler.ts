import { StatusCode } from "../types";
import ErrorHandler from "./ErrorHandler";

export const mongooseErrorHandler = (err: any) => {
  if (err.code === 11000) {
    const key = Object.keys(err.keyValue)[0];
    return new ErrorHandler({
      status: StatusCode.CONFLICT,
      success: false,
      message: `${key.charAt(0).toUpperCase() + key.slice(1)} already exists!`,
    });
  }

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e: any) => e.message);
    return new ErrorHandler({
      status: StatusCode.BAD_REQUEST,
      success: false,
      message: errors.join(", "),
    });
  }

  if (err.name === "CastError") {
    return new ErrorHandler({
      status: StatusCode.BAD_REQUEST,
      success: false,
      message: `Invalid ${err.path}: ${err.value}`,
    });
  }

  return new ErrorHandler({
    status: StatusCode.INTERNAL_SERVER_ERROR,
    success: false,
    message: "Database Error",
  });
};
