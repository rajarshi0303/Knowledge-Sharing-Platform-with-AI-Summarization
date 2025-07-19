# 🧠 Knowledge-Sharing-Platform-with-AI-Summarization

A fullstack **MERN** platform for collaboratively creating, editing, and sharing knowledge articles — enhanced with **AI-powered summarization** using Hugging Face's `facebook/bart-large-cnn` model.

## ✨ Features

- 🔐 **Authentication & Authorization**
  - JWT-based login/signup via secure HTTP-only cookies
  - Protected routes and session management

- 📝 **Article Management**
  - Create, update, delete articles
  - View full article content or summarized version (via Hugging Face AI)

- 🤖 **AI Summarization**
  - Uses Hugging Face Transformers to generate intelligent summaries of articles

- 📜 **Version Control**
  - Tracks historical versions of each article
  - Easily view changes and evolution over time

- 💡 **User Experience**
  - Responsive and modern UI with clean design
  - Error handling, loading indicators, and user feedback
- 💼 **Admin panel**
   - Manage users and access

---

## 🚀 Tech Stack

### 🖥️ Frontend
- **React.js**
- **Tailwind CSS**
- **React Router**
- **Axios**
- **Zustand**

### 🌐 Backend
- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **JWT (HTTP-only cookie based)**
- **Hugging Face API** for summarization
- **Helmet, CORS, Cookie-parser** (Security + Middleware)
- **Zod**

### 🧠 AI Integration
Summarization is powered by the Hugging Face Inference API, which converts long-form articles into brief, digestible summaries using NLP.
- [Hugging Face Inference API](https://huggingface.co/docs/api-inference/index)
- Model: `facebook/bart-large-cnn`

---

## 🧭 Getting Started

### 1. Clone the repository

```
git clone https://github.com/rajarshi0303/Knowledge-Sharing-Platform-with-AI-Summarization.git
cd Knowledge-Sharing-Platform-with-AI-Summarization
```
### 2. Create .env or rename .example to .env in the  server/ directory:
```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/knowledge-platform
ACCESS_TOKEN_SECRET=Raju123XYZabcd
REFRESH_TOKEN_SECRET=PatelWYXBqrst345
HF_API_KEY=your_huggingface_api_key_here
```
### 3. Install dependencies
```
cd client
npm install            # installs backend dependencies
cd server
npm install            # installs frontend dependencies
```
### 4. Seed the Database 
This builds initial data with hashed passwords via insertMany() (bypassing middleware):
```
cd server
node seed.mjs
```
### 5. Start the Server & Client
```
cd client
npm run dev
cd server
npm run dev
```
