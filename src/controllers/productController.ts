import { NextFunction, Request, Response } from "express";
import mongoose, { SortOrder } from "mongoose";
import ProductSchema from "../mongodbSchema/productSchema";
import { StatusCode } from "../types";
import ErrorHandler from "../utils/ErrorHandler";
import { mongooseErrorHandler } from "../utils/mongooseErrorHandler";



class ProductController {


    // register new property
    static async createProduct(req: Request, res: Response, next: NextFunction) {

        try {
            const newProduct = await ProductSchema.create(req.body);

            await newProduct.save();

            res.status(StatusCode.CREATED).json({ success: true, message: "Registration Completed!", data: newProduct });

        } catch (err) {
            next(mongooseErrorHandler(err));
        }

    }



    // get all registered property  of an owner
    static async ownerAllProducts(req: Request, res: Response, next: NextFunction) {

        try {

            const allProducts = await ProductSchema.find({ userRef: req.user!._id }).lean();

            res.status(StatusCode.OK).json({ success: true, message: `All Products of ${req.user!.firstName} fetched!`, data: allProducts });

        } catch (err) {
            return next(mongooseErrorHandler(err));
        }

    }



    // get details of any property
    static async getProductDetails(req: Request, res: Response, next: NextFunction) {

        try {
            const productDetails = await ProductSchema.findById(req.params.productId);

            if (!productDetails) {
                return next(new ErrorHandler({ status: StatusCode.NOT_FOUND, success: false, message: "Invalid ID!" }));
            }

            res.status(StatusCode.OK).json({ success: true, message: "Property Details Fetched!", data: productDetails });

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
                res.status(StatusCode.OK).json({ success: true, message: "Product Details Fetched!", data: productDetails });
            } else {
                next(new ErrorHandler({ status: StatusCode.FORBIDDEN, success: false, message: "You are not permitted!" }));
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
                return next(new ErrorHandler({ status: StatusCode.NOT_FOUND, message: "Product not found!", success: false }));
            }

            if (String(product.userRef) !== String(req.user?._id)) {
                return next(new ErrorHandler({ status: StatusCode.FORBIDDEN, message: "You are not permitted!", success: false }));
            }

            const data = await ProductSchema.findByIdAndDelete(req.params.productId);

            res.status(StatusCode.OK).json({ success: true, message: "Product Deleted Successfully!", data });

        } catch (err) {
            next(mongooseErrorHandler(err));
        }

    }


    

    // Property search with filters
    static async getAllProducts(req: Request, res: Response, next: NextFunction) {
        const { search, furnished, order, parking, sort, type } = req.query;

        try {

            // sort values
            const sortBy: string = sort?.toString() || "createdAt";
            const orderBy: SortOrder = order === "desc" ? -1 : 1;

            const sortOptions: { [key: string]: SortOrder } = { [sortBy]: orderBy };


            // filter object
            const filter: { name?: any; type?: any; furnished?: any; parking?: any; } = {};

            if (search) {
                filter.name = { $regex: search, $options: "i" };
            }

            filter.type = type && type !== "all" ? type : { $in: ["rent", "sell"] };

            filter.furnished = furnished === "true" ? true : furnished === "false" ? false : { $in: [false, true] };

            filter.parking = parking === "true" ? true : parking === "false" ? false : { $in: [false, true] };

            // Fetch properties
            const properties = await ProductSchema.find(filter).sort(sortOptions).lean();

            res.status(StatusCode.OK).json({ success: true, message: "All properties fetched!", data: properties });

        } catch (err) {
            next(mongooseErrorHandler(err));
        }
    }




    static async editProperty(req: Request, res: Response, next: NextFunction) {
        try {
            const { productId } = req.params;


            // Validate ObjectId
            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return res.status(StatusCode.BAD_REQUEST).json({ success: false, message: "Invalid Product ID" });
            }

            const validProduct = await ProductSchema.findById(productId).lean();

            // Product existence check
            if (!validProduct) {
                return res.status(StatusCode.NOT_FOUND).json({ success: false, message: "Product not found!" });
            }

            // User ownership validation
            if (validProduct.userRef.toString() !== req.user?._id.toString()) {
                return res.status(StatusCode.FORBIDDEN).json({ success: false, message: "Unauthorized!" });
            }

            // Update product
            const updatedProduct = await ProductSchema.findByIdAndUpdate(
                productId,
                { $set: req.body },
                { new: true, runValidators: true }
            ).lean();

            return res.status(StatusCode.OK).json({ success: true, message: "Product Updated!", data: updatedProduct });

        } catch (err) {
            return next(mongooseErrorHandler(err));
        }
    }



}


export default ProductController;
