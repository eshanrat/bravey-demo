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
  all: 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300',
  breakfast: 'bg-white text-amber-700 border-amber-200 hover:bg-amber-50 hover:border-amber-300',
  lunch: 'bg-white text-lime-700 border-lime-200 hover:bg-lime-50 hover:border-lime-300',
  dinner: 'bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300',
  dessert: 'bg-white text-pink-700 border-pink-200 hover:bg-pink-50 hover:border-pink-300',
  snack: 'bg-white text-orange-700 border-orange-200 hover:bg-orange-50 hover:border-orange-300',
  drink: 'bg-white text-cyan-700 border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300',
};

const ACTIVE_CATEGORY_COLORS: Record<Category | 'all', string> = {
  all: 'bg-gray-900 text-white border-gray-900 shadow-lg ring-2 ring-gray-900 ring-opacity-20',
  breakfast: 'bg-amber-700 text-white border-amber-700 shadow-lg ring-2 ring-amber-700 ring-opacity-20',
  lunch: 'bg-lime-700 text-white border-lime-700 shadow-lg ring-2 ring-lime-700 ring-opacity-20',
  dinner: 'bg-indigo-700 text-white border-indigo-700 shadow-lg ring-2 ring-indigo-700 ring-opacity-20',
  dessert: 'bg-pink-700 text-white border-pink-700 shadow-lg ring-2 ring-pink-700 ring-opacity-20',
  snack: 'bg-orange-700 text-white border-orange-700 shadow-lg ring-2 ring-orange-700 ring-opacity-20',
  drink: 'bg-cyan-700 text-white border-cyan-700 shadow-lg ring-2 ring-cyan-700 ring-opacity-20',
};

interface CategoryFilterProps {
  activeCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  const categories: (Category | 'all')[] = ['all', 'breakfast', 'lunch', 'dinner', 'dessert', 'snack', 'drink'];

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          const baseClasses = 'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border';
          const colorClasses = isActive 
            ? ACTIVE_CATEGORY_COLORS[category]
            : CATEGORY_COLORS[category];
          
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`${baseClasses} ${colorClasses} ${isActive ? 'transform scale-105' : 'hover:scale-102'}`}
              aria-pressed={isActive}
              aria-label={`Filter by ${CATEGORY_LABELS[category]} recipes`}
            >
              {CATEGORY_LABELS[category]}
            </button>
          );
        })}
      </div>
    </div>
  );
}