import express, { Application } from "express";
import dotenv from "dotenv";
import mongoose, { Error as mongooseError } from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routers/auth.routers";
import userRouter from "./routers/user.routers.ts";
import propertyRouter from "./routers/property.routers.ts";
import errorMiddleware from "./middlewares/errorMiddleware.ts";
import cors from "cors";



// config DOTENV
dotenv.config();



// connect mongoDB
const mongodbStr: string = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.giap0.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.mongodb_cluster}`;



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
app.use(cors());



// Body parser
app.use(express.json());



// cookie-parser
app.use(cookieParser());



// router defined
app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);

app.use("/api/property", propertyRouter);



// Handle Error using Middleware
app.use(errorMiddleware);



// PORT defined
app.listen(port, (): void => {
  console.log("CORS Server PORT:", port);
});
