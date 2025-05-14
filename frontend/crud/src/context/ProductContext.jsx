import React from "react";
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../api/ProductApi.js";
import { toast } from "react-toastify";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all products
  const fetchProducts = useCallback(async () => {
  setLoading(true);
  setError(null);
  try {
    const response = await getProducts();
    console.log("Full API Response:", response); // For debugging
    
    let productsData = [];
    
    // Handle different possible response structures
    if (Array.isArray(response.data)) {
      // Case 1: Direct array response
      productsData = response.data.data;
      console.log("all products ",productsData);
      
    } else if (response.data?.products && Array.isArray(response.data.products)) {
      // Case 2: { products: [...] } format
      productsData = response.data.products;
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      // Case 3: { data: [...] } format
      productsData = response.data.data;
    } else {
      throw new Error(`Unexpected data format: ${JSON.stringify(response.data)}`);
    }
    
    setProducts(productsData);
  } catch (err) {
    console.error("Fetch error:", err);
    setError(err.message);
    toast.error("Failed to load products");
    setProducts([]);
  } finally {
    setLoading(false);
  }
}, []);

  // Create Product
  const createProduct = async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      toast.error("Please fill all fields");
      return { success: false, message: "Please fill all fields." };
    }

    try {
      const response = await addProduct(newProduct);
      const createdProduct = response.data.data;
      console.log("add product yee hay: ",createdProduct);
      
      
      setProducts(prev => [...prev, createdProduct]);
      
      toast.success("Product created successfully!");
      return { success: true, data: createdProduct };
    } catch (error) {
      console.error("Create error:", error);
      toast.error(error.response?.data?.message || "Failed to create product");
      return { success: false, message: error.message };
    }
  };

  // Delete Product
  const removeProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(product => product._id !== id));
      toast.success("Product deleted successfully!");
      return { success: true };
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Failed to delete product");
      return { success: false, message: error.message };
    }
  };

  // Update Product
  const updateAProduct = async (id, updatedData) => {
    try {
      const response = await updateProduct(id, updatedData);
      const updatedProduct = response.data.data;
      
      setProducts(prev => 
        prev.map(product => 
          product._id === id ? updatedProduct : product
        )
      );
      
      toast.success("Product updated successfully!");
      return { success: true, data: updatedProduct };
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update product");
      return { success: false, message: error.message };
    }
  };

  // Load products on initial render
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductContext.Provider 
      value={{ 
        products,
        loading,
        error,
        createProduct,
        removeProduct,
        fetchProducts,
        updateAProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);