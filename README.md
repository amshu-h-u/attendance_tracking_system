#  Attendance Tracker System

##  Live URLs
 Not deployed (runs locally)

* Frontend: http://localhost:5173
* Backend: http://localhost:5000
* API Base URL: http://localhost:5000/api

---

##  Test Accounts
##  API Endpoints

###  Authentication

#### ➤ Signup

```http
POST /api/auth/signup
```

**Body:**

```json
{
  "name": "User",
  "email": "user@test.com",
  "password": "123456",
  "role": "Student"
}
```

---

#### ➤ Login

```http
POST /api/auth/login
```

**Body:**

```json
{
  "email": "user@test.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "token": "JWT_TOKEN",
  "user": { }
}
```

---

###  Batch

#### ➤ Create Batch (Trainer / Institution)

```http
POST /api/batches
```

**Headers:**

```http
Authorization: Bearer TOKEN
```

**Body:**

```json
{
  "name": "MERN Batch"
}
```

---

#### ➤ Get Batches (Role-based)

```http
GET /api/batches
```

**Headers:**

```http
Authorization: Bearer TOKEN
```

**Behavior:**

* Student → gets joined batches
* Trainer → gets created batches
* Institution → gets owned batches

---

#### ➤ Join Batch (Student)

```http
POST /api/batches/join/:id
```

---

#### ➤ Leave Batch (Student)

```http
POST /api/batches/leave/:id
```

---

###  Attendance

#### ➤ Mark Attendance (Trainer)

```http
POST /api/attendance
```

**Headers:**

```http
Authorization: Bearer TOKEN
```

**Body:**

```json
{
  "batchId": "BATCH_ID",
  "date": "2026-04-22",
  "records": [
    {
      "studentId": "STUDENT_ID",
      "status": "Present"
    }
  ]
}
```

---

#### ➤ Get Attendance (Student / Trainer)

```http
GET /api/attendance/:batchId
```

* Student → sees only their attendance
* Trainer → sees full records

---

#### ➤ Attendance Percentage (Student)

```http
GET /api/attendance/:batchId/percentage
```

**Response:**

```json
{
  "totalDays": 10,
  "presentDays": 8,
  "percentage": 80
}
```

---

###  Test Route

#### ➤ Trainer Test

```http
GET /api/batches/test-trainer
```

---

##  Notes

* All protected routes require:

```http
Authorization: Bearer <token>
```

* Token is received after login

* Attendance marking is done via API (Postman / Thunder Client)


> You can create more users using signup API.

---

##  Setup Instructions

### 1. Clone the project

```bash
git clone <your-repo-url>
cd project-folder
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
MONGO_URL=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm start
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

##  Schema Decisions

### User Schema

* Fields: name, email, password, role
* Role-based system for access control (Student / Trainer / Institution)

### Batch Schema

* Stores:

  * batch name
  * trainerIds
  * studentIds
* Allows mapping of users to batches

### Attendance Schema

* Stores:

  * batchId
  * date
  * records (studentId + status)
* Each document represents **one day attendance per batch**

---

##  Tech Stack

### Backend

* Node.js + Express → simple and fast API creation
* MongoDB → flexible schema for attendance records
* JWT → authentication and protected routes

### Frontend

* React → component-based UI
* Axios → API calls

### Why MongoDB?

* Flexible structure for attendance records
* Easy to store nested student attendance data
* No need for complex joins

---

##  What is Fully Working

* User Authentication (Signup/Login)
* JWT-based Authorization
* Role-based Access Control
* Batch Creation (Trainer)
* Fetch batches based on role
* Attendance Marking via API (Postman/Thunder Client)
* Attendance Fetch (Student sees only their data)
* Attendance Percentage Calculation

---

##  Partially Completed

* Frontend UI is minimal
* Attendance display UI is basic
* No UI for marking attendance (done via API)


##  Skipped Features

* Advanced UI/UX
* Join/Leave batch functionality (handled via backend only)
* Deployment (local environment only)

---

##  Future Improvement

If given more time:

* Build full UI for attendance marking
* Improve dashboard with charts and analytics
* Add real-time updates
* Deploy project (Frontend + Backend)

---

##  Summary

This is a role-based attendance tracking system where:

* Trainers manage batches and mark attendance
* Students view attendance and performance
* Backend handles all core logic securely using JWT
