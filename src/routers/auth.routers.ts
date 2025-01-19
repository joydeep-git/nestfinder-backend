import express, {Router} from "express";

import {signInController, signOutController, signUpController, verifyToken} from "../controllers/auth.controller.ts";


// define router
const authRouter: Router = express.Router();


// define methods and functions
authRouter.post("/sign-up", signUpController);
authRouter.post("/sign-in", signInController);
authRouter.get("/sign-out", signOutController);
authRouter.get("/verify-token", verifyToken(false));


export default authRouter;
