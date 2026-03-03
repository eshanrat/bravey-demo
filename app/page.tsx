'use client';

import { useState } from 'react';
import { getAllRecipes } from '@/lib/recipes';
import { RecipeCard } from '@/components/RecipeCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ChefHat } from 'lucide-react';
import { Category } from '@/lib/types';

export default function Home() {
  const allRecipes = getAllRecipes();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  const filteredRecipes = selectedCategory === 'all' 
    ? allRecipes 
    : allRecipes.filter(recipe => recipe.category === selectedCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <ChefHat className="w-6 h-6 text-rose-500" />
          <h1 className="text-2xl font-bold text-gray-900">Reciply</h1>
        </div>
        <p className="text-sm text-gray-400">
          {filteredRecipes.length} {selectedCategory === 'all' ? 'recipes' : `${selectedCategory} recipes`} to try
        </p>
      </header>

      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRecipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </div>
  );
}