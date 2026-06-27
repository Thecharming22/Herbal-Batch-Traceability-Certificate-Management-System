# Herbal Batch Traceability & Certificate Management System

Ensuring transparency, quality assurance, and complete traceability for essential oil production.

## Tech Stack
- React
- Tailwind CSS
- Vite
## How to Run Backend Locally

1. Navigate to the backend folder:
   cd backend
2. Install dependencies:
    npm install
3. Create a .env file in the backend folder with the following variables:
    PORT=5000
    MONGO_URI=your_mongodb_connection
    JWT_SECRET=your_secret_key
4. Start the backend server:
    npm run dev
5. The API will be available at:
    http://localhost:5000/api
6. Test endpoints using Postman/Thunder Client. Example:

    GET /api/users
    POST /api/auth/signup
    POST /api/auth/login
    GET /api/users/:id
    PUT /api/users/:id
    DELETE /api/users/:id
    GET /api/users/search/:name
