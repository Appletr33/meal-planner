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
    <div className={`${styles.container}`}>
      <Card className={`${styles.card}`}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Plan Your Meal</CardTitle>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <Label htmlFor="numberOfMeals" className={styles.label}>
                Number of Meals
              </Label>
              <Input
                id="numberOfMeals"
                name="numberOfMeals"
                type="number"
                required
                className={styles.input}
                value={formData.numberOfMeals}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label className={styles.label}>Dietary Requirements</Label>
              <div className={styles.checkboxGrid}>
                {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'].map((requirement) => (
                  <div key={requirement} className={styles.checkboxWrapper}>
                    <Checkbox
                      id={requirement}
                      checked={formData.dietaryRequirements.includes(requirement)}
                      onCheckedChange={() => handleCheckboxChange(requirement)}
                    />
                    <label
                      htmlFor={requirement}
                      className={styles.checkboxLabel}
                    >
                      {requirement}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="zipCode" className={styles.label}>
                Location
              </Label>
              <div className={styles.inputContainer}>
                <Input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  required
                  className={styles.inputWithIcon}
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
                <MapPin className={styles.mapPinIcon} />
              </div>
              <div className={styles.mapPlaceholder}>
                <span className="text-gray-500">Map placeholder - Click to select location</span>
              </div>
            </div>

            <Button type="submit" className={styles.submitButton}>
              Generate Meal Plan
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}