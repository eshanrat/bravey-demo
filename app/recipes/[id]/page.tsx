import { getRecipeById } from '@/lib/recipes';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, ArrowLeft, ChefHat } from 'lucide-react';

export default function RecipePage({ params }: { params: { id: string } }) {
  const recipe = getRecipeById(params.id);
  if (!recipe) notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        All recipes
      </Link>

      {recipe.imageUrl && (
        <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-8 bg-gray-100">
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
      <p className="text-gray-500 mb-6">{recipe.description}</p>

      <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
        <span className="flex items-center gap-1.5">
          <ChefHat className="w-4 h-4" /> Prep {recipe.prepMins} min
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" /> Cook {recipe.cookMins} min
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="w-4 h-4" /> {recipe.servings} servings
        </span>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ingredients</h2>
        <ul className="space-y-2">
          {recipe.ingredients.map((ing, i) => (
            <li key={i} className="flex items-baseline gap-2 text-sm text-gray-700">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0 mt-1.5" />
              <span>
                {ing.amount} {ing.unit} {ing.name}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Method</h2>
        <ol className="space-y-4">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-4 text-sm text-gray-700">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-50 text-rose-500 font-semibold text-xs flex items-center justify-center">
                {i + 1}
              </span>
              <p className="leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
