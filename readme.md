Project Title

GymPower Pro – Gym Management & Fitness Website

Project Description

GymPower Pro is a modern gym management and fitness website built using React, Vite, React Router, Bootstrap, and JSON Server.
It provides both user-facing features (membership plans, blog, contact, dashboard) and an admin panel to manage members, trainers, and classes.

Technologies Used

React (Functional Components + Hooks)

Vite (Fast build tool)

React Router DOM (Routing)

Bootstrap 5 (UI styling)

JSON Server (Mock backend API)

JavaScript (ES6+)

Project Features

User Side

Hero section with call-to-action

Membership plans (Monthly / Annual billing)

Class schedules & trainers

Fitness blog with search and category filter

Contact form with validation

WhatsApp & email integration

Member dashboard:

Membership info

Bookings

Progress tracking

Weight updates

Admin Panel

Manage members (Add / View / Delete)

Manage trainers

Manage classes

API-based data loading

Tab-based admin interface


Folder Structure
      
      src/
│── components/
│   ├── Hero.jsx
│   ├── Membership.jsx
│   ├── Blog.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── Navbar.jsx
│
│── pages/
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   ├── Admin.jsx
│
│── utils/
│   ├── api.js
│   ├── helpers.js
│
│── data/
│   └── db.json
│
│── styles/
│── App.jsx
│── main.jsx
Installation & Run

Install dependencies

npm install


Start frontend + backend together

npm run start


Frontend: http://localhost:5173

JSON Server: http://localhost:5000

Scripts Used

npm run dev → Start Vite frontend

npm run server → Start JSON Server

npm run start → Run both concurrently

Business Rules Implemented

Membership downgrade restriction (PRO → BASIC not allowed mid-cycle)

Email & phone validation

Booking cancellation handling

Admin confirmation before delete

Future Enhancements

Authentication (Login / Signup)

Real backend (Node / Django / Firebase)

Online payments

Role-based access control

Charts using Chart.js or Recharts