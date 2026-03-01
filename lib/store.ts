/**
 * In-memory task store.
 * In a real app this would be backed by a database.
 */
import { Task, CreateTaskInput, UpdateTaskInput } from './types';
import { randomUUID } from 'crypto';

const tasks: Task[] = [
  {
    id: '1',
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions to run tests and deploy on merge to main.',
    status: 'done',
    assignee: 'alice',
    createdAt: '2025-01-10T09:00:00Z',
    updatedAt: '2025-01-12T14:30:00Z',
  },
  {
    id: '2',
    title: 'Design system tokens',
    description: 'Define colour, spacing, and typography tokens in Tailwind config.',
    status: 'in_progress',
    assignee: 'bob',
    createdAt: '2025-01-14T10:00:00Z',
    updatedAt: '2025-01-15T08:00:00Z',
  },
  {
    id: '3',
    title: 'Add rate limiting to API',
    description: 'Prevent abuse by capping requests per IP to 100/min on all public endpoints.',
    status: 'todo',
    assignee: null,
    createdAt: '2025-01-15T11:00:00Z',
    updatedAt: '2025-01-15T11:00:00Z',
  },
  {
    id: '4',
    title: 'Write onboarding documentation',
    description: 'Document the local dev setup, environment variables, and deployment process.',
    status: 'todo',
    assignee: 'carol',
    createdAt: '2025-01-16T09:00:00Z',
    updatedAt: '2025-01-16T09:00:00Z',
  },
  {
    id: '5',
    title: 'Fix memory leak in WebSocket handler',
    description: 'Listeners are not cleaned up on disconnect, causing slow memory growth over time.',
    status: 'in_progress',
    assignee: 'alice',
    createdAt: '2025-01-17T13:00:00Z',
    updatedAt: '2025-01-18T09:45:00Z',
  },
];

export function getAllTasks(): Task[] {
  return [...tasks].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getTaskById(id: string): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function createTask(input: CreateTaskInput): Task {
  const now = new Date().toISOString();
  const task: Task = {
    id: randomUUID(),
    title: input.title,
    description: input.description ?? '',
    status: 'todo',
    assignee: input.assignee ?? null,
    createdAt: now,
    updatedAt: now,
  };
  tasks.push(task);
  return task;
}

export function updateTask(id: string, input: UpdateTaskInput): Task | null {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  const updated: Task = {
    ...tasks[idx],
    ...input,
    updatedAt: new Date().toISOString(),
  };
  tasks[idx] = updated;
  return updated;
}

export function deleteTask(id: string): boolean {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}
