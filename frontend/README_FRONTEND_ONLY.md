# AsaPhis E-commerce (Frontend Only)

## 🚀 Overview

This project has been converted from a full-stack Next.js application to a **frontend-only** application that connects to a separate backend API. All database logic, API routes, and backend services have been removed and replaced with API client services that communicate with an external backend.

## 🏗️ Architecture Changes

### What Was Removed:
- ✅ All API routes (`app/api/`)
- ✅ Database models (`models/`)
- ✅ Database connection files (`lib/dbConnect.ts`, `lib/mongo.ts`, `config/db.ts`)
- ✅ Background job processing (`inngest/`)
- ✅ Seller admin pages and components
- ✅ Backend-specific middleware
- ✅ Upload handlers and Cloudinary integration
- ✅ Webhook handlers
- ✅ Backend dependencies from package.json

### What Was Added:
- ✅ API client configuration (`config/api.js`)
- ✅ API service layer (`lib/apiServices.js`)
- ✅ Error handling and offline mode support
- ✅ Optimistic updates for better UX
- ✅ Fallback to demo data when API is unavailable

## 🔧 Setup & Installation

### Prerequisites
- Node.js 18.17.0 or higher
- A separate backend API running (see Backend Requirements below)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd Product of Asaphis

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Update .env.local with your backend API URL
# NEXT_PUBLIC_API_URL=https://your-backend-domain.com

# Start development server
npm run dev
```

## 🌐 Backend Requirements

This frontend application expects a backend API running at the URL specified in `NEXT_PUBLIC_API_URL`. The backend should provide the following endpoints:

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `GET /auth/verify` - Token verification

### Product Endpoints
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `GET /products/category/:category` - Get products by category
- `GET /products/search?q=<query>` - Search products

### Category Endpoints
- `GET /categories` - Get all categories

### Cart Endpoints
- `GET /cart` - Get user's cart
- `POST /cart/add` - Add item to cart
- `PUT /cart/update` - Update cart item quantity
- `DELETE /cart/remove/:productId` - Remove item from cart
- `DELETE /cart/clear` - Clear entire cart

### Order Endpoints
- `GET /orders/user/:userId` - Get user's orders
- `POST /orders/create` - Create new order
- `GET /orders/:id` - Get order by ID

### Wishlist Endpoints
- `GET /wishlist` - Get user's wishlist
- `POST /wishlist/add` - Add item to wishlist
- `DELETE /wishlist/remove/:productId` - Remove item from wishlist

### User Profile Endpoints
- `GET /user/profile` - Get user profile
- `PUT /user/profile/update` - Update user profile
- `GET /user/addresses` - Get user addresses
- `POST /user/addresses/add` - Add new address
- `PUT /user/addresses/:id` - Update address
- `DELETE /user/addresses/:id` - Delete address

### Review Endpoints
- `GET /reviews/product/:productId` - Get product reviews
- `POST /reviews/add` - Add a review

## 📁 Project Structure

```
Product of Asaphis/
├── app/                        # Next.js app directory
│   ├── (buyer pages)/          # Customer-facing pages
│   ├── globals.css             # Global styles
│   └── layout.js               # Root layout
├── components/                 # React components
│   ├── buyer/                  # Customer-facing components
│   └── (shared components)     # Shared UI components
├── config/                     # Configuration files
│   └── api.js                  # API client configuration
├── context/                    # React context providers
│   └── AppContext.jsx          # Main application context
├── lib/                        # Utility libraries
│   └── apiServices.js          # API service layer
├── assets/                     # Static assets and dummy data
├── .env.local                  # Environment variables (local)
├── .env.example                # Environment variables template
└── package.json                # Dependencies and scripts
```

## 🔐 Environment Variables

### Required Variables
```bash
# Backend API URL - REQUIRED
NEXT_PUBLIC_API_URL=https://your-backend-api.com

# Currency display
NEXT_PUBLIC_CURRENCY=$

# Clerk Authentication (if using Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_public_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

## 🚀 Deployment

### Frontend Deployment
This frontend can be deployed to any hosting service that supports Next.js:

- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Railway**
- **Digital Ocean App Platform**

### Environment Setup for Production
1. Update `NEXT_PUBLIC_API_URL` to point to your production backend
2. Ensure all authentication keys are properly set
3. Test API connectivity before deployment

### Build Commands
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🛠️ Features

### Customer Features
- ✅ Product browsing and search
- ✅ Shopping cart management
- ✅ Wishlist functionality  
- ✅ Order history and tracking
- ✅ User authentication (Clerk)
- ✅ Responsive design
- ✅ Offline mode with demo data
- ✅ Error handling and loading states

### Developer Features
- ✅ API client with error handling
- ✅ Optimistic updates for better UX
- ✅ Fallback to demo data when API unavailable
- ✅ TypeScript support
- ✅ Tailwind CSS styling
- ✅ Hot reload development

## 🔄 API Integration Guide

### Adding New API Endpoints

1. **Add endpoint to config:**
```javascript
// config/api.js
export const API_ENDPOINTS = {
  // ... existing endpoints
  NEW_ENDPOINT: '/new/endpoint',
};
```

2. **Create service function:**
```javascript
// lib/apiServices.js
export const newService = {
  getData: async () => {
    try {
      return await ApiClient.get(API_ENDPOINTS.NEW_ENDPOINT);
    } catch (error) {
      console.error('Error:', error);
      return { data: [], error: error.message };
    }
  },
};
```

3. **Use in components:**
```javascript
import { newService } from '@/lib/apiServices';

const [data, setData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const result = await newService.getData();
    if (!result.error) {
      setData(result.data);
    }
  };
  fetchData();
}, []);
```

## 🐛 Error Handling

The application includes comprehensive error handling:

- **API Unavailable**: Falls back to demo data with user notification
- **Network Errors**: Graceful error messages with retry suggestions
- **Authentication Errors**: Automatic token cleanup and redirect
- **Optimistic Updates**: Automatic rollback on API failures

## 📱 Offline Support

When the backend API is unavailable, the application will:
1. Display a user-friendly error message
2. Fall back to demo product data
3. Maintain shopping cart in local state
4. Allow browsing of demo products

## 🤝 Contributing

1. Ensure your changes maintain the frontend-only architecture
2. All data operations should go through the API service layer
3. Add appropriate error handling for new features
4. Test offline mode functionality

## 🔧 Troubleshooting

### Common Issues

**API Connection Failed**
- Check if backend API is running
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check for CORS configuration on backend

**Products Not Loading**
- Ensure backend `/products` endpoint is working
- Check browser network tab for API errors
- Verify response format matches expected structure

**Authentication Issues**
- Verify Clerk configuration
- Check if auth tokens are being passed correctly
- Ensure backend accepts the authentication method

### Development Tips

- Use browser DevTools Network tab to monitor API calls
- Check console for detailed error messages
- The app will show demo data if API fails - this is expected behavior
- Cart and wishlist operations are optimistic - they update immediately and sync with API

## 📄 License

[Your License Here]

---

**Important**: This frontend application requires a compatible backend API to function fully. When the backend is unavailable, it operates in demo mode with limited functionality.


