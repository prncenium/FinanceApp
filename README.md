💰 Personal Finance & Peer-to-Peer (P2P) Payment System
This is a full-stack application built using the MERN stack (MongoDB, Express, React, Node.js) designed to help users manage their personal finances, track spending against budgets, set savings goals, and securely transfer funds between accounts.

🌟 Features
Personal Finance Management
Expense & Income Tracking: Log, categorize, and view all transactions.

Budgeting: Set spending limits for specific categories (e.g., Groceries, Rent).

Financial Goals: Track savings progress towards targets (e.g., Vacation Fund).

P2P Payments & Security
Secure Money Transfer: Users can instantly transfer funds to each other's in-app balances.

Transaction History: Detailed log of all transfers, income, and expenses.

Authentication: Secure registration and login using JWT (JSON Web Tokens).

🛠️ Tech Stack
Backend (API)
Technology	Description
Node.js	Runtime environment.
Express.js	Core web framework for routing and middleware.
MongoDB/Mongoose	Flexible, document-based database and ODM (Object Data Modeling).
bcryptjs	Used for secure password hashing.
jsonwebtoken (JWT)	Used for stateful user authentication.
CORS / Helmet	Essential security and cross-origin handling.

Frontend (Client)
Technology	Description
React	Core JavaScript library for building the user interface.
React Router DOM	Handles declarative navigation and routing.
Axios	HTTP client for making API requests to the backend.
Tailwind CSS	Utility-first CSS framework for rapid, modular styling.
React Context API	Used for global state management (Authentication/Token).

🚀 Getting Started
Follow these instructions to set up and run the project locally on your machine.

Prerequisites
You must have Node.js and npm installed.

1. Database Setup (MongoDB)
Set up a MongoDB database (local or using MongoDB Atlas).

Get your connection string (URI).

2. Backend Setup (/Backend)
Navigate into the Backend directory:

cd Backend
Install dependencies:

npm install
Create a file named .env in the Backend root and add your configuration details:

Code snippet

PORT=3000
DATABASE_URI=your_mongodb_connection_string_here
JWT_SECRET_KEY=A_STRONG_RANDOM_SECRET_STRING
Start the backend server:

npm run dev

3. Frontend Setup (/frontend)
Open a second terminal and navigate into the frontend directory:

cd frontend
Install dependencies:

npm install
Create a file named .env in the frontend root and add the backend API base URL:

VITE_API_BASE_URL=http://localhost:3000/api/v1
Start the frontend client:

npm run dev
The application should now be accessible in your browser, typically at http://localhost:5173.

📂 Project Structure
The project uses a clean Separation of Concerns model.

Backend (/Backend/src)
Directory	Responsibility
controllers/	Contains the business logic for handling requests.
routes/	Defines API endpoints and directs them to the controllers.
models/	Defines the Mongoose schemas (User, Expense, Budget, etc.).
middleware/	Handles security checks (JWT validation) and pre-processing.
services/	Placeholder for external API integrations (Stripe, etc.).

Frontend (/frontend/src)
Directory	Responsibility
pages/	The main screens (Dashboard, Login, Expenses, Budgets).
components/	Reusable UI components (Navbar, forms, tables).
context/	Global state management (Authentication/Token).
services/	Centralized location for all API fetching logic (Axios).
routes/	Logic for protecting private routes (ProtectedRoute.jsx).

