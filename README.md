# 📚 MLMS - Minimal Library Management System

A full-stack library management application built with React, TypeScript, Redux Toolkit, Express.js, and MongoDB.

##  Features

- **Book Management**: Create, read, update, and delete books
- **Borrow System**: Borrow books with quantity and due date validation
- **Borrow Summary**: View aggregated borrowing statistics
- **Real-time Updates**: Automatic UI updates using RTK Query
- **Dark Theme UI**: Modern, clean interface
- **Form Validation**: Type-safe forms with error handling
- **Toast Notifications**: User-friendly feedback system

##  Tech Stack

**Frontend:**
- React 18 + TypeScript
- Redux Toolkit + RTK Query
- React Hook Form
- Tailwind CSS
- Lucide Icons
- Sonner (Toast notifications)
- Vite

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- TypeScript
- CORS enabled

##  Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **MongoDB** 

##  Installation & Setup

### Step 1: Clone or Download the Project

```bash
# If using Git
git clone (https://github.com/SAIFZaman007/minimal_library_management_system)
cd MLMS

# Or extract the zip file and navigate to the project folder
```

### Step 2: Backend Setup

#### 2.1 Navigate to Backend Directory
```bash
cd backend
```

#### 2.2 Install Dependencies
```bash
npm install
```

#### 2.3 Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
# For Windows
copy .env.example .env

# For Mac/Linux
cp .env.example .env
```

Edit the `.env` file with your configuration:

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/mlms
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mlms
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

#### 2.4 Start Backend Server
```bash
npm run dev
```

You should see:
```
 MongoDB Connected: localhost
 Server is running on port 5000
 Environment: development
```

**Keep this terminal running!**

---

### Step 3: Frontend Setup

#### 3.1 Open a New Terminal and Navigate to Frontend
```bash
cd frontend
```

#### 3.2 Install Dependencies
```bash
npm install
```

#### 3.3 Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
# For Windows
copy .env.example .env

# For Mac/Linux
cp .env.example .env
```

The `.env` file should contain:
```env
VITE_API_URL=http://localhost:5000/api
```

#### 3.4 Start Frontend Development Server
```bash
npm run dev
```

You should see:
```
VITE v5.1.4  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

### Step 4: Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

##  Usage Guide

### Adding a Book
1. Click the **"Add Book"** button
2. Fill in the form:
   - Title (required)
   - Author (required)
   - Genre (required)
   - ISBN (required)
   - Description (optional)
   - Number of Copies (required, default: 1)
3. Click **"Add Book"** to save

### Editing a Book
1. Click the **pencil icon** on any book card
2. Update the book details
3. Click **"Update Book"** to save changes

### Deleting a Book
1. Click the **trash icon** on any book card
2. Confirm the deletion in the dialog

### Borrowing a Book
1. Click the **book icon** on an available book
2. Enter:
   - Quantity (cannot exceed available copies)
   - Due Date (must be in the future)
3. Click **"Borrow Book"**
4. The system will automatically redirect to Borrow Summary

### Viewing Borrow Summary
1. Click **"Borrow Summary"** in the navbar
2. View all borrowed books with total quantities
3. Click the **X** to close the modal

##  Business Logic

### Automatic Book Availability
- When **copies = 0**, the book is automatically marked as **unavailable**
- When **copies > 0**, the book is marked as **available**
- This is handled automatically by the backend

### Borrow Validation
-  Quantity cannot exceed available copies
-  Due date must be in the future
-  Book must be available to borrow
-  Book copies are reduced after borrowing
-  Book becomes unavailable when copies reach 0

##  Available Scripts

### Backend Scripts
```bash
npm run dev      # Start development server with auto-reload
npm run build    # Compile TypeScript to JavaScript
npm start        # Run production server
```

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

##  API Endpoints

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

### Borrows
- `POST /api/borrows` - Create borrow record
- `GET /api/borrows` - Get all borrows
- `GET /api/borrows/summary` - Get aggregated summary

##  Production Deployment

### Backend Deployment (Railway/Render)
1. Push code to GitHub
2. Connect repository to hosting service
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variable: `VITE_API_URL=<your-backend-url>`

##  Environment Variables Reference

### Backend (.env)
```env
MONGODB_URI=<your-mongodb-connection-string>
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

##  Notes

- All data is stored in MongoDB
- No authentication required (as per project requirements)
- Books with ISBN already exist cannot be added again
- Borrowed books history is tracked in the database

---

**Made with ❤️ using React, TypeScript, Express, and MongoDB**

---

## Quick Reference Commands

# Access Application
http://localhost:5173
```

🎉 **Enjoy using MLMS!**
