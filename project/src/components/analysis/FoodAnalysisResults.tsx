import React, { useState } from 'react';
import { useNutritionStore } from '../../stores/nutritionStore';
import { Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FoodAnalysisResultsProps {
  isLoading: boolean;
}

const FoodAnalysisResults: React.FC<FoodAnalysisResultsProps> = ({ isLoading }) => {
  const { recentAnalysis, addFoodItem } = useNutritionStore();
  const [showMealTypeModal, setShowMealTypeModal] = useState(false);
  const [pendingItems, setPendingItems] = useState<any[]>([]);

  const handleAddToLog = (foodItem: any, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' = 'lunch') => {
    const today = new Date().toISOString().split('T')[0];
    addFoodItem({
      ...foodItem,
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      date: today,
      mealType,
    });
  };

  const handleAddAllClick = () => {
    if (recentAnalysis && recentAnalysis.foodItems) {
      setPendingItems(recentAnalysis.foodItems);
      setShowMealTypeModal(true);
    }
  };

  const handleSelectMealType = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    pendingItems.forEach(item => handleAddToLog(item, mealType));
    setShowMealTypeModal(false);
    setPendingItems([]);
  };

  if (isLoading) {
    return (
      <div className="nutrify-card bg-white dark:bg-gray-800">
        <div className="text-center py-12">
          <div className="inline-block mx-auto mb-4">
            <svg className="animate-spin h-12 w-12 text-nutrify-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">Analyzing your food...</h3>
          <p className="text-gray-600">
            Our AI is identifying food items and calculating nutritional information
          </p>
        </div>
      </div>
    );
  }
  
  if (!recentAnalysis) {
    return (
      <div className="nutrify-card bg-white dark:bg-gray-800">
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-nutrify-light rounded-full flex items-center justify-center mx-auto mb-6">
            <ArrowRight size={32} className="text-nutrify-accent ml-2" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">Ready to analyze</h3>
          <p className="text-gray-600 mb-6">
            Upload a photo of your food using the panel on the left to get detailed nutritional information
          </p>
          <p className="text-sm text-gray-500">
            Get accurate nutritional insights in seconds with our advanced AI food recognition
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="nutrify-card bg-white dark:bg-gray-800 relative">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">Analysis Results</h2>
        <p className="text-gray-600">
          Here's the nutritional breakdown of your food
        </p>
      </div>
      
      {/* Total Summary */}
      <div className="bg-nutrify-light rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Total Nutritional Value</h3>
          <span className="bg-nutrify-accent text-white text-sm font-medium py-1 px-2 rounded">
            {recentAnalysis.totalCalories} kcal
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4">
          <NutrientSummary label="Protein" value={recentAnalysis.totalProtein} unit="g" />
          <NutrientSummary label="Carbs" value={recentAnalysis.totalCarbs} unit="g" />
          <NutrientSummary label="Fat" value={recentAnalysis.totalFat} unit="g" />
        </div>
        
        <div className="mt-4">
          <button 
            onClick={handleAddAllClick}
            className="w-full nutrify-btn-primary flex justify-center items-center py-2"
          >
            <Plus size={16} className="mr-1" />
            Add All to Meal Log
          </button>
        </div>
        {/* Custom meal type selection modal */}
        {showMealTypeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-sm w-full mx-auto p-6 z-10">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Add to which meal?</h2>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => handleSelectMealType('breakfast')} className="nutrify-btn-primary">Breakfast</button>
                <button onClick={() => handleSelectMealType('lunch')} className="nutrify-btn-primary">Lunch</button>
                <button onClick={() => handleSelectMealType('dinner')} className="nutrify-btn-primary">Dinner</button>
                <button onClick={() => handleSelectMealType('snack')} className="nutrify-btn-primary">Snack</button>
              </div>
              <button onClick={() => setShowMealTypeModal(false)} className="mt-4 w-full nutrify-btn-outline">Cancel</button>
            </div>
          </div>
        )}
      </div>
      
      {/* Individual Food Items */}
      <div>
        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Detected Food Items</h3>
        
        <div className="space-y-4">
          {recentAnalysis.foodItems.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.portion}</p>
                </div>
                <span className="font-semibold text-gray-900 dark:text-gray-100">{item.calories} kcal</span>
              </div>
              
              <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Protein:</span> {item.protein.toFixed(1)}g
                </div>
                <div>
                  <span className="text-gray-500">Carbs:</span> {item.carbs.toFixed(1)}g
                </div>
                <div>
                  <span className="text-gray-500">Fat:</span> {item.fat.toFixed(1)}g
                </div>
                
                {item.fiber && (
                  <div>
                    <span className="text-gray-500">Fiber:</span> {item.fiber.toFixed(1)}g
                  </div>
                )}
                
                {item.sugar && (
                  <div>
                    <span className="text-gray-500">Sugar:</span> {item.sugar.toFixed(1)}g
                  </div>
                )}
                
                {item.sodium !== undefined && item.sodium !== null && (
                  <div>
                    <span className="text-gray-500">Sodium:</span> {item.sodium.toFixed(0)}mg
                  </div>
                )}
              </div>
              
              <button
                onClick={() => handleAddToLog(item)}
                className="mt-3 text-nutrify-accent hover:text-green-700 text-sm font-medium flex items-center"
              >
                <Plus size={14} className="mr-1" />
                Add to Meal Log
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <Link 
          to="/meal-log" 
          className="text-nutrify-accent hover:text-green-700 font-medium flex items-center"
        >
          Go to Meal Log <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
      
      {/* Image Preview */}
      {(!recentAnalysis || !recentAnalysis.foodItems || recentAnalysis.foodItems.length === 0) && (
        <div className="mt-4">
          <img src={recentAnalysis.imageUrl} alt="Uploaded preview" className="max-h-48 mx-auto rounded shadow" />
        </div>
      )}
    </div>
  );
};

interface NutrientSummaryProps {
  label: string;
  value: number;
  unit: string;
}

const NutrientSummary: React.FC<NutrientSummaryProps> = ({ label, value, unit }) => {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="font-semibold text-gray-900 dark:text-gray-100">
        {value.toFixed(1)}<span className="text-xs ml-1">{unit}</span>
      </p>
    </div>
  );
};

export default FoodAnalysisResults;