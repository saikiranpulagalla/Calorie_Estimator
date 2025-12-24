import React from 'react';
import { FoodItem } from '../../stores/nutritionStore';

interface RecentFoodCardProps {
  food: FoodItem;
}

const RecentFoodCard: React.FC<RecentFoodCardProps> = ({ food }) => {
  const formattedDate = new Date(food.date).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric'
  });
  
  const getMealTypeEmoji = (mealType?: string) => {
    switch (mealType) {
      case 'breakfast': return '🍳';
      case 'lunch': return '🍲';
      case 'dinner': return '🍽️';
      case 'snack': return '🍌';
      default: return '🍴';
    }
  };

  return (
    <div className="bg-nutrify-light rounded-lg p-3 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <span className="text-lg mr-2">{getMealTypeEmoji(food.mealType)}</span>
          <div>
            <h3 className="font-medium text-gray-900">{food.name}</h3>
            <p className="text-sm text-gray-600">{food.portion}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-900">{food.calories} kcal</p>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
      </div>
      
      <div className="mt-2 flex space-x-3 text-xs">
        <div>
          <span className="text-gray-500">Protein:</span> {food.protein.toFixed(1)}g
        </div>
        <div>
          <span className="text-gray-500">Carbs:</span> {food.carbs.toFixed(1)}g
        </div>
        <div>
          <span className="text-gray-500">Fat:</span> {food.fat.toFixed(1)}g
        </div>
      </div>
    </div>
  );
};

export default RecentFoodCard;