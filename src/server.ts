import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const port: number = parseInt(process.env.PORT || "3001", 10);

const app: Application = express();

app.use(express.json());

const msg: string = "Hello Node!";

app.listen(port, () => {
  console.log(msg);
});

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({Message: msg})
})