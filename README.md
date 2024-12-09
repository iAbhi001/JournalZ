# Journalify

## Project Overview
Journalify is a journaling application that allows users to create, edit, and manage their personal journals. It includes user authentication, admin capabilities, and various features like public and private journals.

## Tech Stack
- Frontend: React, Material-UI, Vite
- Backend: Node.js, Express, MongoDB
- Testing: Cypress (Frontend), Jest and Supertest (Backend)
- Database: MongoDB
- Authentication: JWT, Cookies
- Styling: Material-UI (MUI)

### Prerequisites
Make sure you have the following installed on your system:

- Node.js (v16 or above)
- npm (comes with Node.js) or Yarn
- MongoDB (local instance or cloud database)
- Git (optional, for cloning the repository)


Journalify: README
Table of Contents
Project Overview
Tech Stack
Prerequisites
Installation
Backend Setup
Frontend Setup
Running the Project
Testing
Project Structure
Project Overview
Journalify is a journaling application that allows users to create, edit, and manage their personal journals. It includes user authentication, admin capabilities, and various features like public and private journals.

Tech Stack
Frontend: React, Material-UI, Vite
Backend: Node.js, Express, MongoDB
Testing: Cypress (Frontend), Jest and Supertest (Backend)
Database: MongoDB
Authentication: JWT, Cookies
Styling: Material-UI (MUI)
Prerequisites
Make sure you have the following installed on your system:


### Installation
Clone the repository:
```bash
git clone https://github.com/iAbhi001/JournalZ.git
```
  
Navigate to the project directory:
```bash
cd JournalZ
 ```

Backend Setup
Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm start
```
The backend server should now be running at http://localhost:5000.

## Frontend Setup
Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm run dev
```

Set up backend API URL:

```bash
cd src/api/axios.js
```

change the following url:
```bash
  baseURL: "http://localhost:5000/api", // Replace with your backend's base URL
```

### Running the Project
Start the backend server:

```bash
cd backend
npm start
```

Start the frontend server:

```bash
cd frontend
npm run dev
```
Open http://localhost:5173 in your browser to access the application.

## Testing
### Frontend Testing (Cypress)
Run the frontend dev server:

```bash
npm run dev
```
Open Cypress:

```bash
npx cypress open

```

Select a test file (e.g., login.cy.js) to run tests in the Cypress interface.

### Backend Testing (Jest & Supertest)
Run the tests:

```bash
cd backend
npm test
```