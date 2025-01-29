import express, {Router} from "express";

import { signIn, signOut, signUp, verifyToken} from "../controllers/auth.controller.ts";


// define router
const authRouter: Router = express.Router();


// define methods and functions
authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in",  signIn);
authRouter.get("/sign-out", signOut);
authRouter.get("/verify-token", verifyToken(false));


export default authRouter;
