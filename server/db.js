import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Conection to database is successful`);
  } catch (e) {
    console.log(`Error connecting to Mongoose database: ${e.message}`);
  }
};

export default connectDB;
