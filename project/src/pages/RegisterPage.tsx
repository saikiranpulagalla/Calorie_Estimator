import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Apple, Eye, EyeOff, ChevronRight, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

// Mock API service
import { registerUser } from '../services/authService';

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    age: string;
    gender: string;
    weight: string;
    height: string;
  }>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('Name is required');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('Email is invalid');
    }
    
    if (!formData.password) {
      newErrors.password = t('Password is required');
    } else if (formData.password.length < 8) {
      newErrors.password = t('Password must be at least 8 characters');
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('Passwords do not match');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.age && (isNaN(Number(formData.age)) || Number(formData.age) < 0 || Number(formData.age) > 120)) {
      newErrors.age = t('Please enter a valid age (0-120)');
    }
    
    if (formData.weight && (isNaN(Number(formData.weight)) || Number(formData.weight) <= 0)) {
      newErrors.weight = t('Please enter a valid weight');
    }
    
    if (formData.height && (isNaN(Number(formData.height)) || Number(formData.height) <= 0)) {
      newErrors.height = t('Please enter a valid height');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 2 && validateStep2()) {
      setIsLoading(true);
      try {
        // Convert numeric string values to numbers
        const userData = {
          ...formData,
          age: formData.age ? parseInt(formData.age) : undefined,
          weight: formData.weight ? parseFloat(formData.weight) : undefined,
          height: formData.height ? parseFloat(formData.height) : undefined,
        };
        // Register with Firebase Auth
        const user = await registerUser(userData.email, userData.password, userData.name);
        // Save user profile to Firestore
        await setDoc(doc(db, 'users', user.uid), {
          name: userData.name,
          email: userData.email,
          age: userData.age,
          gender: userData.gender,
          weight: userData.weight,
          height: userData.height,
          createdAt: new Date().toISOString(),
        });
        // Map Firebase User to UserProfile
        const userProfile = {
          id: user.uid,
          name: user.displayName || userData.name || '',
          email: user.email || userData.email || '',
          age: userData.age,
          gender: userData.gender,
          weight: userData.weight,
          height: userData.height,
        };
        login(userProfile);
        navigate('/dashboard');
      } catch (err: any) {
        let msg = t('Registration failed. Please try again later.');
        if (err && err.code) {
          if (err.code === 'auth/email-already-in-use') msg = t('Email already in use');
          else if (err.code === 'auth/invalid-email') msg = t('Invalid email address');
          else if (err.code === 'auth/weak-password') msg = t('Password must be at least 6 characters');
          else if (err.message) msg = err.message;
        }
        setErrors({ form: msg });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center bg-nutrify-light">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Apple className="h-10 w-10 text-nutrify-accent" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{t('Create your Nutrify account')}</h2>
          <p className="text-gray-600 mt-1">
            {step === 1 ? t('Fill in your account details') : t('Tell us about yourself')}
          </p>
        </div>

        {errors.form && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-6 text-sm">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            // Step 1: Account details
            <>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Full Name')}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('John Doe')}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-nutrify-accent focus:border-nutrify-accent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Email Address')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('you@example.com')}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-nutrify-accent focus:border-nutrify-accent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Password')}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-nutrify-accent focus:border-nutrify-accent pr-10 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                <p className="mt-1 text-xs text-gray-500">{t('Must be at least 8 characters')}</p>
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Confirm Password')}
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-nutrify-accent focus:border-nutrify-accent ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              <button
                type="button"
                onClick={handleNextStep}
                className="w-full nutrify-btn-primary py-2 px-4 flex justify-center items-center"
              >
                {t('Next Step')} <ChevronRight size={20} className="ml-1" />
              </button>
            </>
          ) : (
            // Step 2: Personal details
            <>
              <div className="mb-4">
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Age')} <span className="text-gray-500 text-xs">({t('optional')})</span>
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="30"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-nutrify-accent focus:border-nutrify-accent ${
                    errors.age ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Gender')} <span className="text-gray-500 text-xs">({t('optional')})</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-nutrify-accent focus:border-nutrify-accent"
                >
                  <option value="">{t('Select gender')}</option>
                  <option value="male">{t('Male')}</option>
                  <option value="female">{t('Female')}</option>
                  <option value="other">{t('Other')}</option>
                  <option value="prefer-not-to-say">{t('Prefer not to say')}</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Weight (kg)')} <span className="text-gray-500 text-xs">({t('optional')})</span>
                </label>
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="70"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-nutrify-accent focus:border-nutrify-accent ${
                    errors.weight ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.weight && <p className="mt-1 text-sm text-red-600">{errors.weight}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('Height (cm)')} <span className="text-gray-500 text-xs">({t('optional')})</span>
                </label>
                <input
                  id="height"
                  name="height"
                  type="number"
                  step="0.1"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="175"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-nutrify-accent focus:border-nutrify-accent ${
                    errors.height ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.height && <p className="mt-1 text-sm text-red-600">{errors.height}</p>}
              </div>

              <div className="flex justify-between space-x-4">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="nutrify-btn-outline flex-1 py-2 px-4 flex justify-center items-center"
                >
                  <ChevronLeft size={20} className="mr-1" /> {t('Back')}
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="nutrify-btn-primary flex-1 py-2 px-4 flex justify-center items-center"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('Creating...')}
                    </span>
                  ) : (
                    t('Create Account')
                  )}
                </button>
              </div>
            </>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {t('Already have an account?')}{' '}
            <Link to="/login" className="text-nutrify-accent hover:text-green-700 font-medium">
              {t('Sign in')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;