# Expense Tracker – Full Stack Assignment

## Tech Stack

Frontend: React (Vite)  
Backend: Node.js + Express  
Database: SQLite + Prisma ORM  

---

## Features

- Add expense with amount, category, description, and date
- Idempotent expense creation using Idempotency-Key header
- Filter expenses by category
- Sort expenses by newest first
- Total expense calculation
- Loading & empty states
- Basic validation (amount > 0)

---

## Architecture

Client → Express API → Prisma ORM → SQLite DB

The backend is structured using:

routes → controllers → services → database

This separation keeps business logic isolated and maintainable.

---

## Money Handling

All amounts are stored in **paise (integer)** instead of floating point to avoid
precision issues in financial calculations.

Example:

₹200 → 20000 in database

---

## Idempotency

Each create-expense request requires an `Idempotency-Key`.

If the same key is sent again:

- The existing record is returned
- No duplicate entry is created

This ensures safe retries in case of:

- Network failure
- Client refresh
- Double-click submission

---

## API Endpoints

### POST /expenses

Creates a new expense

Headers:
Idempotency-Key: <unique-value>

### GET /expenses

Query params:

- `category` → filter by category
- `sort=date_desc` → newest first

Returns:

- list of expenses
- total amount

---

## Trade-offs & Improvements

Given more time:

- Proper form validation library
- Category dropdown from backend
- Pagination for large datasets
- Authentication & per-user expenses
- Unit & integration tests
- Dockerized deployment

---

## How to Run Locally

### Backend

```
cd server
npm install
npx prisma migrate dev
npm run dev
```
---

### Frontend

cd client
npm install
npm run dev