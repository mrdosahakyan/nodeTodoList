import express, { Request, Response } from "express";
import Tasks from "../models/task";
import { taskSchema } from "../validation/task.schema";

const router = express.Router();

const skipFieldsOnResponse = {
  __v: 0,
  createdAt: 0,
  updatedAt: 0,
};
// api/tasks
router.get("/", async (req: Request, res: Response) => {
  try {
    const tasks = await Tasks.find({}, skipFieldsOnResponse);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { error } = taskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { title } = req.body;
    const taskByTitle = await Tasks.findOne({ title });
    if (taskByTitle) {
      return res.status(400).json({ message: "Task already exists" });
    }
    const task = new Tasks(req.body);
    const newTask = await task.save();

    res.status(200).json(newTask.id);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const task = await Tasks.findById(taskId, skipFieldsOnResponse);

    if (!taskId) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const { error } = taskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const updatedTask = await Tasks.findByIdAndUpdate(taskId, req.body, {
      new: true,
    }).projection(skipFieldsOnResponse);

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    await Tasks.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export { router as taskRouter };
