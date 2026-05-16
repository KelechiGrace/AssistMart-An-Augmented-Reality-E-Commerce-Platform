import React, { useState } from "react";
import { Search, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ cartItems = [] }) {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchValue.trim()) return;

    navigate(`/search?query=${encodeURIComponent(searchValue)}`);
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/">
            <h1 className="text-purple-700 text-3xl font-bold">AssistMart</h1>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />

              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Login & Cart */}
          <div className="flex items-center gap-6">
            <Link
              to="/auth"
              className="flex items-center gap-2 text-gray-700 hover:opacity-80"
            >
              <User size={20} />
              <span>Login / Signup</span>
            </Link>

            <button
              onClick={() => navigate("/cart")}
              className="relative text-gray-700 hover:opacity-80"
            >
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-purple-600 text-white rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Categories */}
        <nav className="border-t border-gray-200">
          <div className="flex justify-center gap-8 py-4">
            <Link to="/clothes" className="text-purple-700 hover:opacity-80">
              Clothes
            </Link>
            <Link to="/accessories" className="text-purple-700 hover:opacity-80">
              Accessories
            </Link>
            <Link
              to="/recommendations"
              className="text-purple-700 hover:opacity-80"
            >
              Recommended for YOU
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
