# CRM Application (Customer Relationship Management)

A full-stack **CRM (Customer Relationship Management)** system built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This project supports **role-based access control** (Admin and Telecaller roles), secure **JWT authentication**, and lead management with create, update, delete, and status tracking functionality.

## ✨ Features

- 🔐 JWT Authentication & Role-based Authorization
- 👨‍💼 Admin Panel to manage agents (telecallers)
- 📞 Telecaller Dashboard to:
  - View assigned leads
  - Add new leads
  - Edit lead address
  - Delete leads
  - Update lead call status & response
- 📁 CSV Upload to bulk assign leads to telecallers
- 🧾 MongoDB for storing users, roles, and leads
- ⚛️ Responsive UI using React and Tailwind CSS
- 🔒 Protected API routes using middleware

---

## 🔧 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)

---

## 📦 Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/crm-app.git
cd crm-app
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm run dev
```

### 3. Install Frontend Dependencies

Open a new terminal and run:

```bash
cd frontend
npm install
```

Start the React development server:

```bash
npm start
```

The app will open at `http://localhost:3000`.

---

## 🧪 Default Roles

- **Admin:** Can login and manage telecallers and lead assignments.
- **Telecaller:** Can manage leads, update call status and response.

You can pre-seed users or create them using API requests (or use Postman to register manually if user registration UI isn't present).

---

## 🔐 Auth Middleware

API routes are protected using custom `verifyToken` and `authorizeRoles` middleware to enforce access control.

---

## 📷 Screenshots

Screenshots/gifs here to showcase the UI (Admin & Telecaller dashboards).

---

---

## 🤝 Contributing

Pull requests are welcome! Feel free to open issues for any bugs or feature suggestions.

---

## 📄 License

MIT License

Author: Vijit Tiwari