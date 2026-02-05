import { render, screen, fireEvent } from '@testing-library/react';
import { AISuggestionCard, AISuggestionsList } from '@/components/features/AISuggestionCard';
import { AISuggestion } from '@/types';

const mockSuggestion: AISuggestion = {
  id: 'sug-1',
  type: 'content_match',
  targetEntityType: 'request',
  targetEntityId: 'req-1',
  suggestion: 'Consider this matching content',
  confidence: 0.85,
  reasoning: 'Based on user preferences',
  createdAt: new Date('2024-01-01'),
};

describe('AISuggestionCard', () => {
  it('renders suggestion content', () => {
    render(<AISuggestionCard suggestion={mockSuggestion} />);
    expect(screen.getByText('Consider this matching content')).toBeInTheDocument();
  });

  it('displays confidence percentage', () => {
    render(<AISuggestionCard suggestion={mockSuggestion} />);
    expect(screen.getByText('85% confidence')).toBeInTheDocument();
  });

  it('displays reasoning when provided', () => {
    render(<AISuggestionCard suggestion={mockSuggestion} />);
    expect(screen.getByText(/Based on user preferences/)).toBeInTheDocument();
  });

  it('does not display reasoning when not provided', () => {
    const suggestionWithoutReasoning = { ...mockSuggestion, reasoning: undefined };
    render(<AISuggestionCard suggestion={suggestionWithoutReasoning} />);
    expect(screen.queryByText('Reasoning:')).not.toBeInTheDocument();
  });

  it('displays correct type label for content_match', () => {
    render(<AISuggestionCard suggestion={mockSuggestion} />);
    expect(screen.getByText('Content Match')).toBeInTheDocument();
  });

  it('displays correct type label for question_refinement', () => {
    const suggestion = { ...mockSuggestion, type: 'question_refinement' as const };
    render(<AISuggestionCard suggestion={suggestion} />);
    expect(screen.getByText('Question Refinement')).toBeInTheDocument();
  });

  it('displays correct type label for tag_suggestion', () => {
    const suggestion = { ...mockSuggestion, type: 'tag_suggestion' as const };
    render(<AISuggestionCard suggestion={suggestion} />);
    expect(screen.getByText('Tag Suggestion')).toBeInTheDocument();
  });

  it('displays correct type label for research_priority', () => {
    const suggestion = { ...mockSuggestion, type: 'research_priority' as const };
    render(<AISuggestionCard suggestion={suggestion} />);
    expect(screen.getByText('Research Priority')).toBeInTheDocument();
  });

  it('displays correct type label for pattern_insight', () => {
    const suggestion = { ...mockSuggestion, type: 'pattern_insight' as const };
    render(<AISuggestionCard suggestion={suggestion} />);
    expect(screen.getByText('Pattern Insight')).toBeInTheDocument();
  });

  it('displays correct type label for response_draft', () => {
    const suggestion = { ...mockSuggestion, type: 'response_draft' as const };
    render(<AISuggestionCard suggestion={suggestion} />);
    expect(screen.getByText('Response Draft')).toBeInTheDocument();
  });

  it('renders Accept button when onAccept is provided', () => {
    const onAccept = jest.fn();
    render(<AISuggestionCard suggestion={mockSuggestion} onAccept={onAccept} />);
    expect(screen.getByText('Accept')).toBeInTheDocument();
  });

  it('does not render Accept button when onAccept is not provided', () => {
    render(<AISuggestionCard suggestion={mockSuggestion} />);
    expect(screen.queryByText('Accept')).not.toBeInTheDocument();
  });

  it('calls onAccept with suggestion id when Accept is clicked', () => {
    const onAccept = jest.fn();
    render(<AISuggestionCard suggestion={mockSuggestion} onAccept={onAccept} />);
    fireEvent.click(screen.getByText('Accept'));
    expect(onAccept).toHaveBeenCalledWith('sug-1');
  });

  it('renders Dismiss button when onDismiss is provided', () => {
    const onDismiss = jest.fn();
    render(<AISuggestionCard suggestion={mockSuggestion} onDismiss={onDismiss} />);
    expect(screen.getByText('Dismiss')).toBeInTheDocument();
  });

  it('does not render Dismiss button when onDismiss is not provided', () => {
    render(<AISuggestionCard suggestion={mockSuggestion} />);
    expect(screen.queryByText('Dismiss')).not.toBeInTheDocument();
  });

  it('calls onDismiss with suggestion id when Dismiss is clicked', () => {
    const onDismiss = jest.fn();
    render(<AISuggestionCard suggestion={mockSuggestion} onDismiss={onDismiss} />);
    fireEvent.click(screen.getByText('Dismiss'));
    expect(onDismiss).toHaveBeenCalledWith('sug-1');
  });

  it('renders both buttons when both handlers are provided', () => {
    const onAccept = jest.fn();
    const onDismiss = jest.fn();
    render(<AISuggestionCard suggestion={mockSuggestion} onAccept={onAccept} onDismiss={onDismiss} />);
    expect(screen.getByText('Accept')).toBeInTheDocument();
    expect(screen.getByText('Dismiss')).toBeInTheDocument();
  });
});

describe('AISuggestionsList', () => {
  const mockSuggestions: AISuggestion[] = [
    mockSuggestion,
    {
      id: 'sug-2',
      type: 'question_refinement',
      targetEntityType: 'request',
      targetEntityId: 'req-2',
      suggestion: 'Try refining your question',
      confidence: 0.72,
      createdAt: new Date('2024-01-02'),
    },
  ];

  it('renders all suggestions', () => {
    render(<AISuggestionsList suggestions={mockSuggestions} />);
    expect(screen.getByText('Consider this matching content')).toBeInTheDocument();
    expect(screen.getByText('Try refining your question')).toBeInTheDocument();
  });

  it('shows empty message when no suggestions', () => {
    render(<AISuggestionsList suggestions={[]} />);
    expect(screen.getByText('No AI suggestions at this time')).toBeInTheDocument();
  });

  it('passes onAccept to each card', () => {
    const onAccept = jest.fn();
    render(<AISuggestionsList suggestions={mockSuggestions} onAccept={onAccept} />);

    const acceptButtons = screen.getAllByText('Accept');
    expect(acceptButtons).toHaveLength(2);

    fireEvent.click(acceptButtons[0]);
    expect(onAccept).toHaveBeenCalledWith('sug-1');
  });

  it('passes onDismiss to each card', () => {
    const onDismiss = jest.fn();
    render(<AISuggestionsList suggestions={mockSuggestions} onDismiss={onDismiss} />);

    const dismissButtons = screen.getAllByText('Dismiss');
    expect(dismissButtons).toHaveLength(2);

    fireEvent.click(dismissButtons[1]);
    expect(onDismiss).toHaveBeenCalledWith('sug-2');
  });
});
