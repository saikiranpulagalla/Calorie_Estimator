import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Mock data - in a real app, this would come from the nutrition store
const generateMockData = () => {
  const dates = [];
  const calories = [];
  const protein = [];
  const carbs = [];
  const fat = [];
  
  // Generate last 7 days data
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    
    // Random values with some consistency for a more realistic chart
    calories.push(Math.floor(Math.random() * 600) + 1400);
    protein.push(Math.floor(Math.random() * 20) + 40);
    carbs.push(Math.floor(Math.random() * 50) + 150);
    fat.push(Math.floor(Math.random() * 15) + 40);
  }
  
  return { dates, calories, protein, carbs, fat };
};

const mockData = generateMockData();

const data: ChartData<'line'> = {
  labels: mockData.dates,
  datasets: [
    {
      label: 'Calories',
      data: mockData.calories,
      borderColor: '#A0C878',
      backgroundColor: '#A0C878',
      yAxisID: 'y',
      tension: 0.3,
    },
    {
      label: 'Protein',
      data: mockData.protein,
      borderColor: '#3B82F6',
      backgroundColor: '#3B82F6',
      yAxisID: 'y1',
      tension: 0.3,
    },
    {
      label: 'Carbs',
      data: mockData.carbs,
      borderColor: '#F97316',
      backgroundColor: '#F97316',
      yAxisID: 'y1',
      tension: 0.3,
    },
    {
      label: 'Fat',
      data: mockData.fat,
      borderColor: '#8B5CF6',
      backgroundColor: '#8B5CF6',
      yAxisID: 'y1',
      tension: 0.3,
    },
  ],
};

const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      title: {
        display: true,
        text: 'Calories (kcal)',
      },
      grid: {
        drawOnChartArea: false,
      },
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      title: {
        display: true,
        text: 'Nutrients (g)',
      },
      grid: {
        drawOnChartArea: false,
      },
    },
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const NutritionChart: React.FC = () => {
  return (
    <div>
      <Line options={options} data={data} height={80} />
    </div>
  );
};

export default NutritionChart;