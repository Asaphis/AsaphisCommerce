import React from "react";
import { assets } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, useUser, UserButton } from "@clerk/nextjs";
import { FiShoppingCart, FiHome, FiPackage, FiList, FiHeart, FiSearch, FiLayers } from "react-icons/fi";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { getCartCount } = useAppContext(); // 👈 get cart count function
  const router = useRouter();
  const { openSignIn } = useClerk();
  const { user, isLoaded } = useUser();

  const userMenu = (
    <UserButton afterSignOutUrl="/">
      <UserButton.MenuItems>
        <UserButton.Action label="Home" labelIcon={<FiHome />} onClick={() => router.push("/")} />
        <UserButton.Action label="Categories" labelIcon={<FiPackage />} onClick={() => router.push("/categories")} />
        <UserButton.Action label="My Orders" labelIcon={<FiList />} onClick={() => router.push("/my-orders")} />
        <UserButton.Action label="Wishlist" labelIcon={<FiHeart />} onClick={() => router.push("/wishlist")} />
        <UserButton.Action label="Compare" labelIcon={<FiLayers />} onClick={() => router.push("/compare")} />
        <UserButton.Action label="Cart" labelIcon={<FiShoppingCart />} onClick={() => router.push("/cart")} />
      </UserButton.MenuItems>
    </UserButton>
  );

  const signInButton = (
    <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
      <Image src={assets.user_icon} alt="user icon" />
      Account
    </button>
  );

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />

      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">Home</Link>
        <Link href="/categories" className="hover:text-gray-900 transition">Categories</Link>
        <Link href="/deals" className="hover:text-gray-900 transition">Deals</Link>
        <Link href="/compare" className="hover:text-gray-900 transition">Compare</Link>
        <Link href="/help" className="hover:text-gray-900 transition">Help</Link>
      </div>

      <ul className="hidden md:flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value) {
                router.push(`/search?q=${encodeURIComponent(e.target.value)}`);
              }
            }}
            className="px-3 py-1 pl-8 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none w-48"
          />
          <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>

        {/* 🛒 Cart icon with item count */}
        <div className="relative cursor-pointer" onClick={() => router.push("/cart")}>
          <FiShoppingCart className="text-xl" />
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {getCartCount()}
            </span>
          )}
        </div>

        {isLoaded && user ? userMenu : signInButton}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isLoaded && user ? userMenu : signInButton}
      </div>
    </nav>
  );
};

export default Navbar;

