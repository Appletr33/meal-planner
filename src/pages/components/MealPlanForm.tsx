import { useState } from 'react';

interface MealPlanFormProps {
  onSubmit: (formData: any) => void;
}

const MealPlanForm: React.FC<MealPlanFormProps> = ({ onSubmit }) => {
  const [goals, setGoals] = useState('');
  const [dietaryRequirements, setDietaryRequirements] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ goals, dietaryRequirements, location });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Goals:
        <input
          type="text"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
        />
      </label>
      <label>
        Dietary Requirements:
        <input
          type="text"
          value={dietaryRequirements}
          onChange={(e) => setDietaryRequirements(e.target.value)}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <button type="submit">Generate Meal Plan</button>
    </form>
  );
};

export default MealPlanForm;