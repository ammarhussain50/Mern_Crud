import React from "react";
import { useState } from "react";
import { useProduct } from "../context/ProductContext";
import { ToastContainer, toast } from "react-toastify";
import { FiSave, FiImage, FiDollarSign, FiPackage } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // 🆕 Import


function CreatePage() {
  const { createProduct } = useProduct();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // 🆕 Initialize

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const result = await createProduct(newProduct);
      if (result.success) {
        setNewProduct({
          name: "",
          price: "",
          image: "",
        });
      navigate("/"); // 🆕 Redirect to home page
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1140px] px-4 mx-auto py-8">
      <ToastContainer />
      
      <div className="flex items-center justify-center mb-8">
        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent flex items-center">
          <FiPackage className="mr-2 text-blue-500" />
          Add New Product
        </h2>
      </div>

      <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiPackage className="text-gray-400" />
            </div>
            <input
              name="name"
              value={newProduct.name}
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
              value={newProduct.price}
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
              value={newProduct.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="pl-10 border border-gray-700 p-3 w-full rounded-md bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <button
            disabled={!newProduct.name || !newProduct.price || !newProduct.image || isSubmitting}
            onClick={handleAddProduct}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md transition 
              bg-blue-600 hover:bg-blue-700 text-white font-medium
              disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            <FiSave size={18} />
            <span>{isSubmitting ? "Adding..." : "Add Product"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;