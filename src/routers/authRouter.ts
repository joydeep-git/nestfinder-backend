import express, { Router } from "express";
import AuthController from "../controllers/authController";


class AuthRouters {

    public router: Router = express.Router();

    constructor() {

        this.router.post("/sign-up", AuthController.signUp);
        this.router.post("/sign-in", AuthController.signIn);
        this.router.get("/sign-out", AuthController.signOut);
        this.router.get("/verify-token", AuthController.verifyToken);
    }

}

const authRouter = new AuthRouters();

export default authRouter.router;
