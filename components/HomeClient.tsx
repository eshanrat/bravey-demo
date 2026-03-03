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
        <p className="text-sm text-gray-400 transition-all duration-300">
          {selectedCategory === 'all' 
            ? `${totalCount} recipes to try`
            : `${displayCount} ${selectedCategory} recipe${displayCount !== 1 ? 's' : ''}`
          }
        </p>
      </header>

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-300">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {filteredRecipes.length === 0 && selectedCategory !== 'all' && (
        <div className="text-center py-12 animate-fade-in">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-400 text-lg mb-2">
            No {selectedCategory} recipes found
          </p>
          <p className="text-gray-300 text-sm mb-4">
            Try selecting a different category or view all recipes
          </p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
          >
            View all recipes
          </button>
        </div>
      )}
    </div>
  );
}