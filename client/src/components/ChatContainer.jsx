import React, { useRef, useEffect, useState, useContext } from "react";
import assets from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

const ChatContainer = () => {
  // ----------------- Contexts -----------------
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  // ----------------- Local State -----------------
  const [input, setInput] = useState("");
  const scrollEnd = useRef(); // For auto-scroll to latest message

  // ----------------- Message Sending -----------------
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  // ----------------- Image Upload Handling -----------------
  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = ""; // Reset file input
    };
    reader.readAsDataURL(file);
  };

  // ----------------- Load Messages on User Select -----------------
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  // ----------------- Auto Scroll to Latest Message -----------------
  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // ----------------- Main Chat View -----------------
  return selectedUser ? (
    <div className="h-full overflow-hidden relative backdrop-blur-lg text-white">
      
      {/* ---------- Top Bar ---------- */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt="User"
          className="w-8 rounded-full"
        />
        <p className="flex-1 text-lg flex items-center gap-2">
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt="Back"
          className="md:hidden w-6 cursor-pointer"
        />
        <img
          src={assets.help_icon}
          alt="Help"
          className="md:hidden w-5 cursor-pointer"
        />
      </div>

      {/* ---------- Messages Display Area ---------- */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 space-y-2">
        {messages.map((msg, index) => {
          const isSender = msg.senderId === authUser._id;

          return (
            <div
              key={index}
              className={`flex ${isSender ? "justify-end" : "justify-start"} mb-1`}
            >
              <div
                className={`max-w-[70%] flex items-end gap-2 ${
                  isSender ? "flex-row-reverse text-right" : "text-left"
                }`}
              >
                {/* Avatar */}
                <img
                  src={
                    isSender
                      ? authUser?.profilePic || assets.avatar_icon
                      : selectedUser?.profilePic || assets.avatar_icon
                  }
                  alt="Avatar"
                  className="w-7 h-7 rounded-full object-cover"
                />

                {/* Message Bubble */}
                <div>
                  {msg.image ? (
                    <img
                      src={msg.image}
                      alt="message"
                      className="max-w-[200px] rounded-lg border border-gray-600"
                    />
                  ) : (
                    <div
                      className={`p-2 rounded-lg text-sm break-words ${
                        isSender
                          ? "bg-violet-600 text-white rounded-br-none"
                          : "bg-gray-700 text-white rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  )}

                  {/* Timestamp */}
                  <p className="text-gray-400 text-[10px] mt-1">
                    {formatMessageTime(msg.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>

      {/* ---------- Message Input Area ---------- */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3 bg-[#181628]/50 backdrop-blur-md">
        <div className="flex-1 flex items-center bg-gray-100/10 px-3 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage(e)}
            type="text"
            placeholder="Send a Message"
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400 bg-transparent"
          />
          {/* Hidden file input for image */}
          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            hidden
          />
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="Attach" className="w-5 mr-2 cursor-pointer" />
          </label>
        </div>
        <img
          onClick={handleSendMessage}
          src={assets.send_button}
          alt="Send"
          className="w-5 cursor-pointer"
        />
      </div>
    </div>
  ) : (
    // ---------- Fallback if No User is Selected ----------
    <div className="flex flex-col items-center justify-center gap-2 text-white bg-white/10 max-md:hidden h-full">
      <img src={assets.logo_icon} className="w-16" alt="Logo" />
      <p className="text-lg font-medium">Chat Anytime, Anywhere</p>
    </div>
  );
};

export default ChatContainer;
