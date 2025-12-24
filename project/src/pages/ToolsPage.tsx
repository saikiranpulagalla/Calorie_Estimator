import React, { useState } from 'react';
import { Calculator, Search } from 'lucide-react';
import BMICalculator from '../components/tools/BMICalculator';
import CalorieEstimator from '../components/tools/CalorieEstimator';

const ToolsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bmi' | 'calorie'>('bmi');

  return (
    <div className="min-h-screen bg-nutrify-light dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Nutrition Tools</h1>
        <p className="text-gray-600">
          Useful calculators and tools to support your nutrition journey
        </p>
      </header>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab('bmi')}
          className={`py-3 px-6 font-medium text-sm focus:outline-none ${
            activeTab === 'bmi'
              ? 'text-nutrify-accent border-b-2 border-nutrify-accent'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center">
            <Calculator size={18} className="mr-2" />
            BMI Calculator
          </div>
        </button>
        
        <button
          onClick={() => setActiveTab('calorie')}
          className={`py-3 px-6 font-medium text-sm focus:outline-none ${
            activeTab === 'calorie'
              ? 'text-nutrify-accent border-b-2 border-nutrify-accent'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center">
            <Search size={18} className="mr-2" />
            Calorie Estimator
          </div>
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Tool */}
        <div className="lg:col-span-3">
          {activeTab === 'bmi' ? (
            <BMICalculator />
          ) : (
            <CalorieEstimator />
          )}
        </div>
        
        {/* Information Panel */}
        <div className="lg:col-span-2">
          {activeTab === 'bmi' ? (
            <BMIInfoPanel />
          ) : (
            <CalorieInfoPanel />
          )}
        </div>
      </div>
    </div>
  );
};

const BMIInfoPanel: React.FC = () => {
  return (
    <div className="nutrify-card bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">About BMI</h2>
      
      <div className="space-y-4 text-gray-700">
        <p>
          Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men and women.
        </p>
        
        <h3 className="font-medium text-gray-900">BMI Categories:</h3>
        <ul className="space-y-2 ml-5 list-disc">
          <li>Underweight: BMI less than 18.5</li>
          <li>Normal weight: BMI 18.5 to 24.9</li>
          <li>Overweight: BMI 25 to 29.9</li>
          <li>Obesity: BMI 30 or greater</li>
        </ul>
        
        <h3 className="font-medium text-gray-900">Limitations of BMI:</h3>
        <ul className="space-y-2 ml-5 list-disc">
          <li>Doesn't account for muscle mass</li>
          <li>Doesn't consider body composition</li>
          <li>May not be accurate for athletes or elderly</li>
        </ul>
        
        <div className="bg-white p-3 rounded-lg border border-gray-200 mt-4">
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> BMI is a screening tool, not a diagnostic tool. Consult with healthcare professionals for a complete health assessment.
          </p>
        </div>
      </div>
    </div>
  );
};

const CalorieInfoPanel: React.FC = () => {
  return (
    <div className="nutrify-card bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Calorie Estimator Guide</h2>
      
      <div className="space-y-4 text-gray-700">
        <p>
          Our AI-powered calorie estimator helps you quickly find nutritional information for any food item.
        </p>
        
        <h3 className="font-medium text-gray-900">How It Works:</h3>
        <ol className="space-y-2 ml-5 list-decimal">
          <li>Enter a food name and portion size</li>
          <li>Our AI searches a comprehensive nutrition database</li>
          <li>View detailed nutritional breakdown including macros</li>
          <li>Add items to your meal log with one click</li>
        </ol>
        
        <h3 className="font-medium text-gray-900">Tips for Accuracy:</h3>
        <ul className="space-y-2 ml-5 list-disc">
          <li>Be specific about the food item (e.g., "grilled chicken breast" instead of just "chicken")</li>
          <li>Include preparation method if known</li>
          <li>Specify portion size in grams or standard units</li>
        </ul>
        
        <div className="bg-white p-3 rounded-lg border border-gray-200 mt-4">
          <p className="text-sm text-gray-600">
            <strong>Pro Tip:</strong> For mixed meals or recipes, break them down into individual ingredients for the most accurate results.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;