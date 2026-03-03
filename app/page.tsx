'use client';

import { useState, useMemo } from 'react';
import { getAllRecipes } from '@/lib/recipes';
import { RecipeCard } from '@/components/RecipeCard';
import { ChefHat, Search } from 'lucide-react';

export default function Home() {
  const recipes = getAllRecipes();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = useMemo(() => {
    if (!searchTerm.trim()) {
      return recipes;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    return recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(lowerSearchTerm) ||
      recipe.description.toLowerCase().includes(lowerSearchTerm)
    );
  }, [recipes, searchTerm]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <ChefHat className="w-6 h-6 text-rose-500" />
          <h1 className="text-2xl font-bold text-gray-900">Reciply</h1>
        </div>
        <p className="text-sm text-gray-400">
          {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} to try
        </p>
      </header>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search recipes by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>

      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRecipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No results</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            We couldn't find any recipes matching "{searchTerm}". Try adjusting your search terms.
          </p>
        </div>
      )}
    </div>
  );
}