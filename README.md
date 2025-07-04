# 💬 Realtime Chat App

A full-stack real-time chat application built with **React**, **Node.js**, **Express**, **MongoDB**, and **Socket.IO**. It supports secure authentication, real-time messaging, online user status, and profile management — all in a beautifully responsive UI.

🔗 **Live Demo:**  
👉 [https://realtime-chat-app-neon-psi.vercel.app/](https://realtime-chat-app-neon-psi.vercel.app/)

---

## 🚀 Features

- 🔐 **Authentication:** Sign up / Log in with secure JWT-based authentication
- 💬 **Real-Time Messaging:** Instant message exchange via Socket.IO
- 🟢 **Online Status:** See who is online in real time
- 📬 **Message Seen Status:** Messages are marked as seen when opened
- 📝 **User Profiles:** View and edit bio/profile
- 🌐 **Responsive UI:** Clean, mobile-first design using Tailwind CSS
- ⚙️ **REST API:** Backend built with Express and MongoDB

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React
- Tailwind CSS
- Axios
- Socket.IO Client

### 🔸 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO
- JSON Web Tokens (JWT)

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/farmanali11/realtime-chat-app-with-socketio.git
cd realtime-chat-app-with-socketio




### 2. Setup the Server

cd server
npm install



Create a .env file inside the server/ directory with the following content:

PORT=5000
- MONGODB_URI=mongodb+srv://<your_mongodb_connection_string>
- JWT_SECRET=your_jwt_secret

⚠️ Replace <your_mongodb_connection_string> with your actual MongoDB URI
Replace your_jwt_secret with a strong secret (e.g. gs#secret123!)


### 3. Setup the Client

- cd client
- npm install
Then run the client:
- npm run dev


###🧑‍💻 Author


- Developed by @farmanali11



---

### ✅ Fixes Applied:
- Properly closed code blocks
- Fixed line breaks and indentation
- Corrected Markdown headings
- Added formatting to environment variables
- Styled author credit with a link

You're now good to go! Let me know if you want to add:
- A preview image or demo GIF
- Badges (like `MIT license`, `made with React`, etc.)
- Deployment setup for Vercel or others
