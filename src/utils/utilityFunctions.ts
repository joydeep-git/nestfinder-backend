import { randomUUID } from "crypto";
import { StatusCode } from "../types";
import ErrorHandler from "./ErrorHandler";

export const randomUsernameGenerator = (name: string): string => {
  return name.toLowerCase() + randomUUID().split("-")[0];
}


// field error
export const fieldError = (message: string)  => {
  return new ErrorHandler({status: StatusCode.BAD_REQUEST, success: false, message });
};

