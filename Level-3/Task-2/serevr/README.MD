# Project Management Tool Backend

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Add your MongoDB URI to `.env`:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/projectdb
   ```

3. Run the server:
   ```bash
   npm run dev
   ```

4. Base API URL:
   ```
   http://localhost:5000/api
   ```

## Routes
- `GET /api/projects`
- `GET /api/projects/:id`
- `POST /api/projects`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
