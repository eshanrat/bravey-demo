import { getAllRecipes } from '@/lib/recipes';
import { HomeClient } from '@/components/HomeClient';

export default function Home() {
  const recipes = getAllRecipes();

  return <HomeClient initialRecipes={recipes} />;
}