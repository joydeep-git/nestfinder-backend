import { NextFunction, Request, Response } from "express";


export const signUpController = (req: Request, res: Response, next: NextFunction) => {
  res.json({Message: "Sign Up Controller"})
}
