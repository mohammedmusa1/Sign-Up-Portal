# Sign-Up-Portal
Made with HTML  CSS and Javascript


📧 Newsletter Signup Application
Node.js • Express • Mailchimp API

A full-stack newsletter signup web application that allows users to subscribe to a Mailchimp audience using a simple HTML form.
The app handles success and failure responses correctly and demonstrates real-world backend API integration.

📌 Table of Contents

Features

Tech Stack

Project Structure

Prerequisites

Mailchimp Setup

Environment Configuration

Installation Steps

Running the Application

Application Flow

Testing Guide

Common Issues & Fixes

Security Notes

Future Improvements

License

🚀 Features

Newsletter signup form

Express backend

Mailchimp Marketing API integration

Proper success & failure pages

Email validation via Mailchimp

Nodemon support

Beginner-friendly, production-safe logic

🛠️ Tech Stack
Layer	Technology
Frontend	HTML, CSS, Bootstrap
Backend	Node.js, Express
API	Mailchimp Marketing API
Tools	Nodemon, npm
📂 Project Structure
Newsletter-Signup/
│
├── app.js
├── signup.html
├── success.html
├── failure.html
│
├── public/
│   ├── css/
│   │   └── styles.css
│   └── images/
│       └── lablogo.png
│
├── package.json
├── package-lock.json
└── README.md

⚙️ Prerequisites

Before starting, make sure you have:

Node.js (v14+ recommended)

npm

A Mailchimp account

Basic knowledge of JavaScript & Express

Check Node version:

node -v

🔑 Mailchimp Setup (STEP-BY-STEP)
1️⃣ Create API Key

Login to Mailchimp

Go to Profile → Extras → API Keys

Click Create A Key

Copy the API key

Example:

abcd1234efgh5678-us21

2️⃣ Get Audience ID

Go to Audience → All Contacts

Click Settings

Copy Audience ID

3️⃣ Find Data Center

From API key:

abcd1234-us21


👉 Data Center = us21

🔧 Configuration (IMPORTANT)

Open app.js and update these values:

const API_KEY = "YOUR_API_KEY";
const AUDIENCE_ID = "YOUR_AUDIENCE_ID";
const DATACENTER = "usX";


Example:

const API_KEY = "abcd1234-us21";
const AUDIENCE_ID = "a1b2c3d4e5";
const DATACENTER = "us21";


⚠️ Do NOT push real API keys to public repositories

📦 Installation Steps
1️⃣ Clone Repository
git clone https://github.com/your-username/newsletter-signup.git
cd newsletter-signup

2️⃣ Install Dependencies
npm install

▶️ Running the Application
Development Mode (recommended)
nodemon app.js

OR Normal Mode
node app.js

🌐 Access the App

Open your browser and go to:

http://localhost:3000

🔄 Application Flow
User submits form
        ↓
Express POST /
        ↓
Mailchimp API
        ↓
error_count === 0 ? Success : Failure
        ↓
Redirect to success.html or failure.html
