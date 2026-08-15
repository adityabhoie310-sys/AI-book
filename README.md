# 📚 AI-Powered eBook Creator

An end-to-end full-stack web application for planning, writing, editing, and exporting complete eBooks using **Google Gemini AI** and the **MERN stack (MongoDB, Express, React, Node.js)** styled with **Tailwind CSS v4**.

---

## 🔥 Features

- **🤖 Google Gemini AI Integration**:
  - Automatically generates structured multi-chapter eBook outlines (chapter titles & descriptions) based on title, genre, target audience, and writing tone.
  - Generates comprehensive 1,500+ word Markdown chapter contents.
  - Smart AI writing assistant toolbar (*Expand*, *Summarize*, *Rewrite*, *Fix Grammar*).
- **🎨 Modern Frontend Studio (React 19 + Vite)**:
  - Multi-step eBook Creation wizard.
  - Interactive Studio Editor with chapter list reordering, title editor, and instant Markdown formatted preview mode.
  - Word counter & reading time estimator.
  - Reader View with font size controls, theme switcher (*Light*, *Sepia*, *Dark*), and TXT exporter.
- **🔐 User Authentication**:
  - Secure signup and login with JWT token authentication.
  - Protected routes and profile settings for configuring personal Gemini API keys.
- **⚡ Dual-Mode Operation**:
  - Connects directly to the Node.js / Express backend with MongoDB.
  - Seamless fallback mock mode for instant offline or zero-database dev testing.

---

## 🏗️ Tech Stack

- **Frontend**: React 19, Vite 8, Tailwind CSS v4, Lucide React, React Router DOM v7, React Hot Toast, Axios.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JsonWebToken, BcryptJS, Google Generative AI (`@google/generative-ai`).

---

## 📁 Project Structure

```
AI-book/
├── backend/
│   ├── controllers/       # Auth, Book CRUD, & Gemini AI controllers
│   ├── middleware/        # JWT auth protection middleware
│   ├── models/            # Mongoose schemas (User, Book, Chapter)
│   ├── routes/            # REST API endpoints (/auth, /books, /ai)
│   ├── package.json
│   └── server.js          # Express server entry point
│
└── frontend/
    └── AI-BOOk/
        ├── src/
        │   ├── components/  # UI, Layout, Cards, Modals, Reader components
        │   ├── context/     # AuthContext provider & hooks
        │   ├── pages/       # Landing, Login, Signup, Dashboard, Editor, Reader, Profile
        │   ├── utils/       # API paths, Axios client, Data helpers & mock fallbacks
        │   ├── App.jsx      # Routes & route protection
        │   └── main.jsx
        └── package.json
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (Optional: for backend database persistence)
- [Google Gemini API Key](https://aistudio.google.com/app/apikey) (Free)

---

### 2. Backend Setup (`/backend`)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set environment variables (Optional `.env` file):
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/ai_ebook_creator
   JWT_SECRET=your_jwt_secret_key
   GEMINI_API_KEY=your_google_gemini_api_key
   ```
4. Start backend server:
   ```bash
   npm start
   # or dev mode with auto-reload:
   npm run dev
   ```

---

### 3. Frontend Setup (`/frontend/AI-BOOk`)

1. Navigate to the frontend directory:
   ```bash
   cd frontend/AI-BOOk
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```
4. Open your browser at `http://localhost:5173`.

---

## 🧪 Verification & Building

- **Lint Code**:
  ```bash
  npm run lint
  ```
- **Production Build**:
  ```bash
  npm run build
  ```

---

## 📜 License

Distributed under the MIT License. Built for authoring AI-assisted eBooks.
