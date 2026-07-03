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

