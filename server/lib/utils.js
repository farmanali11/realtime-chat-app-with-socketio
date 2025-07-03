import dotenv from "dotenv";
dotenv.config(); // Make sure this is at the top

import jwt from "jsonwebtoken";

// Function to generate the token for the user 
export const generateToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // optional: add expiry
  });
  return token;
};
