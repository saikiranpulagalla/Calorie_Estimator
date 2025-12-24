import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Apple, Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

// Mock API service
import { loginUser } from '../services/authService';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      // Use Firebase Auth
      const user = await loginUser(email, password);
      // Fetch user profile from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      let userProfile;
      if (userDoc.exists()) {
        const data = userDoc.data();
        userProfile = {
          id: user.uid,
          name: data.name || user.displayName || '',
          email: data.email || user.email || '',
          age: data.age,
          gender: data.gender,
          weight: data.weight,
          height: data.height,
        };
      } else {
        userProfile = {
          id: user.uid,
          name: user.displayName || '',
          email: user.email || '',
        };
      }
      login(userProfile);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center bg-nutrify-light dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md text-gray-900 dark:text-gray-100">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Apple className="h-10 w-10 text-nutrify-accent" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('Welcome back to Nutrify')}</h2>
          <p className="text-gray-600 mt-1">{t('Sign in to your account')}</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t('Email Address')}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-nutrify-accent focus:border-nutrify-accent"
            />
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('Password')}
              </label>
              <a href="#" className="text-sm text-nutrify-accent hover:text-green-700">
                {t('Forgot password?')}
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-nutrify-accent focus:border-nutrify-accent pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full nutrify-btn-primary py-2 px-4 flex justify-center items-center"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('Signing in...')}
              </span>
            ) : t('Sign In')}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {t("Don't have an account?")} {' '}
            <Link to="/register" className="text-nutrify-accent hover:text-green-700 font-medium">
              {t('Create an account')}
            </Link>
          </p>
        </div>
        
        {/* Demo account notice */}
        <div className="mt-8 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-700 text-center">
            <strong>{t('Demo Account')}:</strong> {t('Try using')} <br />
            {t('Email')}: <code className="bg-gray-100 px-1 py-0.5 rounded">demo@nutrify.com</code> <br />
            {t('Password')}: <code className="bg-gray-100 px-1 py-0.5 rounded">nutrify123</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;