import { randomUUID } from "crypto";
import ErrorHandler from "./ErrorHandler";

export const randomUsernameGenerator = (name: string): string => {
  return name.toLowerCase() + randomUUID().split("-")[0];
}


// field error
export const fieldError = (message: string)  => {
  return new ErrorHandler({status: 400, success: false, message });
};

