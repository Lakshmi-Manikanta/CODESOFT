✅ .env.example
env
# MongoDB connection string
MONGODB_URI=your_mongodb_connection_string

# Session secret key (used for encrypting cookies)
SESSION_SECRET=your_secret_key

# Port number for local development
PORT=3000
✅ Updated README.md

# 📝 Blogging Platform

A full-featured blogging platform built using **Node.js**, **Express**, **MongoDB**, and **EJS**, as part of the **CodSoft Web Development Internship (Level 3 - Task 1)**.

---

## 🚀 Features

- ✅ User registration and login (with password hashing using `bcrypt`)
- ✅ Session-based authentication using `express-session`
- ✅ Create, edit, and delete blog posts
- ✅ View all posts and individual post details
- ✅ Add comments to blog posts (optional)
- ✅ Responsive design using HTML, CSS, and JavaScript
- ✅ Dynamic rendering with EJS templating

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** HTML, CSS, JavaScript, EJS
- **Database:** MongoDB (Mongoose)
- **Authentication:** express-session, bcrypt
- **Templating Engine:** EJS

---

## 🧑‍💻 Installation & Setup

1. Install dependencies
mongod
mongosh

2. Create your .env file
Create a .env file in the root folder and add the following:

env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
PORT=3000

3. Start the server
node app.js
Now visit: http://localhost:3000 in your browser 🚀

📁 Folder Structure

blogging-platform/
├── app.js
├── package.json
├── .env.example
├── /views
├── /models
├── /routes
├── /public

👨‍🎓 Internship Info
Internship: CodSoft Web Development
Task Level: Level 3 – Task 1
Project: Full-Stack Blogging Platform
Intern: Pedapudi Lakshmi Manikanta
Email: pedapudilakshmimanikanta@gmail.com
