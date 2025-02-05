import express, { Router } from "express";
import { createProduct, deleteProduct, getProductDetails, updateProductDetails } from "../controllers/product.controller.ts";
import { verifyToken } from "../controllers/auth.controller.ts";
import validProductChecker from "../middlewares/ValidProductChecker.ts";




const productRouter: Router = express.Router();

productRouter.post("/create/:id", verifyToken(true), validProductChecker, createProduct );

productRouter.get("/get-product-details/:id/:productId", getProductDetails);

productRouter.post("/update-product/:id/:productId", verifyToken(true), validProductChecker, updateProductDetails);

productRouter.delete("/delete-product/:id/:productId", verifyToken(true), deleteProduct);



export default productRouter;
