'use client';

import { useState, useMemo } from 'react';
import { getAllRecipes } from '@/lib/recipes';
import { RecipeCard } from '@/components/RecipeCard';
import { SearchInput } from '@/components/SearchInput';
import { EmptyState } from '@/components/EmptyState';
import { ChefHat } from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const allRecipes = getAllRecipes();

  // Filter recipes based on search query
  const filteredRecipes = useMemo(() => {
    if (!searchQuery.trim()) {
      return allRecipes;
    }

    const query = searchQuery.toLowerCase();
    return allRecipes.filter((recipe) => 
      recipe.title.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query)
    );
  }, [allRecipes, searchQuery]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <ChefHat className="w-6 h-6 text-rose-500" />
          <h1 className="text-2xl font-bold text-gray-900">Reciply</h1>
        </div>
        <p className="text-sm text-gray-400">
          {searchQuery 
            ? `${filteredRecipes.length} recipes found`
            : `${allRecipes.length} recipes to try`
          }
        </p>
      </header>

      {/* Search Input */}
      <div className="mb-8">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search recipes by name or description..."
        />
      </div>

      {/* Recipe Grid or Empty State */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRecipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      ) : (
        searchQuery && <EmptyState searchQuery={searchQuery} />
      )}
    </div>
  );
}