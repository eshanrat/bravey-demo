export type Category =
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'dessert'
  | 'snack'
  | 'drink';

export interface Ingredient {
  amount: string;
  unit: string;
  name: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: Category;
  prepMins: number;
  cookMins: number;
  servings: number;
  ingredients: Ingredient[];
  steps: string[];
  imageUrl: string;
  createdAt: string;
}

export interface CreateRecipeInput {
  title: string;
  description: string;
  category: Category;
  prepMins: number;
  cookMins: number;
  servings: number;
  ingredients: Ingredient[];
  steps: string[];
  imageUrl?: string;
}
