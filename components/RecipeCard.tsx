import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users } from 'lucide-react';
import { Recipe } from '@/lib/types';

const CATEGORY_COLOURS: Record<string, string> = {
  breakfast: 'bg-amber-100 text-amber-700',
  lunch: 'bg-lime-100 text-lime-700',
  dinner: 'bg-indigo-100 text-indigo-700',
  dessert: 'bg-pink-100 text-pink-700',
  snack: 'bg-orange-100 text-orange-700',
  drink: 'bg-cyan-100 text-cyan-700',
};

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const totalMins = recipe.prepMins + recipe.cookMins;

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative h-44 w-full bg-gray-100">
        {recipe.imageUrl && (
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
        <span
          className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
            CATEGORY_COLOURS[recipe.category] ?? 'bg-gray-100 text-gray-600'
          }`}
        >
          {recipe.category}
        </span>
      </div>

      <div className="p-4">
        <h2 className="font-semibold text-gray-900 leading-snug line-clamp-1">
          {recipe.title}
        </h2>
        <p className="mt-1 text-sm text-gray-400 line-clamp-2">{recipe.description}</p>

        <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {totalMins} min
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {recipe.servings} servings
          </span>
        </div>
      </div>
    </Link>
  );
}
