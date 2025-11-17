# 💰 Personal Finance & P2P Payment System

A robust **Full-Stack MERN Application** designed to help users manage personal finances, track spending against budgets, set savings goals, and securely transfer funds between friends. 💸

### 🚀 Live Demo

🔗 [**View Live Application**](INSERT_YOUR_DEPLOYED_LINK_HERE)

---

### 🌟 Features

**Personal Finance Management**
* 📊 **Expense & Income Tracking:** Log, categorize, and view all transactions in real-time.
* 📉 **Smart Budgeting:** Set spending limits for specific categories (e.g., Groceries, Rent).
* 🎯 **Financial Goals:** Track savings progress towards specific targets (e.g., Vacation Fund).

**P2P Payments & Security**
* 💸 **Secure Money Transfer:** Instantly transfer funds to other users' in-app balances.
* 📜 **Transaction History:** Detailed logs of all transfers, income, and expenses.
* 🔒 **Bank-Grade Auth:** Secure registration and login using **JWT (JSON Web Tokens)**.

---

### 🛠️ Tech Stack

**Frontend**
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=white)

* **React:** Core library for UI.
* **React Router DOM:** Declarative navigation.
* **Axios:** HTTP client for API requests.
* **Context API:** Global state management (Auth/Token).
* **Tailwind CSS:** Utility-first styling.

**Backend**
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)

* **Node.js & Express:** Runtime and framework for the API.
* **MongoDB & Mongoose:** Database and Object Data Modeling.
* **bcryptjs:** Secure password hashing.
* **JWT:** Stateful user authentication.
* **CORS / Helmet:** Security and cross-origin handling.

---

### 🚀 Getting Started

Follow these instructions to set up the project locally.

#### Prerequisites
* Node.js and npm installed.
* MongoDB installed locally or a MongoDB Atlas account.

#### 1. Database Setup
  Set up your MongoDB database and get your **Connection String (URI)**.

#### 2. Backend Setup
  Navigate to the backend folder and install dependencies:

  cd Backend
  npm install

Create a .env file in the Backend root directory:
PORT=3000
DATABASE_URI=your_mongodb_connection_string_here
JWT_SECRET_KEY=enter_a_strong_random_secret_string

Start the server:
npm run dev

####3. Frontend Setup
  Open a new terminal, navigate to the frontend folder, and install dependencies:
  cd frontend
  npm install

Create a .env file in the frontend root directory:
VITE_API_BASE_URL=http://localhost:3000/api/v1

Start the client:
npm run dev

📂 Project Structure

The project follows a clean Separation of Concerns architecture.

Backend (/Backend/src),Responsibility
controllers/,Business logic for handling requests.
routes/,Defines API endpoints mapped to controllers.
models/,"Mongoose schemas (User, Expense, Budget)."
middleware/,Security checks (JWT validation).

Frontend (/frontend/src),Responsibility
pages/,"Main screens (Dashboard, Login, Expenses)."
components/,"Reusable UI (Navbar, Forms, Tables)."
context/,Global state (Authentication).
services/,Centralized API fetching logic (Axios).

