import React, { useState } from 'react';
import { FoodItem, useNutritionStore } from '../../stores/nutritionStore';
import { Trash2 } from 'lucide-react';

interface MealLogItemProps {
  item: FoodItem;
}

const MealLogItem: React.FC<MealLogItemProps> = ({ item }) => {
  const { removeFoodItem } = useNutritionStore();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  const handleRemove = () => {
    if (confirm('Are you sure you want to remove this item from your meal log?')) {
      removeFoodItem(item.id);
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
      <div 
        className="p-4 cursor-pointer"
        onClick={toggleExpanded}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.portion}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-900">{item.calories} kcal</p>
          </div>
        </div>
        
        <div className="mt-2 flex space-x-3 text-sm">
          <div>
            <span className="text-gray-500">Protein:</span> {item.protein.toFixed(1)}g
          </div>
          <div>
            <span className="text-gray-500">Carbs:</span> {item.carbs.toFixed(1)}g
          </div>
          <div>
            <span className="text-gray-500">Fat:</span> {item.fat.toFixed(1)}g
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-4 pb-4 pt-1 border-t border-gray-100 bg-nutrify-light bg-opacity-50">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {item.fiber !== undefined && (
              <div>
                <span className="text-gray-500">Fiber:</span> {item.fiber.toFixed(1)}g
              </div>
            )}
            
            {item.sugar !== undefined && (
              <div>
                <span className="text-gray-500">Sugar:</span> {item.sugar.toFixed(1)}g
              </div>
            )}
            
            {item.sodium !== undefined && (
              <div>
                <span className="text-gray-500">Sodium:</span> {item.sodium.toFixed(0)}mg
              </div>
            )}
          </div>
          
          <div className="mt-3 flex justify-end">
            <button
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700 flex items-center text-sm"
            >
              <Trash2 size={14} className="mr-1" />
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealLogItem;