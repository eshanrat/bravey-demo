import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Recipe, Category } from './types';

export function useRecipeFilters(recipes: Recipe[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>(
    (searchParams.get('category') as Category) || 'all'
  );
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // Debounce search query with 300ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (debouncedQuery) {
      params.set('q', debouncedQuery);
    }
    
    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }
    
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    
    router.replace(newUrl, { scroll: false });
  }, [debouncedQuery, selectedCategory, router, pathname]);

  // Filter recipes based on search query and category
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch = !debouncedQuery || 
        recipe.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(debouncedQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [recipes, debouncedQuery, selectedCategory]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredRecipes,
  };
}