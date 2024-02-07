import express, { Express } from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db";
import { taskRouter } from "./controller/task";


dotenv.config();
const port = process.env.PORT;

connectDB();

const app: Express = express();
app.use(express.json());

app.use("/api/tasks", taskRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
