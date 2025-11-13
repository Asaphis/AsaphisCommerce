// API Configuration for Frontend-Only App
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  VERIFY_TOKEN: '/auth/verify',

  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: '/products/:id',
  PRODUCTS_BY_CATEGORY: '/products/category/:category',
  SEARCH_PRODUCTS: '/products/search',

  // Categories
  CATEGORIES: '/categories',

  // Cart
  CART: '/cart',
  ADD_TO_CART: '/cart/add',
  UPDATE_CART: '/cart/update',
  REMOVE_FROM_CART: '/cart/remove',
  CLEAR_CART: '/cart/clear',

  // Orders
  ORDERS: '/orders',
  CREATE_ORDER: '/orders/create',
  ORDER_BY_ID: '/orders/:id',
  USER_ORDERS: '/orders/user/:userId',

  // Wishlist
  WISHLIST: '/wishlist',
  ADD_TO_WISHLIST: '/wishlist/add',
  REMOVE_FROM_WISHLIST: '/wishlist/remove',

  // User Profile
  USER_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile/update',
  USER_ADDRESSES: '/user/addresses',
  ADD_ADDRESS: '/user/addresses/add',
  UPDATE_ADDRESS: '/user/addresses/:id',
  DELETE_ADDRESS: '/user/addresses/:id',

  // Reviews
  REVIEWS: '/reviews',
  ADD_REVIEW: '/reviews/add',
  PRODUCT_REVIEWS: '/reviews/product/:productId',
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint, params = {}) => {
  let url = API_BASE_URL + endpoint;
  
  // Replace URL parameters like :id with actual values
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });
  
  return url;
};

// API Client with error handling
export class ApiClient {
  static async request(endpoint, options = {}) {
    const url = typeof endpoint === 'string' ? 
      buildApiUrl(endpoint) : 
      buildApiUrl(endpoint.path, endpoint.params);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = typeof window !== 'undefined' ? 
      localStorage.getItem('authToken') : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 503) {
          throw new Error('Service temporarily unavailable. Please try again later.');
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }
      throw error;
    }
  }

  static async get(endpoint, params = {}) {
    return this.request(endpoint, { method: 'GET' });
  }

  static async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  static async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

