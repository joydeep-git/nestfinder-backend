import express, { Router } from "express";
import validProductChecker from "../middlewares/ValidProductChecker";
import verifyTokenMiddleware from "../middlewares/verifyTokenMiddleware";
import ProductController from "../controllers/productController";


class ProductRouter {
    public router: Router = express.Router();

    constructor() {
        this.router.post("/create/:id", verifyTokenMiddleware, validProductChecker, ProductController.createProduct );
        this.router.get("/get-product-details/:productId", ProductController.getProductDetails);
        this.router.get("/owner-all-products/:id", verifyTokenMiddleware, ProductController.ownerAllProducts);
        this.router.post("/update-product/:id/:productId", verifyTokenMiddleware, validProductChecker, ProductController.updateProductDetails);
        this.router.delete("/delete-product/:id/:productId", verifyTokenMiddleware, ProductController.deleteProduct);
        this.router.get("/get-all-products", ProductController.getAllProducts);
        this.router.post("/edit/:id/:productId", verifyTokenMiddleware, validProductChecker, ProductController.editProperty);
    }
}

const productRouter = new ProductRouter();

export default productRouter.router;
