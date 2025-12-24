import React, { useState } from 'react';
import { useNutritionStore } from '../../stores/nutritionStore';
import { Search, Plus } from 'lucide-react';

const CalorieEstimator: React.FC = () => {
  const { addFoodItem } = useNutritionStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [portion, setPortion] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [foodResults, setFoodResults] = useState<any[]>([]);
  const [selectedFood, setSelectedFood] = useState<any | null>(null);
  
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    try {
      // Implement search logic here
    } catch (error) {
      console.error('Error searching for food:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleSelectFood = (food: any) => {
    setSelectedFood(food);
    // Clear search results
    setFoodResults([]);
  };
  
  const handleAddToLog = () => {
    if (!selectedFood) return;
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // Use custom portion if provided, otherwise use default
    const finalPortion = portion.trim() ? portion : selectedFood.portion;
    
    // Add food to log
    addFoodItem({
      id: Date.now().toString(),
      name: selectedFood.name,
      portion: finalPortion,
      calories: selectedFood.calories,
      protein: selectedFood.protein,
      carbs: selectedFood.carbs,
      fat: selectedFood.fat,
      fiber: selectedFood.fiber,
      sugar: selectedFood.sugar,
      sodium: selectedFood.sodium,
      date: today,
      mealType: 'snack', // Default to snack
    });
    
    // Reset form
    setSelectedFood(null);
    setSearchTerm('');
    setPortion('');
  };
  
  const handleReset = () => {
    setSelectedFood(null);
    setSearchTerm('');
    setPortion('');
    setFoodResults([]);
  };

  return (
    <div className="nutrify-card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-nutrify-secondary p-2 rounded-md">
          <Search size={22} className="text-nutrify-accent" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Calorie Estimator</h2>
      </div>
      
      {!selectedFood ? (
        <div>
          <div className="mb-6">
            <label htmlFor="searchFood" className="block text-sm font-medium text-gray-700 mb-1">
              Search for a food
            </label>
            <div className="flex">
              <input
                id="searchFood"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g., apple, chicken breast, rice..."
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:ring-nutrify-accent focus:border-nutrify-accent"
              />
              <button
                onClick={handleSearch}
                disabled={isSearching || !searchTerm.trim()}
                className="bg-nutrify-accent text-white px-4 py-2 rounded-r-md hover:bg-green-600 transition-colors flex items-center"
              >
                {isSearching ? (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <Search size={18} />
                )}
              </button>
            </div>
            {searchTerm && !isSearching && foodResults.length === 0 && (
              <p className="mt-2 text-sm text-gray-500">
                No results found. Try a different search term or be more specific.
              </p>
            )}
          </div>
          
          {foodResults.length > 0 && (
            <div className="border border-gray-200 rounded-md overflow-hidden mb-6">
              <div className="text-sm font-medium text-gray-700 bg-gray-50 px-4 py-2 border-b border-gray-200">
                Search Results
              </div>
              <div className="max-h-80 overflow-y-auto">
                {foodResults.map((food, index) => (
                  <div 
                    key={index} 
                    className="border-b border-gray-200 last:border-b-0 p-3 hover:bg-nutrify-light cursor-pointer transition-colors"
                    onClick={() => handleSelectFood(food)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">{food.name}</h3>
                        <p className="text-sm text-gray-600">{food.portion}</p>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{food.calories} kcal</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="bg-nutrify-light rounded-lg p-4">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Search Tips</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Be specific (e.g., "grilled chicken breast" instead of just "chicken")</li>
              <li>• Include preparation method when possible</li>
              <li>• For packaged foods, include brand names</li>
              <li>• Use common names (e.g., "bell pepper" instead of "capsicum")</li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-nutrify-light p-4 rounded-lg mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">{selectedFood.name}</h3>
                <p className="text-sm text-gray-600">{selectedFood.portion}</p>
              </div>
              <span className="font-bold text-gray-900 dark:text-gray-100">{selectedFood.calories} kcal</span>
            </div>
            
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="bg-white dark:bg-gray-800 p-2 rounded-md">
                <div className="text-sm text-gray-500">Protein</div>
                <div className="font-medium">{selectedFood.protein.toFixed(1)}g</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-2 rounded-md">
                <div className="text-sm text-gray-500">Carbs</div>
                <div className="font-medium">{selectedFood.carbs.toFixed(1)}g</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-2 rounded-md">
                <div className="text-sm text-gray-500">Fat</div>
                <div className="font-medium">{selectedFood.fat.toFixed(1)}g</div>
              </div>
              
              {selectedFood.fiber !== undefined && (
                <div className="bg-white dark:bg-gray-800 p-2 rounded-md">
                  <div className="text-sm text-gray-500">Fiber</div>
                  <div className="font-medium">{selectedFood.fiber.toFixed(1)}g</div>
                </div>
              )}
              
              {selectedFood.sugar !== undefined && (
                <div className="bg-white dark:bg-gray-800 p-2 rounded-md">
                  <div className="text-sm text-gray-500">Sugar</div>
                  <div className="font-medium">{selectedFood.sugar.toFixed(1)}g</div>
                </div>
              )}
              
              {selectedFood.sodium !== undefined && (
                <div className="bg-white dark:bg-gray-800 p-2 rounded-md">
                  <div className="text-sm text-gray-500">Sodium</div>
                  <div className="font-medium">{selectedFood.sodium.toFixed(0)}mg</div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="portion" className="block text-sm font-medium text-gray-700 mb-1">
              Portion (optional)
            </label>
            <input
              id="portion"
              type="text"
              value={portion}
              onChange={(e) => setPortion(e.target.value)}
              placeholder={`e.g., 2 servings, 100g (default: ${selectedFood.portion})`}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-nutrify-accent focus:border-nutrify-accent"
            />
            <p className="mt-1 text-xs text-gray-500">
              Specify a custom portion size if different from default
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleAddToLog}
              className="nutrify-btn-primary flex-1 flex items-center justify-center"
            >
              <Plus size={16} className="mr-1" />
              Add to Meal Log
            </button>
            <button
              onClick={handleReset}
              className="nutrify-btn-outline flex-1"
            >
              Start New Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalorieEstimator;