import express, { Application, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routers/authRouter";
import userRouter from "./routers/userRouter";
import productRouter from "./routers/productRouter";
import errorMiddleware from "./middlewares/errorMiddleware";


class Server {

	protected app: Application;

	protected port: number;


	constructor() {

		this.dotenv(); // load env


		this.app = express();

		// local
		// this.port = parseInt(process.env.PORT || "5001", 10);

		// deploy
		this.port = parseInt(process.env.PORT as string, 10) || 5000;


		this.run();

	}


	// calling all methods in async fn
	private async run() {

		try {
			await this.connectDb();
			this.useMiddleWares();
			this.createRoutes();
			this.useErrorMiddleware();
			this.startServer();
		} catch (err) {
			console.error("failed to start server :", err);
			process.exit(1);
		}

	}



	// env variables config
	private dotenv() {
		dotenv.config();
	}


	// Connect to mongoDB
	private async connectDb() {
		try {
			if (!process.env.MONGODB_USERNAME || !process.env.MONGODB_PASSWORD || !process.env.MONGODB_CLUSTER) {
				throw new Error("DB variables are missing!");
			}

			const mongodbStr: string = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.giap0.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.MONGODB_CLUSTER}`;

			await mongoose.connect(mongodbStr);
			console.log("Database Status: LIVE");

		} catch (err) {
			console.error("MongoDB Connection Error:", err);
			throw err;
		}
	}



	// use middlewares for CORS, handle errors, request body parser, cookies
	private useMiddleWares() {

		this.app.use(cors({
			origin: [process.env.CLIENT_URL, "http://localhost:3000"], // frontend URL
			methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
			credentials: true, // Allow cookies
		}));

		this.app.use(express.json());

		this.app.use(cookieParser());
	}



	// connect routes
	private createRoutes() {
		this.app.use("/api/auth", authRouter);
		this.app.use("/api/user", userRouter);
		this.app.use("/api/product", productRouter);

		// preventing render server from sleeping
		this.app.get("/api/alive", (_, res: Response) => {
			res.status(200).json({ success: true, message: "Server is alive", data: {} });
		});
	}


	private useErrorMiddleware() {
		this.app.use(errorMiddleware);
	}



	// run server
	private startServer() {
		this.app.listen(this.port, () => {
			console.log("CORS Server PORT:", this.port);
		})
	}

}


new Server();
