import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

const errorMiddleware = (
  err: ErrorHandler | Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof ErrorHandler ? err.statusCode : 500;
  const message = err instanceof ErrorHandler ? err.message : "Internal Server Error";

  res.status(statusCode).json({
    success: err instanceof ErrorHandler ? err.success : false,
    statusCode,
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack || "No stack trace available",
  });
};

export default errorMiddleware;
