'use client'
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { 
  productService, 
  cartService, 
  wishlistService, 
  userService,
  orderService 
} from "@/lib/apiServices";
import toast from 'react-hot-toast';

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
};

export const AppContextProvider = (props) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY;
    const router = useRouter();

    const { user } = useUser(); // ✅ Corrected here

    const [products, setProducts] = useState([]);
    const [userData, setUserData] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [wishlistItems, setWishlistItems] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProductData = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await productService.getProducts();
            
            if (result.error) {
                setError(result.error);
                setProducts([]);
                toast.error('Failed to load products from server.');
            } else {
                setProducts(result.products || result || []);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error.message);
            setProducts([]);
            toast.error('Unable to connect to server. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserData = async () => {
        if (!user?.id) return;
        
        try {
            const result = await userService.getProfile();
            
            if (result.error) {
                console.error('Error fetching user data:', result.error);
                setUserData(false);
            } else {
                setUserData(result.user || result);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUserData(false);
        }
    };

    // Fetch cart data from API
    const fetchCartData = async () => {
        if (!user?.id) return;
        
        try {
            const result = await cartService.getCart();
            
            if (result.error) {
                console.error('Error fetching cart:', result.error);
            } else {
                setCartItems(result.items || {});
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    // Fetch wishlist data from API
    const fetchWishlistData = async () => {
        if (!user?.id) return;
        
        try {
            const result = await wishlistService.getWishlist();
            
            if (result.error) {
                console.error('Error fetching wishlist:', result.error);
            } else {
                setWishlistItems(result.items || {});
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };

    const addToCart = async (itemId) => {
        try {
            // Optimistic update
            let cartData = structuredClone(cartItems);
            if (cartData[itemId]) {
                cartData[itemId] += 1;
            } else {
                cartData[itemId] = 1;
            }
            setCartItems(cartData);

            // Sync with API
            await cartService.addToCart(itemId, 1);
            toast.success('Item added to cart!');
        } catch (error) {
            // Revert optimistic update on error
            setCartItems(cartItems);
            console.error('Error adding to cart:', error);
            toast.error('Failed to add item to cart');
        }
    };

    const updateCartQuantity = async (itemId, quantity) => {
        try {
            // Optimistic update
            let cartData = structuredClone(cartItems);
            if (quantity === 0) {
                delete cartData[itemId];
            } else {
                cartData[itemId] = quantity;
            }
            setCartItems(cartData);

            // Sync with API
            if (quantity === 0) {
                await cartService.removeFromCart(itemId);
            } else {
                await cartService.updateCartQuantity(itemId, quantity);
            }
        } catch (error) {
            // Revert optimistic update on error
            setCartItems(cartItems);
            console.error('Error updating cart:', error);
            toast.error('Failed to update cart');
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                totalCount += cartItems[itemId];
            }
        }
        return totalCount;
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            let itemInfo = products.find((product) => product._id === itemId);
            if (cartItems[itemId] > 0 && itemInfo) {
                totalAmount += itemInfo.offerPrice * cartItems[itemId];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    };

    const addToWishlist = async (itemId) => {
        try {
            // Optimistic update
            let wishlistData = structuredClone(wishlistItems);
            const wasInWishlist = wishlistData[itemId];
            
            if (wasInWishlist) {
                delete wishlistData[itemId]; // Remove if already in wishlist
            } else {
                wishlistData[itemId] = true; // Add to wishlist
            }
            setWishlistItems(wishlistData);

            // Sync with API
            if (wasInWishlist) {
                await wishlistService.removeFromWishlist(itemId);
                toast.success('Removed from wishlist');
            } else {
                await wishlistService.addToWishlist(itemId);
                toast.success('Added to wishlist!');
            }
        } catch (error) {
            // Revert optimistic update on error
            setWishlistItems(wishlistItems);
            console.error('Error updating wishlist:', error);
            toast.error('Failed to update wishlist');
        }
    };

    const isInWishlist = (itemId) => {
        return wishlistItems[itemId] === true;
    };

    // Load initial data
    useEffect(() => {
        fetchProductData();
    }, []);

    // Load user-specific data when user changes
    useEffect(() => {
        if (user?.id) {
            fetchUserData();
            fetchCartData();
            fetchWishlistData();
        } else {
            // Clear user data when user logs out
            setUserData(false);
            setCartItems({});
            setWishlistItems({});
        }
    }, [user?.id]);

    const value = {
        user,
        currency,
        router,
        userData,
        fetchUserData,
        products,
        fetchProductData,
        cartItems,
        setCartItems,
        addToCart,
        updateCartQuantity,
        getCartCount,
        getCartAmount,
        wishlistItems,
        setWishlistItems,
        addToWishlist,
        isInWishlist,
        loading,
        error,
        fetchCartData,
        fetchWishlistData,
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

