import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { StatusCode } from "../types/index.types";

const validProductChecker = (req: Request, res: Response, next: NextFunction) => {
    
    const { regularPrice, discountAmount, bathrooms, bedrooms } = req.body;

    if (Object.entries(req.body).some(([key, value]) => value === "" || value === null || value === undefined)) {
        return next(new ErrorHandler({ success: false, status: StatusCode.BAD_REQUEST, message: "All fields are required!" }));
    }

    if (isNaN(regularPrice) || isNaN(discountAmount) || isNaN(bathrooms) || isNaN(bedrooms)) {
        return next(new ErrorHandler({ status: StatusCode.BAD_REQUEST, success: false, message: "Invalid numeric values!" }));
    }

    if (discountAmount < 0 || discountAmount >= regularPrice || regularPrice === 0) {
        return next(new ErrorHandler({ status: StatusCode.BAD_REQUEST, success: false, message: "Invalid Pricing!" }));
    }

    if (bathrooms <= 0 || bedrooms <= 0) {
        return next(new ErrorHandler({ status: StatusCode.BAD_REQUEST, success: false, message: "Invalid property: Must have at least 1 bathroom & 1 bedroom!" }));
    }

    next();
};

export default validProductChecker;
