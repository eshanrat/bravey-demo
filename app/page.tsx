import { Suspense } from 'react';
import { getAllRecipes } from '@/lib/recipes';
import { RecipeListing } from '@/components/RecipeListing';
import { ChefHat } from 'lucide-react';

function RecipeListingFallback() {
  const recipes = getAllRecipes();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
          <div className="h-44 w-full bg-gray-200" />
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-3 bg-gray-200 rounded mb-3" />
            <div className="flex gap-4">
              <div className="h-3 bg-gray-200 rounded w-16" />
              <div className="h-3 bg-gray-200 rounded w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const recipes = getAllRecipes();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <ChefHat className="w-6 h-6 text-rose-500" />
          <h1 className="text-2xl font-bold text-gray-900">Reciply</h1>
        </div>
        <p className="text-sm text-gray-400">
          Discover and explore delicious recipes
        </p>
      </header>

      <Suspense fallback={<RecipeListingFallback />}>
        <RecipeListing recipes={recipes} />
      </Suspense>
    </div>
  );
}