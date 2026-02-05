import type {
  User,
  UserProfile,
  UserRole,
  Survey,
  Request,
  RequestType,
  RequestStatus,
  RequestPriority,
  KnowledgeBase,
  KnowledgeEntry,
  ContentItem,
  ContentType,
  ContentStatus,
  Tag,
  Annotation,
  AnnotationType,
  Project,
  ProjectStatus,
  Task,
  Comment,
  Notification,
  NotificationType,
  AISuggestion,
  AISuggestionType,
  ContentFeedback,
  ResearchRequest,
} from '@/types';

describe('Type Definitions', () => {
  describe('User types', () => {
    it('should correctly type a user object', () => {
      const user: User = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'user',
        roles: ['user'],
        subscriptionStatus: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(user.id).toBe('1');
      expect(user.role).toBe('user');
      expect(user.roles).toContain('user');
    });

    it('should support multiple roles', () => {
      const expertAnalyst: User = {
        id: '2',
        email: 'expert@example.com',
        name: 'Expert Analyst',
        role: 'expert',
        roles: ['expert', 'analyst'],
        subscriptionStatus: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(expertAnalyst.roles).toContain('expert');
      expect(expertAnalyst.roles).toContain('analyst');
    });

    it('should allow optional fields', () => {
      const user: User = {
        id: '3',
        email: 'test@example.com',
        name: 'Test',
        role: 'expert',
        roles: ['expert'],
        subscriptionStatus: 'active',
        bio: 'Expert bio',
        expertise: ['AI', 'ML'],
        avatarUrl: 'https://example.com/avatar.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(user.bio).toBe('Expert bio');
      expect(user.expertise).toContain('AI');
    });
  });

  describe('Request types', () => {
    it('should correctly type request types', () => {
      const types: RequestType[] = ['video_curation', 'article_curation', 'advice', 'research', 'custom'];
      expect(types.length).toBe(5);
    });

    it('should correctly type request statuses', () => {
      const statuses: RequestStatus[] = ['pending', 'in_progress', 'under_review', 'completed', 'cancelled'];
      expect(statuses.length).toBe(5);
    });

    it('should correctly type request priorities', () => {
      const priorities: RequestPriority[] = ['low', 'normal', 'high', 'urgent'];
      expect(priorities.length).toBe(4);
    });

    it('should correctly type a request object', () => {
      const request: Request = {
        id: '1',
        userId: '1',
        title: 'Test Request',
        description: 'Description',
        type: 'advice',
        criteria: ['criterion1'],
        tags: ['tag1'],
        status: 'pending',
        priority: 'normal',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(request.type).toBe('advice');
      expect(request.status).toBe('pending');
    });
  });

  describe('Content types', () => {
    it('should correctly type content types', () => {
      const types: ContentType[] = ['video', 'article', 'paper', 'tutorial', 'tool', 'course', 'other'];
      expect(types.length).toBe(7);
    });

    it('should correctly type content statuses', () => {
      const statuses: ContentStatus[] = ['pending', 'reviewed', 'approved', 'archived'];
      expect(statuses.length).toBe(4);
    });
  });

  describe('Project types', () => {
    it('should correctly type project statuses', () => {
      const statuses: ProjectStatus[] = ['planning', 'active', 'review', 'completed', 'archived'];
      expect(statuses.length).toBe(5);
    });
  });

  describe('Notification types', () => {
    it('should correctly type notification types', () => {
      const types: NotificationType[] = [
        'request_assigned',
        'request_completed',
        'request_updated',
        'collaboration_invite',
        'comment_mention',
        'comment_reply',
        'task_assigned',
        'task_due',
        'content_feedback',
        'ai_suggestion',
        'system',
      ];
      expect(types.length).toBe(11);
    });
  });

  describe('AI Suggestion types', () => {
    it('should correctly type AI suggestion types', () => {
      const types: AISuggestionType[] = [
        'question_refinement',
        'content_match',
        'tag_suggestion',
        'research_priority',
        'pattern_insight',
        'response_draft',
      ];
      expect(types.length).toBe(6);
    });

    it('should correctly type an AI suggestion object', () => {
      const suggestion: AISuggestion = {
        id: '1',
        type: 'content_match',
        targetEntityType: 'request',
        targetEntityId: '1',
        suggestion: 'Test suggestion',
        confidence: 0.85,
        reasoning: 'Test reasoning',
        createdAt: new Date(),
      };

      expect(suggestion.confidence).toBe(0.85);
      expect(suggestion.type).toBe('content_match');
    });
  });

  describe('Annotation types', () => {
    it('should correctly type annotation types', () => {
      const types: AnnotationType[] = ['note', 'highlight', 'question', 'insight', 'warning'];
      expect(types.length).toBe(5);
    });
  });
});
