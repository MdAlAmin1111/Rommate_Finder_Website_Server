# 🏠 FindMyRoomie - Server Side

This is the **server-side** of the **FindMyRoomie** project for **Assignment-10 (Category: Orange)**.  
It handles all backend operations like creating, reading, updating, and deleting roommate listings, as well as managing likes and user-specific data.

---

## 🌐 Live API Server

🔗 Hosted on: [https://your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)  
_(Replace with your actual Vercel deployment URL)_

---

## 🚀 Technologies Used

- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- dotenv
- cors

---

## ✅ API Features

### ➕ Add Listing
- `POST /api/listings`  
  Adds a new roommate listing to the database.

### 📥 Get All Listings
- `GET /api/listings`  
  Returns all roommate listings.

### 🌟 Get Featured Listings (Available only)
- `GET /api/featured-roommates`  
  Returns 6 listings where `availability: "Available"`.

### 📧 Get Listings by User Email
- `GET /api/listings/:email`  
  Returns all listings posted by a specific user.

### 🔍 Get Listing by ID
- `GET /api/listings/id/:id`  
  Returns a single listing by its ID.

### ✏️ Update a Listing
- `PUT /api/listings/update/:id`  
  Updates all editable fields of a listing by ID.

### ❤️ Update Like Count
- `PATCH /api/listings/like/:id`  
  Updates the like count of a specific listing.

### ❌ Delete Listing
- `DELETE /api/listings/:id`  
  Deletes a listing by its ID.

---

## 🗂 Project Structure

ROMMATE_FINDER_WEBSITE_SERVER/
│
├── node_modules/ # Installed dependencies
├── .env # Environment variables (DB credentials, etc.)
├── .gitignore # Files/folders ignored by Git
├── index.js # Main server file (Express + MongoDB logic)
├── package.json # Project metadata and dependencies
├── package-lock.json # Dependency lock file
└── README.md # Project documentation


---

## 🔐 Environment Variables

Sensitive credentials are stored in `.env` (not committed to GitHub).

### Example `.env` file:
PORT=3000
DB_USER=yourMongoDBUser
DB_PASSWORD=yourMongoDBPassword


---

## 📌 Notes

- All APIs are RESTful.
- CORS is enabled for cross-origin requests.
- MongoDB operations are optimized using filters and `ObjectId`.
- Make sure to deploy this server on **Vercel** and update your client-side API URLs.
