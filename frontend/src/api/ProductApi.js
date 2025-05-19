import axios from "axios";

// Create Axios Instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/",
});

// Create Product
export const addProduct = (data) => {
  return api.post("/products", data);
  
};

// Get All Products
export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    
    // Add response validation
    if (!response.data) {
      throw new Error("No data received from server");
    }
    return response;
  } catch (error) {
    console.error("API Error:", error);
    // Add more detailed error information
    error.message = `API Error: ${error.message} - ${error.response?.data?.message || 'No additional info'}`;
    throw error;
  }
};

// Delete Product
export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};

// Update Product
export const updateProduct = (id, data) => {
  return api.put(`/products/${id}`, data);
};     