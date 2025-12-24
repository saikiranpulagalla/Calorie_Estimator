import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from '../firebase';
import { collection, getDocs, query, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { useAuthStore } from './authStore';

export interface FoodItem {
  id: string;
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  date: string;
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

interface NutritionState {
  foodLogs: FoodItem[];
  recentAnalysis: {
    foodItems: FoodItem[];
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
  } | null;
  addFoodItem: (item: FoodItem) => Promise<void>;
  removeFoodItem: (id: string) => Promise<void>;
  setRecentAnalysis: (analysis: NutritionState['recentAnalysis']) => void;
  clearRecentAnalysis: () => void;
  getFoodLogsByDate: (date: string) => FoodItem[];
  loadUserMeals: () => Promise<void>;
}

export const useNutritionStore = create<NutritionState>()(
  persist(
    (set, get) => ({
      foodLogs: [],
      recentAnalysis: null,
      
      addFoodItem: async (item) => {
        const { user } = useAuthStore.getState();
        if (user) {
          // Save to Firestore under users/{uid}/meals
          const mealRef = doc(collection(db, 'users', user.id, 'meals'));
          await setDoc(mealRef, item);
          set((state) => ({ foodLogs: [item, ...state.foodLogs] }));
        } else {
          set((state) => ({ foodLogs: [item, ...state.foodLogs] }));
        }
      },

      loadUserMeals: async () => {
        const { user } = useAuthStore.getState();
        if (!user) return;
        const mealsRef = collection(db, 'users', user.id, 'meals');
        const q = query(mealsRef);
        const snapshot = await getDocs(q);
        const meals = snapshot.docs.map(docSnap => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            name: data.name,
            portion: data.portion,
            calories: data.calories,
            protein: data.protein,
            carbs: data.carbs,
            fat: data.fat,
            fiber: data.fiber,
            sugar: data.sugar,
            sodium: data.sodium,
            date: data.date,
            mealType: data.mealType,
          };
        });
        set({ foodLogs: meals });
      },

      removeFoodItem: async (id) => {
        const { user } = useAuthStore.getState();
        if (user) {
          const mealRef = doc(db, 'users', user.id, 'meals', id);
          await deleteDoc(mealRef);
        }
        set((state) => ({
          foodLogs: state.foodLogs.filter((item) => item.id !== id)
        }));
      },
      
      setRecentAnalysis: (analysis) => set({ recentAnalysis: analysis }),
      
      clearRecentAnalysis: () => set({ recentAnalysis: null }),
      
      getFoodLogsByDate: (date) => {
        return get().foodLogs.filter((item) => item.date === date);
      },
    }),
    {
      name: 'nutrify-nutrition',
    }
  )
);