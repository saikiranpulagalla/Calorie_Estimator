import React, { useState, useEffect } from 'react';
import { useNutritionStore, FoodItem } from '../stores/nutritionStore';
import { Calendar, PlusCircle } from 'lucide-react';
import MealLogItem from '../components/meallog/MealLogItem';
import MealLogForm from '../components/meallog/MealLogForm';
import DailyNutritionSummary from '../components/meallog/DailyNutritionSummary';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../stores/authStore';

const MealLogPage: React.FC = () => {
  const { t } = useTranslation();
  const { foodLogs, getFoodLogsByDate, loadUserMeals } = useNutritionStore();
  const { user } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [dailyLogs, setDailyLogs] = useState<FoodItem[]>([]);
  
  // Initialize with today's date
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);
  
  // Load user meals on mount and when user changes
  useEffect(() => {
    if (user) {
      loadUserMeals();
    }
  }, [user, loadUserMeals]);
  
  // Update daily logs when date or foodLogs change
  useEffect(() => {
    if (selectedDate) {
      const logs = getFoodLogsByDate(selectedDate);
      setDailyLogs(logs);
    }
  }, [selectedDate, foodLogs, getFoodLogsByDate]);
  
  const today = new Date().toISOString().split('T')[0];
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.value;
    if (picked > today) {
      alert(t('You cannot select a future date.'));
      return;
    }
    setSelectedDate(picked);
  };
  
  const handleAddMeal = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    setSelectedMealType(mealType);
    setIsAddingMeal(true);
  };
  
  const closeAddMealForm = () => {
    setIsAddingMeal(false);
  };

  // Filter logs by meal type
  const breakfastItems = dailyLogs.filter(item => item.mealType === 'breakfast');
  const lunchItems = dailyLogs.filter(item => item.mealType === 'lunch');
  const dinnerItems = dailyLogs.filter(item => item.mealType === 'dinner');
  const snackItems = dailyLogs.filter(item => item.mealType === 'snack');
  
  return (
    <div className="min-h-screen bg-nutrify-light dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('Meal Log')}</h1>
        <p className="text-gray-600">
          {t('Track your daily food intake and monitor your nutrition')}
        </p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column - Daily Summary */}
        <div className="lg:col-span-1">
          <div className="nutrify-card mb-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar size={20} className="text-nutrify-accent" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('Select Date')}</h2>
            </div>
            
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              max={today}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:ring-nutrify-accent focus:border-nutrify-accent"
            />
            
            <DailyNutritionSummary date={selectedDate} />
          </div>
        </div>
        
        {/* Right Column - Meal Log */}
        <div className="lg:col-span-3">
          {/* Breakfast */}
          <MealSection
            title={t('Breakfast')}
            items={breakfastItems}
            onAddMeal={() => handleAddMeal('breakfast')}
          />
          
          {/* Lunch */}
          <MealSection
            title={t('Lunch')}
            items={lunchItems}
            onAddMeal={() => handleAddMeal('lunch')}
          />
          
          {/* Dinner */}
          <MealSection
            title={t('Dinner')}
            items={dinnerItems}
            onAddMeal={() => handleAddMeal('dinner')}
          />
          
          {/* Snacks */}
          <MealSection
            title={t('Snacks')}
            items={snackItems}
            onAddMeal={() => handleAddMeal('snack')}
          />
        </div>
      </div>
      
      {/* Add Meal Form Modal */}
      {isAddingMeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {t('Add {{mealType}} Item', { mealType: selectedMealType.charAt(0).toUpperCase() + selectedMealType.slice(1) })}
              </h2>
              
              <MealLogForm 
                date={selectedDate} 
                mealType={selectedMealType} 
                onClose={closeAddMealForm} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface MealSectionProps {
  title: string;
  items: FoodItem[];
  onAddMeal: () => void;
}

const MealSection: React.FC<MealSectionProps> = ({ title, items, onAddMeal }) => {
  const { t } = useTranslation();
  
  return (
    <div className="nutrify-card mb-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
        <button 
          onClick={onAddMeal}
          className="text-nutrify-accent hover:text-green-700 flex items-center text-sm font-medium"
        >
          <PlusCircle size={16} className="mr-1" />
          {t('Add Item')}
        </button>
      </div>
      
      {items.length > 0 ? (
        <div className="space-y-4">
          {items.map(item => (
            <MealLogItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-6 border border-dashed border-gray-200 rounded-lg">
          <p className="text-gray-500">{t('No {{title}} items logged', { title: title.toLowerCase() })}</p>
          <button 
            onClick={onAddMeal}
            className="mt-2 text-nutrify-accent hover:text-green-700 text-sm font-medium"
          >
            {t('Add your first {{title}} item', { title: title.toLowerCase() })}
          </button>
        </div>
      )}
    </div>
  );
};

export default MealLogPage;