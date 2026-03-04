'use client';

import { Category } from '@/lib/types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
}

const CATEGORY_LABELS: Record<Category | 'all', string> = {
  all: 'All',
  breakfast: 'Breakfast',
  lunch: 'Lunch', 
  dinner: 'Dinner',
  dessert: 'Dessert',
  snack: 'Snack',
  drink: 'Drink',
};

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  const allCategories: (Category | 'all')[] = ['all', ...categories];

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-rose-500 text-white shadow-sm scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
            }`}
            aria-pressed={selectedCategory === category}
            aria-label={`Filter recipes by ${CATEGORY_LABELS[category]} category`}
          >
            {CATEGORY_LABELS[category]}
          </button>
        ))}
      </div>
    </div>
  );
}