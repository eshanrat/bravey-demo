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

  const getRecipeCountText = () => {
    if (activeCategory === 'all') {
      return `${allRecipes.length} recipes to try`;
    }
    
    const count = filteredRecipes.length;
    const categoryName = activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);
    return `${count} ${categoryName} ${count === 1 ? 'recipe' : 'recipes'}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <ChefHat className="w-6 h-6 text-rose-500" />
          <h1 className="text-2xl font-bold text-gray-900">Reciply</h1>
        </div>
        <p className="text-sm text-gray-400">
          {getRecipeCountText()}
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
          <div className="max-w-md mx-auto">
            <p className="text-gray-500 text-lg mb-2">No recipes found for this category</p>
            <p className="text-gray-400 text-sm">Try selecting a different category or check back later for new recipes!</p>
          </div>
        </div>
      )}
    </div>
  );
}