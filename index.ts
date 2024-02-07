import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
