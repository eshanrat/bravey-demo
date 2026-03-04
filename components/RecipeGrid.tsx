'use client';

import { useState, useEffect } from 'react';
import { Recipe, Category } from '@/lib/types';
import { RecipeCard } from './RecipeCard';

const CATEGORIES: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'dessert', label: 'Dessert' },
  { value: 'snack', label: 'Snack' },
  { value: 'drink', label: 'Drink' },
];

interface RecipeGridProps {
  recipes: Recipe[];
  onFilterChange?: (count: number, filter: string) => void;
}

export function RecipeGrid({ recipes, onFilterChange }: RecipeGridProps) {
  const [activeFilter, setActiveFilter] = useState<Category | 'all'>('all');

  const filteredRecipes = activeFilter === 'all' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === activeFilter);

  // Initialize with all recipes count
  useEffect(() => {
    onFilterChange?.(recipes.length, 'all');
  }, [recipes.length, onFilterChange]);

  const handleFilterChange = (filter: Category | 'all') => {
    setActiveFilter(filter);
    const newCount = filter === 'all' 
      ? recipes.length 
      : recipes.filter(recipe => recipe.category === filter).length;
    const filterLabel = filter === 'all' ? 'all' : filter;
    onFilterChange?.(newCount, filterLabel);
  };

  return (
    <>
      {/* Filter Bar */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() => handleFilterChange(category.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === category.value
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {/* Empty State */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No recipes found for this category.</p>
          <p className="text-gray-400 text-sm mt-1">Try selecting a different category.</p>
        </div>
      )}
    </>
  );
}