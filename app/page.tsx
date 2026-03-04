'use client';

import { useState } from 'react';
import { getAllRecipes } from '@/lib/recipes';
import { RecipeCard } from '@/components/RecipeCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ChefHat } from 'lucide-react';
import { Category } from '@/lib/types';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Category | 'all'>('all');
  const allRecipes = getAllRecipes();
  
  const filteredRecipes = activeFilter === 'all' 
    ? allRecipes 
    : allRecipes.filter(recipe => recipe.category === activeFilter);

  const displayCount = activeFilter === 'all' 
    ? `${allRecipes.length} recipes to try`
    : `${filteredRecipes.length} ${activeFilter} recipes`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <ChefHat className="w-6 h-6 text-rose-500" />
          <h1 className="text-2xl font-bold text-gray-900">Reciply</h1>
        </div>
        <p className="text-sm text-gray-400">
          {displayCount}
        </p>
      </header>

      {/* Filter Bar */}
      <div className="mb-8">
        <CategoryFilter 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter} 
        />
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRecipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
      
      {/* Empty State */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <ChefHat className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-lg font-medium">No recipes found</p>
            <p className="text-sm">Try selecting a different category</p>
          </div>
        </div>
      )}
    </div>
  );
}