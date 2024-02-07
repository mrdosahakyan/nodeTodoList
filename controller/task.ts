import express, { Request, Response } from "express";

const router = express.Router();

// api/tasks
router.get("/", (req: Request, res: Response) => {
  res.json("ssss");
});

export { router as taskRouter };
