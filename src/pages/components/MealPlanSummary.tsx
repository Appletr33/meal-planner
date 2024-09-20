// src/components/MealPlanSummary.tsx

import RecipeCard from './RecipeCard';

interface Recipe {
  id: string;
  title: string;
  ingredients: string;
  directions: string;
  link: string;
}

interface MealPlanSummaryProps {
  mealPlan: {
    id: string;
    recipes: Recipe[];
    totalNutrition: {
      calories: number;
      protein: number;
      fat: number;
      carbs: number;
    };
    cookwareNeeded: string[];
  };
}

const MealPlanSummary: React.FC<MealPlanSummaryProps> = ({ mealPlan }) => {
  return (
    <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Meal Plan</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {mealPlan.recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Total Nutrition</h3>
        <ul className="list-disc list-inside">
          <li>Calories: {mealPlan.totalNutrition.calories} kcal</li>
          <li>Protein: {mealPlan.totalNutrition.protein}g</li>
          <li>Fat: {mealPlan.totalNutrition.fat}g</li>
          <li>Carbs: {mealPlan.totalNutrition.carbs}g</li>
        </ul>
      </div>
      
      <div>
        <h3 className="text-2xl font-semibold mb-2">Cookware Needed</h3>
        <ul className="list-disc list-inside">
          {mealPlan.cookwareNeeded.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MealPlanSummary;