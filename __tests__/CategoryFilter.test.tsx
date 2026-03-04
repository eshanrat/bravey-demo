import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Category } from '@/lib/types';

const mockCategories: Category[] = ['breakfast', 'lunch', 'dinner', 'dessert', 'snack', 'drink'];

describe('CategoryFilter', () => {
  it('renders all category buttons including "All"', () => {
    const mockOnCategoryChange = jest.fn();
    
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Breakfast')).toBeInTheDocument();
    expect(screen.getByText('Lunch')).toBeInTheDocument();
    expect(screen.getByText('Dinner')).toBeInTheDocument();
    expect(screen.getByText('Dessert')).toBeInTheDocument();
    expect(screen.getByText('Snack')).toBeInTheDocument();
    expect(screen.getByText('Drink')).toBeInTheDocument();
  });

  it('highlights the selected category', () => {
    const mockOnCategoryChange = jest.fn();
    
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="breakfast"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const breakfastButton = screen.getByText('Breakfast');
    const allButton = screen.getByText('All');

    expect(breakfastButton).toHaveClass('bg-rose-500', 'text-white');
    expect(allButton).toHaveClass('bg-gray-100', 'text-gray-600');
  });

  it('calls onCategoryChange when a category is clicked', () => {
    const mockOnCategoryChange = jest.fn();
    
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    fireEvent.click(screen.getByText('Lunch'));
    expect(mockOnCategoryChange).toHaveBeenCalledWith('lunch');
  });

  it('has proper accessibility attributes', () => {
    const mockOnCategoryChange = jest.fn();
    
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="dessert"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const dessertButton = screen.getByText('Dessert');
    expect(dessertButton).toHaveAttribute('aria-pressed', 'true');
    expect(dessertButton).toHaveAttribute('aria-label', 'Filter recipes by Dessert category');
  });
});