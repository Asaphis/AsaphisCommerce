'use client'
import React, { useState, useEffect } from "react";
import Navbar from "@/components/buyer/Navbar";
import Footer from "@/components/buyer/Footer";
import ProductCard from "@/components/buyer/ProductCard";
import { useAppContext } from "@/context/AppContext";
import { FiClock, FiZap, FiPercent, FiTrendingDown, FiTag, FiGift } from "react-icons/fi";

const DealsPage = () => {
  const { products } = useAppContext();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Mock deals data - in real app, this would come from API
  const flashSaleProducts = products.slice(0, 8);
  const dailyDeals = products.slice(2, 10);
  const clearanceItems = products.slice(4, 12);

  const calculateDiscount = (price, offerPrice) => {
    return Math.round(((price - offerPrice) / price) * 100);
  };

  const DealsBanner = () => (
    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
      <div className="px-6 md:px-16 lg:px-32 py-12">
        <div className="text-center">
          <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-4">
            <FiZap className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">FLASH SALE</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Up to 70% Off
          </h1>
          <p className="text-lg opacity-90 mb-8">Limited time offers on your favorite products</p>
          
          {/* Countdown Timer */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[60px]">
                <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-xs opacity-80">HOURS</div>
              </div>
            </div>
            <div className="text-2xl">:</div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[60px]">
                <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-xs opacity-80">MINUTES</div>
              </div>
            </div>
            <div className="text-2xl">:</div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 min-w-[60px]">
                <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-xs opacity-80">SECONDS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DealSection = ({ title, subtitle, products, icon: Icon, bgColor = "bg-white" }) => (
    <div className={`${bgColor} py-12`}>
      <div className="px-6 md:px-16 lg:px-32">
        <div className="flex items-center mb-8">
          <Icon className="w-8 h-8 text-orange-600 mr-3" />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600">{subtitle}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={product._id} className="relative">
              <ProductCard product={product} />
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                -{calculateDiscount(product.price, product.offerPrice)}%
              </div>
              {/* Deal Timer for flash sales */}
              {title.includes('Flash') && (
                <div className="absolute bottom-4 left-4 right-4 bg-red-500 text-white text-xs py-1 px-2 rounded flex items-center justify-center">
                  <FiClock className="w-3 h-3 mr-1" />
                  {timeLeft.hours}h {timeLeft.minutes}m left
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Banner */}
        <DealsBanner />

        {/* Deal Categories */}
        <div className="px-6 md:px-16 lg:px-32 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <FiZap className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Flash Sales</h3>
              <p className="text-sm text-gray-600">Limited time</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <FiPercent className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Daily Deals</h3>
              <p className="text-sm text-gray-600">New every day</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <FiTrendingDown className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Clearance</h3>
              <p className="text-sm text-gray-600">Up to 80% off</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <FiGift className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Bundles</h3>
              <p className="text-sm text-gray-600">Save more</p>
            </div>
          </div>
        </div>

        {/* Flash Sale Section */}
        <DealSection
          title="⚡ Flash Sale"
          subtitle="Hurry! These deals won't last long"
          products={flashSaleProducts}
          icon={FiZap}
          bgColor="bg-red-50"
        />

        {/* Daily Deals Section */}
        <DealSection
          title="📅 Daily Deals"
          subtitle="New deals every 24 hours"
          products={dailyDeals}
          icon={FiPercent}
          bgColor="bg-white"
        />

        {/* Clearance Section */}
        <DealSection
          title="🔥 Clearance Sale"
          subtitle="Massive discounts on selected items"
          products={clearanceItems}
          icon={FiTrendingDown}
          bgColor="bg-yellow-50"
        />

        {/* Newsletter Signup for Deals */}
        <div className="bg-gray-900 text-white py-16">
          <div className="px-6 md:px-16 lg:px-32 text-center">
            <FiTag className="w-12 h-12 mx-auto mb-4 text-orange-400" />
            <h2 className="text-3xl font-bold mb-4">Never Miss a Deal</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to get notified about flash sales, exclusive discounts, and limited-time offers
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900"
              />
              <button className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Get up to 50% off on your first order when you subscribe
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DealsPage;

