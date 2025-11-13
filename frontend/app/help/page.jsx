'use client'
import React, { useState } from "react";
import Navbar from "@/components/buyer/Navbar";
import Footer from "@/components/buyer/Footer";
import { FiSearch, FiMessageCircle, FiPhone, FiMail, FiHeadphones, FiChevronDown, FiChevronRight, FiClock, FiShoppingBag, FiCreditCard, FiTruck } from "react-icons/fi";

const HelpPage = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { id: 'general', name: 'General', icon: <FiMessageCircle className="w-5 h-5" /> },
    { id: 'orders', name: 'Orders', icon: <FiShoppingBag className="w-5 h-5" /> },
    { id: 'payments', name: 'Payments', icon: <FiCreditCard className="w-5 h-5" /> },
    { id: 'shipping', name: 'Shipping', icon: <FiTruck className="w-5 h-5" /> },
  ];

  const faqs = {
    general: [
      {
        question: "How do I create an account?",
        answer: "Click on 'Account' in the top navigation and select 'Sign Up'. Fill in your details and verify your email address to get started."
      },
      {
        question: "How do I reset my password?",
        answer: "On the sign-in page, click 'Forgot Password' and enter your email. We'll send you a link to reset your password."
      },
      {
        question: "Is my personal information secure?",
        answer: "Yes, we use industry-standard encryption and security measures to protect your personal information. We never share your data without your consent."
      },
      {
        question: "How do I contact customer service?",
        answer: "You can reach us through live chat, email at support@AsaPhis.com, or phone at +1-800-AsaPhis. We're available 24/7 to help."
      }
    ],
    orders: [
      {
        question: "How do I track my order?",
        answer: "Go to 'My Orders' in your account dashboard. Click on any order to see detailed tracking information and estimated delivery date."
      },
      {
        question: "Can I modify or cancel my order?",
        answer: "You can modify or cancel orders within 1 hour of placing them. After this window, please contact customer service for assistance."
      },
      {
        question: "What if I receive a damaged item?",
        answer: "Contact us immediately with photos of the damaged item. We'll arrange for a replacement or full refund within 24 hours."
      },
      {
        question: "How do returns and refunds work?",
        answer: "You can return items within 30 days of delivery. Go to 'My Orders' and select 'Return Item' for easy returns. Refunds are processed within 3-5 business days."
      }
    ],
    payments: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, debit cards, PayPal, Apple Pay, Google Pay, bank transfers, cryptocurrency, and cash on delivery."
      },
      {
        question: "Is it safe to use my credit card?",
        answer: "Yes, all payments are processed through secure, encrypted connections. We use industry-leading payment processors and never store your card details."
      },
      {
        question: "Why was my payment declined?",
        answer: "Payment declines can happen due to insufficient funds, expired cards, or bank security measures. Please check with your bank or try a different payment method."
      },
      {
        question: "Can I get a receipt for my purchase?",
        answer: "Yes, receipts are automatically sent to your email after purchase. You can also download receipts from your order history."
      }
    ],
    shipping: [
      {
        question: "What are your shipping options?",
        answer: "We offer standard shipping (3-5 business days), express shipping (1-2 business days), and local pickup at selected locations."
      },
      {
        question: "Do you offer free shipping?",
        answer: "Yes, we offer free standard shipping on orders over $50. Express shipping rates vary by location and urgency."
      },
      {
        question: "Do you ship internationally?",
        answer: "Currently, we ship within the country. International shipping will be available soon. Subscribe to our newsletter for updates."
      },
      {
        question: "What if my package is lost or delayed?",
        answer: "If your package is significantly delayed or lost, contact us immediately. We'll work with the carrier to locate it or send a replacement."
      }
    ]
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="px-6 md:px-16 lg:px-32 py-12">
            <div className="text-center max-w-3xl mx-auto">
              <FiHeadphones className="w-16 h-16 text-orange-600 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">How Can We Help You?</h1>
              <p className="text-lg text-gray-600 mb-8">
                Find answers to common questions or get in touch with our support team
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact Options */}
        <div className="px-6 md:px-16 lg:px-32 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 border border-gray-200 text-center hover:shadow-md transition-shadow">
              <FiMessageCircle className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 text-sm mb-4">Get instant help from our support team</p>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Start Chat
              </button>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200 text-center hover:shadow-md transition-shadow">
              <FiPhone className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm mb-4">Speak directly with our support team</p>
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                +1-800-AsaPhis
              </button>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200 text-center hover:shadow-md transition-shadow">
              <FiMail className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm mb-4">Send us a detailed message</p>
              <button className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                support@AsaPhis.com
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="px-6 md:px-16 lg:px-32 pb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="max-w-4xl mx-auto">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>

            {/* FAQ Items */}
            <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
              {faqs[activeCategory].map((faq, index) => (
                <div key={index} className="p-6">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    {expandedFaq === index ? (
                      <FiChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <FiChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  {expandedFaq === index && (
                    <div className="mt-4 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Support Hours */}
        <div className="bg-white py-12">
          <div className="px-6 md:px-16 lg:px-32">
            <div className="max-w-2xl mx-auto text-center">
              <FiClock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Support Hours</h2>
              <div className="grid md:grid-cols-2 gap-6 text-gray-600">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Live Chat & Phone</h3>
                  <p>Monday - Friday: 9:00 AM - 9:00 PM</p>
                  <p>Saturday - Sunday: 10:00 AM - 6:00 PM</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                  <p>24/7 - We respond within 2 hours</p>
                  <p>Priority support for urgent issues</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Still Need Help Section */}
        <div className="bg-gray-900 text-white py-16">
          <div className="px-6 md:px-16 lg:px-32 text-center">
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is always ready to help you out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-600 hover:bg-orange-700 px-8 py-3 rounded-lg font-medium transition-colors">
                Contact Support
              </button>
              <button className="border border-gray-600 hover:border-gray-500 px-8 py-3 rounded-lg font-medium transition-colors">
                Submit a Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HelpPage;

