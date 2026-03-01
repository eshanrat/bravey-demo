'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Recipe, Category } from './types';

function normalizeSearchText(text: string): string {
  return text.toLowerCase().trim();
}

function matchesSearchQuery(recipe: Recipe, query: string): boolean {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return true;
  
  const searchableText = [
    recipe.title,
    recipe.description,
    recipe.category,
    ...recipe.ingredients.map(ing => ing.name)
  ].join(' ');
  
  return normalizeSearchText(searchableText).includes(normalizedQuery);
}

export function useRecipeFilters(recipes: Recipe[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(() => searchParams?.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>(() => 
    (searchParams?.get('category') as Category) || 'all'
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
    const params = new URLSearchParams(searchParams?.toString());
    
    if (debouncedQuery) {
      params.set('q', debouncedQuery);
    } else {
      params.delete('q');
    }
    
    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }
    
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    
    router.replace(newUrl, { scroll: false });
  }, [debouncedQuery, selectedCategory, router, pathname, searchParams]);

  // Filter recipes based on search query and category
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch = matchesSearchQuery(recipe, debouncedQuery);
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