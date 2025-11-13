import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import { FiHeart, FiShoppingCart, FiEye, FiLayers } from 'react-icons/fi';
const ProductCard = ({ product }) => {

    const { currency, router, addToCart, addToWishlist, isInWishlist } = useAppContext();

    const handleWishlistClick = (e) => {
        e.stopPropagation();
        addToWishlist(product._id);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product._id);
    };

    const handleCompare = (e) => {
        e.stopPropagation();
        // Get existing compare products from URL or start new comparison
        const currentUrl = new URL(window.location.origin + '/compare');
        const urlParams = new URLSearchParams(window.location.search);
        const existingProducts = urlParams.get('products')?.split(',').filter(id => id !== product._id) || [];
        
        // Add current product to comparison (max 4 products)
        if (existingProducts.length < 4) {
            existingProducts.push(product._id);
            currentUrl.searchParams.set('products', existingProducts.join(','));
            router.push(currentUrl.toString());
        } else {
            alert('You can compare up to 4 products at once.');
        }
    };

    const calculateDiscount = () => {
        return Math.round(((product.price - product.offerPrice) / product.price) * 100);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden group">
            <div className="relative bg-gray-50 aspect-square overflow-hidden">
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    width={400}
                    height={400}
                />
                
                {/* Discount Badge */}
                {product.price > product.offerPrice && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        -{calculateDiscount()}%
                    </div>
                )}
                
                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleWishlistClick}
                        className={`p-2 rounded-full shadow-md transition-colors ${
                            isInWishlist(product._id) 
                                ? 'bg-red-500 text-white' 
                                : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
                        }`}
                    >
                        <FiHeart className={`w-4 h-4 ${isInWishlist(product._id) ? 'fill-current' : ''}`} />
                    </button>
                    <Link href={`/product/${product._id}`}>
                        <button className="p-2 rounded-full bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-500 shadow-md transition-colors">
                            <FiEye className="w-4 h-4" />
                        </button>
                    </Link>
                    <button
                        onClick={handleCompare}
                        className="p-2 rounded-full bg-white text-gray-600 hover:bg-green-50 hover:text-green-500 shadow-md transition-colors"
                        title="Compare Product"
                    >
                        <FiLayers className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
                <Link href={`/product/${product._id}`}>
                    <h3 className="font-semibold text-gray-900 hover:text-orange-600 transition-colors mb-2 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
                        {product.name}
                    </h3>
                </Link>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Image
                                key={index}
                                className="h-3 w-3"
                                src={index < 4 ? assets.star_icon : assets.star_dull_icon}
                                alt="star_icon"
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-500">(4.5)</span>
                </div>
                
                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-gray-900">
                        {currency}{product.offerPrice}
                    </span>
                    {product.price > product.offerPrice && (
                        <span className="text-sm text-gray-500 line-through">
                            {currency}{product.price}
                        </span>
                    )}
                </div>
                
                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                >
                    <FiShoppingCart className="w-4 h-4" />
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard
