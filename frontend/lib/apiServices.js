// API Services for Frontend Data Access
import { ApiClient, API_ENDPOINTS, buildApiUrl } from '../config/api';

// Product Services
export const productService = {
  // Get all products
  getProducts: async () => {
    try {
      return await ApiClient.get(API_ENDPOINTS.PRODUCTS);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Return empty array with error flag for graceful handling
      return { products: [], error: error.message };
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      return await ApiClient.get(API_ENDPOINTS.PRODUCT_BY_ID, { id });
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      return await ApiClient.get(API_ENDPOINTS.PRODUCTS_BY_CATEGORY, { category });
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      return { products: [], error: error.message };
    }
  },

  // Search products
  searchProducts: async (query) => {
    try {
      const url = `${API_ENDPOINTS.SEARCH_PRODUCTS}?q=${encodeURIComponent(query)}`;
      return await ApiClient.get(url);
    } catch (error) {
      console.error(`Error searching products for "${query}":`, error);
      return { products: [], error: error.message };
    }
  },
};

// Category Services
export const categoryService = {
  getCategories: async () => {
    try {
      return await ApiClient.get(API_ENDPOINTS.CATEGORIES);
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { categories: [], error: error.message };
    }
  },
};

// Cart Services
export const cartService = {
  // Get user's cart
  getCart: async () => {
    try {
      return await ApiClient.get(API_ENDPOINTS.CART);
    } catch (error) {
      console.error('Error fetching cart:', error);
      return { items: {}, error: error.message };
    }
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    try {
      return await ApiClient.post(API_ENDPOINTS.ADD_TO_CART, {
        productId,
        quantity,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  // Update cart item quantity
  updateCartQuantity: async (productId, quantity) => {
    try {
      return await ApiClient.put(API_ENDPOINTS.UPDATE_CART, {
        productId,
        quantity,
      });
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  },

  // Remove item from cart
  removeFromCart: async (productId) => {
    try {
      return await ApiClient.delete(`${API_ENDPOINTS.REMOVE_FROM_CART}/${productId}`);
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  // Clear entire cart
  clearCart: async () => {
    try {
      return await ApiClient.delete(API_ENDPOINTS.CLEAR_CART);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },
};

// Wishlist Services
export const wishlistService = {
  // Get user's wishlist
  getWishlist: async () => {
    try {
      return await ApiClient.get(API_ENDPOINTS.WISHLIST);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      return { items: {}, error: error.message };
    }
  },

  // Add item to wishlist
  addToWishlist: async (productId) => {
    try {
      return await ApiClient.post(API_ENDPOINTS.ADD_TO_WISHLIST, { productId });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  },

  // Remove item from wishlist
  removeFromWishlist: async (productId) => {
    try {
      return await ApiClient.delete(`${API_ENDPOINTS.REMOVE_FROM_WISHLIST}/${productId}`);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  },
};

// Order Services
export const orderService = {
  // Get user's orders
  getUserOrders: async (userId) => {
    try {
      return await ApiClient.get(API_ENDPOINTS.USER_ORDERS, { userId });
    } catch (error) {
      console.error('Error fetching user orders:', error);
      return { orders: [], error: error.message };
    }
  },

  // Create new order
  createOrder: async (orderData) => {
    try {
      return await ApiClient.post(API_ENDPOINTS.CREATE_ORDER, orderData);
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    try {
      return await ApiClient.get(API_ENDPOINTS.ORDER_BY_ID, { id: orderId });
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      throw error;
    }
  },
};

// User Services
export const userService = {
  // Get user profile
  getProfile: async () => {
    try {
      return await ApiClient.get(API_ENDPOINTS.USER_PROFILE);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return { user: null, error: error.message };
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      return await ApiClient.put(API_ENDPOINTS.UPDATE_PROFILE, profileData);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Get user addresses
  getAddresses: async () => {
    try {
      return await ApiClient.get(API_ENDPOINTS.USER_ADDRESSES);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      return { addresses: [], error: error.message };
    }
  },

  // Add new address
  addAddress: async (addressData) => {
    try {
      return await ApiClient.post(API_ENDPOINTS.ADD_ADDRESS, addressData);
    } catch (error) {
      console.error('Error adding address:', error);
      throw error;
    }
  },

  // Update address
  updateAddress: async (addressId, addressData) => {
    try {
      return await ApiClient.put(API_ENDPOINTS.UPDATE_ADDRESS, addressData, { id: addressId });
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  },

  // Delete address
  deleteAddress: async (addressId) => {
    try {
      return await ApiClient.delete(API_ENDPOINTS.DELETE_ADDRESS, { id: addressId });
    } catch (error) {
      console.error('Error deleting address:', error);
      throw error;
    }
  },
};

// Review Services
export const reviewService = {
  // Get reviews for a product
  getProductReviews: async (productId) => {
    try {
      return await ApiClient.get(API_ENDPOINTS.PRODUCT_REVIEWS, { productId });
    } catch (error) {
      console.error(`Error fetching reviews for product ${productId}:`, error);
      return { reviews: [], error: error.message };
    }
  },

  // Add a review
  addReview: async (reviewData) => {
    try {
      return await ApiClient.post(API_ENDPOINTS.ADD_REVIEW, reviewData);
    } catch (error) {
      console.error('Error adding review:', error);
      throw error;
    }
  },
};

// Auth Services (for token management)
export const authService = {
  // Login
  login: async (credentials) => {
    try {
      const response = await ApiClient.post(API_ENDPOINTS.LOGIN, credentials);
      
      // Store token in localStorage if provided
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      
      return response;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Register
  register: async (userData) => {
    try {
      const response = await ApiClient.post(API_ENDPOINTS.REGISTER, userData);
      
      // Store token in localStorage if provided
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      
      return response;
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      await ApiClient.post(API_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      // Always remove token from localStorage
      localStorage.removeItem('authToken');
    }
  },

  // Verify token
  verifyToken: async () => {
    try {
      return await ApiClient.get(API_ENDPOINTS.VERIFY_TOKEN);
    } catch (error) {
      console.error('Error verifying token:', error);
      // Remove invalid token
      localStorage.removeItem('authToken');
      throw error;
    }
  },

  // Get stored token
  getToken: () => {
    return typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!authService.getToken();
  },
};

