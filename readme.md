# GymPower Pro – Gym Management & Fitness Website

GymPower Pro is a modern gym management and fitness website built for **educational purposes and practice** using React, Vite, React Router, Bootstrap, and JSON Server. It simulates user-facing features (membership plans, blog, contact, dashboard) and an admin panel to manage members, trainers, and classes based on **mock data**.

## Technologies Used

* **React** (Functional Components + Hooks)
* **Vite** (Fast build tool)
* **React Router DOM** (Routing)
* **Bootstrap 5** (UI styling)
* **JSON Server** (Mock backend API)
* **JavaScript** (ES6+)

## Project Features

### User Side

* Hero section with call-to-action
* Membership plans (Monthly / Annual billing)
* Class schedules & trainers
* Fitness blog with search and category filter
* Contact form with validation
* Member dashboard:
* Membership info
* Bookings
* Progress tracking
* Weight updates



### Admin Panel

* Manage members (Add / View / Delete)
* Manage trainers
* Manage classes
* API-based data loading
* Tab-based admin interface

## Folder Structure


src/
│── components/
│── pages/
│── utils/
│── data/
│   └── db.json
│── styles/
│── App.jsx
│── main.jsx

```

## Installation & Run

1. **Install dependencies**
npm install

```


2. **Start frontend + backend together**
npm run start

```



* **Frontend:** `http://localhost:5173`
* **JSON Server:** `http://localhost:5000`

## Scripts Used

* `npm run dev` → Start Vite frontend
* `npm run server` → Start JSON Server
* `npm run start` → Run both concurrently

## Implementation Notes

* This project is for **practice only** and is not designed for real-world usage.
* Data is stored in `db.json` and is not persistent if reset.
* No real-world authentication, payment gateway, or secure backend systems are implemented.
