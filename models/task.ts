import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
  title: string;
  description: string;
  deadline: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String },
    deadline: { type: Date, required: true },
  },
  { timestamps: true }
);

const Tasks = mongoose.model<ITask>("Task", taskSchema);

export default Tasks;
