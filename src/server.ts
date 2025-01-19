import express, {Application} from "express";
import dotenv from "dotenv";
import mongoose, {Error as mongooseError} from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routers/auth.routers";
import userRouter from "./routers/user.routers.ts";
import cors from "cors";
import productRouter from "./routers/product.routers.ts";
import errorMiddleware from "./middlewares/errorMiddleware.ts";
import {verifyToken} from "./controllers/auth.controller.ts";


// config DOTENV
dotenv.config();



// connect mongoDB
const mongodbStr: string = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.giap0.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.MONGODB_CLUSTER}`;



// Connect MongoDB with my project
mongoose.connect(mongodbStr).then((): void => {
  console.log("Database Status: LIVE");
}).catch((err: mongooseError): void => {
  console.log(err);
  process.exit(1);
});



// default PORT + Fallback
const port: number = parseInt(process.env.PORT || "5001", 10);



// init APP
const app: Application = express();



// Use Cors
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // frontend URL
    credentials: true, // Allow cookies
  }));



// Body parser
app.use(express.json());



// cookie-parser
app.use(cookieParser());


// router defined
app.use("/api/auth", authRouter);

app.use("/api/user", verifyToken(true), userRouter);

app.use("/api/product", productRouter);



// Handle Error using Middleware
app.use(errorMiddleware);



// PORT defined
app.listen(port, (): void => {
  console.log("CORS Server PORT:", port);
});
