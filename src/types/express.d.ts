import { UserDetailsType } from ".";

declare global {
  namespace Express {
    interface Request {
      user: UserDetailsType;
    }
  }
}
