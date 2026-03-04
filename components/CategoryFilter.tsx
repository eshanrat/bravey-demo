import { Category } from '@/lib/types';

const CATEGORY_LABELS: Record<Category, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch', 
  dinner: 'Dinner',
  dessert: 'Dessert',
  snack: 'Snack',
  drink: 'Drink',
};

const CATEGORIES: Category[] = ['breakfast', 'lunch', 'dinner', 'dessert', 'snack', 'drink'];

interface CategoryFilterProps {
  activeFilter: Category | 'all';
  onFilterChange: (filter: Category | 'all') => void;
}

export function CategoryFilter({ activeFilter, onFilterChange }: CategoryFilterProps) {
  return (
    <div role="tablist" aria-label="Recipe category filters" className="flex flex-wrap gap-3">
      <button
        role="tab"
        aria-selected={activeFilter === 'all'}
        onClick={() => onFilterChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 ${
          activeFilter === 'all'
            ? 'bg-rose-500 text-white shadow-sm'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {CATEGORIES.map((category) => (
        <button
          key={category}
          role="tab"
          aria-selected={activeFilter === category}
          onClick={() => onFilterChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 ${
            activeFilter === category
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