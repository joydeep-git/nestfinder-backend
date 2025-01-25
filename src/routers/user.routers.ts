import express, {Router} from "express";
import {
    deleteUserController,
    getAllUserProducts, updateProfilePicture,
    updateUserController
} from "../controllers/user.controller.ts";
import {verifyToken} from "../controllers/auth.controller.ts";


const userRouter: Router = express.Router();


userRouter.post("/update-details/:id", verifyToken(true), updateUserController);

userRouter.post("/update-picture/:id", verifyToken(true), updateProfilePicture);

userRouter.delete("/delete-user/:id", verifyToken(true), deleteUserController);

userRouter.get("/user-products/:id", verifyToken(true), getAllUserProducts);




export default userRouter;
