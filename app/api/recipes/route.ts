import { NextRequest, NextResponse } from 'next/server';
import { getAllRecipes, createRecipe } from '@/lib/recipes';

export async function GET() {
  const recipes = getAllRecipes();
  return NextResponse.json({ recipes });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.title || typeof body.title !== 'string') {
    return NextResponse.json({ error: 'title is required' }, { status: 400 });
  }
  if (!body.category) {
    return NextResponse.json({ error: 'category is required' }, { status: 400 });
  }

  const recipe = createRecipe(body);
  return NextResponse.json({ recipe }, { status: 201 });
}
