'use client';

import { useState, useMemo } from 'react';
import { Recipe, Category } from '@/lib/types';
import { RecipeCard } from '@/components/RecipeCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ChefHat } from 'lucide-react';

interface HomeClientProps {
  initialRecipes: Recipe[];
}

export function HomeClient({ initialRecipes }: HomeClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  const filteredRecipes = useMemo(() => {
    if (selectedCategory === 'all') {
      return initialRecipes;
    }
    return initialRecipes.filter((recipe) => recipe.category === selectedCategory);
  }, [initialRecipes, selectedCategory]);

  const displayCount = filteredRecipes.length;
  const totalCount = initialRecipes.length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <ChefHat className="w-6 h-6 text-rose-500" />
          <h1 className="text-2xl font-bold text-gray-900">Reciply</h1>
        </div>
        <p className="text-sm text-gray-400">
          {selectedCategory === 'all' 
            ? `${totalCount} recipes to try`
            : `${displayCount} ${selectedCategory} recipes`
          }
        </p>
      </header>

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {filteredRecipes.length === 0 && selectedCategory !== 'all' && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No {selectedCategory} recipes found
          </p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="mt-2 text-rose-500 hover:text-rose-600 font-medium"
          >
            View all recipes
          </button>
        </div>
      )}
    </div>
  );
}