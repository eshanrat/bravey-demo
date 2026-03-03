/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryFilter } from '../CategoryFilter';

// Mock function for category change handler
const mockOnCategoryChange = jest.fn();

describe('CategoryFilter', () => {
  beforeEach(() => {
    mockOnCategoryChange.mockClear();
  });

  it('renders all category buttons', () => {
    render(
      <CategoryFilter
        selectedCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    // Check that all expected categories are rendered
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Breakfast')).toBeInTheDocument();
    expect(screen.getByText('Lunch')).toBeInTheDocument();
    expect(screen.getByText('Dinner')).toBeInTheDocument();
    expect(screen.getByText('Dessert')).toBeInTheDocument();
    expect(screen.getByText('Snack')).toBeInTheDocument();
    expect(screen.getByText('Drink')).toBeInTheDocument();
  });

  it('highlights the selected category', () => {
    render(
      <CategoryFilter
        selectedCategory="breakfast"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const breakfastButton = screen.getByText('Breakfast');
    const allButton = screen.getByText('All');

    // Selected category should have active styling
    expect(breakfastButton).toHaveClass('bg-rose-500', 'text-white');
    // Non-selected category should have default styling
    expect(allButton).toHaveClass('bg-white', 'text-gray-700');
  });

  it('calls onCategoryChange when a category is clicked', () => {
    render(
      <CategoryFilter
        selectedCategory="all"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const dinnerButton = screen.getByText('Dinner');
    fireEvent.click(dinnerButton);

    expect(mockOnCategoryChange).toHaveBeenCalledWith('dinner');
  });

  it('has proper accessibility attributes', () => {
    render(
      <CategoryFilter
        selectedCategory="lunch"
        onCategoryChange={mockOnCategoryChange}
      />
    );

    const lunchButton = screen.getByText('Lunch');
    const allButton = screen.getByText('All');

    expect(lunchButton).toHaveAttribute('aria-pressed', 'true');
    expect(allButton).toHaveAttribute('aria-pressed', 'false');
  });
});