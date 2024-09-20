// src/types/mealPlan.ts

export interface Recipe {
    id: string;
    title: string;
    ingredients: string;
    directions: string;
    link: string;
  }
  
  export interface TotalNutrition {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  }
  
  export interface MealPlan {
    id: string;
    recipes: Recipe[];
    totalNutrition: TotalNutrition;
    cookwareNeeded: string[];
    zipCode: string;
  }

