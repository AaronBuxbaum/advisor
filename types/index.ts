// ============================================
// Core User Types
// ============================================

export type UserRole = 'user' | 'expert' | 'analyst';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  roles: UserRole[]; // Users can have multiple roles (e.g., expert + analyst)
  subscriptionStatus: 'active' | 'inactive' | 'trial';
  avatarUrl?: string;
  bio?: string;
  expertise?: string[]; // For experts/analysts
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  userId: string;
  interests: string[];
  preferences: UserPreferences;
  surveyData: Record<string, Record<string, string>>;
  requestHistory: RequestSummary[];
  engagementScore?: number;
  lastActive?: Date;
}

export interface UserPreferences {
  learningStyle?: 'visual' | 'auditory' | 'reading' | 'kinesthetic';
  contentLength?: 'short' | 'medium' | 'long';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  preferredFormats?: string[];
  notificationSettings?: NotificationPreferences;
  [key: string]: unknown;
}

export interface RequestSummary {
  requestId: string;
  title: string;
  type: RequestType;
  status: RequestStatus;
  createdAt: Date;
  completedAt?: Date;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
  frequency: 'instant' | 'hourly' | 'daily';
}

// ============================================
// Survey Types
// ============================================

export interface Survey {
  id: string;
  userId: string;
  title: string;
  description?: string;
  questions: Question[];
  responses: Record<string, string>;
  status: 'draft' | 'active' | 'completed';
  createdAt: Date;
  completedAt?: Date;
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'multiple_choice' | 'rating' | 'checkbox' | 'scale';
  options?: string[];
  required?: boolean;
  minValue?: number;
  maxValue?: number;
}

// ============================================
// Request Types
// ============================================

export type RequestType = 'video_curation' | 'article_curation' | 'advice' | 'research' | 'custom';
export type RequestStatus = 'pending' | 'in_progress' | 'under_review' | 'completed' | 'cancelled';
export type RequestPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface Request {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: RequestType;
  criteria: string[];
  tags: string[];
  status: RequestStatus;
  priority: RequestPriority;
  assignedExpertId?: string;
  collaborators?: string[]; // Additional experts working on this
  projectId?: string; // If part of a collaboration project
  response?: RequestResponse;
  aiSuggestions?: AISuggestion[];
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

export interface RequestResponse {
  id: string;
  expertId: string;
  content: string;
  items?: CuratedItem[];
  sources?: ContentReference[];
  rating?: number;
  feedback?: string;
  completedAt: Date;
  updatedAt?: Date;
}

export interface CuratedItem {
  id: string;
  title: string;
  url: string;
  description: string;
  reason: string; // Why this item was selected for the user
  relevanceScore?: number;
  contentItemId?: string; // Reference to analyst-curated content
}

export interface ContentReference {
  contentItemId: string;
  knowledgeEntryId?: string;
  relevance: string;
}

// ============================================
// Knowledge Base Types
// ============================================

export interface KnowledgeBase {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  isPublic: boolean;
  collaborators: string[];
  entries: KnowledgeEntry[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface KnowledgeEntry {
  id: string;
  knowledgeBaseId: string;
  title: string;
  content: string;
  contentType: 'note' | 'reference' | 'template' | 'checklist';
  sourceContentIds?: string[]; // References to analyst content
  tags: string[];
  metadata: Record<string, unknown>;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Analyst Content Types
// ============================================

export type ContentStatus = 'pending' | 'reviewed' | 'approved' | 'archived';
export type ContentType = 'video' | 'article' | 'paper' | 'tutorial' | 'tool' | 'course' | 'other';

export interface ContentItem {
  id: string;
  analystId: string;
  url: string;
  title: string;
  description: string;
  contentType: ContentType;
  source: string; // e.g., "YouTube", "Medium", "ArXiv"
  tags: Tag[];
  annotations: Annotation[];
  status: ContentStatus;
  qualityScore?: number;
  relevanceAreas: string[];
  metadata: ContentMetadata;
  createdAt: Date;
  updatedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
}

export interface ContentMetadata {
  author?: string;
  publishedDate?: Date;
  duration?: number; // For videos, in seconds
  wordCount?: number; // For articles
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  language?: string;
  thumbnail?: string;
  [key: string]: unknown;
}

// ============================================
// Tagging System
// ============================================

export interface Tag {
  id: string;
  name: string;
  category: string;
  parentId?: string; // For hierarchical tags
  color?: string;
  description?: string;
  usageCount: number;
  createdAt: Date;
}

export interface TagCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}

// ============================================
// Annotation Types
// ============================================

export type AnnotationType = 'note' | 'highlight' | 'question' | 'insight' | 'warning';

export interface Annotation {
  id: string;
  contentItemId: string;
  authorId: string;
  type: AnnotationType;
  text: string;
  position?: AnnotationPosition;
  tags: string[];
  reactions: Reaction[];
  replies: AnnotationReply[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AnnotationPosition {
  start?: number;
  end?: number;
  timestamp?: number; // For video content
  page?: number; // For PDFs
}

export interface AnnotationReply {
  id: string;
  authorId: string;
  text: string;
  createdAt: Date;
}

export interface Reaction {
  userId: string;
  type: 'like' | 'helpful' | 'agree' | 'disagree';
  createdAt: Date;
}

// ============================================
// Collaboration Types
// ============================================

export type ProjectStatus = 'planning' | 'active' | 'review' | 'completed' | 'archived';
export type ProjectMemberRole = 'owner' | 'lead' | 'contributor' | 'reviewer';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  requestId?: string; // If project is for a specific request
  ownerId: string;
  members: ProjectMember[];
  tasks: Task[];
  comments: Comment[];
  sharedResources: SharedResource[];
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

export interface ProjectMember {
  userId: string;
  role: ProjectMemberRole;
  joinedAt: Date;
  permissions: string[];
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  assigneeId?: string;
  priority: RequestPriority;
  dueDate?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SharedResource {
  id: string;
  type: 'file' | 'link' | 'note' | 'content_item';
  title: string;
  url?: string;
  content?: string;
  contentItemId?: string;
  uploadedBy: string;
  createdAt: Date;
}

// ============================================
// Comment System
// ============================================

export interface Comment {
  id: string;
  authorId: string;
  parentId?: string; // For threaded comments
  entityType: 'request' | 'project' | 'content_item' | 'knowledge_entry';
  entityId: string;
  text: string;
  mentions: string[]; // User IDs mentioned
  attachments?: CommentAttachment[];
  reactions: Reaction[];
  isResolved?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentAttachment {
  id: string;
  type: 'image' | 'file' | 'link';
  url: string;
  name: string;
}

// ============================================
// Notification Types
// ============================================

export type NotificationType =
  | 'request_assigned'
  | 'request_completed'
  | 'request_updated'
  | 'collaboration_invite'
  | 'comment_mention'
  | 'comment_reply'
  | 'task_assigned'
  | 'task_due'
  | 'content_feedback'
  | 'ai_suggestion'
  | 'system';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  entityType?: string;
  entityId?: string;
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

// ============================================
// AI Integration Types
// ============================================

export type AISuggestionType =
  | 'question_refinement'
  | 'content_match'
  | 'tag_suggestion'
  | 'research_priority'
  | 'pattern_insight'
  | 'response_draft';

export interface AISuggestion {
  id: string;
  type: AISuggestionType;
  targetEntityType: string;
  targetEntityId: string;
  suggestion: string;
  confidence: number;
  reasoning?: string;
  accepted?: boolean;
  feedback?: string;
  createdAt: Date;
}

export interface AIInteraction {
  id: string;
  userId: string;
  type: 'question' | 'refinement' | 'analysis' | 'generation';
  input: string;
  output: string;
  context?: Record<string, unknown>;
  tokensUsed?: number;
  createdAt: Date;
}

// ============================================
// Analytics Types
// ============================================

export interface UserAnalytics {
  userId: string;
  totalRequests: number;
  completedRequests: number;
  averageResponseTime: number; // In hours
  topInterests: TagCount[];
  engagementTrend: TrendPoint[];
}

export interface ExpertAnalytics {
  expertId: string;
  totalAssignments: number;
  completedAssignments: number;
  averageRating: number;
  specializations: TagCount[];
  responseTimeTrend: TrendPoint[];
}

export interface AnalystAnalytics {
  analystId: string;
  totalContentItems: number;
  approvedContentItems: number;
  topTags: TagCount[];
  contentUsageRate: number;
}

export interface TagCount {
  tag: string;
  count: number;
}

export interface TrendPoint {
  date: Date;
  value: number;
}

// ============================================
// Search Types
// ============================================

export interface SearchFilters {
  query?: string;
  tags?: string[];
  contentTypes?: ContentType[];
  dateRange?: DateRange;
  status?: string[];
  authors?: string[];
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  facets?: SearchFacets;
}

export interface SearchFacets {
  tags: TagCount[];
  contentTypes: { type: ContentType; count: number }[];
  authors: { authorId: string; name: string; count: number }[];
}

// ============================================
// Expert Feedback Types (Analyst-Expert Loop)
// ============================================

export interface ContentFeedback {
  id: string;
  contentItemId: string;
  expertId: string;
  feedbackType: 'request' | 'quality' | 'relevance' | 'gap';
  message: string;
  priority: RequestPriority;
  status: 'open' | 'acknowledged' | 'addressed';
  response?: string;
  respondedBy?: string;
  respondedAt?: Date;
  createdAt: Date;
}

export interface ResearchRequest {
  id: string;
  requesterId: string;
  requesterRole: 'expert' | 'analyst';
  title: string;
  description: string;
  targetAreas: string[];
  priority: RequestPriority;
  status: 'open' | 'in_progress' | 'completed';
  assignedTo?: string;
  results?: ContentItem[];
  createdAt: Date;
  updatedAt: Date;
}
