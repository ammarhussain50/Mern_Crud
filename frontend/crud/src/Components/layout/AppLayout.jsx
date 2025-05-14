import React from 'react';
import Navbar from '../layout/Navbar';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;