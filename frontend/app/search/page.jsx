'use client'
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/buyer/Navbar";
import Footer from "@/components/buyer/Footer";
import ProductCard from "@/components/buyer/ProductCard";
import { useAppContext } from "@/context/AppContext";
import { FiSearch, FiFilter, FiX, FiGrid, FiList, FiMic, FiCamera } from "react-icons/fi";

const SearchPageContent = () => {
  const searchParams = useSearchParams();
  const { products } = useAppContext();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || "");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [sellerLocation, setSellerLocation] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState("grid");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Categories for filter
  const categories = [
    "Fashion & Apparel", "Shoes & Footwear", "Bags & Accessories", "Electronics & Gadgets",
    "Home & Living", "Kitchen & Dining", "Appliances", "Motors & Automotive",
    "Health & Beauty", "Sports & Outdoor", "Toys & Baby Products", "Books & Stationery",
    "Pet Supplies", "Groceries & Food Items", "DIY & Tools", "Jewelry & Watches",
    "Collectibles & Art", "Used & Refurbished Items"
  ];

  // Extract unique brands from products
  const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];

  // Voice search function
  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };
      
      recognition.start();
    } else {
      alert('Voice search is not supported in your browser.');
    }
  };

  useEffect(() => {
    let filtered = [...products];

    // AI-powered search - basic implementation
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(query);
        const descMatch = product.description.toLowerCase().includes(query);
        const categoryMatch = product.category?.toLowerCase().includes(query);
        const brandMatch = product.brand?.toLowerCase().includes(query);
        
        // Simple relevance scoring
        product.relevanceScore = 0;
        if (nameMatch) product.relevanceScore += 3;
        if (descMatch) product.relevanceScore += 2;
        if (categoryMatch) product.relevanceScore += 1;
        if (brandMatch) product.relevanceScore += 2;
        
        return nameMatch || descMatch || categoryMatch || brandMatch;
      });
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.offerPrice >= priceRange[0] && product.offerPrice <= priceRange[1]
    );

    // Filter by brand
    if (selectedBrand !== "all") {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // Filter by condition
    if (selectedCondition !== "all") {
      filtered = filtered.filter(product => product.condition === selectedCondition);
    }

    // Filter by seller location
    if (sellerLocation) {
      filtered = filtered.filter(product =>
        product.sellerInfo?.location?.toLowerCase().includes(sellerLocation.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case "relevance":
        if (searchQuery) {
          filtered.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
        }
        break;
      case "price-low":
        filtered.sort((a, b) => a.offerPrice - b.offerPrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.offerPrice - a.offerPrice);
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 4.5) - (a.rating || 4.5));
        break;
      case "popularity":
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, priceRange, selectedBrand, selectedCondition, sellerLocation, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceRange([0, 10000]);
    setSelectedBrand("all");
    setSelectedCondition("all");
    setSellerLocation("");
    setSortBy("relevance");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Update URL with search query
    window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Advanced Search Header */}
        <div className="bg-white shadow-sm">
          <div className="px-6 md:px-16 lg:px-32 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Advanced Search</h1>
            
            {/* Main Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-4xl mb-6">
              <div className="flex">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for products, brands, categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-l-lg text-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={startVoiceSearch}
                  className="px-4 py-4 bg-gray-100 border border-l-0 border-gray-300 hover:bg-gray-200 transition-colors"
                  title="Voice Search"
                >
                  <FiMic className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  type="submit"
                  className="px-8 py-4 bg-orange-600 text-white rounded-r-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
            >
              <FiFilter className="w-4 h-4" />
              {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
            </button>

            {/* Advanced Filters */}
            {showAdvanced && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>$0</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none"
                  >
                    <option value="all">All Brands</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Condition Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <select
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none"
                  >
                    <option value="all">All Conditions</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    <option value="refurbished">Refurbished</option>
                  </select>
                </div>

                {/* Seller Location */}
                <div className="md:col-span-2 lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Seller Location</label>
                  <input
                    type="text"
                    placeholder="Enter city, state, or country"
                    value={sellerLocation}
                    onChange={(e) => setSellerLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none"
                  />
                </div>

                {/* Clear Filters */}
                <div className="md:col-span-2 lg:col-span-2 flex items-end">
                  <button
                    onClick={clearAllFilters}
                    className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Results */}
        <div className="px-6 md:px-16 lg:px-32 py-8">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {searchQuery ? `Search results for "${searchQuery}"` : 'All Products'}
              </h2>
              <p className="text-gray-600">{filteredProducts.length} products found</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Best Rating</option>
                <option value="popularity">Most Popular</option>
              </select>

              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-orange-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                >
                  <FiGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-orange-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                >
                  <FiList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedCategory !== "all" || selectedBrand !== "all" || selectedCondition !== "all" || sellerLocation) && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")}>
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory("all")}>
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {selectedBrand !== "all" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Brand: {selectedBrand}
                  <button onClick={() => setSelectedBrand("all")}>
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {selectedCondition !== "all" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  Condition: {selectedCondition}
                  <button onClick={() => setSelectedCondition("all")}>
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {sellerLocation && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  Location: {sellerLocation}
                  <button onClick={() => setSellerLocation("")}>
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Products Grid/List */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <FiSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or clearing some filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                : "space-y-4"
              }>
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} viewMode={viewMode} />
                ))}
              </div>

              {/* Pagination */}
              {filteredProducts.length > 20 && (
                <div className="flex justify-center mt-12">
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Previous</button>
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-lg">1</button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Next</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading search page...</p>
          </div>
        </div>
        <Footer />
      </>
    }>
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage;

