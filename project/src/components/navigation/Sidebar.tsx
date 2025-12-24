import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Apple, BarChart, Camera, MessageCircle, Utensils, Calculator, User } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart },
  { name: 'Food Analysis', href: '/analysis', icon: Camera },
  { name: 'Meal Log', href: '/meal-log', icon: Utensils },
  { name: 'Nutrition Chat', href: '/chatbot', icon: MessageCircle },
  { name: 'Tools', href: '/tools', icon: Calculator },
  { name: 'Profile', href: '/profile', icon: User },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="hidden md:flex flex-col h-full w-64 bg-white border-r border-gray-200">
      <div className="flex h-16 items-center justify-center border-b border-gray-200">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <Apple className="h-7 w-7 text-nutrify-accent" />
          <span className="text-xl font-bold text-gray-900">Nutrify</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all
                ${isActive 
                  ? 'bg-nutrify-secondary text-gray-900' 
                  : 'text-gray-700 hover:bg-nutrify-light hover:text-gray-900'}
              `}
            >
              <item.icon 
                className={`
                  mr-3 h-5 w-5 transition-colors
                  ${isActive ? 'text-nutrify-accent' : 'text-gray-500 group-hover:text-nutrify-accent'}
                `} 
                aria-hidden="true" 
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="bg-nutrify-light rounded-lg p-3">
          <h4 className="text-sm font-medium text-gray-800 mb-1">Need help?</h4>
          <p className="text-xs text-gray-600 mb-2">
            Have questions about your nutrition plan?
          </p>
          <Link
            to="/chatbot"
            className="text-xs font-medium text-nutrify-accent hover:text-green-700 transition-colors"
          >
            Ask our nutrition assistant →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;