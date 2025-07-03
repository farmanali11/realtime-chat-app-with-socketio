import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

// Create ChatContext
export const ChatContext = createContext();

// ChatProvider wraps app and shares chat-related state and functions
export const ChatProvider = ({ children }) => {
  // ------------------- State Definitions -------------------
  const [messages, setMessages] = useState([]); // Current conversation messages
  const [users, setUsers] = useState([]); // All available users for chat
  const [selectedUser, setSelectedUser] = useState(null); // Currently selected user for chat
  const [unseenMessages, setUnseenMessages] = useState({}); // Map of unseen message counts per user

  // Get axios and socket instance from AuthContext
  const { socket, axios } = useContext(AuthContext);

  // ------------------- API: Get All Users -------------------
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages || {});
      }
    } catch (error) {
      toast.error(error.message || "Failed to load users");
    }
  };

  // ------------------- API: Get Messages for Selected User -------------------
  const getMessages = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error(error.message || "Failed to load messages");
    }
  };

  // ------------------- API: Send a Message -------------------
  const sendMessage = async (messageData) => {
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedUser._id}`,
        messageData
      );

      if (data.success) {
        // Add new message to the chat
        setMessages((prevMessages) => [...prevMessages, data.newMessage]);
      } else {
        toast.error(data.message || "Message send failed");
      }
    } catch (error) {
      toast.error(error.message || "Failed to send message");
    }
  };

  // ------------------- Socket: Handle Incoming Real-Time Messages -------------------
  const subscribeToMessages = () => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      // If message is from the currently selected user → add to chat
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prev) => [...prev, newMessage]);

        // Mark message as seen in the database
        axios.put(`/api/messages/mark/${newMessage._id}`);
      } else {
        // Increment unseen message count for that sender
        setUnseenMessages((prev) => ({
          ...prev,
          [newMessage.senderId]: prev[newMessage.senderId]
            ? prev[newMessage.senderId] + 1
            : 1,
        }));
      }
    });
  };

  // ------------------- Socket: Cleanup Listener -------------------
  const unsubscribeFromMessages = () => {
    if (socket) socket.off("newMessage");
  };

  // ------------------- Effect: Manage Real-Time Listeners -------------------
  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [socket, selectedUser]);

  // ------------------- Context Value -------------------
  const value = {
    messages,
    users,
    selectedUser,
    setSelectedUser,
    getUsers,
    getMessages,
    sendMessage,
    unseenMessages,
    setUnseenMessages,
  };

  // Provide context to children
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
