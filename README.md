# 🌿 Herbal Batch Traceability & Certificate Management System

Ensuring transparency, quality assurance, and complete traceability for essential oil production.

---

# 🚀 Tech Stack

- React
- Tailwind CSS
- Vite
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

---

# 🗄️ Database

**Database Used:** MongoDB Atlas

### Why MongoDB?

MongoDB Atlas is a cloud-based NoSQL database that stores data as JSON-like documents. It integrates easily with React and Express applications, provides scalability, flexibility, and makes CRUD operations efficient for herbal batch records.

---

# 📊 Database Schema

[Schema Diagram](docs/W5_SchemaDiagram_[TBI-26101096].png)

## User

- Username
- Email
- Password

## Batch

- Batch ID
- Plant Variety
- Harvest Date
- Distillation Date
- Yield
- Certificate File Name
- Status
- Buyer Name
- Created At
- Updated At

> **Schema Diagram**

(Add your schema diagram image here after creating it.)

Example:

```md
![Schema Diagram](./docs/schema-diagram.png)
```

---

# ⚙️ How to Set Up the Database

## 1. Clone the Repository

git clone <repository-url>

## 2. Install Backend Dependencies

cd backend
npm install
## 3. Create a `.env` file inside the backend folder

MONGO_URI=your_mongodb_connection_string

## 4. Start Backend

npm run dev

Backend runs at:

http://localhost:5000

## 5. Install Frontend Dependencies

Open a new terminal, then:

cd frontend
npm install

## 6. Create a `.env` file inside the frontend folder

VITE_API_URL=http://localhost:5000

## 7. Start Frontend

npm run dev

Frontend runs at:

http://localhost:3000

## 8. 🚀 Deployment

## Live URLs

- **Frontend (Vercel):** https://herbal-batch-traceability-certifica-six.vercel.app
- **Backend (Render):** https://herbal-batch-traceability-certificate.onrender.com

## Deployment Tech Stack

- **Frontend Hosting:** Vercel
- **Backend Hosting:** Render
- **Database:** MongoDB Atlas
- **Authentication:** JWT + Google OAuth 2.0 (Passport.js)
- **Email Service:** Resend API

## Environment Variables

### Frontend (Vercel)
VITE_API_URL=https://herbal-batch-traceability-certificate.onrender.com

### Backend (Render)
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
FRONTEND_URL=https://herbal-batch-traceability-certifica-six.vercel.app
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://herbal-batch-traceability-certificate.onrender.com/api/auth/google/callback
RESEND_API_KEY=your_resend_api_key

## Known Limitations on Free Tier

- **Render free tier spin-down:** The backend spins down after 15 minutes of inactivity. The first request after an idle period may take 30–60 seconds to respond while the server wakes up.
- **Email sending (Resend):** The free tier of Resend only allows sending emails to the verified account email unless a custom domain is verified. As a result, the "Forgot Password" feature currently sends reset emails only to the registered Resend account email during testing/demo.
- **MongoDB Atlas:** Uses a free-tier (M0) cluster, which has limited storage and connection throughput.

## Deployment Process

1. Frontend deployed to **Vercel** via GitHub integration, with `VITE_API_URL` set as an environment variable pointing to the Render backend.
2. Backend deployed to **Render** as a Web Service, with all required environment variables configured via the Render dashboard.
3. CORS on the backend is configured to allow requests only from the deployed Vercel frontend origin.
4. Google OAuth redirect URIs and JavaScript origins updated in Google Cloud Console to include the production URLs.
5. A `vercel.json` rewrite rule was added to support client-side routing (React Router) on page refresh/direct URL access.
