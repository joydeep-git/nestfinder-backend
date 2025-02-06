import express, {Router} from "express";
import {
    deleteUser, updateProfilePicture, updateUser,
    // changePassword
} from "../controllers/user.controller.ts";
import {verifyToken} from "../controllers/auth.controller.ts";


const userRouter: Router = express.Router();


userRouter.post("/update-details/:id", verifyToken(true), updateUser);

userRouter.post("/update-picture/:id", verifyToken(true), updateProfilePicture);

userRouter.delete("/delete-user/:id", verifyToken(true), deleteUser);

// userRouter.post("/update-password/:id", verifyToken(true), changePassword);



export default userRouter;
