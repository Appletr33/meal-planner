import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Utensils, Carrot, Apple, Fish } from 'lucide-react';

export default function Home() {
  const foodIcons = [
    { icon: Utensils, color: "text-orange-500" },
    { icon: Carrot, color: "text-green-500" },
    { icon: Apple, color: "text-red-500" },
    { icon: Fish, color: "text-blue-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-200 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl text-center overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-yellow-400/10 to-green-400/10 z-0"></div>
        <CardHeader className="relative z-10">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className="text-5xl font-bold text-orange-600 mb-2">Welcome to AI Meal Planner</CardTitle>
            <p className="text-xl text-orange-800 font-medium">Delicious. Nutritious. Personalized.</p>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-8 relative z-10">
          <motion.p 
            className="text-lg text-orange-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Create personalized meal plans tailored to your goals and dietary needs. Let AI do the hard work while you enjoy delicious, healthy meals!
          </motion.p>
          <div className="flex justify-center space-x-4 mb-6">
            {foodIcons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 260, damping: 20 }}
              >
                <item.icon className={`w-12 h-12 ${item.color}`} />
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link href="/plan" passHref>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xl py-6 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Start Your Meal Journey
              </Button>
            </Link>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}