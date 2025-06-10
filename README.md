# 💊 E-Pharmacy - Your Digital Healthcare Companion

<div align="center">
Making healthcare accessible through technology 🏥💊
</div>

## 🌟 Overview

E-Pharmacy is a modern, full-stack web application that revolutionizes the way people access medications and pharmacy services. Built with cutting-edge technologies, it provides a seamless experience for browsing medicines, managing orders, and connecting with local pharmacies.

### 🎯 Mission: To bridge the gap between patients and pharmacies through intuitive digital solutions.

## ✨ Key Features

### 🔐 Smart Authentication System

- Secure JWT-based login/registration
- Protected routes and persistent sessions
- Auto-logout on token expiration
- User profile management

### 🏪 Pharmacy Network

- Discover Nearby Stores - Find pharmacies in your area
- Store Ratings & Reviews - Make informed decisions
- Real-time Status - Know which stores are open
- Contact Integration - Direct phone calls and map navigation

### 💊 Advanced Medicine Catalog

- Smart Search - Find medicines by name, category, or supplier
- Dynamic Filtering - Category-based filtering with real-time results
- Detailed Product Pages - Complete medicine information with reviews
- Stock Management - Real-time inventory tracking

### 🛒 Intelligent Shopping Cart

- Real-time Updates - Instant cart synchronization
- Stock Validation - Prevent overselling with live inventory checks
- Smart Calculations - Automatic totals with delivery fees
- Persistent Cart - Your items saved across sessions

### 📱 Responsive Design Excellence

- Mobile-first approach
- Breakpoints:
  - Mobile: 375px+
  - Tablet: 768px+
  - Desktop: 1440px+

## 🛠 Tech Stack

### Frontend

- **React 19.1.0** - Modern UI library with latest features
- **Redux Toolkit** - Efficient state management
- **React Router DOM** - Declarative routing
- **Vite 6.3.5** - Lightning-fast build tool
- **Formik + Yup** - Form handling and validation
- **Axios** - HTTP client with interceptors
- **CSS Modules** - Component-scoped styling

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB + Mongoose** - Database
- **Bcrypt** - Password hashing
- **Joi** - Server-side validation

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB database

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Configure your environment variables in .env
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🔧 Environment Variables

### Backend (.env)

```env
PORT=3000
MONGODB_USER=your_mongodb_user
MONGODB_PASSWORD=your_mongodb_password
MONGODB_URL=your_mongodb_cluster_url
MONGODB_DB=e_pharmacy
```

## 📱 Pages & Components

### Public Pages

- **HomePage** - Landing page with store previews and reviews
- **RegisterPage** - User registration
- **LoginPage** - User authentication
- **MedicineStorePage** - Browse all pharmacies
- **ProductPage** - Detailed product information

### Protected Pages

- **MedicinePage** - Product catalog with filters
- **CartPage** - Shopping cart and checkout

## 🎨 Design System

### Typography

- Font Family: Inter
- Headings: 600-700 weight
- Body: 400-500 weight

## 📄 API Endpoints

### Authentication

- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `GET /api/user/logout` - User logout
- `GET /api/user/user-info` - Get user information
- `POST /api/user/refresh` - Refresh access token

### Products & Stores

- `GET /api/products` - Get products with filters
- `GET /api/products/:id` - Get single product
- `GET /api/stores` - Get all stores
- `GET /api/stores/nearest` - Get nearest stores

### Shopping Cart

- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove` - Remove cart item
- `POST /api/cart/checkout` - Place order

### Reviews

- `GET /api/customer-reviews` - Get customer reviews

## 📝 License

This project is licensed under the MIT License.

---

**E-Pharmacy** - Making healthcare accessible through technology 🏥💊
