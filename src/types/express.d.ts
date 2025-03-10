import { UserDetailsType } from "./index.types";

declare global {
  namespace Express {
    interface Request {
      user: UserDetailsType;
    }
  }
}
