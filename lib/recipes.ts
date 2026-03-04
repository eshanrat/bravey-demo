import { Recipe, CreateRecipeInput } from './types';
import { randomUUID } from 'crypto';

const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Margherita Pizza',
    description: 'A timeless Neapolitan pizza with San Marzano tomatoes, fresh mozzarella, and basil.',
    category: 'dinner',
    prepMins: 20,
    cookMins: 12,
    servings: 4,
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80',
    ingredients: [
      { amount: '300', unit: 'g', name: 'pizza dough' },
      { amount: '150', unit: 'ml', name: 'San Marzano tomato sauce' },
      { amount: '200', unit: 'g', name: 'fresh mozzarella, torn' },
      { amount: '10', unit: 'leaves', name: 'fresh basil' },
      { amount: '2', unit: 'tbsp', name: 'extra virgin olive oil' },
      { amount: '1', unit: 'pinch', name: 'sea salt' },
    ],
    steps: [
      'Preheat oven to 250°C (480°F) with a pizza stone inside for at least 30 minutes.',
      'Stretch the dough on a floured surface to a 30cm circle.',
      'Spread tomato sauce evenly, leaving a 2cm border.',
      'Scatter torn mozzarella over the sauce.',
      'Slide onto the hot stone and bake for 10–12 minutes until the crust is charred and cheese is bubbling.',
      'Remove from oven, top with fresh basil, drizzle with olive oil, and season with salt.',
    ],
    createdAt: '2025-01-05T10:00:00Z',
  },
  {
    id: '2',
    title: 'Avocado Toast with Poached Egg',
    description: 'Creamy avocado on sourdough toast topped with a perfectly poached egg and chili flakes.',
    category: 'breakfast',
    prepMins: 10,
    cookMins: 5,
    servings: 1,
    imageUrl: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&q=80',
    ingredients: [
      { amount: '1', unit: 'slice', name: 'sourdough bread' },
      { amount: '1', unit: '', name: 'ripe avocado' },
      { amount: '1', unit: '', name: 'large egg' },
      { amount: '1', unit: 'tsp', name: 'white vinegar' },
      { amount: '1', unit: 'pinch', name: 'chili flakes' },
      { amount: '1', unit: 'tsp', name: 'lemon juice' },
      { amount: '1', unit: 'pinch', name: 'salt and pepper' },
    ],
    steps: [
      'Toast the sourdough bread until golden brown.',
      'Bring a pot of water to a gentle simmer and add vinegar.',
      'Crack egg into a small bowl, then gently slide into simmering water. Cook for 3-4 minutes.',
      'Mash avocado with lemon juice, salt, and pepper.',
      'Spread avocado mixture on toast.',
      'Top with poached egg and sprinkle with chili flakes.',
    ],
    createdAt: '2025-01-15T08:00:00Z',
  },
  {
    id: '3',
    title: 'Chocolate Lava Cake',
    description: 'Individual warm chocolate cakes with a molten, flowing centre. Ready in 20 minutes.',
    category: 'dessert',
    prepMins: 10,
    cookMins: 12,
    servings: 2,
    imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80',
    ingredients: [
      { amount: '100', unit: 'g', name: 'dark chocolate (70%), chopped' },
      { amount: '100', unit: 'g', name: 'unsalted butter' },
      { amount: '2', unit: '', name: 'large eggs' },
      { amount: '2', unit: '', name: 'egg yolks' },
      { amount: '100', unit: 'g', name: 'caster sugar' },
      { amount: '50', unit: 'g', name: 'plain flour' },
      { amount: '1', unit: 'tsp', name: 'vanilla extract' },
    ],
    steps: [
      'Preheat oven to 200°C (390°F). Grease two ramekins and dust with cocoa powder.',
      'Melt chocolate and butter together in a heatproof bowl over simmering water. Stir until smooth and set aside to cool slightly.',
      'Whisk eggs, yolks, and sugar until thick and pale, about 3 minutes.',
      'Fold the chocolate mixture into the egg mixture, then fold in the flour and vanilla.',
      'Divide batter between ramekins and bake for 10–12 minutes — the edges should be set but the centre should wobble.',
      'Run a knife around the edge and invert onto plates. Serve immediately with vanilla ice cream.',
    ],
    createdAt: '2025-01-12T15:00:00Z',
  },
  {
    id: '4',
    title: 'Chicken Caesar Salad',
    description: 'Crisp romaine, grilled chicken, house-made Caesar dressing, and sourdough croutons.',
    category: 'lunch',
    prepMins: 15,
    cookMins: 15,
    servings: 2,
    imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80',
    ingredients: [
      { amount: '2', unit: '', name: 'chicken breasts' },
      { amount: '1', unit: 'head', name: 'romaine lettuce, chopped' },
      { amount: '50', unit: 'g', name: 'parmesan, shaved' },
      { amount: '2', unit: 'slices', name: 'sourdough, cubed' },
      { amount: '3', unit: 'tbsp', name: 'mayonnaise' },
      { amount: '1', unit: 'tbsp', name: 'lemon juice' },
      { amount: '1', unit: 'tsp', name: 'Worcestershire sauce' },
      { amount: '1', unit: 'clove', name: 'garlic, minced' },
      { amount: '2', unit: 'tbsp', name: 'olive oil' },
    ],
    steps: [
      'Season chicken with salt and pepper. Grill or pan-fry over medium-high heat for 6–7 minutes per side. Rest, then slice.',
      'Toss sourdough cubes in olive oil and toast in a dry pan until golden. Set aside.',
      'Whisk mayonnaise, lemon juice, Worcestershire sauce, and garlic into a dressing.',
      'In a large bowl, combine romaine with dressing and toss to coat.',
      'Top with chicken, croutons, and shaved parmesan.',
    ],
    createdAt: '2025-01-14T12:00:00Z',
  },
  {
    id: '5',
    title: 'Trail Mix Energy Balls',
    description: 'No-bake energy balls packed with nuts, seeds, and dried fruit. Perfect for on-the-go snacking.',
    category: 'snack',
    prepMins: 15,
    cookMins: 0,
    servings: 12,
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    ingredients: [
      { amount: '1', unit: 'cup', name: 'rolled oats' },
      { amount: '1/2', unit: 'cup', name: 'almond butter' },
      { amount: '1/4', unit: 'cup', name: 'honey' },
      { amount: '1/4', unit: 'cup', name: 'mini chocolate chips' },
      { amount: '2', unit: 'tbsp', name: 'chia seeds' },
      { amount: '2', unit: 'tbsp', name: 'dried cranberries' },
      { amount: '1', unit: 'tsp', name: 'vanilla extract' },
    ],
    steps: [
      'In a large bowl, mix together oats, almond butter, honey, and vanilla.',
      'Stir in chocolate chips, chia seeds, and cranberries.',
      'Refrigerate mixture for 30 minutes to firm up.',
      'Roll into 12 small balls using your hands.',
      'Store in refrigerator for up to 1 week.',
    ],
    createdAt: '2025-01-16T14:00:00Z',
  },
  {
    id: '6',
    title: 'Mango Lassi Smoothie',
    description: 'Refreshing Indian-inspired smoothie with mango, yogurt, and cardamom. Creamy and tropical.',
    category: 'drink',
    prepMins: 5,
    cookMins: 0,
    servings: 2,
    imageUrl: 'https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=800&q=80',
    ingredients: [
      { amount: '2', unit: 'cups', name: 'ripe mango, cubed' },
      { amount: '1', unit: 'cup', name: 'Greek yogurt' },
      { amount: '1/2', unit: 'cup', name: 'milk' },
      { amount: '2', unit: 'tbsp', name: 'honey' },
      { amount: '1/4', unit: 'tsp', name: 'ground cardamom' },
      { amount: '1/2', unit: 'cup', name: 'ice cubes' },
      { amount: '1', unit: 'pinch', name: 'saffron (optional)' },
    ],
    steps: [
      'Add mango, yogurt, milk, honey, and cardamom to a blender.',
      'Blend until smooth and creamy.',
      'Add ice cubes and blend again until frothy.',
      'Taste and adjust sweetness if needed.',
      'Serve immediately garnished with a pinch of saffron if desired.',
    ],
    createdAt: '2025-01-17T16:00:00Z',
  },
];

export function getAllRecipes(): Recipe[] {
  return [...recipes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id);
}

export function createRecipe(input: CreateRecipeInput): Recipe {
  const recipe: Recipe = {
    id: randomUUID(),
    ...input,
    imageUrl: input.imageUrl ?? '',
    createdAt: new Date().toISOString(),
  };
  recipes.push(recipe);
  return recipe;
}