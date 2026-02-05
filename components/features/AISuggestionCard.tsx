'use client';

import { AISuggestion } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface AISuggestionCardProps {
  suggestion: AISuggestion;
  onAccept?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export function AISuggestionCard({ suggestion, onAccept, onDismiss }: AISuggestionCardProps) {
  const typeLabels: Record<string, string> = {
    question_refinement: 'Question Refinement',
    content_match: 'Content Match',
    tag_suggestion: 'Tag Suggestion',
    research_priority: 'Research Priority',
    pattern_insight: 'Pattern Insight',
    response_draft: 'Response Draft',
  };

  const typeColors: Record<string, 'info' | 'success' | 'warning'> = {
    question_refinement: 'info',
    content_match: 'success',
    tag_suggestion: 'info',
    research_priority: 'warning',
    pattern_insight: 'success',
    response_draft: 'info',
  };

  return (
    <Card className="border-l-4 border-l-purple-500">
      <CardContent className="py-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <Badge variant={typeColors[suggestion.type] || 'info'}>
              {typeLabels[suggestion.type] || suggestion.type}
            </Badge>
            <span className="text-xs text-gray-500">
              {Math.round(suggestion.confidence * 100)}% confidence
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-900 mb-2">{suggestion.suggestion}</p>
        {suggestion.reasoning && (
          <p className="text-xs text-gray-500 mb-3">
            <span className="font-medium">Reasoning:</span> {suggestion.reasoning}
          </p>
        )}
        <div className="flex gap-2">
          {onAccept && (
            <Button size="sm" onClick={() => onAccept(suggestion.id)}>
              Accept
            </Button>
          )}
          {onDismiss && (
            <Button size="sm" variant="ghost" onClick={() => onDismiss(suggestion.id)}>
              Dismiss
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface AISuggestionsListProps {
  suggestions: AISuggestion[];
  onAccept?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export function AISuggestionsList({ suggestions, onAccept, onDismiss }: AISuggestionsListProps) {
  if (suggestions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 text-sm">
        No AI suggestions at this time
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {suggestions.map((suggestion) => (
        <AISuggestionCard
          key={suggestion.id}
          suggestion={suggestion}
          onAccept={onAccept}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
}
