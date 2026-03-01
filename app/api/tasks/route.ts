import { NextRequest, NextResponse } from 'next/server';
import { getAllTasks, createTask } from '@/lib/store';

export async function GET() {
  const tasks = getAllTasks();
  return NextResponse.json({ tasks });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Basic presence check — no schema validation yet
  if (!body.title || typeof body.title !== 'string') {
    return NextResponse.json({ error: 'title is required' }, { status: 400 });
  }

  const task = createTask({
    title: body.title,
    description: body.description,
    assignee: body.assignee,
  });

  return NextResponse.json({ task }, { status: 201 });
}
