'use client';

import { Video, VideoSource } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge, StatusBadge } from '@/components/ui/Badge';

interface ContentItemCardProps {
  content: Video;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  showAnnotations?: boolean;
  userPlatforms?: string[];
}

export function ContentItemCard({
  content,
  onView,
  onEdit,
  showAnnotations = false,
  userPlatforms = [],
}: ContentItemCardProps) {
  const categoryIcons: Record<string, string> = {
    tutorial: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z',
    lecture: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    documentary: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
    course: 'M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9 5 9-5-9 5z',
    talk: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    workshop: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    review: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    entertainment: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z',
    other: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return null;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  // Get primary source or first available source
  const primarySource = content.sources.find(s => s.id === content.primarySourceId) || content.sources[0];

  // Check which sources are available to the user
  const availableSources = content.sources.filter(s =>
    userPlatforms.length === 0 || userPlatforms.includes(s.platformId)
  );

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
                d={categoryIcons[content.category] || categoryIcons.other}
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
              <span className="capitalize">{content.category}</span>
              <span>•</span>
              <span>{content.creator.name}</span>
              {content.duration && (
                <>
                  <span>•</span>
                  <span>{formatDuration(content.duration)}</span>
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

            {/* Platform availability */}
            <div className="flex flex-wrap items-center gap-1 mb-2">
              <span className="text-xs text-gray-500">Available on:</span>
              {content.sources.map((source) => (
                <Badge
                  key={source.id}
                  variant={availableSources.includes(source) ? 'success' : 'default'}
                  size="sm"
                >
                  {source.platformId}
                </Badge>
              ))}
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
              {primarySource && (
                <a
                  href={primarySource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Watch Video
                </a>
              )}
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
