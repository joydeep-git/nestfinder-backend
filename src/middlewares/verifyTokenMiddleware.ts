import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { mongooseErrorHandler } from "../utils/mongooseErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import AuthSchema from "../schema.models/auth.schema";

const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const token: string = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return next(new ErrorHandler({ success: false, status: 403, message: "Please login!" }));
        }

        // Verify token
        const secretKey = process.env.JWT_SECRET_KEY!;

        const decoded = jwt.verify(token, secretKey) as JwtPayload;

        if (!decoded?.id) {
            return next(new ErrorHandler({ success: false, status: 401, message: "Invalid token!" }));
        }

        // Find user
        const user = await AuthSchema.findById(decoded.id).select("-password").lean();

        if (!user) {
            return next(new ErrorHandler({ success: false, status: 404, message: "User not found!" }));
        }

        if (req.params.id != user._id) {
            return next(new ErrorHandler({ status: 403, message: "Unauthenticated!" }));
        }

        req.user = user;

        next();

    } catch (err: any) {

        if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
            return next(new ErrorHandler({ success: false, status: 401, message: "Invalid or expired token!" }));
        }

        return next(mongooseErrorHandler(err));
    }

}


export default verifyTokenMiddleware;