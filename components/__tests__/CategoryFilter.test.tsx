import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryFilter } from '../CategoryFilter';
import { Category } from '@/lib/types';

describe('CategoryFilter', () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it('renders all category buttons including "All"', () => {
    render(
      <CategoryFilter 
        activeFilter="all" 
        onFilterChange={mockOnFilterChange} 
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

  it('highlights the active filter', () => {
    render(
      <CategoryFilter 
        activeFilter="breakfast" 
        onFilterChange={mockOnFilterChange} 
      />
    );

    const breakfastButton = screen.getByText('Breakfast');
    const allButton = screen.getByText('All');

    // Active button should have the active styles
    expect(breakfastButton).toHaveClass('bg-rose-500', 'text-white');
    // Inactive button should have the inactive styles
    expect(allButton).toHaveClass('bg-gray-100', 'text-gray-600');
  });

  it('calls onFilterChange when a category is clicked', () => {
    render(
      <CategoryFilter 
        activeFilter="all" 
        onFilterChange={mockOnFilterChange} 
      />
    );

    fireEvent.click(screen.getByText('Breakfast'));
    expect(mockOnFilterChange).toHaveBeenCalledWith('breakfast');

    fireEvent.click(screen.getByText('All'));
    expect(mockOnFilterChange).toHaveBeenCalledWith('all');
  });
});