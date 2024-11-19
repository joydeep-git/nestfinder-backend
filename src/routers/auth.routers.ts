import express, {Router} from "express";

import {
  forgetPasswordController,
  googleAuthController,
  signInController,
  signOutController,
  signUpController
} from "../auth-controllers/auth.controller.ts";


// define router
const authRouter: Router = express.Router();


// define methods and functions
authRouter.post("/sign-up", signUpController);
authRouter.post("/sign-in", signInController);
authRouter.post("/forget-password", forgetPasswordController);
authRouter.post("/google-auth", googleAuthController);
authRouter.post("/sign-out", signOutController);


export default authRouter;
