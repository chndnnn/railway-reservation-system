# Railway Reservation System

A full-stack railway reservation application with a React frontend and a Java Spring Boot backend.

> **Current status:** Initial project setup and the backend health-check API are working. PostgreSQL and Spring Data JPA are intentionally postponed until the database phase.

## Tech stack

### Frontend
- React
- Vite
- JavaScript

### Backend
- Java 21
- Spring Boot 3.5.7
- Maven
- Spring Web
- Spring Boot Validation
- Lombok

### Planned
- PostgreSQL
- Spring Data JPA

## Repository structure

```text
railway-reservation-system/
├── frontend/                  # React + Vite application
├── backend/                   # Spring Boot REST API
│   ├── src/
│   ├── pom.xml
│   └── mvnw / mvnw.cmd
├── docs/                      # Project documentation
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js and npm
- Java Development Kit (JDK) 21
- Git

The backend includes Maven Wrapper scripts, so a separate Maven installation is not required.

## Run locally

Run the frontend and backend in separate terminal windows, starting from the repository root.

### 1. Backend

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Backend base URL: `http://localhost:8080`

Health-check endpoint:

```http
GET http://localhost:8080/api/health
```

Expected response:

```json
{
  "status": "UP",
  "message": "Railway Reservation Backend is running!"
}
```

Stop the backend with `Ctrl + C`.

### 2. Frontend

In a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Vite normally serves the frontend at `http://localhost:5173`.

Stop the frontend with `Ctrl + C`.

## Current API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Checks whether the backend is running |

## Development roadmap

- [x] Create the monorepo structure
- [x] Set up React with Vite
- [x] Set up Spring Boot with Java 21
- [x] Create the backend health-check API
- [ ] Connect React frontend to Spring Boot backend
- [ ] Design the train-search API
- [ ] Add PostgreSQL and Spring Data JPA
- [ ] Implement train and station management
- [ ] Implement user registration and authentication
- [ ] Implement seat availability and booking
- [ ] Add booking history and cancellation

## Notes

- Never commit passwords, API keys, tokens, or local `.env` files.
- Keep frontend and backend running in separate terminals during development.
- Update this README as features and setup requirements change.
