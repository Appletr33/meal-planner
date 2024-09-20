// src/app/plan/[planId]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MealPlanSummary from '@/pages/components/MealPlanSummary'; // Ensure correct import path
import { MealPlan, Recipe } from '@/types/mealPlan';

// Function to clean the directions string
function cleanDirections(directionsStr: string): string {
  if (!directionsStr) return '';

  // Remove leading and trailing brackets
  directionsStr = directionsStr.trim();
  if (
    (directionsStr.startsWith('[') && directionsStr.endsWith(']')) ||
    (directionsStr.startsWith('{') && directionsStr.endsWith('}'))
  ) {
    directionsStr = directionsStr.slice(1, -1);
  }

  // Remove any other unwanted brackets within the string
  directionsStr = directionsStr.replace(/[\[\]]/g, '');

  // Replace multiple spaces with a single space
  directionsStr = directionsStr.replace(/\s+/g, ' ').trim();

  return directionsStr;
}

export default function PlanSummaryPage() {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const planId = params?.planId; // Use optional chaining to avoid undefined

  useEffect(() => {
    if (planId) {
      fetch(`/api/mealPlan?planId=${planId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Meal plan not found');
          }
          return response.json();
        })
        .then((data) => {
          // Clean the directions field in each recipe
          const cleanedRecipes = data.recipes.map((recipe: Recipe) => ({
            ...recipe,
            directions: cleanDirections(recipe.directions),
          }));

          setMealPlan({ ...data, recipes: cleanedRecipes });
          setLoading(false);
        })
        .catch((error: any) => { // Added type for error
          console.error(error);
          setError(error.message);
          setLoading(false);
          // Optionally, redirect or show an error message
          router.push('/'); // Redirect to home on error
        });
    }
  }, [planId, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
  }

  if (!mealPlan) {
    return <div className="min-h-screen flex items-center justify-center">No meal plan found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-200 to-green-100 flex items-center justify-center p-4">
      <MealPlanSummary mealPlan={mealPlan} />
    </div>
  );
}