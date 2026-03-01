'use client';

import { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';

interface CreateTaskFormProps {
  onSubmit: (title: string, description: string) => Promise<void>;
}

export function CreateTaskForm({ onSubmit }: CreateTaskFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      await onSubmit(title.trim(), description.trim());
      setTitle('');
      setDescription('');
      setOpen(false);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors"
      >
        <Plus className="w-4 h-4" />
        New task
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-3">
      <input
        autoFocus
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-sm font-medium text-gray-900 placeholder-gray-300 border-0 outline-none"
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        className="w-full text-sm text-gray-600 placeholder-gray-300 border-0 outline-none resize-none"
      />
      <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium rounded-md disabled:opacity-50 transition-colors"
        >
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
          {loading ? 'Creating…' : 'Create task'}
        </button>
        <button
          type="button"
          onClick={() => { setOpen(false); setTitle(''); setDescription(''); }}
          className="px-3 py-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
