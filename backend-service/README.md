# Backend Service

This is a simple backend service built with **Node.js**, **Express**, and **TypeScript**, designed to handle CRUD operations for posts and todos. The service includes functionalities like paginated data, infinite scrolling, and middleware for adding delays to simulate network latency.

---

## Features

- **CRUD Operations**: Create, Read, Update, and Delete posts and todos.
- **Pagination**: Support for paginated todos.
- **Infinite Scrolling**: Simulate infinite scrolling for todos.
- **Middleware**: Includes delay middleware to simulate network delays.
- **TypeScript**: Written entirely in TypeScript for type safety and maintainability.
- **Express**: Lightweight and robust backend framework.
- **CORS**: Cross-origin resource sharing enabled for frontend integration.

---

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js**: v14 or later
- **npm**: v7 or later
- **TypeScript**: Globally installed (optional, but recommended)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/MOHI-UDDIN-AKBAR/react-query-playbook.git
   cd backend-service
   ```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev
```

The server will run at `http://localhost:3000.`

## API Endpoints

### Todos

1. Get All Todos
   `GET /api/todos`

2. Get Single Todo by ID
   `GET /api/todos/:todoId`

3. Get Todos by Pagination
   `GET /api/todos/per/page?page=<page>&limit=<limit>`

4. Infinite Scrolling for Todos
   `GET /api/todos/infinite/page?page=<page>&limit=<limit>`

5. Create a New Todo
   `POST /api/todos`

Body: { title: string, completed: boolean }

6. Update an Existing Todo
   `PUT /api/todos/:todoId`

Body: { id: number, title: string, completed: boolean }

7. Delete a Todo
   `DELETE /api/todos/:todoId`

### Posts

1. Get All Posts
   `GET /api/posts`

2. Get Single Post by ID
   `GET /api/posts/:postId`

3. Create a New Post
   `POST /api/posts`

Body: { title: string, body: string }

## Project Structure

src
├── app.ts # Application setup and middleware
├── controllers # Controllers for posts and todos
│ ├── postController.ts
│ ├── todoController.ts
├── data # Mock data for posts and todos
│ ├── posts.ts
│ ├── todos.ts
├── middlewares # Middleware (e.g., delay simulation)
│ ├── delayMiddleware.ts
├── models # TypeScript type definitions
│ ├── PostType.ts
│ ├── TodoType.ts
├── routes # API route definitions
│ ├── postRoutes.ts
│ ├── todoRoutes.ts
├── utils # Utility functions
│ ├── index.ts
├── server.ts # Server entry point

## Middleware

    Delay Middleware: Simulates a 500ms network delay for all requests.

## Utilities

    hasAllPropertiesValue: A generic utility to validate if an object has all properties with non-empty values.

## Mock Data

### Todos (src/data/todos.ts)

A small array of todos with the following structure:

```
{
  id: number;
  title: string;
  completed: boolean;
}
```

### Posts (src/data/posts.ts)

A small array of posts with the following structure:

```
{
  id: number;
  title: string;
  body: string;
}
```

## Development

### Scripts

`npm run dev`: Starts the server in development mode using nodemon.

## Contributions

Feel free to fork the project and submit a pull request for improvements or bug fixes. 😊
