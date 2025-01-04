import express, {Router} from "express";
import { updateUserController } from "../controllers/user.controller.ts";


const userRouter: Router = express.Router();



userRouter.post("/update", updateUserController);




export default userRouter;
