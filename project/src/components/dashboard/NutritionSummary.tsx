import React, { useMemo } from 'react';
import { useNutritionStore } from '../../stores/nutritionStore';

interface NutritionSummaryProps {
  date: string;
}

const NutritionSummary: React.FC<NutritionSummaryProps> = ({ date }) => {
  const { foodLogs } = useNutritionStore();
  
  const dailyTotals = useMemo(() => {
    const todayFoods = foodLogs.filter(item => item.date === date);
    
    return {
      calories: todayFoods.reduce((sum, item) => sum + item.calories, 0),
      protein: todayFoods.reduce((sum, item) => sum + item.protein, 0),
      carbs: todayFoods.reduce((sum, item) => sum + item.carbs, 0),
      fat: todayFoods.reduce((sum, item) => sum + item.fat, 0),
      fiber: todayFoods.reduce((sum, item) => sum + (item.fiber || 0), 0),
      sugar: todayFoods.reduce((sum, item) => sum + (item.sugar || 0), 0),
      sodium: todayFoods.reduce((sum, item) => sum + (item.sodium || 0), 0),
    };
  }, [foodLogs, date]);
  
  // Daily goals - these would come from user settings in a real app
  const dailyGoals = {
    calories: 2000,
    protein: 50,
    carbs: 275,
    fat: 55,
    fiber: 28,
    sugar: 50,
    sodium: 2300,
  };

  return (
    <div>
      {foodLogs.filter(item => item.date === date).length > 0 ? (
        <>
          <div className="space-y-4">
            <NutrientBar 
              label="Calories" 
              value={dailyTotals.calories} 
              max={dailyGoals.calories} 
              unit="kcal" 
              color="bg-nutrify-accent"
            />
            <NutrientBar 
              label="Protein" 
              value={dailyTotals.protein} 
              max={dailyGoals.protein} 
              unit="g" 
              color="bg-blue-500"
            />
            <NutrientBar 
              label="Carbs" 
              value={dailyTotals.carbs} 
              max={dailyGoals.carbs} 
              unit="g" 
              color="bg-orange-500"
            />
            <NutrientBar 
              label="Fat" 
              value={dailyTotals.fat} 
              max={dailyGoals.fat} 
              unit="g" 
              color="bg-purple-500"
            />
            <NutrientBar 
              label="Fiber" 
              value={dailyTotals.fiber} 
              max={dailyGoals.fiber} 
              unit="g" 
              color="bg-teal-500"
            />
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Sugar</p>
              <p className="font-medium">
                {dailyTotals.sugar.toFixed(1)}<span className="text-xs text-gray-500 ml-1">g</span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Sodium</p>
              <p className="font-medium">
                {dailyTotals.sodium.toFixed(0)}<span className="text-xs text-gray-500 ml-1">mg</span>
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500">No nutrition data for this date</p>
        </div>
      )}
    </div>
  );
};

interface NutrientBarProps {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: string;
}

const NutrientBar: React.FC<NutrientBarProps> = ({ label, value, max, unit, color }) => {
  const percentage = Math.min(100, (value / max) * 100);
  
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-600">
          {value.toFixed(1)}/{max} {unit}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className={`${color} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default NutritionSummary;