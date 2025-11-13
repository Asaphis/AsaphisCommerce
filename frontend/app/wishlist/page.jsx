'use client'
import React from "react";
import Navbar from "@/components/buyer/Navbar";
import Footer from "@/components/buyer/Footer";
import ProductCard from "@/components/buyer/ProductCard";
import { useAppContext } from "@/context/AppContext";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

const WishlistPage = () => {
  const { products, wishlistItems, addToCart, addToWishlist } = useAppContext();

  // Get products that are in the wishlist
  const wishlistProducts = products.filter(product => wishlistItems[product._id]);

  const handleAddToCart = (productId) => {
    addToCart(productId);
    // Optionally remove from wishlist when added to cart
    // addToWishlist(productId);
  };

  const handleRemoveFromWishlist = (productId) => {
    addToWishlist(productId); // This will remove it since it's already in wishlist
  };

  if (wishlistProducts.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50">
          <div className="px-6 md:px-16 lg:px-32 py-16">
            <div className="text-center">
              <div className="mb-6">
                <FiHeart className="w-16 h-16 text-gray-400 mx-auto" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Save items you love for later. Start shopping and add items to your wishlist!
              </p>
              <button 
                onClick={() => window.location.href = '/categories'}
                className="bg-orange-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="px-6 md:px-16 lg:px-32 py-8">
            <div className="flex items-center mb-2">
              <FiHeart className="w-8 h-8 text-orange-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            </div>
            <p className="text-gray-600">
              {wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} saved for later
            </p>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="px-6 md:px-16 lg:px-32 py-8">
          {/* Wishlist Actions */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <button className="text-orange-600 font-medium hover:text-orange-700">
                Move all to cart
              </button>
              <button className="text-gray-600 font-medium hover:text-gray-700">
                Clear wishlist
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: Today
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <div key={product._id} className="relative">
                <ProductCard product={product} />
                
                {/* Wishlist Actions Overlay */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={() => handleRemoveFromWishlist(product._id)}
                    className="bg-white shadow-md p-2 rounded-full text-red-500 hover:bg-red-50 transition-colors"
                    title="Remove from wishlist"
                  >
                    <FiHeart className="w-4 h-4 fill-current" />
                  </button>
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="bg-white shadow-md p-2 rounded-full text-orange-600 hover:bg-orange-50 transition-colors"
                    title="Add to cart"
                  >
                    <FiShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Wishlist Tips */}
          <div className="mt-12 bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Wishlist Tips</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div>
                <div className="font-medium text-gray-900 mb-1">Price Alerts</div>
                <p>We'll notify you when items in your wishlist go on sale</p>
              </div>
              <div>
                <div className="font-medium text-gray-900 mb-1">Stock Notifications</div>
                <p>Get alerts when out-of-stock items become available</p>
              </div>
              <div>
                <div className="font-medium text-gray-900 mb-1">Share Lists</div>
                <p>Share your wishlist with friends and family</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="px-6 md:px-16 lg:px-32 py-12 bg-white">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishlistPage;

