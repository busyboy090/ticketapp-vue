# Ticket Management App

A simple Ticket Management System built with Vue, featuring authentication, CRUD operations, form validation, and toast notifications.

---

## 🚀 Features

### 1. 🔐 Authentication

- Login and Signup with form validation

- Simulated token-based auth using localStorage

- Redirect to Dashboard after login

### 2. 🎫 Ticket Management

- Create, Read, Update, and Delete tickets

- Inline and real-time validation for all inputs

- Status badges with clear color tones:

- open → Green tone

- in_progress → Amber tone

- closed → Gray tone

### 3.🔔 User Feedback

- Toastify notifications for success, errors, and validation alerts

- Inline error messages beneath form fields

### 4.🧭 Routing

- Protected routes using React Router DOM

- Redirect unauthenticated users to /auth/login

---

## 🛠️ Tech Stack

- Frontend: Vue + Vite

- Routing: Vue Router

- UI Components: Tailwind CSS

- Icons: Lucide Vue Next

- Notifications: Vue3 Toastify

- State Management: Vue Hooks + localStorage

- Api Management: Tanstack query

---

## 🚀 Live Demo
🔗 [View on Netlify](https://ticketapp-vue-stage2.netlify.app)

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/busyboy090/ticketapp-vue.git
cd ticketapp-vue
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```
--- 

## 🧪 Usage Instructions

### 1. Go to /auth/signup to create a new account.

### 2. Login at /auth/login.

- Once logged in, you’ll be redirected to /dashboard.

- Navigate to the Tickets page to:

- ➕ Create new tickets

- ✏️ Edit existing ones

- ❌ Delete tickets with confirmation

