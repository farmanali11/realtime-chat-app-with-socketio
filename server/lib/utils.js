import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

// Function to generate the token for the user

export const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  return token;
};
