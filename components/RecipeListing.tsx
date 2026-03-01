'use client';

import { Recipe } from '@/lib/types';
import { RecipeCard } from './RecipeCard';
import { RecipeFilters } from './RecipeFilters';
import { useRecipeFilters } from '@/lib/useRecipeFilters';
import { SearchX, UtensilsCrossed } from 'lucide-react';

interface RecipeListingProps {
  recipes: Recipe[];
}

export function RecipeListing({ recipes }: RecipeListingProps) {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredRecipes,
  } = useRecipeFilters(recipes);

  const hasActiveFilters = searchQuery || selectedCategory !== 'all';

  return (
    <>
      <RecipeFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        resultsCount={filteredRecipes.length}
      />

      {filteredRecipes.length === 0 ? (
        <div className="text-center py-16">
          <div className="flex justify-center mb-4">
            {hasActiveFilters ? (
              <SearchX className="w-16 h-16 text-gray-300" />
            ) : (
              <UtensilsCrossed className="w-16 h-16 text-gray-300" />
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {hasActiveFilters ? 'No recipes found' : 'No recipes available'}
          </h3>
          
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            {hasActiveFilters ? (
              <>
                We couldn't find any recipes matching your search criteria.
                <br />
                Try adjusting your search terms or category filter.
              </>
            ) : (
              'There are no recipes to display at the moment.'
            )}
          </p>
          
          {hasActiveFilters && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-6 px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </>
  );
}