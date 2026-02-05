'use client';

import { ContentItem } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ContentItemCardProps {
  content: ContentItem;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  showAnnotations?: boolean;
}

export function ContentItemCard({
  content,
  onView,
  onEdit,
  showAnnotations = false,
}: ContentItemCardProps) {
  const contentTypeIcons: Record<string, string> = {
    video: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z',
    article: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    paper: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    tutorial: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    tool: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    course: 'M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9 5 9-5-9 5z',
    other: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return null;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="py-4">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={contentTypeIcons[content.contentType] || contentTypeIcons.other}
              />
            </svg>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h4 className="font-medium text-gray-900 truncate pr-4">{content.title}</h4>
              <StatusBadge status={content.status} />
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{content.description}</p>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
              <span className="capitalize">{content.contentType}</span>
              <span>•</span>
              <span>{content.source}</span>
              {content.metadata.author && (
                <>
                  <span>•</span>
                  <span>by {content.metadata.author}</span>
                </>
              )}
              {content.metadata.duration && (
                <>
                  <span>•</span>
                  <span>{formatDuration(content.metadata.duration)}</span>
                </>
              )}
              {content.qualityScore && (
                <>
                  <span>•</span>
                  <span className="text-yellow-600">
                    {'★'.repeat(Math.round(content.qualityScore))}
                  </span>
                </>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-2">
              {content.tags.slice(0, 4).map((tag) => (
                <Badge key={tag.id} variant="default" size="sm">
                  {tag.name}
                </Badge>
              ))}
              {content.tags.length > 4 && (
                <Badge variant="default" size="sm">
                  +{content.tags.length - 4}
                </Badge>
              )}
            </div>

            {/* Annotations summary */}
            {showAnnotations && content.annotations.length > 0 && (
              <div className="text-xs text-gray-500 mb-2">
                {content.annotations.length} annotation(s)
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 mt-2">
              <a
                href={content.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Open Link
              </a>
              {onView && (
                <button
                  onClick={() => onView(content.id)}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  View Details
                </button>
              )}
              {onEdit && (
                <button
                  onClick={() => onEdit(content.id)}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
