'use client'
import React from "react";
import Navbar from "@/components/buyer/Navbar";
import Footer from "@/components/buyer/Footer";
import Link from "next/link";
import { FiPackage, FiHome, FiMonitor, FiCoffee, FiTool, FiHeart, FiZap, FiGift, FiBookOpen, FiShoppingBag, FiWatch, FiImage, FiRefreshCw, FiTruck, FiStar, FiShoppingCart, FiUsers } from "react-icons/fi";

const categories = [
  {
    name: "Fashion & Apparel",
    description: "Shirts, trousers, skirts, dresses, jackets, coats, sweaters, scarves, hats, belts, socks, underwear",
    icon: <FiUsers className="w-8 h-8" />,
    slug: "fashion-apparel",
    color: "bg-pink-500"
  },
  {
    name: "Shoes & Footwear",
    description: "Sneakers, sandals, boots, heels, loafers, slippers",
    icon: <FiPackage className="w-8 h-8" />,
    slug: "shoes-footwear",
    color: "bg-amber-500"
  },
  {
    name: "Bags & Accessories",
    description: "Handbags, backpacks, wallets, briefcases, tote bags, clutches, travel bags, suitcases",
    icon: <FiShoppingBag className="w-8 h-8" />,
    slug: "bags-accessories",
    color: "bg-purple-500"
  },
  {
    name: "Electronics & Gadgets",
    description: "Smartphones, tablets, laptops, desktops, smartwatches, cameras, gaming consoles, headphones, VR headsets",
    icon: <FiMonitor className="w-8 h-8" />,
    slug: "electronics-gadgets",
    color: "bg-blue-500"
  },
  {
    name: "Home & Living",
    description: "Furniture, lighting, home décor, rugs, curtains, storage organizers, bedding, mattresses",
    icon: <FiHome className="w-8 h-8" />,
    slug: "home-living",
    color: "bg-green-500"
  },
  {
    name: "Kitchen & Dining",
    description: "Cookware, bakeware, utensils, cutlery, plates, glasses, kitchen storage, blenders, toasters, microwaves",
    icon: <FiCoffee className="w-8 h-8" />,
    slug: "kitchen-dining",
    color: "bg-orange-500"
  },
  {
    name: "Appliances",
    description: "Refrigerators, washing machines, air conditioners, vacuum cleaners, water purifiers, electric fans, irons",
    icon: <FiZap className="w-8 h-8" />,
    slug: "appliances",
    color: "bg-red-500"
  },
  {
    name: "Motors & Automotive",
    description: "Motorbikes, bicycles, scooters, car spare parts, tyres, tools, lubricants, car care products",
    icon: <FiTruck className="w-8 h-8" />,
    slug: "motors-automotive",
    color: "bg-gray-500"
  },
  {
    name: "Health & Beauty",
    description: "Skincare, makeup, perfumes, hair care, grooming tools, vitamins, supplements",
    icon: <FiHeart className="w-8 h-8" />,
    slug: "health-beauty",
    color: "bg-pink-400"
  },
  {
    name: "Sports & Outdoor",
    description: "Exercise equipment, sportswear, camping gear, bicycles, fishing equipment, hiking gear",
    icon: <FiStar className="w-8 h-8" />,
    slug: "sports-outdoor",
    color: "bg-teal-500"
  },
  {
    name: "Toys & Baby Products",
    description: "Dolls, action figures, educational toys, baby strollers, baby clothing, cribs, feeding bottles",
    icon: <FiGift className="w-8 h-8" />,
    slug: "toys-baby",
    color: "bg-yellow-500"
  },
  {
    name: "Books & Stationery",
    description: "Novels, textbooks, notebooks, pens, planners, office supplies, art supplies",
    icon: <FiBookOpen className="w-8 h-8" />,
    slug: "books-stationery",
    color: "bg-indigo-500"
  },
  {
    name: "Pet Supplies",
    description: "Pet food, pet clothing, cages, leashes, toys, grooming kits",
    icon: <FiHeart className="w-8 h-8" />,
    slug: "pet-supplies",
    color: "bg-emerald-500"
  },
  {
    name: "Groceries & Food Items",
    description: "Packaged foods, beverages, snacks, spices, dairy products, fresh produce (if integrated with local vendors)",
    icon: <FiShoppingCart className="w-8 h-8" />,
    slug: "groceries-food",
    color: "bg-lime-500"
  },
  {
    name: "DIY & Tools",
    description: "Power tools, hand tools, gardening tools, building materials, paints",
    icon: <FiTool className="w-8 h-8" />,
    slug: "diy-tools",
    color: "bg-slate-500"
  },
  {
    name: "Jewelry & Watches",
    description: "Rings, bracelets, necklaces, earrings, luxury watches, casual watches",
    icon: <FiWatch className="w-8 h-8" />,
    slug: "jewelry-watches",
    color: "bg-violet-500"
  },
  {
    name: "Collectibles & Art",
    description: "Paintings, sculptures, coins, stamps, handmade crafts",
    icon: <FiImage className="w-8 h-8" />,
    slug: "collectibles-art",
    color: "bg-rose-500"
  },
  {
    name: "Used & Refurbished Items",
    description: "Second-hand electronics, used clothing, pre-owned vehicles, refurbished appliances",
    icon: <FiRefreshCw className="w-8 h-8" />,
    slug: "used-refurbished",
    color: "bg-cyan-500"
  }
];

const CategoriesPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="px-6 md:px-16 lg:px-32 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop by Category</h1>
            <p className="text-gray-600">Browse our comprehensive collection of products across all categories</p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="px-6 md:px-16 lg:px-32 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index}
                href={`/category/${category.slug}`}
                className="group bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`${category.color} text-white p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-200`}>
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical'}}>{category.description}</p>
                  <div className="mt-4 flex items-center text-orange-600 text-sm font-medium">
                    Shop Now
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Categories Section */}
        <div className="px-6 md:px-16 lg:px-32 py-12 bg-white">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((category, index) => (
              <Link
                key={index}
                href={`/category/${category.slug}`}
                className="group text-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`${category.color} text-white p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-orange-600">{category.name}</h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoriesPage;

