'use client';

import { useState, useMemo } from 'react';
import { getAllRecipes } from '@/lib/recipes';
import { RecipeCard } from '@/components/RecipeCard';
import { ChefHat } from 'lucide-react';
import { Category } from '@/lib/types';

const CATEGORIES: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'dessert', label: 'Dessert' },
  { value: 'snack', label: 'Snack' },
  { value: 'drink', label: 'Drink' },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Category | 'all'>('all');
  const recipes = getAllRecipes();

  const filteredRecipes = useMemo(() => {
    if (activeFilter === 'all') {
      return recipes;
    }
    return recipes.filter((recipe) => recipe.category === activeFilter);
  }, [recipes, activeFilter]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <ChefHat className="w-6 h-6 text-rose-500" />
          <h1 className="text-2xl font-bold text-gray-900">Reciply</h1>
        </div>
        <p className="text-sm text-gray-400">
          {filteredRecipes.length} recipes to try
        </p>
      </header>

      {/* Category Filter Bar */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveFilter(category.value)}
              className={`px-3 py-2 sm:px-4 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeFilter === category.value
                  ? 'bg-rose-500 text-white shadow-md hover:bg-rose-600 transform hover:scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800 hover:scale-105'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRecipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>

      {/* Empty state when no recipes match the filter */}
      {filteredRecipes.length === 0 && activeFilter !== 'all' && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg capitalize">
            No {activeFilter} recipes found.
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Try selecting a different category or create a new recipe!
          </p>
        </div>
      )}
    </div>
  );
}