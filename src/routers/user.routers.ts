import express, {Router} from "express";
import {deleteUserController, getAllUserProducts, updateUserController} from "../controllers/user.controller.ts";


const userRouter: Router = express.Router();


userRouter.post("/update-details/:id", updateUserController);

userRouter.delete("/delete-user/:id", deleteUserController);

userRouter.get("/user-products/:id", getAllUserProducts);




export default userRouter;
