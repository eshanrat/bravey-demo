import { TaskList } from '@/components/TaskList';
import { LayoutGrid } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <LayoutGrid className="w-5 h-5 text-sky-600" />
          <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
        </div>
        <p className="text-sm text-gray-400">Engineering task board</p>
      </header>
      <TaskList />
    </div>
  );
}
