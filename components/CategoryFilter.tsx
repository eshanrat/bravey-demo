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
    <div className="flex flex-wrap gap-2 mb-8">
      {allCategories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category
              ? 'bg-rose-500 text-white shadow-sm'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {CATEGORY_LABELS[category]}
        </button>
      ))}
    </div>
  );
}