'use client';

import { Category } from '@/lib/types';

interface CategoryFilterProps {
  selectedCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
}

const CATEGORIES: Array<{ value: Category | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'dessert', label: 'Dessert' },
  { value: 'snack', label: 'Snack' },
  { value: 'drink', label: 'Drink' },
];

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="overflow-x-auto pb-2 mb-6">
      <div className="flex gap-2 min-w-max">
        {CATEGORIES.map((category) => (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              selectedCategory === category.value
                ? 'bg-rose-500 text-white shadow-md transform scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-sm'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}