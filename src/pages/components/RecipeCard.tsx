// src/components/RecipeCard.tsx

import React from 'react';

interface Recipe {
  id: string;
  title: string;
  ingredients: string;
  directions: string;
  link: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {

  if (!recipe) {
    return <div>Loading...</div>; // or handle missing data appropriately
  }

  // Ensure the recipe.link starts with http:// or https://
  const recipeLink = recipe.link.startsWith('http://') || recipe.link.startsWith('https://')
    ? recipe.link
    : `http://${recipe.link}`;

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
      <h4 className="text-xl font-semibold mb-2">{recipe.title}</h4>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Ingredients:</strong> {recipe.ingredients}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Directions:</strong> {recipe.directions}
      </p>
      <a href={recipeLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
        View Original Recipe
      </a>
    </div>
  );
};

export default RecipeCard;