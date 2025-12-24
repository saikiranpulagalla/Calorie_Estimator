import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthNavbar: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-2">
      <div className="px-4 md:px-6 flex justify-between items-center">
        <div className="flex-1">
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 hidden md:block">
            {`Welcome, ${user?.name || 'User'}`}
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>
          
          <div className="relative group">
            <button className="flex items-center space-x-1">
              <div className="w-8 h-8 rounded-full bg-nutrify-accent flex items-center justify-center text-white">
                <User size={18} />
              </div>
              <span className="hidden md:inline-block text-sm text-gray-700 dark:text-gray-300">
                {user?.name?.split(' ')[0] || 'User'}
              </span>
            </button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
              <Link 
                to="/profile" 
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100"
              >
                Profile Settings
              </Link>
              <button 
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthNavbar;