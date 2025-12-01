# Dynamic Forms Backend (Node.js + MongoDB)

## Running the project 
1. `npm install`

2. Create `.env` in root add three keys (PORT,MONGO_URI,JWT_SECRET)

3. `npm run dev`

## Notes
- Admin-only endpoints require `Authorization: Bearer <token>` with a JWT returned by login.

