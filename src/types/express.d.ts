import {UserDetailsType} from "./index.types.ts";

declare global {
  namespace Express {
    interface Request {
      user?: UserDetailsType;
    }
  }
}
