import { NextFunction, Request, Response } from "express";


export const createProduct = (req: Request, res: Response, next: NextFunction) => {
  res.json({Message: "Sign Up Controller"})
}
