'use client';

import { Search, X } from 'lucide-react';
import { Category } from '@/lib/types';
import { clsx } from 'clsx';

const CATEGORIES: Array<{ key: Category | 'all'; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'lunch', label: 'Lunch' },
  { key: 'dinner', label: 'Dinner' },
  { key: 'dessert', label: 'Dessert' },
  { key: 'snack', label: 'Snack' },
  { key: 'drink', label: 'Drink' },
];

interface RecipeFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
  resultsCount: number;
}

export function RecipeFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  resultsCount,
}: RecipeFiltersProps) {
  const handleClearSearch = () => {
    onSearchChange('');
  };

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search recipes by title or description..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white"
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-3 mb-4">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category.key;
          return (
            <button
              key={category.key}
              onClick={() => onCategoryChange(category.key)}
              className={clsx(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                isActive
                  ? 'bg-rose-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              )}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500">
        {resultsCount === 1 
          ? '1 recipe found'
          : `${resultsCount} recipes found`
        }
        {(searchQuery || selectedCategory !== 'all') && (
          <button
            onClick={() => {
              onSearchChange('');
              onCategoryChange('all');
            }}
            className="ml-2 text-rose-500 hover:text-rose-600 font-medium"
          >
            Clear filters
          </button>
        )}
      </p>
    </div>
  );
}