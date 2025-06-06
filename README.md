# E-Pharmacy - Online Pharmacy Platform

E-Pharmacy is a modern web platform for online pharmacies that allows customers to browse medications, manage their cart, and place orders with ease.

## 🔥 Features

### 🔐 Authentication

- User registration and login
- JWT token-based authentication with automatic refresh
- Protected routes for authenticated users
- Persistent login sessions

### 🏪 Store Management

- Browse nearest pharmacies
- Filter stores by location, status, and rating
- Detailed store information with contact details
- Store ratings and reviews

### 💊 Product Catalog

- Browse extensive medication catalog
- Advanced filtering (category, price range, search)
- Sorting options (name, price, date, category)
- Pagination for large product lists
- Detailed product pages with descriptions and reviews

### 🛒 Shopping Cart

- Add/remove products from cart
- Update product quantities
- Real-time cart updates
- Order summary with delivery calculations
- Secure checkout process

### 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - Mobile: 375px+
  - Tablet: 768px+
  - Desktop: 1440px+

## 🛠 Tech Stack

### Frontend

- **React 19.1.0** - UI library
- **Vite 6.3.5** - Build tool
- **Redux Toolkit** - State management
- **Redux Persist** - State persistence
- **React Router DOM** - Routing
- **Formik + Yup** - Form handling and validation
- **Axios** - HTTP client
- **React Spinners** - Loading indicators
- **React Toastify** - Notifications
- **CSS Modules** - Styling

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB + Mongoose** - Database
- **JWT** - Authentication
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

### Frontend

No environment variables required for development.

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

### Key Components

- **SharedLayout** - Header and footer wrapper
- **ProductFilters** - Advanced product filtering
- **ProductsList** - Product grid display
- **CartItem** - Individual cart item management
- **CheckoutForm** - Order placement form
- **AuthModal** - Authentication prompt for guests

## 🎨 Design System

### Colors

- Primary: `#59b17a` (Green)
- Secondary: `#1d1e21` (Dark)
- Background: `#f7f8fa` (Light gray)
- Text: `#6c757d` (Medium gray)
- Error: `#ef4444` (Red)
- Success: `#28a745` (Green)

### Typography

- Font Family: Inter
- Headings: 600-700 weight
- Body: 400-500 weight

## 🔄 State Management

### Redux Slices

- **authSlice** - User authentication state
- **productsSlice** - Product catalog and filters
- **storesSlice** - Pharmacy stores management
- **cartSlice** - Shopping cart operations
- **reviewsSlice** - Customer reviews

## 🚀 Deployment

### Frontend (Vercel)

```bash
npm run build
# Deploy to Vercel or similar platform
```

### Backend (Render/Railway)

```bash
npm start
# Deploy to your preferred hosting platform
```

## 🧪 Scripts

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend

```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run lint         # Run ESLint
```

## 📄 API Endpoints

### Authentication

- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `GET /api/user/logout` - User logout
- `GET /api/user/user-info` - Get user information
- `POST /api/user/refresh` - Refresh access token

### Products

- `GET /api/products` - Get products with filters
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories` - Get product categories
- `GET /api/products/search` - Search products

### Stores

- `GET /api/stores` - Get all stores
- `GET /api/stores/nearest` - Get nearest stores
- `GET /api/stores/:id` - Get single store
- `GET /api/stores/cities` - Get store cities

### Cart

- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove` - Remove cart item
- `POST /api/cart/checkout` - Place order

### Reviews

- `GET /api/customer-reviews` - Get customer reviews

## 📋 Features Checklist

### ✅ Completed

- [x] User authentication (register/login/logout)
- [x] Protected routes
- [x] Product catalog with filtering
- [x] Shopping cart functionality
- [x] Store listings and details
- [x] Responsive design
- [x] Form validation
- [x] State persistence
- [x] Loading states and error handling
- [x] Toast notifications

### 🔄 Future Enhancements

- [ ] Order history page
- [ ] User profile management
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Payment integration
- [ ] Real-time order tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Team

- **Frontend Developer** - React, Redux, CSS Modules
- **Backend Developer** - Node.js, Express, MongoDB
- **UI/UX Designer** - Design system and user experience

---

**E-Pharmacy** - Making healthcare accessible through technology 🏥💊
