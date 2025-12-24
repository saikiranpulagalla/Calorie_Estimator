import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useNutritionStore } from '../stores/nutritionStore';
import { Camera, Utensils, MessageCircle, Activity, TrendingUp, CreditCard } from 'lucide-react';
import NutritionSummary from '../components/dashboard/NutritionSummary';
import RecentFoodCard from '../components/dashboard/RecentFoodCard';
import NutritionChart from '../components/dashboard/NutritionChart';
import type { LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { foodLogs } = useNutritionStore();
  const [today, setToday] = useState('');
  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2000); // Default goal

  useEffect(() => {
    // Get today's date in YYYY-MM-DD format
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    setToday(formattedDate);

    // Set user's calorie goal if available
    if (user?.calorieGoal) {
      setDailyGoal(user.calorieGoal);
    }

    // Calculate calories consumed today
    const todayFoods = foodLogs.filter(item => item.date === formattedDate);
    const totalCalories = todayFoods.reduce((sum, item) => sum + item.calories, 0);
    setCaloriesConsumed(totalCalories);
  }, [foodLogs, user]);

  // Get recent food logs (last 5)
  const recentFoods = foodLogs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-nutrify-light dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-4">{t('Dashboard')}</h1>
        <p className="text-gray-600 dark:text-gray-300">
          {t('Track your nutrition progress and analyze your meals')}
        </p>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="nutrify-card bg-gradient-to-br from-nutrify-secondary to-nutrify-accent">
          <h3 className="text-lg font-semibold text-white mb-1">{t('Calories Today')}</h3>
          <div className="flex justify-between items-end">
            <p className="text-3xl font-bold text-white">{caloriesConsumed}</p>
            <p className="text-sm text-white opacity-90">{t('of')} {dailyGoal} kcal</p>
          </div>
          <div className="mt-2 bg-white dark:bg-gray-800 bg-opacity-30 rounded-full h-2.5">
            <div
              className="bg-white dark:bg-gray-800 h-2.5 rounded-full"
              style={{ width: `${Math.min(100, (caloriesConsumed / dailyGoal) * 100)}%` }}
            ></div>
          </div>
        </div>

        <StatsCard
          title="Protein"
          value={foodLogs.filter(item => item.date === today)
            .reduce((sum, item) => sum + item.protein, 0)}
          unit="g"
          icon={Activity}
          color="bg-blue-500"
        />

        <StatsCard
          title="Carbs"
          value={foodLogs.filter(item => item.date === today)
            .reduce((sum, item) => sum + item.carbs, 0)}
          unit="g"
          icon={Activity}
          color="bg-orange-500"
        />

        <StatsCard
          title="Fat"
          value={foodLogs.filter(item => item.date === today)
            .reduce((sum, item) => sum + item.fat, 0)}
          unit="g"
          icon={Activity}
          color="bg-purple-500"
        />
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Link to="/analysis" className="nutrify-btn-primary flex items-center">
          <Camera size={18} className="mr-2" />
          {t('Analyze Food')}
        </Link>
        <Link to="/meal-log" className="nutrify-btn-secondary flex items-center">
          <Utensils size={18} className="mr-2" />
          {t('Log Meal')}
        </Link>
        <Link to="/chatbot" className="nutrify-btn-outline flex items-center">
          <MessageCircle size={18} className="mr-2" />
          {t('Ask Nutrition Assistant')}
        </Link>
        <Link
          to="/subscription"
          className="flex items-center px-6 py-3 rounded-lg font-bold text-white text-lg shadow-lg bg-gradient-to-r from-yellow-400 via-nutrify-accent to-green-500 animate-bounce border-2 border-yellow-400 hover:scale-105 transition-transform duration-200"
          style={{ boxShadow: '0 4px 20px 0 rgba(34,197,94,0.25)' }}
        >
          <CreditCard size={22} className="mr-3" />
          {t('Go Pro: Subscription')}
        </Link>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Nutrition Chart */}
          <div className="nutrify-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('Nutrition Trends')}</h2>
              <select className="text-sm border border-gray-300 rounded-md p-1">
                <option value="7days">{t('Last 7 days')}</option>
                <option value="30days">{t('Last 30 days')}</option>
                <option value="90days">{t('Last 90 days')}</option>
              </select>
            </div>
            <NutritionChart />
          </div>

          {/* Nutrition Summary */}
          <div className="nutrify-card">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{t("Today's Nutrition Summary")}</h2>
            <NutritionSummary date={today} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Recent Foods */}
          <div className="nutrify-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('Recent Foods')}</h2>
              <Link to="/meal-log" className="text-sm text-nutrify-accent hover:text-green-700">
                {t('View all')}
              </Link>
            </div>

            {recentFoods.length > 0 ? (
              <div className="space-y-4">
                {recentFoods.map((food) => (
                  <RecentFoodCard key={food.id} food={food} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">{t('No food logs yet')}</p>
                <Link to="/analysis" className="nutrify-btn-primary inline-flex items-center">
                  <Camera size={18} className="mr-2" />
                  {t('Analyze Your First Meal')}
                </Link>
              </div>
            )}
          </div>

          {/* Health Insights Card */}
          <div className="nutrify-card bg-gradient-to-br from-nutrify-light to-nutrify-secondary">
            <div className="flex items-center mb-4">
              <div className="bg-white dark:bg-gray-800 p-2 rounded-full mr-3">
                <TrendingUp size={20} className="text-nutrify-accent" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('Health Insights')}</h2>
            </div>

            <p className="text-gray-700 mb-4">
              {t('Based on your recent data, you\'re doing well on protein intake but could improve your fiber consumption.')}
            </p>

            <Link to="/tools" className="text-nutrify-accent font-medium hover:text-green-700">
              {t('View health recommendations →')}
            </Link>
          </div>
        </div>
      </div>

      <div className="nutrify-card bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        {/* Additional content or cards can be placed here */}
      </div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon; // <-- Use LucideIcon type here
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, unit, icon: Icon, color }) => {
  return (
    <div className="nutrify-card">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={`${color} p-1.5 rounded-full text-white`}>
          <Icon size={14} />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {value.toFixed(1)}
        <span className="text-sm font-normal text-gray-500 ml-1">{unit}</span>
      </p>
    </div>
  );
};

export default DashboardPage;