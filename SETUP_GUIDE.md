# MERN Admin Project - Setup & Run Guide

## 📋 Prerequisites

Before starting, ensure you have the following installed:
- **Node.js** (v14.x or higher recommended, though v24.x works)
- **npm** (comes with Node.js)
- **MongoDB Atlas account** (or local MongoDB instance)

## ✅ Setup Complete!

The project has been fully set up with:
- ✅ Environment variables configured (`.variables.env`)
- ✅ Backend dependencies installed
- ✅ Frontend dependencies installed
- ✅ Admin user already exists in database

## 🚀 How to Run the Project

### Step 1: Start the Backend Server

Open a terminal and run:

```bash
cd /Users/saad/Desktop/Semester-5/SQA/Final-project/mern-admin
npm start
```

**OR** for development with auto-reload:

```bash
npm run dev
```

The backend server will start on **port 8888** (as configured in `.variables.env`).

You should see:
```
Express running → On PORT : 8888
```

### Step 2: Start the Frontend Application

Open a **NEW terminal window** and run:

```bash
cd /Users/saad/Desktop/Semester-5/SQA/Final-project/mern-admin/frontend
npm start
```

The React development server will start and automatically open your browser at `http://localhost:3000`.

## 🔐 Default Login Credentials

The admin user has been created with the following credentials:

- **Email:** `admin@demo.com`
- **Password:** `123456`

## 📁 Project Structure

```
mern-admin/
├── .variables.env          # Environment variables (DATABASE, PORT, JWT secrets)
├── server.js               # Backend server entry point
├── app.js                  # Express app configuration
├── models/                 # MongoDB models (Admin, Client, Lead, Product)
├── controllers/            # API controllers
├── routes/                 # API routes
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── pages/          # React pages (Login, Dashboard, etc.)
│   │   ├── components/     # Reusable components
│   │   ├── config/         # API configuration
│   │   └── ...
│   └── package.json
└── package.json            # Backend dependencies
```

## 🔧 Configuration Files

### Backend Environment (`.variables.env`)
- `DATABASE`: MongoDB connection string
- `PORT`: Backend server port (8888)
- `JWT_SECRET`: Secret key for JWT tokens
- `SECRET` & `KEY`: Session secrets

### Frontend API Config (`frontend/src/config/serverApiConfig.js`)
- Automatically configured to use `http://localhost:8888/api/` in development
- Uses remote API in production

## 🛠️ Available Scripts

### Backend Scripts (root directory)
- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon (auto-reload)
- `npm run setup` - Create default admin user (already done)

### Frontend Scripts (frontend directory)
- `npm start` - Start React development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 🌐 Accessing the Application

1. **Frontend:** http://localhost:3000
2. **Backend API:** http://localhost:8888/api/

## 📝 Important Notes

1. **Two Terminal Windows Required**: You need to run both backend and frontend servers simultaneously.

2. **Database Connection**: The MongoDB connection string is already configured in `.variables.env`. Make sure your MongoDB Atlas cluster is accessible.

3. **Port Configuration**: 
   - Backend runs on port **8888**
   - Frontend runs on port **3000** (default React port)

4. **Admin User**: If you need to recreate the admin user, you can run `npm run setup` again, but note that it will fail if the user already exists (which is fine).

## 🐛 Troubleshooting

### Backend won't start
- Check if port 8888 is already in use
- Verify MongoDB connection string in `.variables.env`
- Ensure all dependencies are installed: `npm install`

### Frontend won't start
- Check if port 3000 is already in use
- Ensure you're in the `frontend` directory
- Verify all dependencies are installed: `cd frontend && npm install`
- **Node.js v17+ Compatibility**: If you see `error:0308010C:digital envelope routines::unsupported`, the scripts have been updated to use the legacy OpenSSL provider. This is automatically handled in the npm scripts.

### Database Connection Issues
- Verify your MongoDB Atlas connection string
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure the database name in the connection string matches your cluster

### Login Issues
- Use the default credentials: `admin@demo.com` / `123456`
- Check browser console for API errors
- Verify backend server is running on port 8888

## 🎯 Next Steps

1. Start both servers (backend and frontend)
2. Navigate to http://localhost:3000
3. Login with the admin credentials
4. Explore the dashboard and CRUD operations

## 📚 Features

- **Authentication**: JWT-based authentication
- **Admin Management**: Create, read, update, delete admins
- **CRUD Operations**: Generic CRUD for Clients, Leads, Products
- **Dashboard**: Beautiful UI with Ant Design components
- **Redux State Management**: Centralized state management

---

**Happy Coding! 🚀**

