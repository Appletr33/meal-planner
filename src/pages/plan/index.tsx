'use client'

import { useRouter } from 'next/navigation'
import MealPlanForm from '../components/MealPlanForm';

const Plan: React.FC = () => {
  const router = useRouter();

  const handleFormSubmit = async (formData: any) => {
    const response = await fetch('/api/mealPlan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    // Redirect to the meal plan results page with the plan ID
    router.push(`/plan/${data.planId}`);
  };

  return (
    <div>
      <main>
        <h1>Plan Your Meal</h1>
        <MealPlanForm onSubmit={handleFormSubmit} />
      </main>
    </div>
  );
};

export default Plan;