import mongoose from "mongoose";

const connectDB = async () => {
  const username = process.env.DB_USERNAME;
  const pass = process.env.DB_PASSWORD;
  const clusterUrl = process.env.DB_CLUSTER_UTL;
  const dbName = process.env.DB_DATABASE_NAME;

  const url = `mongodb+srv://${username}:${pass}@${clusterUrl}/${dbName}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(url);

    console.log(`MongoDB connected: `);
  } catch (error) {
    console.log("Error:", error);
  }
};

export default connectDB;
