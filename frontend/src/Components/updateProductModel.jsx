import React, { useState } from 'react';
import { FiPackage, FiDollarSign, FiImage, FiSave, FiX } from "react-icons/fi";
import { useProduct } from '../context/ProductContext';

function UpdateProductModal({ isOpen, onClose, product }) {

  const { updateAProduct } = useProduct();
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit =  async() => {
    await updateAProduct(product._id,updatedProduct)

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 text-white border border-gray-700 max-w-md w-full p-6 rounded-lg shadow-lg relative animate-fadeIn">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <FiX size={24} />
        </button>

        <h3 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Update Product
        </h3>
        
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiPackage className="text-gray-400" />
            </div>
            <input
              name="name"
              value={updatedProduct.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="pl-10 border border-gray-700 p-3 w-full rounded-md bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiDollarSign className="text-gray-400" />
            </div>
            <input
              name="price"
              value={updatedProduct.price}
              onChange={handleChange}
              placeholder="Product Price"
              type="number"
              className="pl-10 border border-gray-700 p-3 w-full rounded-md bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiImage className="text-gray-400" />
            </div>
            <input
              name="image"
              value={updatedProduct.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="pl-10 border border-gray-700 p-3 w-full rounded-md bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="mt-6 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 px-4 py-3 rounded-md transition bg-gray-700 hover:bg-gray-600 text-white font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-1/2 flex items-center justify-center gap-2 px-4 py-3 rounded-md transition bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              <FiSave size={18} />
              <span>Update</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProductModal;