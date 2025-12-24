import React, { useState } from 'react';
import { useNutritionStore } from '../../stores/nutritionStore';
import { Search, Plus, X } from 'lucide-react';
import { analyzeFood } from '../../services/foodAnalysisService'; // Import the correct function

interface MealLogFormProps {
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  onClose: () => void;
}

const MealLogForm: React.FC<MealLogFormProps> = ({ date, mealType, onClose }) => {
  const { addFoodItem } = useNutritionStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [portion, setPortion] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedFood, setSelectedFood] = useState<any | null>(null);
  const [addedFoods, setAddedFoods] = useState<any[]>([]);
  
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    setSearchResults([]);
    try {
      // Use Gemini API to analyze the food name (text input)
      const resultsObj = await analyzeFood(searchTerm);
      // Gemini always returns an object with foodItems array
      setSearchResults(resultsObj.foodItems || []);
    } catch (error) {
      setSearchResults([]);
      alert('Could not fetch nutrition info. Please try again.');
      console.error('Error searching for food items:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleSelectFood = (food: any) => {
    setSelectedFood(food);
    setSearchResults([]);
  };
  
  const handleAddFoodItem = async () => {
    if (!selectedFood) return;
    const foodItem = {
      id: Date.now().toString(),
      name: selectedFood.name,
      portion: portion || selectedFood.portion,
      calories: selectedFood.calories,
      protein: selectedFood.protein,
      carbs: selectedFood.carbs,
      fat: selectedFood.fat,
      fiber: selectedFood.fiber,
      sugar: selectedFood.sugar,
      sodium: selectedFood.sodium,
      date,
      mealType,
    };
    await addFoodItem(foodItem);
    setAddedFoods(prev => [...prev, foodItem]);
    setSelectedFood(null);
    setPortion('');
  };
  
  const handleRemoveFood = (id: string) => {
    setAddedFoods(prev => prev.filter(item => item.id !== id));
  };
  
  const handleSaveAll = async () => {
    for (const item of addedFoods) {
      await addFoodItem(item);
    }
    setAddedFoods([]);
    onClose();
  };
  
  return (
    <div>
      {!selectedFood ? (
        // Food search section
        <div>
          <div className="mb-4">
            <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-1">
              Search for a food
            </label>
            <div className="flex">
              <input
                id="searchTerm"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g. grilled chicken, apple, pasta..."
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:ring-nutrify-accent focus:border-nutrify-accent"
              />
              <button
                onClick={handleSearch}
                disabled={isSearching || !searchTerm.trim()}
                className="bg-nutrify-accent text-white px-3 py-2 rounded-r-md hover:bg-green-600 transition-colors flex items-center"
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
          </div>
          
          {/* Search results */}
          {searchResults.length > 0 ? (
            <div className="mb-4 max-h-60 overflow-y-auto border border-gray-200 rounded-md">
              {searchResults.map((food, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectFood(food)}
                  className="p-3 border-b border-gray-200 last:border-b-0 hover:bg-nutrify-light cursor-pointer dark:hover:bg-nutrify-dark/40"
                >
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{food.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{food.portion}</p>
                    </div>
                    <span className="font-medium">{food.calories} kcal</span>
                  </div>
                </div>
              ))}
            </div>
          ) : searchTerm && !isSearching ? (
            <p className="text-gray-500 text-center py-2 mb-4 dark:text-gray-400">No results found. Try a different search term.</p>
          ) : null}
          
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // Food details section
        <div>
          <div className="bg-nutrify-light p-3 rounded-md mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{selectedFood.name}</h3>
                <p className="text-sm text-gray-600">{selectedFood.portion}</p>
              </div>
              <button
                onClick={() => setSelectedFood(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Calories:</span> {selectedFood.calories} kcal
              </div>
              <div>
                <span className="text-gray-500">Protein:</span> {selectedFood.protein.toFixed(1)}g
              </div>
              <div>
                <span className="text-gray-500">Carbs:</span> {selectedFood.carbs.toFixed(1)}g
              </div>
              <div>
                <span className="text-gray-500">Fat:</span> {selectedFood.fat.toFixed(1)}g
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="portion" className="block text-sm font-medium text-gray-700 mb-1">
              Portion Size (optional)
            </label>
            <input
              id="portion"
              type="text"
              value={portion}
              onChange={(e) => setPortion(e.target.value)}
              placeholder={selectedFood.portion}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-nutrify-accent focus:border-nutrify-accent"
            />
            <p className="mt-1 text-xs text-gray-500">
              Override the default portion size if needed. E.g., "2 slices" or "150g"
            </p>
          </div>
          
          <div className="flex justify-between space-x-4">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            
            <button
              onClick={handleAddFoodItem}
              className="nutrify-btn-primary flex items-center"
            >
              <Plus size={16} className="mr-1" />
              Add to List
            </button>
          </div>
        </div>
      )}
      
      {addedFoods.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Foods to Add:</h4>
          <ul className="space-y-2">
            {addedFoods.map(item => (
              <li key={item.id} className="flex items-center justify-between bg-nutrify-light dark:bg-nutrify-dark/40 rounded px-3 py-2">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="ml-2 text-sm text-gray-500">{item.portion}</span>
                  <span className="ml-2 text-sm text-gray-500">{item.calories} kcal</span>
                </div>
                <button onClick={() => handleRemoveFood(item.id)} className="text-red-500 hover:text-red-700 ml-2" title="Remove">
                  <X size={18} />
                </button>
              </li>
            ))}
          </ul>
          <button onClick={handleSaveAll} className="nutrify-btn-primary mt-3 w-full">Add All to Log</button>
        </div>
      )}
    </div>
  );
};

export default MealLogForm;