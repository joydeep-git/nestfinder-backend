import jwt, { JwtPayload } from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler";
import { Request, Response, NextFunction } from "express";


export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  
  const token: string = req.cookies.token;

  if (!token) throw new ErrorHandler({ status: 401, message: "Unauthorized User! Please Sign In." });


  jwt.verify(token, process.env.JWT_SECRET_KET as string, (err, user) => {
    if (err) return next(new ErrorHandler({ status: 403, message: "FORBIDDEN" }));

    req.user = user;
    next();
  })

};
