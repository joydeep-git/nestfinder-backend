import express, { Router } from "express";
import validProductChecker from "../middlewares/ValidProductChecker.ts";
import verifyTokenMiddleware from "../middlewares/verifyTokenMiddleware.ts";
import ProductController from "../controllers/productController.ts";


class ProductRouter {
    public router: Router = express.Router();

    constructor() {
        this.router.post("/create/:id", verifyTokenMiddleware, validProductChecker, ProductController.createProduct );
        this.router.get("/get-product-details/:productId", ProductController.getProductDetails);
        this.router.get("/owner-all-products/:id", verifyTokenMiddleware, ProductController.ownerAllProducts);
        this.router.post("/update-product/:id/:productId", verifyTokenMiddleware, validProductChecker, ProductController.updateProductDetails);
        this.router.delete("/delete-product/:id/:productId", verifyTokenMiddleware, ProductController.deleteProduct);
        this.router.get("/get", ProductController.getAllProducts);
        this.router.post("/edit/:id/:productId", verifyTokenMiddleware, validProductChecker, ProductController.editProperty);
    }
}

const productRouter = new ProductRouter();

export default productRouter.router;
