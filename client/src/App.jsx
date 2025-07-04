import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

import { AuthContext } from "../context/AuthContext";

const App = () => {
  // Get authentication state from context
  const { authUser } = useContext(AuthContext);

  return (
    <div
      className="bg-contain bg-no-repeat bg-center min-h-screen"
      style={{ backgroundImage: "/bgImage.svg')" }}
    >
      {/* Global toast notification system */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Routing configuration */}
      <Routes>
        {/* Home route - protected */}
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />

        {/* Login route - accessible only if not logged in */}
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        {/* Profile route - protected */}
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;
