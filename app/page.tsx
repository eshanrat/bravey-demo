'use client';

import { useState, useMemo } from 'react';
import { getAllRecipes } from '@/lib/recipes';
import { RecipeCard } from '@/components/RecipeCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ChefHat, Search } from 'lucide-react';
import { Category } from '@/lib/types';

export default function Home() {
  const recipes = getAllRecipes();
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  // Get unique categories from recipes
  const availableCategories = useMemo(() => {
    const categories = [...new Set(recipes.map(recipe => recipe.category))];
    return categories.sort();
  }, [recipes]);

  // Filter recipes based on selected category
  const filteredRecipes = useMemo(() => {
    if (selectedCategory === 'all') {
      return recipes;
    }
    return recipes.filter(recipe => recipe.category === selectedCategory);
  }, [recipes, selectedCategory]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <ChefHat className="w-6 h-6 text-rose-500" />
          <h1 className="text-2xl font-bold text-gray-900">Reciply</h1>
        </div>
        <p className="text-sm text-gray-400">
          {selectedCategory === 'all' 
            ? `${recipes.length} recipes to try`
            : `${filteredRecipes.length} ${selectedCategory} recipes`
          }
        </p>
      </header>

      <CategoryFilter
        categories={availableCategories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {filteredRecipes.length === 0 ? (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
          <p className="text-gray-500">
            Try selecting a different category or check back later for more recipes.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-300">
          {filteredRecipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      )}
    </div>
  );
}