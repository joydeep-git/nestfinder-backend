import express, {Router} from "express";

import {
  googleAuthController,
  signInController,
  signOutController,
  signUpController
} from "../controllers/auth.controller.ts";


// define router
const authRouter: Router = express.Router();


// define methods and functions
authRouter.post("/signup", signUpController);
authRouter.post("/signin", signInController);
authRouter.post("/google", googleAuthController);
authRouter.post("/signout", signOutController);


export default authRouter;
