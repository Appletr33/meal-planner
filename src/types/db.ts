// src/types/db.ts

export interface RecipeRow {
    id: string;
    title: string;
    ingredients: string;
    directions: string;
    link: string;
  }
  
  export interface MealPlanRow {
    id: string;
    recipes: string; // JSON string in DB
    total_nutrition: string; // JSON string
    cookware_needed: string; // JSON string
    zip_code: string;
  }