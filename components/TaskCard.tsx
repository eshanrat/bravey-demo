'use client';

import { Task, Status } from '@/lib/types';
import { Circle, CheckCircle2, Clock, User } from 'lucide-react';

const STATUS_CONFIG: Record<Status, { label: string; color: string; icon: React.ReactNode }> = {
  todo: {
    label: 'To Do',
    color: 'bg-gray-100 text-gray-600',
    icon: <Circle className="w-3.5 h-3.5" />,
  },
  in_progress: {
    label: 'In Progress',
    color: 'bg-blue-100 text-blue-700',
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  done: {
    label: 'Done',
    color: 'bg-green-100 text-green-700',
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
};

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: Status) => void;
}

export function TaskCard({ task, onStatusChange }: TaskCardProps) {
  const cfg = STATUS_CONFIG[task.status];

  const nextStatus: Record<Status, Status> = {
    todo: 'in_progress',
    in_progress: 'done',
    done: 'todo',
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug">{task.title}</h3>
          {task.description && (
            <p className="mt-1 text-xs text-gray-500 line-clamp-2">{task.description}</p>
          )}
        </div>
        <button
          onClick={() => onStatusChange(task.id, nextStatus[task.status])}
          className={`flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${cfg.color} transition-opacity hover:opacity-80`}
          title="Click to advance status"
        >
          {cfg.icon}
          {cfg.label}
        </button>
      </div>

      {task.assignee && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
          <User className="w-3 h-3" />
          <span>{task.assignee}</span>
        </div>
      )}
    </div>
  );
}
