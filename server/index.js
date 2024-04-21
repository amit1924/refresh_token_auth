import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import userModel from "./models/User.js";
import connectDB from "./db.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import { verifyUser } from "./middleware/authMiddleware.js";

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://refresh-token-auth-client-a4ip1tlvh-amit1924s-projects.vercel.app",
      "https://refresh-token-auth-client.vercel.app",
      "https://refresh-token-auth-server.vercel.app",
    ],
    credentials: true,
  })
);

dotenv.config();

await connectDB();

// Serve static files from the 'public' directory
app.use(express.static("public"));

//Register Route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new userModel({ name, email, password: hashedPassword });

    // Save the user to the database
    await user.save();

    console.log("User Registration Success");
    res.status(200).json({ message: "Registration is Successful" });
  } catch (err) {
    console.error("Error in registration:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists in the database
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords using bcrypt
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      console.log("Invalid password");
      return res.status(401).json({ message: "Invalid password" });
    }

    // If email and password match, generate JWT tokens
    const accessToken = await jwt.sign(
      { email },
      process.env.SECRET_KEY_ACCESS_TOKEN,
      { expiresIn: "1m" }
    );
    const refreshToken = await jwt.sign(
      { email },
      process.env.SECRET_KEY_REFRESH_TOKEN,
      { expiresIn: "5m" }
    );

    // Set tokens as cookies in the response
    res.cookie("accessToken", accessToken, { maxAge: 60000 });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 300000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    console.log("Login successful");
    return res.status(200).json({ Login: true });
  } catch (err) {
    console.error("Error in login:", err);
    return res.status(500).json({ Login: false });
  }
});

app.get("/dashboard", verifyUser, (req, res) => {
  return res.json({ valid: true, message: "Authorized" });
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
