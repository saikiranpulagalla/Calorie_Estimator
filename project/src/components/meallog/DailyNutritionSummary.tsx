import React, { useMemo } from 'react';
import { useNutritionStore } from '../../stores/nutritionStore';
import { Pie as PieChart } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

interface DailyNutritionSummaryProps {
  date: string;
}

const DailyNutritionSummary: React.FC<DailyNutritionSummaryProps> = ({ date }) => {
  const { foodLogs } = useNutritionStore();
  
  const dailyStats = useMemo(() => {
    const dailyLogs = foodLogs.filter(item => item.date === date);
    
    const totalCalories = dailyLogs.reduce((sum, item) => sum + item.calories, 0);
    const totalProtein = dailyLogs.reduce((sum, item) => sum + item.protein, 0);
    const totalCarbs = dailyLogs.reduce((sum, item) => sum + item.carbs, 0);
    const totalFat = dailyLogs.reduce((sum, item) => sum + item.fat, 0);
    
    // Calculate macro percentages by calories (protein 4kcal/g, carbs 4kcal/g, fat 9kcal/g)
    const proteinCalories = totalProtein * 4;
    const carbsCalories = totalCarbs * 4;
    const fatCalories = totalFat * 9;
    
    return {
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      proteinPercentage: totalCalories ? Math.round((proteinCalories / totalCalories) * 100) : 0,
      carbsPercentage: totalCalories ? Math.round((carbsCalories / totalCalories) * 100) : 0,
      fatPercentage: totalCalories ? Math.round((fatCalories / totalCalories) * 100) : 0,
    };
  }, [foodLogs, date]);
  
  const chartData = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        data: [
          dailyStats.proteinPercentage,
          dailyStats.carbsPercentage,
          dailyStats.fatPercentage,
        ],
        backgroundColor: [
          '#3B82F6', // blue for protein
          '#F97316', // orange for carbs
          '#8B5CF6', // purple for fat
        ],
        borderWidth: 0,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 10,
          padding: 10,
        },
      },
    },
  };

  return (
    <div>
      <h3 className="font-medium text-gray-900 mb-3">Daily Summary</h3>
      
      {dailyStats.totalCalories > 0 ? (
        <>
          <div className="text-center mb-4">
            <p className="text-3xl font-bold text-gray-900">{dailyStats.totalCalories}</p>
            <p className="text-sm text-gray-600">Total Calories</p>
          </div>
          
          <div className="h-40 mb-4">
            <PieChart data={chartData} options={chartOptions} />
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            <MacroSummary 
              label="Protein" 
              value={dailyStats.totalProtein} 
              percentage={dailyStats.proteinPercentage} 
              color="#3B82F6" 
            />
            <MacroSummary 
              label="Carbs" 
              value={dailyStats.totalCarbs} 
              percentage={dailyStats.carbsPercentage} 
              color="#F97316" 
            />
            <MacroSummary 
              label="Fat" 
              value={dailyStats.totalFat} 
              percentage={dailyStats.fatPercentage} 
              color="#8B5CF6" 
            />
          </div>
        </>
      ) : (
        <div className="text-center py-6">
          <p className="text-gray-500">No food logged for this date</p>
        </div>
      )}
    </div>
  );
};

interface MacroSummaryProps {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

const MacroSummary: React.FC<MacroSummaryProps> = ({ label, value, percentage, color }) => {
  return (
    <div>
      <p className="text-sm font-medium" style={{ color }}>
        {label}
      </p>
      <p className="font-semibold text-gray-900">{value.toFixed(1)}g</p>
      <p className="text-xs text-gray-500">{percentage}%</p>
    </div>
  );
};

export default DailyNutritionSummary;