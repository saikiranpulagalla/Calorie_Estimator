import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import AuthNavbar from '../components/navigation/AuthNavbar';

const AuthLayout: React.FC = () => (
  <div className="flex min-h-screen bg-nutrify-light dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <AuthNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  </div>
);

export default AuthLayout;