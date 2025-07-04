import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoute.js";
import { Server } from "socket.io";

// Initialize Express app
const app = express();

// Create HTTP server from Express app
const server = http.createServer(app);

// Initialize WebSocket server using Socket.io with CORS enabled for all origins
export const io = new Server(server, {
  cors: { origin: "*" },
});

// Store online users: key = userId, value = socket.id
export const userSocketMap = {};

// Handle WebSocket connections
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User Connected:", userId);

  // Save the user and their socket ID
  if (userId) userSocketMap[userId] = socket.id;

  // Broadcast the updated list of online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User Disconnected:", userId);

    // Remove user from the online map
    if (userId) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

// Middleware to parse incoming JSON requests
app.use(express.json({ limit: "4mb" }));

// Enable CORS for all routes
app.use(cors());

// API Routes
app.use("/api/status", (req, res) => res.send("Server is Live")); // Health check route
app.use("/api/auth", userRouter); // User-related routes
app.use("/api/messages", messageRouter); // Messaging routes

// Connect to MongoDB
connectDB();
if (process.env.NODE_ENV !== "production") {
  // Start the server
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () =>
    console.log("Server is running on the PORT: " + PORT)
  );
}
export default server
