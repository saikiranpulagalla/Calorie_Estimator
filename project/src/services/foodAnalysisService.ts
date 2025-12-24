import { GoogleGenerativeAI } from "@google/generative-ai";
import { FoodItem } from '../stores/nutritionStore';

interface NutritionData {
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
}

interface AnalysisResult {
  foodItems: FoodItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

// Initialize Gemini AI with proper error handling
const initGemini = () => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  if (!API_KEY || API_KEY === 'YOUR_API_KEY') {
    throw new Error('Missing or invalid Gemini API key. Please check your environment variables.');
  }
  return new GoogleGenerativeAI(API_KEY);
};

const genAI = initGemini();

export const analyzeFood = async (input: File | string): Promise<AnalysisResult> => {
  try {
    console.log('Starting food analysis...');
    const foodItems = await detectFoodItems(input);
    if (foodItems.length === 0) {
      // Show the raw Gemini response in dev mode for debugging
      if (import.meta.env.DEV) {
        alert('No recognizable food found. Check the dev console for the raw Gemini response.');
      }
      throw new Error('No recognizable food found in the input. Please try a clearer image, a different angle, or a more specific description.');
    }
    const result = calculateTotals(foodItems);
    console.log('Analysis successful:', result);
    return result;
  } catch (error) {
    console.error('Food analysis failed:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to analyze food input'
    );
  }
};

async function detectFoodItems(input: File | string): Promise<FoodItem[]> {
  console.log('Detecting food items...');
  try {
    const nutritionData = await callFoodAnalysisAPI(input);
    
    if (nutritionData.length === 0) {
      console.warn('API returned empty nutrition data');
    }
    
    return nutritionData.map((food: NutritionData, index: number) => ({
      id: `ai-${Date.now()}-${index}`,
      name: food.name || 'Unknown Food',
      portion: food.portion || '1 serving',
      calories: Number(food.calories) || 0,
      protein: Number(food.protein) || 0,
      carbs: Number(food.carbs) || 0,
      fat: Number(food.fat) || 0,
      fiber: Number(food.fiber) || 0,
      sugar: Number(food.sugar) || 0,
      sodium: Number(food.sodium) || 0,
      date: new Date().toISOString().split('T')[0],
    }));
  } catch (error) {
    console.error('Failed to detect food items:', error);
    throw new Error('Could not identify food items from input');
  }
}

function calculateTotals(foodItems: FoodItem[]): AnalysisResult {
  const totals = {
    foodItems,
    totalCalories: foodItems.reduce((sum, item) => sum + (item.calories || 0), 0),
    totalProtein: foodItems.reduce((sum, item) => sum + (item.protein || 0), 0),
    totalCarbs: foodItems.reduce((sum, item) => sum + (item.carbs || 0), 0),
    totalFat: foodItems.reduce((sum, item) => sum + (item.fat || 0), 0),
  };
  
  console.log('Calculated totals:', totals);
  return totals;
}

async function callFoodAnalysisAPI(input: File | string): Promise<NutritionData[]> {
  console.log('Calling Gemini API...');
  const modelName = "gemini-1.5-flash";
  const model = genAI.getGenerativeModel({ model: modelName });
  const prompt = `ACT AS A NUTRITION EXPERT. Analyze this food input (which may be a single food or a meal) and return ONLY a JSON array of food items. Each item MUST have:
  - name: string (food name)
  - portion: string (e.g., "100g", "1 medium")
  - calories: number
  - protein: number (grams)
  - carbs: number (grams)
  - fat: number (grams)
  [fiber, sugar, sodium are optional]

RULES:
1. Return ONLY valid JSON array format, no other text
2. If unsure about any item, omit it
3. For meals, break into individual components
4. Use standard nutritional values
5. If no food is detected, return empty array []
6. If input is a single food, return a one-item array

EXAMPLE OUTPUT:
[
  {
    "name": "banana",
    "portion": "1 medium",
    "calories": 105,
    "protein": 1.3,
    "carbs": 27,
    "fat": 0.4
  }
]`;
  try {
    let result;
    if (typeof input === 'string') {
      let textInput = input.trim();
      // If input is a single word or very short, add context
      if (/^\w{1,20}$/.test(textInput) || textInput.split(' ').length <= 2) {
        textInput = `Nutrition facts for: ${textInput}`;
      }
      console.log('Processing text input:', textInput);
      result = await model.generateContent([prompt, textInput]);
    } else {
      console.log('Processing image file:', input.name);
      const imageData = {
        inlineData: {
          data: await fileToBase64(input),
          mimeType: input.type
        }
      };
      result = await model.generateContent([prompt, imageData]);
    }
    const response = await result.response;
    const text = response.text();
    console.log('Raw API response:', text);
    if (import.meta.env.DEV) {
      // Log the raw response for debugging
      window.geminiRawResponse = text;
    }
    const nutritionData = parseAPIResponse(text);
    console.log('Parsed nutrition data:', nutritionData);
    return nutritionData;
  } catch (error) {
    console.error('API call failed:', error);
    throw new Error('Failed to get nutrition data from API');
  }
}

function parseAPIResponse(responseText: string): NutritionData[] {
  if (!responseText) {
    console.warn('Empty API response');
    return [];
  }

  try {
    // Extract JSON from response text
    const jsonStart = responseText.indexOf('[');
    const jsonEnd = responseText.lastIndexOf(']');
    
    if (jsonStart === -1 || jsonEnd === -1) {
      console.warn('No JSON array found in response');
      return [];
    }
    
    const jsonString = responseText.slice(jsonStart, jsonEnd + 1);
    const parsedData = JSON.parse(jsonString);
    
    if (!Array.isArray(parsedData)) {
      console.warn('Response is not an array');
      return [];
    }
    
    // Validate and filter items
    return parsedData.filter(item => {
      const isValid = 
        item?.name &&
        item?.portion &&
        typeof item?.calories === 'number' &&
        typeof item?.protein === 'number' &&
        typeof item?.carbs === 'number' &&
        typeof item?.fat === 'number';
      
      if (!isValid) {
        console.warn('Invalid food item found:', item);
      }
      return isValid;
    });
  } catch (error) {
    console.error('Failed to parse API response:', error);
    return [];
  }
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => {
      console.error('File read error:', error);
      reject(new Error('Failed to read image file'));
    };
    reader.readAsDataURL(file);
  });
}

export const manualFoodEntry = (foodData: Partial<FoodItem>): FoodItem => {
  return {
    id: `manual-${Date.now()}`,
    name: foodData.name || 'Unknown Food',
    portion: foodData.portion || '1 serving',
    calories: Number(foodData.calories) || 0,
    protein: Number(foodData.protein) || 0,
    carbs: Number(foodData.carbs) || 0,
    fat: Number(foodData.fat) || 0,
    fiber: Number(foodData.fiber) || 0,
    sugar: Number(foodData.sugar) || 0,
    sodium: Number(foodData.sodium) || 0,
    date: new Date().toISOString().split('T')[0],
  };
};

// For development debugging of Gemini API responses
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  interface Window {
    geminiRawResponse?: any;
  }
}