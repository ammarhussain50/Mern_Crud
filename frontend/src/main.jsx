import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // tailwind import
import { ProductProvider } from "./context/ProductContext";



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductProvider>

      

      <App />

    </ProductProvider>


  </React.StrictMode>
)