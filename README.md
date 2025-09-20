# 🏡 WanderLust

![Node.js](https://img.shields.io/badge/Node.js-18-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-lightgrey?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-darkgreen?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/React-Frontend-blue?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

---

## 📖 Table of Contents
1. [About the Project](#-about-the-project)
2. [Features](#-features)
3. [Tech Stack](#-tech-stack)
4. [Screenshots](#-screenshots)
5. [Installation & Setup](#-installation--setup)
6. [Environment Variables](#-environment-variables)
7. [Folder Structure](#-folder-structure)
8. [Contributing](#-contributing)
9. [License](#-license)
10. [Contact](#-contact)

---

## 📌 About the Project
**WanderLust** is a full-stack web application that allows users to **explore destinations, list properties, and book accommodations** seamlessly.  
It is designed to provide a smooth experience for both **travelers** and **hosts** with secure authentication, advanced search, and a booking management system.

---

## ✨ Features
- 🔐 **User Authentication & Authorization** (Login / Signup / Session Handling)
- 🏠 **Property Listings** with images, details, and pricing
- 🔍 **Search & Filters** (by location, price, and amenities)
- ⭐ **Ratings & Reviews** for properties
- 📅 **Booking Management System**
- 🌍 **Interactive Map Integration**
- 📱 **Responsive Design** (mobile-first approach)

---

## 🛠 Tech Stack
- **Frontend:** React.js / EJS / Tailwind CSS / Bootstrap  
- **Backend:** Node.js / Express.js  
- **Database:** MongoDB & Mongoose  
- **Authentication:** JWT  
- **Deployment:** (Heroku / Vercel / Render / AWS – update based on your setup)

---

## ⚙ Installation & Setup

1. Clone the Repository
   git clone https://github.com/your-username/WanderLust.git
   cd WanderLust

2. Install Dependencies
   npm install

3. Run Development Server
   npm start

🔑 Environment Variables

Create a .env file in the root directory and add the following:

MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
MAPBOX_TOKEN=your_mapbox_token   # if using maps

📂 Folder Structure
WanderLust/
│── /public          # Static files
│── /src             # Frontend (React/EJS templates)
│── /routes          # Express routes
│── /models          # Mongoose schemas
│── /controllers     # Route controllers
│── app.js           # Main server file
│── package.json
│── README.md

🤝 Contributing

Contributions are always welcome!

Fork the repository

Create your feature branch:

git checkout -b feature-name


Commit your changes:

git commit -m "Added new feature"


Push to the branch:

git push origin feature-name


Open a Pull Request 🚀
