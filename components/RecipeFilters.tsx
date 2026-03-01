'use client';

import { Search, X } from 'lucide-react';
import { Category } from '@/lib/types';
import { clsx } from 'clsx';
import { useEffect, useRef } from 'react';

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
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleClearSearch = () => {
    onSearchChange('');
    searchInputRef.current?.focus();
  };

  // Add keyboard shortcut to focus search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape' && searchQuery) {
        handleClearSearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery]);

  const hasActiveFilters = searchQuery || selectedCategory !== 'all';

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search recipes by title, description, or ingredients... (⌘K)"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white transition-shadow"
          aria-label="Search recipes"
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
            title="Clear search (Esc)"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-3 mb-4" role="group" aria-label="Filter by category">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category.key;
          return (
            <button
              key={category.key}
              onClick={() => onCategoryChange(category.key)}
              className={clsx(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2',
                isActive
                  ? 'bg-rose-500 text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:shadow-sm border border-gray-200 hover:border-gray-300'
              )}
              aria-pressed={isActive}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Results Count and Clear Filters */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500" role="status" aria-live="polite">
          {resultsCount === 0 && hasActiveFilters ? (
            <span className="text-amber-600 font-medium">No recipes match your filters</span>
          ) : resultsCount === 1 ? (
            '1 recipe found'
          ) : (
            `${resultsCount} recipes found`
          )}
        </p>
        
        {hasActiveFilters && (
          <button
            onClick={() => {
              onSearchChange('');
              onCategoryChange('all');
            }}
            className="text-sm text-rose-500 hover:text-rose-600 font-medium transition-colors focus:outline-none focus:underline"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}