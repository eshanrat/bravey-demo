import { Search } from 'lucide-react';

interface EmptyStateProps {
  searchQuery: string;
}

export function EmptyState({ searchQuery }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
      <p className="text-gray-500 max-w-sm">
        We couldn't find any recipes matching "{searchQuery}". 
        Try searching for different ingredients or recipe names.
      </p>
    </div>
  );
}