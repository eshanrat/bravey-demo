import { NextRequest, NextResponse } from 'next/server';
import { getTaskById, updateTask, deleteTask } from '@/lib/store';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const task = getTaskById(params.id);
  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }
  return NextResponse.json({ task });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const task = updateTask(params.id, body);
  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }
  return NextResponse.json({ task });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const ok = deleteTask(params.id);
  if (!ok) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }
  return new NextResponse(null, { status: 204 });
}
