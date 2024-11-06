# NextAuth Authentication System

This project is a simple authentication system built with Next.js and NextAuth.js. It includes user registration, login, and protected routes.

## Features

- User registration with email and password
- User login with email and password
- Protected routes that require authentication
- Session management with JWT
- MongoDB for user data storage

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/myildiz97/authentication.git
   cd your-repo-name
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```env
   DATABASE_URL=mongodb://localhost:27017/your-database-name
   NEXTAUTH_SECRET=your-nextauth-secret
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

- `DATABASE_URL`: MongoDB connection string
- `NEXTAUTH_SECRET`: Secret key for NextAuth