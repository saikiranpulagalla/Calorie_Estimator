import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';

const MainLayout: React.FC = () => (
  <div className="min-h-screen bg-nutrify-light dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <Navbar />
    <Outlet />
  </div>
);

export default MainLayout;