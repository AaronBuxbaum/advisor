'use client';

import { KnowledgeEntry } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getUserById } from '@/lib/data';

interface KnowledgeEntryCardProps {
  entry: KnowledgeEntry;
  onClick?: (id: string) => void;
}

export function KnowledgeEntryCard({ entry, onClick }: KnowledgeEntryCardProps) {
  const author = getUserById(entry.createdBy);

  const typeIcons: Record<string, string> = {
    note: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    reference: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
    template: 'M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2',
    checklist: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  };

  const typeColors: Record<string, string> = {
    note: 'bg-blue-100 text-blue-700',
    reference: 'bg-green-100 text-green-700',
    template: 'bg-purple-100 text-purple-700',
    checklist: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <Card
      className={`hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer' : ''}`}
      onClick={() => onClick?.(entry.id)}
    >
      <CardContent className="py-4">
        <div className="flex items-start gap-3">
          <div className={`flex-shrink-0 w-8 h-8 rounded ${typeColors[entry.contentType] || 'bg-gray-100'} flex items-center justify-center`}>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={typeIcons[entry.contentType] || typeIcons.note}
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 mb-1">{entry.title}</h4>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {entry.content.substring(0, 150)}...
            </p>
            <div className="flex flex-wrap gap-1 mb-2">
              {entry.tags.slice(0, 3).map((tag, idx) => (
                <Badge key={idx} variant="default" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <span>{author?.name || 'Unknown'}</span>
              <span className="mx-2">•</span>
              <span>{entry.updatedAt.toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
