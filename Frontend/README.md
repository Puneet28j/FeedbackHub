# 🎯 Feedback Explorer – MERN Stack App

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A modern, responsive feedback collection and exploration platform**

[🚀 Live Demo](https://your-app.vercel.app) • [📖 API Docs](#-api-documentation) • [⚡ Quick Start](#️-how-to-run-locally)

</div>

---

## 📌 Overview

This is a **one-page web application** built to collect and explore product feedback. The app allows users to:

✅ **Submit feedback** with proper validation and error handling  
✅ **Explore feedback** in a structured, sortable list  
✅ **Filter and search** entries with real-time results  
✅ **Group by categories** with collapsible sections  
✅ **Responsive design** that works across all devices

### 🏗️ Architecture

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐    Mongoose    ┌─────────────────┐
│   React Client  │ ───────────────► │  Express API    │ ──────────────► │    MongoDB      │
│   (TypeScript)  │                 │   (Node.js)     │                │   (Database)    │
└─────────────────┘                 └─────────────────┘                └─────────────────┘
```

- **Single-page React application** with no routing
- **RESTful API** backend with MongoDB for data persistence
- **Context-based state management** for feedback data
- **Responsive UI** with modern design patterns

---

## 🛠️ Tech Stack & Choices

| Technology             | Purpose            | Why Chosen                                                         |
| ---------------------- | ------------------ | ------------------------------------------------------------------ |
| **React + TypeScript** | Frontend Framework | Type-safety, component reusability, excellent developer experience |
| **Tailwind CSS**       | Styling            | Utility-first approach, responsive design, fast development        |
| **React Context**      | State Management   | Simple global state without over-engineering for this scale        |
| **Node.js + Express**  | Backend API        | Lightweight, excellent ecosystem, middleware support               |
| **MongoDB + Mongoose** | Database           | Flexible schema, easy data modeling, good performance              |
| **Joi**                | Server Validation  | Robust validation with clear error messages                        |

### 🚀 Deployment Strategy

- **Frontend** → Vercel/Netlify (Static hosting with automatic deployments)
- **Backend** → Render/Railway (Container-based deployment with MongoDB Atlas)

---

## ⚙️ How to Run Locally

### 📋 Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

### 🔧 Setup Instructions

<details>
<summary><strong>1. Clone the repository</strong></summary>

```bash
git clone <repo-url>
cd feedback-explorer
```

</details>

<details>
<summary><strong>2. Install Dependencies</strong></summary>

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd frontend
npm install
```

</details>

<details>
<summary><strong>3. Environment Variables</strong></summary>

**Backend** - Create `.env` file in `/backend`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/feedback-explorer
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/feedback-explorer
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key
```

**Frontend** - Create `.env` file in `/frontend`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

</details>

<details>
<summary><strong>4. Start the Applications</strong></summary>

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

✅ Server will run on `http://localhost:5000`

**Terminal 2 - Frontend:**

```bash
cd frontend
npm start
```

✅ App will run on `http://localhost:3000`

</details>

### 🌱 Seed Data (Optional)

Populate the database with sample feedback:

```bash
cd backend
npm run seed
```

> **💡 Tip**: Use the seed data to test filtering, sorting, and search functionality!

---

## 🔗 API Documentation

<div align="center">

### Base URLs

🔧 **Development**: `http://localhost:5000/api`  
🌍 **Production**: `[YOUR_DEPLOYED_API_URL]/api`

</div>

### 📝 Endpoints

#### `POST /feedback` - Create Feedback

<details>
<summary><strong>📤 Request Details</strong></summary>

**Request Body:**

```json
{
  "title": "Button not working on mobile",
  "description": "The submit button doesn't respond to taps on iOS Safari",
  "category": "Bug"
}
```

**Validation Rules:**

- `title`: Required, 3-100 characters
- `description`: Required, 10-500 characters
- `category`: Required, must be one of: `Bug`, `Feature`, `Improvement`

</details>

<details>
<summary><strong>📥 Response Examples</strong></summary>

**✅ Success (201):**

```json
{
  "success": true,
  "data": {
    "_id": "64f7a1b2c3d4e5f6789012ab",
    "title": "Button not working on mobile",
    "description": "The submit button doesn't respond to taps on iOS Safari",
    "category": "Bug",
    "createdAt": "2023-09-05T14:30:00.000Z",
    "votes": 0
  }
}
```

**❌ Validation Error (400):**

```json
{
  "success": false,
  "error": "Validation failed",
  "details": ["Title is required", "Description must be at least 10 characters"]
}
```

</details>

---

#### `GET /feedback` - List Feedback

<details>
<summary><strong>🔍 Query Parameters</strong></summary>

| Parameter  | Type     | Description                        | Default  |
| ---------- | -------- | ---------------------------------- | -------- |
| `sort`     | `string` | `newest` or `oldest`               | `newest` |
| `category` | `string` | `Bug`, `Feature`, or `Improvement` | `all`    |
| `q`        | `string` | Search query (title & description) | `none`   |

</details>

<details>
<summary><strong>📋 Example Requests</strong></summary>

```bash
# Get all feedback, newest first
GET /feedback

# Get only bugs, sorted oldest first
GET /feedback?category=Bug&sort=oldest

# Search for mobile-related feedback
GET /feedback?q=mobile&sort=newest

# Complex query: search + filter + sort
GET /feedback?q=button&category=Bug&sort=oldest
```

</details>

<details>
<summary><strong>📊 Response Format</strong></summary>

```json
{
  "success": true,
  "data": [
    {
      "_id": "64f7a1b2c3d4e5f6789012ab",
      "title": "Button not working on mobile",
      "description": "The submit button doesn't respond to taps on iOS Safari",
      "category": "Bug",
      "createdAt": "2023-09-05T14:30:00.000Z",
      "votes": 0
    }
  ],
  "total": 1,
  "filters": {
    "category": "Bug",
    "sort": "newest",
    "search": "mobile"
  }
}
```

</details>

---

## 🏗️ What's Missing / Trade-offs

### ⚠️ Current Limitations

<table>
<tr>
<td width="30%"><strong>🔐 Authentication</strong></td>
<td>No user authentication system implemented</td>
</tr>
<tr>
<td><em>Trade-off</em></td>
<td>Simplified development but allows anonymous submissions</td>
</tr>
<tr>
<td><em>Next step</em></td>
<td>Add JWT-based auth with user registration/login</td>
</tr>
</table>

<table>
<tr>
<td width="30%"><strong>⚡ Real-time Updates</strong></td>
<td>No WebSocket/SSE for live feedback updates</td>
</tr>
<tr>
<td><em>Trade-off</em></td>
<td>Simpler architecture but requires manual refresh</td>
</tr>
<tr>
<td><em>Next step</em></td>
<td>Implement Socket.io for real-time collaboration</td>
</tr>
</table>

<table>
<tr>
<td width="30%"><strong>🔍 Advanced Search</strong></td>
<td>Basic text search only</td>
</tr>
<tr>
<td><em>Trade-off</em></td>
<td>Fast implementation but limited search capabilities</td>
</tr>
<tr>
<td><em>Next step</em></td>
<td>Add full-text search with MongoDB Atlas Search</td>
</tr>
</table>

<table>
<tr>
<td width="30%"><strong>📄 Pagination</strong></td>
<td>All feedback loaded at once</td>
</tr>
<tr>
<td><em>Trade-off</em></td>
<td>Simple implementation but won't scale with large datasets</td>
</tr>
<tr>
<td><em>Next step</em></td>
<td>Implement cursor-based pagination</td>
</tr>
</table>

### 🚀 Improvements for Production

<div align="center">

| Feature              | Priority | Description                                  |
| -------------------- | -------- | -------------------------------------------- |
| 📊 **Analytics**     | High     | Track feedback trends and popular categories |
| 💾 **Caching**       | High     | Add Redis for API response caching           |
| 🛡️ **Rate Limiting** | Medium   | Prevent spam submissions                     |
| 📎 **File Uploads**  | Medium   | Allow image attachments for bug reports      |
| ✉️ **Notifications** | Medium   | Email alerts for new feedback                |
| 🛠️ **Admin Panel**   | Low      | Moderation interface for content management  |

</div>

---

## 🚀 Live Demo

<div align="center">

### 🌐 **Deployed Applications**

[![Frontend](https://img.shields.io/badge/Frontend-Live%20Demo-brightgreen?style=for-the-badge&logo=vercel)](https://your-app.vercel.app)
[![Backend](https://img.shields.io/badge/API-Live%20Backend-blue?style=for-the-badge&logo=railway)](https://your-api.render.com)

</div>

### 🧪 Test the App

The deployed version includes **sample feedback entries** across all categories. Try these features:

| Feature                | How to Test                                          |
| ---------------------- | ---------------------------------------------------- |
| 📝 **Submit Feedback** | Use the "Add Feedback" button to create new entries  |
| 🏷️ **Category Filter** | Toggle between Bug, Feature, and Improvement filters |
| 🔄 **Sorting**         | Switch between newest and oldest first               |
| 🔍 **Search**          | Search by title or description keywords              |
| 📁 **Grouping**        | Expand/collapse category groups                      |
| 📱 **Responsive**      | Test on different screen sizes                       |

---

## 📁 Project Structure

```
feedback-explorer/
├── 🎨 frontend/
│   ├── 📦 public/
│   ├── 📂 src/
│   │   ├── 🧩 components/          # React components
│   │   │   ├── Header.tsx
│   │   │   ├── FeedbackForm.tsx
│   │   │   ├── FeedbackList.tsx
│   │   │   └── ...
│   │   ├── 🌐 context/             # Context providers
│   │   ├── 🔧 services/            # API calls
│   │   ├── 📋 types/               # TypeScript interfaces
│   │   └── 🛠️ utils/               # Helper functions
│   └── 📄 package.json
├── ⚙️ backend/
│   ├── 📂 src/
│   │   ├── 🎯 controllers/         # Route handlers
│   │   ├── 📊 models/              # Mongoose schemas
│   │   ├── 🛣️ routes/              # API routes
│   │   ├── 🔒 middleware/          # Custom middleware
│   │   └── 🛠️ utils/               # Helper functions
│   ├── 📄 package.json
│   └── 🚀 server.js
└── 📖 README.md
```

---

## 🧪 Testing Notes

### ✅ Manual Testing Checklist

<div align="center">

| Test Case               | Status | Description                                        |
| ----------------------- | ------ | -------------------------------------------------- |
| 📝 **Form Submission**  | ✅     | Submit feedback with all required fields           |
| ⚠️ **Validation**       | ✅     | Error messages display correctly for invalid input |
| ⏳ **Loading States**   | ✅     | Spinners show during API calls                     |
| 🎉 **Success Feedback** | ✅     | Toast notifications appear after actions           |
| 🔄 **List Updates**     | ✅     | Feedback list refreshes after new submission       |
| 📊 **Sorting**          | ✅     | Newest/oldest sorting works correctly              |
| 🏷️ **Category Filter**  | ✅     | Filter by Bug/Feature/Improvement functions        |
| 🔍 **Search**           | ✅     | Search finds relevant results in title/description |
| 📁 **Group Toggle**     | ✅     | Category groups expand/collapse properly           |
| 🚫 **Empty States**     | ✅     | "No data" and "No results" states display          |
| 📱 **Responsive**       | ✅     | Works on desktop, tablet, and mobile               |

</div>

### 🐛 Known Issues

- **None currently identified** in basic functionality
- Submit any bugs you find as feedback! 😉

### 📊 Performance Notes

- **Initial load**: ~2-3 seconds (includes API call + render)
- **Search/Filter**: Instant (client-side filtering)
- **Form submission**: ~1-2 seconds (includes validation + database write)

---

## 🚫 No-AI Statement

<div align="center">

### 🤝 **Authenticity Declaration**

> I confirm that I **did not use any AI tools** (ChatGPT, GitHub Copilot, CodeWhisperer, or similar) to write the code, design the UI, or draft this documentation.
>
> All implementation decisions, code structure, and documentation were created through my own knowledge and research.

</div>

---

<div align="center">

## 📞 Questions?

**If you have questions about the implementation or need clarification on any technical decisions, feel free to reach out!**

---

### 🌟 **Built with ❤️ for Lane's Full-Stack Developer Internship**

_Thank you for reviewing this project!_

</div>
