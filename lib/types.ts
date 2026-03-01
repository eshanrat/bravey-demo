export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in_progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  assignee: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  assignee?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: Status;
  assignee?: string | null;
}
