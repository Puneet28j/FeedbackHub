---
title: "FeedbackHub – MERN Stack App"
author: "Puneet"
description: "A one-page MERN app to collect and explore product feedback with sorting, filtering, and grouping."
version: "1.0.0"
lastUpdated: "2025-08-31"
techStack:
  [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "ShadcnUI",
    "Node.js",
    "Express",
    "MongoDB",
  ]
deployment:
  frontend: "Vercel"
  backend: "Render"
license: "MIT"
---

# 📋 FeedbackHub – MERN Stack App

## 1. Overview

**FeedbackHub** is a single-page web app for submitting and exploring product feedback.  
It features a modern, responsive UI inspired by Lane, with clear feedback flows and robust backend validation.

**Architecture:**

- **Frontend:** React (TypeScript), Context API, Tailwind CSS, Shadcn (For UI )
- **Backend:** Node.js, Express, MongoDB (Mongoose), Bcryptjs, Dotenv, Jsonwebtoken,
- **API:** RESTful endpoints for feedback CRUD
- **Deployment:** Vercel (frontend), Render (backend)

---

## 2. Tech Choices

- **React + TypeScript:** Type safety, component-driven UI, and fast iteration.
- **Tailwind CSS:** Utility-first, responsive, and consistent styling.
- **React Context:** Simple state management for this scale.
- **Node.js + Express:** Lightweight, familiar, and scalable for APIs.
- **MongoDB + Mongoose:** Flexible schema for feedback data.
- **Deployment:** Vercel (frontend), Render (backend) for easy CI/CD.

---

## 3. How to Run Locally

### Prerequisites

- Node.js (v18+), npm
- MongoDB (local or Atlas)

### Setup

```bash
git clone https://github.com/Puneet28j/FeedbackHub.git


# Start backend (in one terminal)
cd backend

#Install dependencies and start backend server
npm install
npm run dev

# Start frontend (in another terminal)
cd ../frontend

#Install dependencies and start frontend server
npm install
npm run dev
```

### Environment Variables

**Backend:**

- `MONGO_URI` – MongoDB connection string
- `PORT` – Backend port (default: 5000)
- `JWT_SECRET` – Your Jwt Secret

**Frontend:**

- `VITE_BACKEND_URL` – Backend base url

---

## 4. API Endpoints

### Auth

#### POST `/api/auth/register`

Register a new user.

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Response:**

```json
{
  "_id": "68b3ffaaf6ed4b43ce0fde64",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "JWT_TOKEN"
}
```

#### POST `/api/auth/login`

Login and receive JWT.

**Request:**

```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**Response:**

```json
{
  "_id": "68b3ffaaf6ed4b43ce0fde64",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "JWT_TOKEN"
}
```

---

### Feedback

#### POST `/api/feedbacks`

Create new feedback (requires JWT).

**Headers:**  
`Authorization: Bearer <token>`

**Request:**

```json
{
  "title": "FeedbackHub",
  "description": "This is the testing description for feedbackhub.",
  "category": "Bug"
}
```

**Response:**

```json
{
  "_id": "68b3ffd2f6ed4b43ce0fde69",
  "user": "68b3ffaaf6ed4b43ce0fde64",
  "title": "FeedbackHub",
  "description": "This is the testing description for feedbackhub.",
  "category": "Bug",
  "upvoters": [],
  "createdAt": "2025-08-31T07:54:58.196Z",
  "updatedAt": "2025-08-31T07:54:58.196Z"
}
```

#### GET `/api/feedbacks`

List feedback with optional filters.

**Query params:**

- `sort`: `newest` | `oldest`
- `category`: `Bug` | `Feature` | `Improvement`
- `q`: search by title

**Response:**

```json
[
  {
    "_id": "68b3ffd2f6ed4b43ce0fde69",
    "user": "68b3ffaaf6ed4b43ce0fde64",
    "title": "1st Feedback",
    "description": "This is my 1st feedback description.",
    "category": "Improvement",
    "upvoters": ["68b3ffaaf6ed4b43ce0fde64"],
    "createdAt": "2025-08-31T07:54:58.196Z",
    "updatedAt": "2025-08-31T07:57:02.326Z"
  }
]
```

#### POST `/api/feedbacks/:id/upvote`

Upvote or remove upvote from a feedback (requires JWT).

**Headers:**  
`Authorization: Bearer <token>`

**Response:**

```json
{
  "_id": "68b3ffd2f6ed4b43ce0fde69",
  "upvoters": ["68b3ffaaf6ed4b43ce0fde64", "anotherUserId"]
}
```

---

**Note:** All feedback endpoints (except GET) require authentication via JWT.

---

## 5. What’s Missing / Trade-offs

- **No admin panel**: There’s no admin/moderator dashboard for managing or deleting feedback.
- **No email verification**: User registration does not include email verification.
- **No pagination**: All feedback is loaded at once; for large datasets, pagination or infinite scroll would be needed.
- **Basic validation**: Server-side validation is present, but more detailed error messages and edge case handling could be added.
- **Testing**: Only manual testing was done; automated tests (unit/integration) would improve reliability.
- **Accessibility**: Basic accessibility is considered, but more thorough testing and improvements are possible.
- **AI Use**: I used AI tools (like Copilot) for research and code suggestions, but all code and documentation were reviewed and customized by me.

---

## 6. No-AI Statement

Some AI tools were used for research and to speed up development, but all code and documentation were written, reviewed, and finalized by me
