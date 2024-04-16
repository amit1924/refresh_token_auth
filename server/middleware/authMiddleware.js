// Import necessary modules
import jwt from "jsonwebtoken";
import userModel from "../models/User.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Middleware function to verify user authentication
const verifyUser = (req, res, next) => {
  // Extract the access token from cookies
  const accessToken = req.cookies.accessToken;

  // If access token is not provided, try to renew it
  if (!accessToken) {
    // Call the renewToken function to refresh the access token
    if (renewToken(req, res)) {
      next(); // Call the next middleware if token renewal is successful
    } else {
      // Send error response if access token is not provided and renewal fails
      return res
        .status(401)
        .json({ valid: false, message: "Access token not provided" });
    }
  } else {
    // If access token is provided, verify it
    jwt.verify(
      accessToken,
      process.env.SECRET_KEY_ACCESS_TOKEN,
      (err, decoded) => {
        if (err) {
          // Send error response if access token is invalid
          return res
            .status(401)
            .json({ valid: false, message: "Invalid access token" });
        } else {
          // Attach decoded email to the request object
          req.email = decoded.email;
          next(); // Call next middleware
        }
      }
    );
  }
};

// Function to renew the access token using refresh token
const renewToken = (req, res) => {
  // Extract the refresh token from cookies
  const refreshToken = req.cookies.refreshToken;

  // If refresh token is not provided, send error response
  if (!refreshToken) {
    return res
      .status(401)
      .json({ valid: false, message: "Refresh token not provided" });
  }

  // Verify the refresh token
  jwt.verify(
    refreshToken,
    process.env.SECRET_KEY_REFRESH_TOKEN,
    (err, decoded) => {
      if (err) {
        // Send error response if refresh token is invalid
        return res
          .status(401)
          .json({ valid: false, message: "Invalid refresh token" });
      } else {
        // Generate a new access token using the email from the decoded refresh token
        const accessToken = jwt.sign(
          { email: decoded.email },
          process.env.SECRET_KEY_ACCESS_TOKEN,
          { expiresIn: "1m" }
        );
        // Set the new access token as a cookie in the response
        res.cookie("accessToken", accessToken, { maxAge: 60000 });
        // Send success response indicating token renewal
        return res
          .status(200)
          .json({ valid: true, message: "Access token renewed" });
      }
    }
  );
};

// Export the middleware functions
export { verifyUser, renewToken };
