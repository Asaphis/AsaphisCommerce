'use client'
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/buyer/Navbar";
import Footer from "@/components/buyer/Footer";
import ProductCard from "@/components/buyer/ProductCard";
import { useAppContext } from "@/context/AppContext";
import { FiFilter, FiGrid, FiList, FiSearch, FiX, FiChevronDown } from "react-icons/fi";

// Category data for matching slugs to names
const categoryData = {
  "fashion-apparel": {
    name: "Fashion & Apparel",
    description: "Shirts, trousers, skirts, dresses, jackets, coats, sweaters, scarves, hats, belts, socks, underwear"
  },
  "shoes-footwear": {
    name: "Shoes & Footwear",
    description: "Sneakers, sandals, boots, heels, loafers, slippers"
  },
  "bags-accessories": {
    name: "Bags & Accessories",
    description: "Handbags, backpacks, wallets, briefcases, tote bags, clutches, travel bags, suitcases"
  },
  "electronics-gadgets": {
    name: "Electronics & Gadgets",
    description: "Smartphones, tablets, laptops, desktops, smartwatches, cameras, gaming consoles, headphones, VR headsets"
  },
  "home-living": {
    name: "Home & Living",
    description: "Furniture, lighting, home décor, rugs, curtains, storage organizers, bedding, mattresses"
  },
  "kitchen-dining": {
    name: "Kitchen & Dining",
    description: "Cookware, bakeware, utensils, cutlery, plates, glasses, kitchen storage, blenders, toasters, microwaves"
  },
  "appliances": {
    name: "Appliances",
    description: "Refrigerators, washing machines, air conditioners, vacuum cleaners, water purifiers, electric fans, irons"
  },
  "motors-automotive": {
    name: "Motors & Automotive",
    description: "Motorbikes, bicycles, scooters, car spare parts, tyres, tools, lubricants, car care products"
  },
  "health-beauty": {
    name: "Health & Beauty",
    description: "Skincare, makeup, perfumes, hair care, grooming tools, vitamins, supplements"
  },
  "sports-outdoor": {
    name: "Sports & Outdoor",
    description: "Exercise equipment, sportswear, camping gear, bicycles, fishing equipment, hiking gear"
  },
  "toys-baby": {
    name: "Toys & Baby Products",
    description: "Dolls, action figures, educational toys, baby strollers, baby clothing, cribs, feeding bottles"
  },
  "books-stationery": {
    name: "Books & Stationery",
    description: "Novels, textbooks, notebooks, pens, planners, office supplies, art supplies"
  },
  "pet-supplies": {
    name: "Pet Supplies",
    description: "Pet food, pet clothing, cages, leashes, toys, grooming kits"
  },
  "groceries-food": {
    name: "Groceries & Food Items",
    description: "Packaged foods, beverages, snacks, spices, dairy products, fresh produce (if integrated with local vendors)"
  },
  "diy-tools": {
    name: "DIY & Tools",
    description: "Power tools, hand tools, gardening tools, building materials, paints"
  },
  "jewelry-watches": {
    name: "Jewelry & Watches",
    description: "Rings, bracelets, necklaces, earrings, luxury watches, casual watches"
  },
  "collectibles-art": {
    name: "Collectibles & Art",
    description: "Paintings, sculptures, coins, stamps, handmade crafts"
  },
  "used-refurbished": {
    name: "Used & Refurbished Items",
    description: "Second-hand electronics, used clothing, pre-owned vehicles, refurbished appliances"
  }
};

const CategoryPage = () => {
  const { slug } = useParams();
  const { products } = useAppContext();
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Get category info
  const categoryInfo = categoryData[slug];

  useEffect(() => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.offerPrice >= priceRange[0] && product.offerPrice <= priceRange[1]
    );

    // Filter by condition
    if (selectedCondition !== "all") {
      filtered = filtered.filter(product =>
        product.condition === selectedCondition
      );
    }

    // Sort products
    switch (sortBy) {
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
      default:
        // featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, priceRange, selectedCondition, sortBy]);

  if (!categoryInfo) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
            <button
              onClick={() => window.history.back()}
              className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
            >
              Go Back
            </button>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryInfo.name}</h1>
            <p className="text-gray-600 mb-6">{categoryInfo.description}</p>
            
            {/* Search Bar */}
            <div className="relative max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Search in ${categoryInfo.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        <div className="px-6 md:px-16 lg:px-32 py-8">
          {/* Filters and Sort */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Filter Button (Mobile) */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <FiFilter className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* Filters Sidebar */}
            <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                  <div className="space-y-3">
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

                {/* Condition */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Condition</h3>
                  <div className="space-y-2">
                    {[
                      { value: "all", label: "All Conditions" },
                      { value: "new", label: "New" },
                      { value: "used", label: "Used" },
                      { value: "refurbished", label: "Refurbished" }
                    ].map((condition) => (
                      <label key={condition.value} className="flex items-center">
                        <input
                          type="radio"
                          name="condition"
                          value={condition.value}
                          checked={selectedCondition === condition.value}
                          onChange={(e) => setSelectedCondition(e.target.value)}
                          className="mr-2 text-orange-600"
                        />
                        {condition.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setPriceRange([0, 10000]);
                    setSelectedCondition("all");
                    setSortBy("featured");
                  }}
                  className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Clear All Filters
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Sort and View Controls */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    {filteredProducts.length} products found
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Sort By */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                    <option value="rating">Best Rating</option>
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

              {/* Products Grid/List */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">No products found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setPriceRange([0, 10000]);
                      setSelectedCondition("all");
                    }}
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Clear filters and try again
                  </button>
                </div>
              ) : (
                <div className={viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                  : "space-y-4"
                }>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} viewMode={viewMode} />
                  ))}
                </div>
              )}

              {/* Pagination would go here */}
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;

