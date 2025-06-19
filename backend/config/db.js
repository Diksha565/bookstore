import mongoose from "mongoose";

const connectDB = async () => {
  try {
    //Establish Connection
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected Successfully");
  } catch (err) {
    console.log("Database Connection failed", error.message);
  }
};

export default connectDB;
