import { NextFunction, Request, Response } from "express";
import ProductSchema from "../schema.models/product.schema";
import ErrorHandler from "../utils/ErrorHandler";
import { mongooseErrorHandler } from "../utils/mongooseErrorHandler";



class ProductController {


    // register new property
    static async createProduct(req: Request, res: Response, next: NextFunction) {

        try {
            const newProduct = await ProductSchema.create(req.body);

            await newProduct.save();

            res.status(201).json({ success: true, message: "Registration Completed!", data: newProduct });

        } catch (err) {
            next(mongooseErrorHandler(err));
        }

    }



    // get all registered property  of a ownner
    static async ownerAllProducts(req: Request, res: Response, next: NextFunction) {

        try {

            const allProducts = await ProductSchema.find({ userRef: req.user!._id }).lean();

            res.status(200).json({ success: true, message: `All Products of ${req.user!.firstName} fetched!`, data: allProducts });

        } catch (err) {
            return next(mongooseErrorHandler(err));
        }

    }



    // get details of any property
    static async getProductDetails(req: Request, res: Response, next: NextFunction) {

        try {
            const productDetails = await ProductSchema.findById(req.params.productId);

            if (!productDetails) {
                return next(new ErrorHandler({ status: 404, success: false, message: "Invalid ID!" }));
            }

            res.status(200).json({ success: true, message: "Property Details Fetched!", data: productDetails });

        } catch (err) {
            next(mongooseErrorHandler(err));
        }

    }




    // update any property details
    static async updateProductDetails(req: Request, res: Response, next: NextFunction) {

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

    }




    // delete a single property
    static async deleteProduct(req: Request, res: Response, next: NextFunction) {

        try {
            const product = await ProductSchema.findById(req.params.productId).lean();

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

    }




    // property search results with filters
    static async getAllProducts(req: Request, res: Response, next: NextFunction) {

        const { search, furnished, offer, order, parking, sort, type } = req.params;

        try {

            const properties = await ProductSchema.find().lean();

            res.status(201).json({success: true, status: 200, message: "All properties fetched!", data: properties});

        } catch (err) {
            next(mongooseErrorHandler(err));
        }

    }



}


export default ProductController;
