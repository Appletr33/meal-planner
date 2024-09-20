// src/lib/db.ts

import Database from 'better-sqlite3';
import path from 'path';

let db: Database.Database= new Database(process.env.SQLITE_DB_PATH || 'recipes.db', { verbose: console.log });;;

// Singleton pattern to ensure only one instance exists
if (!db) {
  const dbPath = process.env.SQLITE_DB_PATH
    ? path.resolve(process.cwd(), process.env.SQLITE_DB_PATH)
    : path.resolve(process.cwd(), 'recipes.db');

  db = new Database(dbPath, { verbose: console.log });
}

// Function to create tables if they don't exist
function initializeDatabase() {
  const createMealPlansTable = `
    CREATE TABLE IF NOT EXISTS meal_plans (
      id TEXT PRIMARY KEY,
      recipes TEXT NOT NULL,
      total_nutrition TEXT NOT NULL,
      cookware_needed TEXT NOT NULL,
      zip_code TEXT NOT NULL
    );
  `;

  const createRecipesTable = `
    CREATE TABLE IF NOT EXISTS recipes (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      directions TEXT NOT NULL,
      link TEXT NOT NULL
    );
  `;

  db.exec(createRecipesTable);
  db.exec(createMealPlansTable);
}

// Initialize the database (create tables if they don't exist)
initializeDatabase();

export default db;