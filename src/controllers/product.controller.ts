import { NextFunction, Request, Response } from "express";
import ProductSchema from "../schema.models/product.schema";
import ErrorHandler from "../utils/ErrorHandler";
import { mongooseErrorHandler } from "../utils/mongooseErrorHandler";
import { stringify } from "querystring";
import mongoose from "mongoose";



// create new product
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const newProduct = await ProductSchema.create(req.body);

        await newProduct.save();

        res.status(201).json({ success: true, message: "Product Created!", data: newProduct });

    } catch (err) {
        next(mongooseErrorHandler(err));
    }

}



// Get Single Product Details
export const getProductDetails = async (req: Request, res: Response, next: NextFunction) => {

    const { productId } = req.params;



};



// Update product details
export const updateProductDetails = async (req: Request, res: Response, next: NextFunction) => {

    const { id, productId } = req.params;

    try {
        const productDetails = await ProductSchema.findById(productId);

        if (productDetails?.userRef === id) {
            res.status(200).json({ success: true, message: "Product Details Fetched!", data: productDetails });
        } else {
            next(new ErrorHandler({ status: 403, success: false, message: "You are not permitted!" }));
        }

    } catch (err) {
        next(mongooseErrorHandler(err));
    }

};



// Delete single Product
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {

    const product = await ProductSchema.findById(req.params.productId);

    if ( req.user?._id == product?.userRef ) {
        try {
            await ProductSchema.findByIdAndDelete(req.params.productId);
        } catch (err) {
            next(mongooseErrorHandler(err));
        }
    } else {
        return next(new ErrorHandler({ status: 403, message: "You are not permitted!", success: false }));
    }
}
