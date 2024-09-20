import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-yellow-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-orange-600">Welcome to AI Meal Planner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-orange-800">
            Create personalized meal plans tailored to your goals and dietary needs.
          </p>
          <Link href="/plan" passHref>
            <Button className="bg-green-600 hover:bg-green-700 text-white text-lg py-6 px-8">
              Start Planning
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}