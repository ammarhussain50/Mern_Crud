import React from "react"
import CreatePage from "./pages/CreatePage.jsx"
import HomePage from "./pages/HomePages.jsx"
import AppLayout from "./components/layout/AppLayout"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout/>,
      children: [
        { path: '/', element: <HomePage/> },
        { path: '/create', element: <CreatePage/> },
     
      ]
    }

    
  ])
 

  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App
