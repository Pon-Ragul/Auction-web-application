# BidCraze — Fullstack Auction App

BidCraze is a fullstack online auction application (React frontend + Node/Express backend + MongoDB). This README covers setup, development, and deployment for the entire repository.

## Table of contents
- Project structure
- Requirements
- Quick start (local)
- Backend (API)
- Frontend (Client)
- Environment variables
- Scripts
- Testing
- Deployment
- Contributing
- License
- References

## Project structure
Relevant paths (root = BidCraze-app/)
- package.json — workspace scripts & deps
- README.md — this file
- src/ — React source code (components, pages, assets)
- public/ — static public assets
- Backend/ — Node/Express API, routes, controllers, models

Example backend files:
- Backend/server.js — server bootstrap + socket.io
- Backend/route/route.js — registered API routes
- Backend/controller/controller.js — request handlers
- Backend/model/model.js — Mongoose schemas

## Requirements
- Node.js 
- npm 
- MongoDB (local or cloud)

## Quick start (local, Windows)
1. Open a terminal in the project root:
   cd "c:\Users\USER\OneDrive\Documents\React\BidCraze-app"

2. Install frontend deps:
   npm install

3. Install backend deps:
   cd Backend
   npm install
   cd ..

4. Configure environment variables (see next section).

5. Start backend (in one terminal):
   cd Backend
   npm run dev    # or: node server.js (depends on setup)

6. Start frontend (in another terminal from project root):
   npm start

Frontend default: http://localhost:3000
Backend default: http://localhost:3001 (adjust PORT in .env if different)


## Backend (API)
- Entry: Backend/server.js
- Typical endpoints:
  - POST /signup
  - POST /login
  - POST /auctionitems (create auction, may accept multipart/form-data for images)
  - GET /auctionitems
  - GET /auctionitems/:id
  - Other user-specific endpoints (sold/won items, etc.)

Socket.io is initialized in server.js to handle realtime bidding events. See controller and route files for full behavior and payload shapes.

## Frontend (Client)
- Entry: src/index.js and src/App.js
- Uses React Router and components in src/components/
- Axios (or fetch) calls the backend API (default backend origin should match server PORT)

If the client expects a different API base URL, update it in environment or axios config used by the client.

## Scripts
Check package.json files (root and Backend/) for available scripts. Typical commands:
- npm start — run React dev server
- npm run build — build production bundle
- Backend may include: npm run dev (nodemon), npm start

## Testing
- Frontend: npm test (Create React App testing setup)
- Backend: add unit & integration tests (not included by default)

## Deployment
- Build frontend:
  npm run build
  Serve the produced build/ static files from a static host or from an Express static route in Backend.

- Backend: deploy to a Node host (Heroku, render, VPS). Ensure MONGO_URI points to a production DB and JWT_SECRET is set.

- For combined deploy, configure the backend to serve the frontend build and set proper CORS/origin settings during development.

## License
Add LICENSE file or specify license here.

## Author

**Pon Ragul**
- GitHub: [@Pon-Ragul](https://github.com/Pon-Ragul)

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch 
3. Commit your changes 
4. Push to the branch 
5. Open a Pull Request

