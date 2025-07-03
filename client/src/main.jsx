// ✅ Import ReactDOM's createRoot API for React 18+
import { createRoot } from "react-dom/client";

// ✅ Import global styles (includes Tailwind and custom fonts)
import "./index.css";

// ✅ Main App component
import App from "./App.jsx";

// ✅ React Router for routing
import { BrowserRouter } from "react-router-dom";

// ✅ Context Providers (Authentication and Chat)
import { AuthProvider } from "../context/AuthContext.jsx";
import { ChatProvider } from "../context/ChatContext.jsx";

// ✅ Mounting the React App
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </AuthProvider>
  </BrowserRouter>
);
