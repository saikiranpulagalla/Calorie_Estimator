import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { Calculator } from 'lucide-react';

const BMICalculator: React.FC = () => {
  const { user } = useAuthStore();
  
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');
  
  // Populate with user data if available
  useEffect(() => {
    if (user?.height) {
      setHeight(user.height.toString());
    }
    if (user?.weight) {
      setWeight(user.weight.toString());
    }
  }, [user]);
  
  const calculateBMI = () => {
    if (!height || !weight) return;
    
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    
    if (heightInMeters <= 0 || weightInKg <= 0) {
      alert('Please enter valid height and weight values');
      return;
    }
    
    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    setBmi(bmiValue);
    
    // Determine BMI category
    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setCategory('Normal weight');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obesity');
    }
  };
  
  const getBMICategoryColor = () => {
    switch (category) {
      case 'Underweight':
        return 'text-blue-500';
      case 'Normal weight':
        return 'text-green-500';
      case 'Overweight':
        return 'text-orange-500';
      case 'Obesity':
        return 'text-red-500';
      default:
        return 'text-gray-900';
    }
  };
  
  return (
    <div className="nutrify-card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-nutrify-secondary p-2 rounded-md">
          <Calculator size={22} className="text-nutrify-accent" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">BMI Calculator</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">
            Height (cm)
          </label>
          <input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g., 175"
            min="50"
            max="250"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-nutrify-accent focus:border-nutrify-accent"
          />
        </div>
        
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g., 70"
            min="20"
            max="300"
            step="0.1"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-nutrify-accent focus:border-nutrify-accent"
          />
        </div>
        
        <button
          onClick={calculateBMI}
          className="w-full nutrify-btn-primary py-2"
        >
          Calculate BMI
        </button>
      </div>
      
      {bmi !== null && (
        <div className="mt-8 text-center">
          <div className="w-24 h-24 rounded-full bg-nutrify-light mx-auto mb-3 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">{bmi.toFixed(1)}</span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Your BMI is {bmi.toFixed(1)}
          </h3>
          
          <p className={`text-lg font-medium mb-4 ${getBMICategoryColor()}`}>
            {category}
          </p>
          
          <div className="bg-nutrify-light p-4 rounded-lg text-sm text-gray-700">
            <p>
              BMI provides a simple numeric measure of your weight relative to height.
              It's one of several indicators used to assess weight status.
            </p>
          </div>
        </div>
      )}
      
      {/* BMI Range Visualization */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-900 mb-3">BMI Categories</h3>
        <div className="h-8 flex rounded-lg overflow-hidden">
          <div className="bg-blue-500 flex-1 flex items-center justify-center text-xs text-white font-medium">
            &lt;18.5
          </div>
          <div className="bg-green-500 flex-1 flex items-center justify-center text-xs text-white font-medium">
            18.5-24.9
          </div>
          <div className="bg-orange-500 flex-1 flex items-center justify-center text-xs text-white font-medium">
            25-29.9
          </div>
          <div className="bg-red-500 flex-1 flex items-center justify-center text-xs text-white font-medium">
            ≥30
          </div>
        </div>
        <div className="flex text-xs mt-1">
          <div className="flex-1 text-center text-blue-600">Underweight</div>
          <div className="flex-1 text-center text-green-600">Normal</div>
          <div className="flex-1 text-center text-orange-600">Overweight</div>
          <div className="flex-1 text-center text-red-600">Obesity</div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;