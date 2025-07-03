import React, { useState, useContext } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  // ---------- Context ----------
  const { login } = useContext(AuthContext);

  // ---------- Local State ----------
  const [currState, setCurrState] = useState("Sign up"); // Toggle between Login / Sign up
  const [fullName, setFullName] = useState("");           // Full name (sign up)
  const [email, setEmail] = useState("");                 // Email (both)
  const [password, setPassword] = useState("");           // Password (both)
  const [bio, setBio] = useState("");                     // Bio (sign up)
  const [isDataSubmitted, setIsDataSubmitted] = useState(false); // Step flag for multi-step form

  // ---------- Helper: Clear form fields ----------
  const clearForm = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setBio("");
    setIsDataSubmitted(false);
  };

  // ---------- Toggle between Login / Sign up ----------
  const toggleFormState = () => {
    setCurrState(currState === "Sign up" ? "Login" : "Sign up");
    clearForm();
  };

  // ---------- Submit Handler ----------
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (currState === "Sign up" && !isDataSubmitted) {
      // Move to next step (bio input)
      setIsDataSubmitted(true);
      return;
    }

    // Create payload for API
    const payload = {
      email,
      password,
      ...(currState === "Sign up" && { fullName, bio }),
    };

    // Call context login function
    login(currState === "Sign up" ? "signup" : "login", payload);
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      
      {/* ---------- Left: Logo Image ---------- */}
      <img src={assets.logo_big} alt="Logo" className="w-[min(30vw,250px)]" />

      {/* ---------- Right: Form ---------- */}
      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
      >
        {/* ---------- Heading with Back Arrow ---------- */}
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          {isDataSubmitted && (
            <img
              src={assets.arrow_icon}
              alt="Back"
              className="w-5 cursor-pointer"
              onClick={() => setIsDataSubmitted(false)}
            />
          )}
        </h2>

        {/* ---------- Step 1: Full Name for Sign Up ---------- */}
        {currState === "Sign up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            placeholder="Full Name"
            required
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
          />
        )}

        {/* ---------- Common: Email + Password ---------- */}
        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </>
        )}

        {/* ---------- Step 2: Bio Field ---------- */}
        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            required
            placeholder="Provide a short bio..."
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        )}

        {/* ---------- Terms Checkbox (only in step 1) ---------- */}
        {!isDataSubmitted && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <input type="checkbox" required />
            <p>Agree to the terms of use & privacy policy</p>
          </div>
        )}

        {/* ---------- Submit Button ---------- */}
        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
        >
          {currState === "Sign up"
            ? isDataSubmitted
              ? "Finish Signup"
              : "Create Account"
            : "Login Now"}
        </button>

        {/* ---------- Form Toggle Link ---------- */}
        <div className="flex flex-col gap-2">
          {currState === "Sign up" ? (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={toggleFormState}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Create an account{" "}
              <span
                onClick={toggleFormState}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Click Here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
