'use client';

import { useState, useEffect } from 'react';
import { Task, Status } from '@/lib/types';
import { TaskCard } from './TaskCard';
import { CreateTaskForm } from './CreateTaskForm';
import { Loader2 } from 'lucide-react';

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function fetchTasks() {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data.tasks);
    } catch {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchTasks(); }, []);

  async function handleStatusChange(id: string, status: Status) {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === id ? data.task : t)));
    } catch {
      // silent – UI already optimistic in a real app
    }
  }

  async function handleCreate(title: string, description: string) {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    const data = await res.json();
    setTasks((prev) => [data.task, ...prev]);
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  const byStatus = (status: Status) => tasks.filter((t) => t.status === status);

  return (
    <div className="space-y-8">
      <CreateTaskForm onSubmit={handleCreate} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(['todo', 'in_progress', 'done'] as Status[]).map((status) => (
          <div key={status}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              {status === 'todo' ? 'To Do' : status === 'in_progress' ? 'In Progress' : 'Done'}
              <span className="ml-2 text-gray-300">{byStatus(status).length}</span>
            </h2>
            <div className="space-y-3">
              {byStatus(status).map((task) => (
                <TaskCard key={task.id} task={task} onStatusChange={handleStatusChange} />
              ))}
              {byStatus(status).length === 0 && (
                <p className="text-xs text-gray-300 italic">No tasks</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
