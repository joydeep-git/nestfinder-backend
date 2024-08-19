import express, { Application } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

dotenv.config();

const mongoDBString: string = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.CLUSTER_NAME}.zcmkg.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.CLUSTER_NAME}`;

mongoose
  .connect(mongoDBString)
  .then(() => {
    console.log(`MongoDB Connected. Cluster -> ${process.env.CLUSTER_NAME}`);
  })
  .catch((err) => console.log(`MongoDB ${process.env.CLUSTER_NAME}: ${err}`));

const app: Application = express();

app.use(cookieParser());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT: ${process.env.PORT}`);
});
