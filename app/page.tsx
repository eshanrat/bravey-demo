'use client';

import { useState } from 'react';
import { getAllRecipes } from '@/lib/recipes';
import { RecipeGrid } from '@/components/RecipeGrid';
import { ChefHat } from 'lucide-react';

export default function Home() {
  const recipes = getAllRecipes();
  const [displayCount, setDisplayCount] = useState(recipes.length);
  const [currentFilter, setCurrentFilter] = useState('all');

  const handleFilterChange = (count: number, filter: string) => {
    setDisplayCount(count);
    setCurrentFilter(filter);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <ChefHat className="w-6 h-6 text-rose-500" />
          <h1 className="text-2xl font-bold text-gray-900">Reciply</h1>
        </div>
        <p className="text-sm text-gray-400">
          {displayCount} {currentFilter === 'all' ? 'recipes' : `${currentFilter} recipes`} to try
        </p>
      </header>

      <RecipeGrid recipes={recipes} onFilterChange={handleFilterChange} />
    </div>
  );
}