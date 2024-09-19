import Link from 'next/link';

interface RecipeCardProps {
  recipe: {
    id: string;
    name: string;
    cookTime: number;
    imageUrl: string;
  };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.imageUrl} alt={recipe.name} />
      <h3>{recipe.name}</h3>
      <p>Cook Time: {recipe.cookTime} mins</p>
      <Link href={`/recipes/${recipe.id}`}>View Recipe</Link>
    </div>
  );
};

export default RecipeCard;