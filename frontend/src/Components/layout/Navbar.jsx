import React from "react";
import { Link } from "react-router-dom";
import { FiPlusSquare, FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="bg-gray-800 shadow-md sticky top-0 z-10">
      <div className="max-w-[1140px] px-4 mx-auto">
        <div className="h-16 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent flex items-center">
            <Link to="/" className="flex items-center">
              <FiShoppingCart className="mr-2 text-blue-500" />
              <span>Product Store</span>
            </Link>
          </h1>

          <Link to="/create">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors text-white font-medium">
              <span className="hidden sm:inline">Add Product</span>
              <FiPlusSquare size={20} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;