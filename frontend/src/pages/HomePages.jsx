import React from 'react';
import { useProduct } from '../context/ProductContext';
import ProductCard from '../Components/layout/ProductCard';
import { FiPackage } from 'react-icons/fi';
import { ToastContainer } from 'react-toastify';

const HomePage = () => {
  const { products, loading, error, fetchProducts } = useProduct();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading products: {error}
        <button 
          onClick={fetchProducts}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1140px] px-4 mx-auto py-8">
      <ToastContainer />
      
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent flex items-center">
          <FiPackage className="mr-2 text-blue-500" />
          Product Collection
        </h1>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-gray-400 text-center">
            <FiPackage size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-xl">No products available</p>
            <p className="mt-2">Add some products to get started</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;