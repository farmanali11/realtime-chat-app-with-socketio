import express from "express";

import { protectRoute} from "../middleware/auth.js";
import {
  getMessages,
  getUsersforSidebar,
  markMessageAsSeen,
  sendMessage,
} from "../controllers/messageControllers.js";

const messageRouter = express.Router();

messageRouteer.get("/users", protectRoute, getUsersforSidebar);
messageRouteer.get("/:id", protectRoute, getMessages);
messageRouter.put("mark/:id", protectRoute, markMessageAsSeen);
messageRouter.post("/send/:id",protectRoute,sendMessage)

export default messageRouter;
