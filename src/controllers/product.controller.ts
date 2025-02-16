import { NextFunction, Request, Response } from "express";
import ProductSchema from "../schema.models/product.schema";
import ErrorHandler from "../utils/ErrorHandler";
import { mongooseErrorHandler } from "../utils/mongooseErrorHandler";



// create new product
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const newProduct = await ProductSchema.create(req.body);

        await newProduct.save();

        res.status(201).json({ success: true, message: "Registration Completed!", data: newProduct });

    } catch (err) {
        next(mongooseErrorHandler(err));
    }

}



// Get owner's all products
export const ownerAllProducts = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const allProducts = await ProductSchema.find({ userRef: req.user!._id }).lean();

        res.status(200).json({ success: true, message: `All Products of ${req.user!.firstName} fetched!`, data: allProducts });

    } catch (err) {
        return next(mongooseErrorHandler(err));
    }

};




// Get Single Product Details
export const getProductDetails = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const productDetails = await ProductSchema.findById(req.params.productId);

        res.status(200).json({ success: true, message: "Property Details Fetched!", data: productDetails });

    } catch (err) {
        next(mongooseErrorHandler(err));
    }

};



// Update product details
export const updateProductDetails = async (req: Request, res: Response, next: NextFunction) => {

    const { id, productId } = req.params;

    try {
        const productDetails = await ProductSchema.findById(productId);

        if (String(productDetails?.userRef) === id) {
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

    try {
        const product = await ProductSchema.findById(req.params.productId);

        if (!product) {
            return next(new ErrorHandler({ status: 404, message: "Product not found!", success: false }));
        }

        if (String(product.userRef) !== String(req.user?._id)) {
            return next(new ErrorHandler({ status: 403, message: "You are not permitted!", success: false }));
        }

        const data = await ProductSchema.findByIdAndDelete(req.params.productId);

        res.status(200).json({ success: true, message: "Product Deleted Successfully!", data });

    } catch (err) {
        next(mongooseErrorHandler(err));
    }
};



// get all products and apply filters
export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {

    const { search, furnished, offer, order, parking, sort, type } = req.params;

    try{

    } catch(err) {
        next(mongooseErrorHandler(err));
    }

}

