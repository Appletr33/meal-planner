// src/app/api/mealPlan/route.ts

import { NextResponse } from 'next/server';
import db from '@/lib/db'; // Adjust the path based on your project structure
import { RecipeRow, MealPlanRow } from '@/types/db'; // Adjust the path as needed
import { MealPlan, Recipe, TotalNutrition } from '@/types/mealPlan'; // Adjust the path as needed

// Define dietary exclusions
const dietaryExclusions: { [key: string]: string[] } = {
  Vegetarian: ['Chicken', 'Beef', 'Fish'],
  Vegan: ['Chicken', 'Beef', 'Fish', 'Eggs', 'Milk', 'Cheese'],
  'Gluten-Free': ['Bread'],
  'Dairy-Free': ['Milk', 'Cheese'],
};

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

// Function to clean the ingredients string
function cleanIngredients(ingredientsStr: string): string {
  if (!ingredientsStr) return '';

  // Remove all quotation marks and brackets
  ingredientsStr = ingredientsStr.replace(/["\[\]]/g, '');

  // Replace commas followed by optional spaces with a comma and a newline
  ingredientsStr = ingredientsStr.replace(/,\s*/g, ',\n');

  // Replace multiple spaces with a single space and trim the string
  ingredientsStr = ingredientsStr.replace(/\s+/g, ' ').trim();

  return ingredientsStr;
}

// POST method to create a meal plan
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { numberOfMeals, dietaryRequirements, zipCode } = body;

    // Validate input
    if (
      typeof numberOfMeals !== 'string' ||
      typeof zipCode !== 'string'
    ) {
      return NextResponse.json(
        { message: 'Invalid input types.' },
        { status: 400 }
      );
    }

    if (
      !Array.isArray(dietaryRequirements) ||
      !dietaryRequirements.every((item) => typeof item === 'string')
    ) {
      return NextResponse.json(
        { message: 'Invalid dietary requirements format.' },
        { status: 400 }
      );
    }

    // Aggregate all exclusions based on dietary requirements
    const exclusions = dietaryRequirements.reduce((acc: string[], requirement: string) => {
      if (dietaryExclusions[requirement]) {
        return [...acc, ...dietaryExclusions[requirement]];
      }
      return acc;
    }, []);

    console.log('Exclusions:', exclusions);

    // If no exclusions, optionally handle differently or proceed
    if (exclusions.length === 0) {
      return NextResponse.json(
        { message: 'No dietary restrictions provided.' },
        { status: 400 }
      );
    }

    // Prepare SQL query to exclude recipes containing any of the excluded ingredients
    const sql = `
      SELECT * FROM recipes
      WHERE ${exclusions.map(() => 'ingredients NOT LIKE ?').join(' AND ')}
      ORDER BY RANDOM()
      LIMIT ?
    `;

    console.log('SQL Query:', sql);
    console.log('Parameters:', [...exclusions.map((ing) => `%${ing}%`), numberOfMeals]);

    // Execute the query with proper typing
    const stmt = db.prepare(sql);
    const recipes = stmt.all(...exclusions.map((ing) => `%${ing}%`), numberOfMeals) as RecipeRow[];

    console.log('Recipes returned from DB:', recipes);

    if (recipes.length === 0) {
      return NextResponse.json(
        { message: 'No recipes found matching your dietary restrictions.' },
        { status: 404 }
      );
    }

    // Clean the directions and ingredients fields in each recipe
    const cleanedRecipes: Recipe[] = recipes.map((recipe: RecipeRow) => ({
      id: recipe.id,
      title: recipe.title,
      ingredients: cleanIngredients(recipe.ingredients),
      directions: cleanDirections(recipe.directions),
      link: recipe.link,
    }));

    // Compute total nutrition and cookware needed (Dummy Data)
    const totalNutrition: TotalNutrition = {
      calories: 2000,
      protein: 150,
      fat: 70,
      carbs: 250,
    };

    const cookwareNeeded: string[] = ['Pan', 'Oven', 'Knife'];

    // Create a plan ID
    const planId = Math.random().toString(36).substring(2, 9);

    // Prepare data for insertion
    const insertMealPlan = db.prepare(`
      INSERT INTO meal_plans (id, recipes, total_nutrition, cookware_needed, zip_code)
      VALUES (?, ?, ?, ?, ?)
    `);

    // Run the insert with correct arguments
    insertMealPlan.run(
      planId,
      JSON.stringify(cleanedRecipes),
      JSON.stringify(totalNutrition),
      JSON.stringify(cookwareNeeded),
      zipCode
    );

    console.log('Stored meal plan:', {
      id: planId,
      recipes: cleanedRecipes,
      totalNutrition,
      cookwareNeeded,
      zipCode,
    });

    // Return the plan ID
    return NextResponse.json({ planId });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error in POST /api/mealPlan:', error);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    } else {
      console.error('Unexpected error in POST /api/mealPlan:', error);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
}

// GET method to retrieve the meal plan by ID
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const planId = searchParams.get('planId');

    console.log('GET request for planId:', planId);

    if (!planId) {
      return NextResponse.json(
        { message: 'planId is required' },
        { status: 400 }
      );
    }

    // Prepare SQL query to fetch the meal plan
    const getMealPlan = db.prepare(`
      SELECT * FROM meal_plans WHERE id = ?
    `);

    const mealPlanRow = getMealPlan.get(planId) as MealPlanRow | undefined;

    console.log('Fetched meal plan:', mealPlanRow);

    if (mealPlanRow) {
      const mealPlan: MealPlan = {
        id: mealPlanRow.id,
        recipes: JSON.parse(mealPlanRow.recipes) as Recipe[],
        totalNutrition: JSON.parse(mealPlanRow.total_nutrition) as TotalNutrition,
        cookwareNeeded: JSON.parse(mealPlanRow.cookware_needed) as string[],
        zipCode: mealPlanRow.zip_code,
      };
      return NextResponse.json(mealPlan);
    } else {
      return NextResponse.json(
        { message: 'Meal plan not found' },
        { status: 404 }
      );
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error in GET /api/mealPlan:', error);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    } else {
      console.error('Unexpected error in GET /api/mealPlan:', error);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
}