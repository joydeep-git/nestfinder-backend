import express, {Router} from "express";
import verifyTokenMiddleware from "../middlewares/verifyTokenMiddleware";
import UserController from "../controllers/userController";

class UserRouter {

    public router: Router = express.Router();

    constructor() {

        this.router.get("/get-user/:id", UserController.getUser);
        this.router.post("/update-details/:id", verifyTokenMiddleware, UserController.updateUser);
        this.router.post("/update-picture/:id", verifyTokenMiddleware, UserController.updateProfilePicture);
        this.router.delete("/delete-user/:id", verifyTokenMiddleware, UserController.deleteUser);

    }

}

const userRouter = new UserRouter();

export default userRouter.router;