'use client';

import { useState, useMemo } from 'react';
import { getAllRecipes } from '@/lib/recipes';
import { RecipeCard } from '@/components/RecipeCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ChefHat } from 'lucide-react';
import { Category } from '@/lib/types';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const allRecipes = getAllRecipes();

  const filteredRecipes = useMemo(() => {
    if (activeCategory === 'all') {
      return allRecipes;
    }
    return allRecipes.filter(recipe => recipe.category === activeCategory);
  }, [allRecipes, activeCategory]);

  const handleCategoryChange = (category: Category | 'all') => {
    setActiveCategory(category);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <ChefHat className="w-6 h-6 text-rose-500" />
          <h1 className="text-2xl font-bold text-gray-900">Reciply</h1>
        </div>
        <p className="text-sm text-gray-400">
          {activeCategory === 'all' 
            ? `${allRecipes.length} recipes to try`
            : `${filteredRecipes.length} ${activeCategory} ${filteredRecipes.length === 1 ? 'recipe' : 'recipes'}`
          }
        </p>
      </header>

      <CategoryFilter 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRecipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No recipes found for this category.</p>
        </div>
      )}
    </div>
  );
}