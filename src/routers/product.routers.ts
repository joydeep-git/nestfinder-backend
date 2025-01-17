import express, {Router} from "express";
import {createProduct} from "../controllers/product.controller.ts";


const productRouter: Router = express.Router();

productRouter.post("/create", createProduct)



export default productRouter;
