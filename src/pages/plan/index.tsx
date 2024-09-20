'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin } from 'lucide-react'
import styles from '../../styles/plan/Plan.module.css'

export default function Plan() {
  const router = useRouter()
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
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = (requirement: string) => {
    setFormData(prev => ({
      ...prev,
      dietaryRequirements: prev.dietaryRequirements.includes(requirement)
        ? prev.dietaryRequirements.filter(r => r !== requirement)
        : [...prev.dietaryRequirements, requirement]
    }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/mealPlan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    const data = await response.json()
    router.push(`/plan/${data.planId}`)
  }

  return (
    <div className={`${styles.container} min-h-screen flex items-center justify-center p-4`}>
      <Card className={`${styles.card} w-full max-w-2xl`}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Plan Your Meal</CardTitle>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <Label htmlFor="numberOfMeals" className="text-lg font-medium text-orange-800">
                Number of Meals
              </Label>
              <Input
                id="numberOfMeals"
                name="numberOfMeals"
                type="number"
                required
                className="mt-1"
                value={formData.numberOfMeals}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label className="text-lg font-medium text-orange-800">Dietary Requirements</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'].map((requirement) => (
                  <div key={requirement} className="flex items-center space-x-2">
                    <Checkbox
                      id={requirement}
                      checked={formData.dietaryRequirements.includes(requirement)}
                      onCheckedChange={() => handleCheckboxChange(requirement)}
                    />
                    <label
                      htmlFor={requirement}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {requirement}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="zipCode" className="text-lg font-medium text-orange-800">
                Location
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  required
                  className="pr-10"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="mt-2 h-48 bg-gray-200 rounded-md flex items-center justify-center">
                <span className="text-gray-500">Map placeholder - Click to select location</span>
              </div>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
              Generate Meal Plan
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
