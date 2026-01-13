# 🚀 Neo Learn Pro – MERN Stack Learning Platform

Neo Learn Pro is a full‑stack **online learning platform** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. It provides a modern, scalable, and user‑friendly environment for students and instructors to engage in digital learning.

---

## 📌 Features

### 👨‍🎓 User (Student)

* User authentication (Register / Login)
* Browse courses
* Enroll in courses
* Watch video lessons
* Track learning progress
* Responsive UI for all devices

### 👨‍🏫 Instructor / Admin

* Secure admin authentication
* Create, update, and delete courses
* Upload video content
* Manage users and enrollments
* Dashboard analytics

### ⚙️ General

* JWT‑based authentication
* Role‑based access control
* RESTful APIs
* Scalable backend architecture

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Tailwind CSS / CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication & Security

* JSON Web Token (JWT)
* bcrypt.js

---

## 📂 Project Structure

```
neo-learn-pro/
│
├── client/               # React frontend
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── server/               # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
├── .env
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v16+)
* MongoDB
* Git

---

### 🔧 Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/neo-learn-pro.git
cd neo-learn-pro
```

2. **Install backend dependencies**

```bash
cd server
npm install
```

3. **Install frontend dependencies**

```bash
cd ../client
npm install
```

---

### ⚙️ Environment Variables

Create a `.env` file inside the `server` folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### ▶️ Run the Application

**Start Backend**

```bash
cd server
npm run dev
```

**Start Frontend**

```bash
cd client
npm start
```

Frontend will run on: `https://neolearn-pro.netlify.app/`
Backend will run on: `https://neolearn-pro.onrender.com`

---

## 📸 Screenshots (Optional)
<img width="1900" height="889" alt="image" src="https://github.com/user-attachments/assets/259711f5-bf54-41f0-96c6-594393d304e4" />

<img width="1896" height="866" alt="image" src="https://github.com/user-attachments/assets/dc9a0969-b470-4c63-82ff-729ba17690c9" />


## 🌱 Future Enhancements

* Payment gateway integration
* Certificate generation
* Live classes
* Quiz & assessment module
* AI‑based course recommendations

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---


## 👨‍💻 Author

**Harsh**
MCA Student | MERN Stack Developer

🔗 *Feel free to connect and contribute!*
