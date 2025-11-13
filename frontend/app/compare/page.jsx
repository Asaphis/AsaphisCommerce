'use client'
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/buyer/Navbar";
import Footer from "@/components/buyer/Footer";
import { useAppContext } from "@/context/AppContext";
import { FiX, FiPlus, FiShoppingCart, FiHeart, FiStar } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

const ComparePageContent = () => {
  const searchParams = useSearchParams();
  const { products, addToCart, addToWishlist, isInWishlist, currency } = useAppContext();
  
  const [compareProducts, setCompareProducts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Get product IDs from URL parameters
    const productIds = searchParams.get('products')?.split(',') || [];
    const productsToCompare = products.filter(product => productIds.includes(product._id));
    setCompareProducts(productsToCompare);
    
    // Set available products for adding (excluding already compared ones)
    setAvailableProducts(products.filter(product => !productIds.includes(product._id)));
  }, [products, searchParams]);

  const removeProduct = (productId) => {
    const updatedProducts = compareProducts.filter(product => product._id !== productId);
    setCompareProducts(updatedProducts);
    
    // Update URL
    const newProductIds = updatedProducts.map(p => p._id).join(',');
    window.history.replaceState({}, '', `/compare${newProductIds ? `?products=${newProductIds}` : ''}`);
  };

  const addProduct = (product) => {
    if (compareProducts.length < 4) {
      const updatedProducts = [...compareProducts, product];
      setCompareProducts(updatedProducts);
      
      // Update URL
      const newProductIds = updatedProducts.map(p => p._id).join(',');
      window.history.replaceState({}, '', `/compare?products=${newProductIds}`);
      
      setShowAddProduct(false);
      setSearchQuery("");
    }
  };

  const filteredAvailableProducts = availableProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 10);

  const renderStars = (rating = 4.5) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  if (compareProducts.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-6">
              <FiPlus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Products</h1>
              <p className="text-gray-600 mb-8">
                Add products to compare their features, prices, and specifications side by side.
              </p>
            </div>
            
            <button
              onClick={() => setShowAddProduct(true)}
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
            >
              Add Products to Compare
            </button>
            
            {showAddProduct && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Add Product to Compare</h3>
                    <button onClick={() => setShowAddProduct(false)}>
                      <FiX className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                    </button>
                  </div>
                  
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none"
                  />
                  
                  <div className="grid gap-3 max-h-96 overflow-y-auto">
                    {filteredAvailableProducts.map(product => (
                      <div
                        key={product._id}
                        onClick={() => addProduct(product)}
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <Image
                          src={product.image[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                          width={48}
                          height={48}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          <p className="text-orange-600 font-medium">{currency}{product.offerPrice}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Products</h1>
            <p className="text-gray-600">Compare features, prices, and specifications side by side</p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="px-6 md:px-16 lg:px-32 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-4 font-medium text-gray-900 w-48">Features</th>
                    {compareProducts.map(product => (
                      <th key={product._id} className="p-4 text-center min-w-64">
                        <div className="relative">
                          <button
                            onClick={() => removeProduct(product._id)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <FiX className="w-3 h-3" />
                          </button>
                          <div className="mb-3">
                            <Image
                              src={product.image[0]}
                              alt={product.name}
                              className="w-20 h-20 object-cover rounded mx-auto mb-2"
                              width={80}
                              height={80}
                            />
                            <Link href={`/product/${product._id}`} className="text-sm font-medium text-gray-900 hover:text-orange-600">
                              {product.name}
                            </Link>
                          </div>
                        </div>
                      </th>
                    ))}
                    {compareProducts.length < 4 && (
                      <th className="p-4 text-center min-w-64">
                        <button
                          onClick={() => setShowAddProduct(true)}
                          className="flex flex-col items-center justify-center h-32 w-full border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-600 hover:bg-orange-50 transition-colors"
                        >
                          <FiPlus className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">Add Product</span>
                        </button>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {/* Price */}
                  <tr className="border-t">
                    <td className="p-4 font-medium text-gray-900">Price</td>
                    {compareProducts.map(product => (
                      <td key={product._id} className="p-4 text-center">
                        <div className="space-y-1">
                          <div className="text-2xl font-bold text-orange-600">
                            {currency}{product.offerPrice}
                          </div>
                          {product.price > product.offerPrice && (
                            <div className="text-sm text-gray-500 line-through">
                              {currency}{product.price}
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                    {compareProducts.length < 4 && <td className="p-4"></td>}
                  </tr>

                  {/* Rating */}
                  <tr className="border-t bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">Rating</td>
                    {compareProducts.map(product => (
                      <td key={product._id} className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          {renderStars(product.rating)}
                        </div>
                        <div className="text-sm text-gray-600">4.5/5 (123 reviews)</div>
                      </td>
                    ))}
                    {compareProducts.length < 4 && <td className="p-4"></td>}
                  </tr>

                  {/* Category */}
                  <tr className="border-t">
                    <td className="p-4 font-medium text-gray-900">Category</td>
                    {compareProducts.map(product => (
                      <td key={product._id} className="p-4 text-center text-gray-700">
                        {product.category || 'N/A'}
                      </td>
                    ))}
                    {compareProducts.length < 4 && <td className="p-4"></td>}
                  </tr>

                  {/* Condition */}
                  <tr className="border-t bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">Condition</td>
                    {compareProducts.map(product => (
                      <td key={product._id} className="p-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.condition === 'new' ? 'bg-green-100 text-green-800' :
                          product.condition === 'used' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {product.condition || 'New'}
                        </span>
                      </td>
                    ))}
                    {compareProducts.length < 4 && <td className="p-4"></td>}
                  </tr>

                  {/* Description */}
                  <tr className="border-t">
                    <td className="p-4 font-medium text-gray-900">Description</td>
                    {compareProducts.map(product => (
                      <td key={product._id} className="p-4 text-center text-sm text-gray-700">
                        <div className="max-w-xs mx-auto overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>
                          {product.description}
                        </div>
                      </td>
                    ))}
                    {compareProducts.length < 4 && <td className="p-4"></td>}
                  </tr>

                  {/* Actions */}
                  <tr className="border-t bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">Actions</td>
                    {compareProducts.map(product => (
                      <td key={product._id} className="p-4 text-center">
                        <div className="space-y-2">
                          <button
                            onClick={() => addToCart(product._id)}
                            className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                          >
                            <FiShoppingCart className="w-4 h-4" />
                            Add to Cart
                          </button>
                          <button
                            onClick={() => addToWishlist(product._id)}
                            className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                              isInWishlist(product._id)
                                ? 'bg-red-100 text-red-700 border border-red-200'
                                : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                            }`}
                          >
                            <FiHeart className={`w-4 h-4 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
                            {isInWishlist(product._id) ? 'In Wishlist' : 'Add to Wishlist'}
                          </button>
                        </div>
                      </td>
                    ))}
                    {compareProducts.length < 4 && <td className="p-4"></td>}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Product Modal */}
          {showAddProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Add Product to Compare</h3>
                  <button onClick={() => setShowAddProduct(false)}>
                    <FiX className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
                
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none"
                />
                
                <div className="grid gap-3 max-h-96 overflow-y-auto">
                  {filteredAvailableProducts.map(product => (
                    <div
                      key={product._id}
                      onClick={() => addProduct(product)}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <Image
                        src={product.image[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                        width={48}
                        height={48}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-orange-600 font-medium">{currency}{product.offerPrice}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const ComparePage = () => {
  return (
    <Suspense fallback={
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading comparison page...</p>
          </div>
        </div>
        <Footer />
      </>
    }>
      <ComparePageContent />
    </Suspense>
  );
};

export default ComparePage;

