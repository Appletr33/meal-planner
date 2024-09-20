'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin } from 'lucide-react';

export default function Plan() {
  const router = useRouter();
  const [formData, setFormData] = useState<{
    numberOfMeals: string;
    dietaryRequirements: string[];
    zipCode: string;
  }>({
    numberOfMeals: '',
    dietaryRequirements: [],
    zipCode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (requirement: string) => {
    setFormData(prev => ({
      ...prev,
      dietaryRequirements: prev.dietaryRequirements.includes(requirement)
        ? prev.dietaryRequirements.filter(r => r !== requirement)
        : [...prev.dietaryRequirements, requirement]
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/mealPlan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to generate meal plan.');
        return;
      }

      const data = await response.json();
      console.log('Generated meal plan:', data); // Verify the response
      router.push(`/plan/${data.planId}`);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while generating your meal plan.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-200 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="bg-primary text-primary-foreground p-6 rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">Plan Your Meal</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <Label htmlFor="numberOfMeals" className="text-sm font-medium text-gray-700 mb-1 block">
                Number of Meals
              </Label>
              <Input
                id="numberOfMeals"
                name="numberOfMeals"
                type="number"
                required
                className="w-full"
                value={formData.numberOfMeals}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Dietary Requirements</Label>
              <div className="grid grid-cols-2 gap-4">
                {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'].map((requirement) => (
                  <div key={requirement} className="flex items-center space-x-2">
                    <Checkbox
                      id={requirement}
                      checked={formData.dietaryRequirements.includes(requirement)}
                      onCheckedChange={() => handleCheckboxChange(requirement)}
                    />
                    <label
                      htmlFor={requirement}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {requirement}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700 mb-1 block">
                Location
              </Label>
              <div className="relative">
                <Input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  required
                  className="w-full pl-10"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <div className="mt-2 bg-gray-100 rounded-md p-4 text-center cursor-pointer hover:bg-gray-200 transition-colors">
                <span className="text-sm text-gray-500">Map placeholder - Click to select location</span>
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-primary-foreground transition-colors">
              Generate Meal Plan
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}