import { NextRequest, NextResponse } from 'next/server';
import { getRecipeById } from '@/lib/recipes';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const recipe = getRecipeById(params.id);
  if (!recipe) {
    return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
  }
  return NextResponse.json({ recipe });
}
