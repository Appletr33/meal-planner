import RecipeCard from './RecipeCard';

interface MealPlanSummaryProps {
  mealPlan: {
    id: string;
    recipes: Array<{
      id: string;
      name: string;
      cookTime: number;
      imageUrl: string;
    }>;
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
    <div>
      <h2>Your Meal Plan</h2>
      <div>
        {mealPlan.recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <h3>Total Nutrition</h3>
      <ul>
        <li>Calories: {mealPlan.totalNutrition.calories}</li>
        <li>Protein: {mealPlan.totalNutrition.protein}g</li>
        <li>Fat: {mealPlan.totalNutrition.fat}g</li>
        <li>Carbs: {mealPlan.totalNutrition.carbs}g</li>
      </ul>
      <h3>Cookware Needed</h3>
      <ul>
        {mealPlan.cookwareNeeded.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default MealPlanSummary;