import mongoose from "mongoose";

let isConnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Mongooes already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "sharePrompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Mongodb is connected");
  } catch (error) {
    console.log(error);
  }
};

// mongodb://localhost:27017