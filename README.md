# AgileIT_BE

A Node.js backend application using MongoDB as the database.

## Features

- RESTful API endpoints
- MongoDB integration via Mongoose
- User authentication (JWT)
- CRUD operations

## Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/)

## Installation

```bash
git clone https://github.com/pranav605/agileIT_BE.git
cd agileIT_BE
npm install
```

## Configuration

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agileIT_BE
JWT_SECRET=your_jwt_secret
```

## Running the Application

```bash
npm run dev
```
<!-- 
## API Endpoints

| Method | Endpoint         | Description         |
|--------|------------------|--------------------|
| GET    | /api/items       | Get all items      |
| POST   | /api/items       | Create new item    |
| PUT    | /api/items/:id   | Update an item     |
| DELETE | /api/items/:id   | Delete an item     | -->

## License

MIT