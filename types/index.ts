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
  platformSubscriptions: string[]; // Platform IDs the user has access to
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
  preferredPlatforms?: string[]; // Preferred platforms when multiple available
  preferredLanguages?: string[];
  subtitlePreference?: 'none' | 'same_language' | 'any';
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
// Video Platform Types
// ============================================

export type PlatformType = 'subscription' | 'freemium' | 'free' | 'purchase' | 'rental' | 'educational';

export interface Platform {
  id: string;
  name: string;
  slug: string; // e.g., 'youtube', 'netflix', 'coursera'
  type: PlatformType;
  logoUrl?: string;
  websiteUrl: string;
  description: string;
  // Pricing tiers (optional - for detailed pricing info)
  pricingTiers?: PlatformTier[];
  hasFreeTier?: boolean;
  hasPremiumTier?: boolean;
  supportsCreatorSubscriptions?: boolean; // e.g., YouTube memberships, Patreon integration
  supportsPerVideoPurchase?: boolean;
  // API integration info
  hasApi: boolean;
  apiDocsUrl?: string;
  apiCapabilities?: PlatformApiCapabilities;
  // Platform characteristics
  supportsSubtitles: boolean;
  supportedLanguages: string[];
  supportsDownload: boolean;
  supportsOffline: boolean;
  averageVideoQuality: 'sd' | 'hd' | '4k' | 'varies';
  // Metadata
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlatformTier {
  id: string;
  name: string; // e.g., 'Free', 'Premium', 'Family'
  price?: number;
  currency?: string;
  billingPeriod?: 'monthly' | 'yearly' | 'one_time';
  features: string[];
  hasAds: boolean;
  maxQuality: 'sd' | 'hd' | '4k';
  allowsDownload: boolean;
  allowsOffline: boolean;
}

export interface PlatformApiCapabilities {
  canFetchMetadata: boolean;
  canVerifyAccess: boolean;
  canGetPlaybackUrl: boolean;
  canSearchContent: boolean;
  canGetTranscripts: boolean;
  rateLimitPerHour?: number;
  authType?: 'oauth' | 'api_key' | 'none';
}

// ============================================
// Video Source Types
// ============================================

export interface VideoSource {
  id: string;
  videoId: string; // Reference to the Video/ContentItem
  platformId: string;
  url: string;
  // Platform-specific identifiers
  platformVideoId?: string; // e.g., YouTube video ID, Netflix title ID
  embedUrl?: string;
  // Access requirements (detailed access info)
  accessRequirements?: VideoAccessRequirement;
  // Simple pricing for backward compatibility
  price?: number;
  currency?: string;
  // Availability & quality info
  isAvailable: boolean;
  lastVerified?: Date;
  availableQualities: VideoQuality[];
  hasSubtitles: boolean;
  subtitleLanguages: string[];
  // Analyst notes about this specific source
  platformNotes: PlatformNote[];
  createdAt: Date;
  updatedAt: Date;
}

export type VideoAccessType = 'free' | 'free_with_ads' | 'subscription' | 'purchase' | 'rental' | 'creator_subscription' | 'course_enrollment';

export interface VideoAccessRequirement {
  accessType: VideoAccessType;
  // For subscription access
  requiredTier?: string; // Platform tier required (e.g., 'premium', 'family')
  // For purchase/rental
  price?: number;
  currency?: string;
  rentalDuration?: number; // In hours
  // For creator subscriptions (e.g., YouTube memberships, Patreon)
  creatorId?: string;
  creatorName?: string;
  creatorSubscriptionPrice?: number;
  creatorSubscriptionUrl?: string;
  // For course enrollment
  courseId?: string;
  courseName?: string;
  coursePrice?: number;
  // Free tier limitations
  freeWithLimitations?: string; // e.g., 'First 3 episodes free', 'Preview only'
  // Regional restrictions
  availableRegions?: string[]; // ISO country codes, empty = worldwide
  blockedRegions?: string[];
}

export type VideoQuality = '360p' | '480p' | '720p' | '1080p' | '4k' | 'unknown';

export interface PlatformNote {
  id: string;
  videoSourceId: string;
  analystId: string;
  noteType: 'quality' | 'content_difference' | 'subtitle' | 'availability' | 'recommendation' | 'warning';
  title: string;
  description: string;
  // Comparison details
  comparedToPlatformId?: string; // If comparing to another platform
  rating?: number; // 1-5 rating for this platform's version
  // Specific differences
  differences?: ContentDifference[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentDifference {
  type: 'duration' | 'quality' | 'subtitles' | 'audio' | 'content_cut' | 'bonus_content' | 'other';
  description: string;
  severity: 'minor' | 'moderate' | 'significant';
  timestamp?: number; // If difference is at a specific point in the video
}

// ============================================
// Request Types
// ============================================

export type RequestType = 'video_recommendation' | 'learning_path' | 'topic_research' | 'comparison' | 'custom';
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
// Video Content Types
// ============================================

export type VideoStatus = 'pending' | 'reviewed' | 'approved' | 'archived';
export type VideoCategory = 'tutorial' | 'lecture' | 'documentary' | 'course' | 'talk' | 'workshop' | 'review' | 'entertainment' | 'other';

export interface Video {
  id: string;
  analystId: string;
  title: string;
  description: string;
  category: VideoCategory;
  // Multi-platform sources
  sources: VideoSource[];
  primarySourceId?: string; // Recommended source
  // Content details
  duration: number; // In seconds
  language: string;
  hasTranscript: boolean;
  transcriptUrl?: string;
  // Creator info
  creator: VideoCreator;
  publishedDate?: Date;
  // Categorization
  tags: Tag[];
  topics: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'all_levels';
  targetAudience?: string[];
  prerequisites?: string[];
  // Quality & review
  status: VideoStatus;
  qualityScore?: number;
  expertRatings: VideoRating[];
  annotations: Annotation[];
  // Relationships
  relatedVideoIds: string[];
  seriesId?: string; // If part of a series
  seriesOrder?: number;
  // Metadata
  thumbnailUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
}

export interface VideoCreator {
  name: string;
  channelUrl?: string;
  platformChannelIds?: Record<string, string>; // platformId -> channelId
  verified?: boolean;
  expertise?: string[];
}

export interface VideoRating {
  id: string;
  videoId: string;
  expertId: string;
  overallRating: number; // 1-5
  contentAccuracy?: number; // 1-5
  productionQuality?: number; // 1-5
  explanationClarity?: number; // 1-5
  practicalValue?: number; // 1-5
  review?: string;
  recommendedFor?: string[]; // e.g., ['beginners', 'visual learners']
  notRecommendedFor?: string[];
  createdAt: Date;
}

export interface VideoSeries {
  id: string;
  title: string;
  description: string;
  creatorName: string;
  videoIds: string[];
  totalDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'progressive';
  isComplete: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Legacy alias for backwards compatibility
export type ContentStatus = VideoStatus;
export type ContentType = VideoCategory;
export type ContentItem = Video;

export interface ContentMetadata {
  author?: string;
  publishedDate?: Date;
  duration?: number;
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
