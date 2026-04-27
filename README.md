# Livestock Ownership & Health Management System

A full-stack web application designed to digitize and centralize livestock ownership records, enabling efficient tracking, health monitoring, and data management for farmers.



## Problem Statement

The lack of a centralized system for livestock ownership leads to inefficient tracking, poor health monitoring, and difficulty in accessing government schemes. Traditional manual record-keeping is error-prone, unorganized, and not scalable.

This project addresses these challenges by providing a digital platform for managing livestock data, health records, and farmer profiles in a structured and accessible way.



## Features

* User Authentication (Signup/Login)
* Farmer Profile Management
* Livestock Registration & Tracking
* Vaccination & Health Records
* Herd Count Analytics
* Data Export (Health Logs & Inventory)
* Support Query Submission System



## Tech Stack

**Frontend**

* HTML
* CSS
* JavaScript

**Backend**

* Node.js
* Express.js

**Database & Authentication**

* Supabase (PostgreSQL)



## 📂 Project Structure
```
livestock-management-system/
│
├── public/                      # Frontend files (UI pages, assets)
│   ├── about.html
│   ├── editProfile.html
│   ├── export.html
│   ├── farmerDash.html
│   ├── gvtSchemes.html
│   ├── health.html
│   ├── liveStock.html
│   ├── login_signup.html
│   ├── MainDash.html
│   ├── privacyPolicy.html
│   ├── registration.html
│   ├── schemes.html
│   ├── support.html
│   ├── vaccination.html
│   │
│   ├── style.css               # Main stylesheet
│   ├── config.js               # Frontend configuration
│   │
│   ├── assets/ (images & media)
│   │   ├── back.png
│   │   ├── cows.jpg
│   │   ├── farm_art_bg.png
│   │   └── cow_video.mp4
│
├── index.html                  # Landing page (root)
│
├── server.js                   # Express backend server
├── supabaseClient.js           # Supabase connection setup
│
├── package.json                # Project metadata & dependencies
├── package-lock.json           # Dependency lock file
├── vercel.json                 # Deployment configuration (Vercel)
│
├── .env                        # Environment variables (not committed)
├── .gitignore                  # Ignored files
│
└── README.md                   # Project documentation
```


### 🧠 Notes

* All frontend pages are inside the `public/` folder
* `index.html` is served as the root landing page
* Backend APIs are handled in `server.js`
* Supabase is configured in `supabaseClient.js`
* Static assets (images/videos) are grouped under `public/`





## Installation & Setup

### Prerequisites

* Node.js (v16 or higher recommended)
* npm
* Supabase account



### 1. Clone the Repository

git clone https://github.com/Shubhgoswami064/livestock-management-system.git
cd livestock-management-system



### 2. Install Dependencies

npm install

Dependencies used:

* express → backend framework
* @supabase/supabase-js → database & authentication
* dotenv → environment variables



### 3. Setup Environment Variables

Create a `.env` file in the root directory:

SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key



### 4. Run the Server

npm start

Server will run at:
http://localhost:3000



## Database Tables

* **livestock** → stores animal details
* **farmer_profiles** → stores user profile data
* **health_records** → stores vaccination and treatment data
* **support_queries** → stores user support queries



## API Endpoints

### Authentication

POST /api/signup → Register a new user
POST /api/login → Login user



### Livestock

GET /api/livestock → Get all livestock (requires user-id header)
POST /api/livestock → Add livestock (requires user-id header)



### Profile

GET /api/profile → Get profile (requires user-id header)
POST /api/profile → Create/update profile (requires user-id header)



### Health Records

POST /api/save-vaccination → Add vaccination record
GET /api/get-health-records → Fetch health records



### Analytics

GET /api/herd-count → Get total livestock count



### Support

POST /api/support → Submit support query



## Notes

* Requires a working Supabase project
* Uses basic authentication flow
* API uses user-id header (not production-grade security)
* Designed for academic/demo purposes



## Team members
* Shubh Goswami
* Nishita
* Tanvi

## Deployed Link of Project - https://livestock-management-system-gamma.vercel.app/
