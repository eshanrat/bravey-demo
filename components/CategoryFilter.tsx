'use client';

import { Category } from '@/lib/types';

const CATEGORY_LABELS: Record<Category | 'all', string> = {
  all: 'All',
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  dessert: 'Dessert',
  snack: 'Snack',
  drink: 'Drink',
};

const CATEGORY_COLORS: Record<Category | 'all', string> = {
  all: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  breakfast: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
  lunch: 'bg-lime-100 text-lime-700 hover:bg-lime-200',
  dinner: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
  dessert: 'bg-pink-100 text-pink-700 hover:bg-pink-200',
  snack: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
  drink: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200',
};

const ACTIVE_CATEGORY_COLORS: Record<Category | 'all', string> = {
  all: 'bg-gray-900 text-white',
  breakfast: 'bg-amber-700 text-white',
  lunch: 'bg-lime-700 text-white',
  dinner: 'bg-indigo-700 text-white',
  dessert: 'bg-pink-700 text-white',
  snack: 'bg-orange-700 text-white',
  drink: 'bg-cyan-700 text-white',
};

interface CategoryFilterProps {
  activeCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  const categories: (Category | 'all')[] = ['all', 'breakfast', 'lunch', 'dinner', 'dessert', 'snack', 'drink'];

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        const baseClasses = 'px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer';
        const colorClasses = isActive 
          ? ACTIVE_CATEGORY_COLORS[category]
          : CATEGORY_COLORS[category];
        
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`${baseClasses} ${colorClasses}`}
          >
            {CATEGORY_LABELS[category]}
          </button>
        );
      })}
    </div>
  );
}