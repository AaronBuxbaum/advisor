import {
  User,
  UserProfile,
  Survey,
  Request,
  RequestResponse,
  KnowledgeBase,
  KnowledgeEntry,
  Video,
  VideoSource,
  VideoSeries,
  Platform,
  PlatformNote,
  Tag,
  Annotation,
  Project,
  Task,
  Comment,
  Notification,
  AISuggestion,
  ContentFeedback,
  ResearchRequest,
} from '@/types';

// ============================================
// Mock Data Store
// ============================================

// Users (including experts and analysts)
export const users: User[] = [
  {
    id: '1',
    email: 'user@example.com',
    name: 'John Doe',
    role: 'user',
    roles: ['user'],
    subscriptionStatus: 'active',
    platformSubscriptions: ['youtube', 'netflix', 'coursera'],
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: '2',
    email: 'expert@example.com',
    name: 'Dr. Jane Smith',
    role: 'expert',
    roles: ['expert'],
    subscriptionStatus: 'active',
    platformSubscriptions: ['youtube', 'vimeo', 'coursera', 'udemy', 'linkedin-learning'],
    bio: 'AI/ML researcher with 10 years of experience in education technology',
    expertise: ['AI', 'Machine Learning', 'Education', 'Data Science'],
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: '3',
    email: 'analyst@example.com',
    name: 'Mike Chen',
    role: 'analyst',
    roles: ['analyst'],
    subscriptionStatus: 'active',
    platformSubscriptions: ['youtube', 'vimeo', 'nebula', 'curiositystream'],
    bio: 'Content researcher specializing in technology and science education',
    expertise: ['Content Curation', 'EdTech', 'Research'],
    createdAt: new Date('2026-01-05'),
    updatedAt: new Date('2026-01-05'),
  },
  {
    id: '4',
    email: 'expert.analyst@example.com',
    name: 'Dr. Sarah Williams',
    role: 'expert',
    roles: ['expert', 'analyst'],
    subscriptionStatus: 'active',
    platformSubscriptions: ['youtube', 'coursera', 'edx', 'pluralsight'],
    bio: 'Senior researcher and content specialist in computer science education',
    expertise: ['Computer Science', 'Programming', 'Curriculum Design'],
    createdAt: new Date('2026-01-03'),
    updatedAt: new Date('2026-01-03'),
  },
  {
    id: '5',
    email: 'user2@example.com',
    name: 'Alice Johnson',
    role: 'user',
    roles: ['user'],
    subscriptionStatus: 'active',
    platformSubscriptions: ['youtube', 'udemy'],
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-10'),
  },
];

// Tags
export const tags: Tag[] = [
  { id: 't1', name: 'AI', category: 'Technology', color: '#3B82F6', usageCount: 45, createdAt: new Date('2026-01-01') },
  { id: 't2', name: 'Machine Learning', category: 'Technology', parentId: 't1', color: '#3B82F6', usageCount: 38, createdAt: new Date('2026-01-01') },
  { id: 't3', name: 'Deep Learning', category: 'Technology', parentId: 't2', color: '#3B82F6', usageCount: 22, createdAt: new Date('2026-01-01') },
  { id: 't4', name: 'Python', category: 'Programming', color: '#10B981', usageCount: 56, createdAt: new Date('2026-01-01') },
  { id: 't5', name: 'Beginner', category: 'Difficulty', color: '#F59E0B', usageCount: 89, createdAt: new Date('2026-01-01') },
  { id: 't6', name: 'Intermediate', category: 'Difficulty', color: '#F59E0B', usageCount: 67, createdAt: new Date('2026-01-01') },
  { id: 't7', name: 'Advanced', category: 'Difficulty', color: '#F59E0B', usageCount: 34, createdAt: new Date('2026-01-01') },
  { id: 't8', name: 'Tutorial', category: 'Content Type', color: '#8B5CF6', usageCount: 120, createdAt: new Date('2026-01-01') },
  { id: 't9', name: 'Data Science', category: 'Technology', color: '#3B82F6', usageCount: 41, createdAt: new Date('2026-01-01') },
  { id: 't10', name: 'Web Development', category: 'Technology', color: '#3B82F6', usageCount: 53, createdAt: new Date('2026-01-01') },
];

// Video Platforms
export const platforms: Platform[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    slug: 'youtube',
    type: 'freemium',
    logoUrl: 'https://www.youtube.com/favicon.ico',
    websiteUrl: 'https://www.youtube.com',
    description: 'Free video platform with ads. Premium subscription removes ads and enables downloads.',
    hasFreeTier: true,
    hasPremiumTier: true,
    supportsCreatorSubscriptions: true, // YouTube Channel Memberships
    supportsPerVideoPurchase: true, // YouTube Movies/Shows
    pricingTiers: [
      { id: 'yt-free', name: 'Free', features: ['Watch videos', 'Create playlists'], hasAds: true, maxQuality: '4k', allowsDownload: false, allowsOffline: false },
      { id: 'yt-premium', name: 'Premium', price: 13.99, currency: 'USD', billingPeriod: 'monthly', features: ['Ad-free', 'Background play', 'Downloads', 'YouTube Music'], hasAds: false, maxQuality: '4k', allowsDownload: true, allowsOffline: true },
    ],
    hasApi: true,
    apiDocsUrl: 'https://developers.google.com/youtube/v3',
    apiCapabilities: {
      canFetchMetadata: true,
      canVerifyAccess: false,
      canGetPlaybackUrl: false,
      canSearchContent: true,
      canGetTranscripts: true,
      rateLimitPerHour: 10000,
      authType: 'api_key',
    },
    supportsSubtitles: true,
    supportedLanguages: ['en', 'es', 'fr', 'de', 'ja', 'ko', 'pt', 'zh'],
    supportsDownload: false,
    supportsOffline: false,
    averageVideoQuality: '4k',
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'vimeo',
    name: 'Vimeo',
    slug: 'vimeo',
    type: 'free',
    logoUrl: 'https://vimeo.com/favicon.ico',
    websiteUrl: 'https://vimeo.com',
    description: 'Professional video platform popular with creators. Higher quality, fewer ads.',
    hasApi: true,
    apiDocsUrl: 'https://developer.vimeo.com',
    apiCapabilities: {
      canFetchMetadata: true,
      canVerifyAccess: true,
      canGetPlaybackUrl: true,
      canSearchContent: true,
      canGetTranscripts: false,
      rateLimitPerHour: 5000,
      authType: 'oauth',
    },
    supportsSubtitles: true,
    supportedLanguages: ['en', 'es', 'fr', 'de'],
    supportsDownload: true,
    supportsOffline: true,
    averageVideoQuality: '4k',
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'netflix',
    name: 'Netflix',
    slug: 'netflix',
    type: 'subscription',
    logoUrl: 'https://www.netflix.com/favicon.ico',
    websiteUrl: 'https://www.netflix.com',
    description: 'Subscription streaming service with documentaries and educational content.',
    hasApi: false,
    supportsSubtitles: true,
    supportedLanguages: ['en', 'es', 'fr', 'de', 'ja', 'ko', 'pt', 'zh', 'it'],
    supportsDownload: true,
    supportsOffline: true,
    averageVideoQuality: '4k',
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'coursera',
    name: 'Coursera',
    slug: 'coursera',
    type: 'educational',
    logoUrl: 'https://www.coursera.org/favicon.ico',
    websiteUrl: 'https://www.coursera.org',
    description: 'Online learning platform partnered with universities. Mix of free and paid courses.',
    hasApi: true,
    apiDocsUrl: 'https://build.coursera.org/developer',
    apiCapabilities: {
      canFetchMetadata: true,
      canVerifyAccess: true,
      canGetPlaybackUrl: false,
      canSearchContent: true,
      canGetTranscripts: true,
      rateLimitPerHour: 1000,
      authType: 'oauth',
    },
    supportsSubtitles: true,
    supportedLanguages: ['en', 'es', 'fr', 'de', 'zh', 'ar', 'ru'],
    supportsDownload: true,
    supportsOffline: true,
    averageVideoQuality: 'hd',
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'udemy',
    name: 'Udemy',
    slug: 'udemy',
    type: 'purchase',
    logoUrl: 'https://www.udemy.com/favicon.ico',
    websiteUrl: 'https://www.udemy.com',
    description: 'Marketplace for online courses. Individual course purchases with lifetime access.',
    hasApi: true,
    apiDocsUrl: 'https://www.udemy.com/developers/',
    apiCapabilities: {
      canFetchMetadata: true,
      canVerifyAccess: false,
      canGetPlaybackUrl: false,
      canSearchContent: true,
      canGetTranscripts: false,
      rateLimitPerHour: 500,
      authType: 'api_key',
    },
    supportsSubtitles: true,
    supportedLanguages: ['en', 'es', 'pt', 'de', 'fr', 'ja', 'ko', 'tr'],
    supportsDownload: true,
    supportsOffline: true,
    averageVideoQuality: 'hd',
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'nebula',
    name: 'Nebula',
    slug: 'nebula',
    type: 'subscription',
    logoUrl: 'https://nebula.tv/favicon.ico',
    websiteUrl: 'https://nebula.tv',
    description: 'Creator-owned streaming platform with educational content. Ad-free, exclusive content.',
    hasApi: false,
    supportsSubtitles: true,
    supportedLanguages: ['en'],
    supportsDownload: false,
    supportsOffline: false,
    averageVideoQuality: '4k',
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'curiositystream',
    name: 'CuriosityStream',
    slug: 'curiositystream',
    type: 'subscription',
    logoUrl: 'https://curiositystream.com/favicon.ico',
    websiteUrl: 'https://curiositystream.com',
    description: 'Documentary streaming service focused on science, nature, history, and technology.',
    hasApi: false,
    supportsSubtitles: true,
    supportedLanguages: ['en', 'es', 'de', 'fr'],
    supportsDownload: true,
    supportsOffline: true,
    averageVideoQuality: '4k',
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'linkedin-learning',
    name: 'LinkedIn Learning',
    slug: 'linkedin-learning',
    type: 'subscription',
    logoUrl: 'https://www.linkedin.com/favicon.ico',
    websiteUrl: 'https://www.linkedin.com/learning',
    description: 'Professional development courses. Often included with LinkedIn Premium.',
    hasApi: true,
    apiCapabilities: {
      canFetchMetadata: true,
      canVerifyAccess: true,
      canGetPlaybackUrl: false,
      canSearchContent: true,
      canGetTranscripts: true,
      rateLimitPerHour: 1000,
      authType: 'oauth',
    },
    supportsSubtitles: true,
    supportedLanguages: ['en', 'es', 'fr', 'de', 'ja', 'pt', 'zh'],
    supportsDownload: true,
    supportsOffline: true,
    averageVideoQuality: 'hd',
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'edx',
    name: 'edX',
    slug: 'edx',
    type: 'educational',
    logoUrl: 'https://www.edx.org/favicon.ico',
    websiteUrl: 'https://www.edx.org',
    description: 'University-level courses from MIT, Harvard, and other institutions.',
    hasApi: true,
    apiCapabilities: {
      canFetchMetadata: true,
      canVerifyAccess: true,
      canGetPlaybackUrl: false,
      canSearchContent: true,
      canGetTranscripts: true,
      rateLimitPerHour: 500,
      authType: 'oauth',
    },
    supportsSubtitles: true,
    supportedLanguages: ['en', 'es', 'fr', 'zh', 'ar'],
    supportsDownload: false,
    supportsOffline: false,
    averageVideoQuality: 'hd',
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'pluralsight',
    name: 'Pluralsight',
    slug: 'pluralsight',
    type: 'subscription',
    logoUrl: 'https://www.pluralsight.com/favicon.ico',
    websiteUrl: 'https://www.pluralsight.com',
    description: 'Technology skills platform for software developers and IT professionals.',
    hasApi: true,
    apiCapabilities: {
      canFetchMetadata: true,
      canVerifyAccess: true,
      canGetPlaybackUrl: false,
      canSearchContent: true,
      canGetTranscripts: true,
      rateLimitPerHour: 1000,
      authType: 'oauth',
    },
    supportsSubtitles: true,
    supportedLanguages: ['en'],
    supportsDownload: true,
    supportsOffline: true,
    averageVideoQuality: 'hd',
    isActive: true,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
];

// Surveys
export const surveys: Survey[] = [
  {
    id: '1',
    userId: '1',
    title: 'Interest Assessment',
    description: 'Help us understand your learning preferences',
    questions: [
      {
        id: 'q1',
        text: 'What topics are you most interested in?',
        type: 'multiple_choice',
        options: ['Technology', 'Business', 'Science', 'Arts', 'Health'],
        required: true,
      },
      {
        id: 'q2',
        text: 'How would you rate your current knowledge level?',
        type: 'rating',
        minValue: 1,
        maxValue: 5,
        required: true,
      },
      {
        id: 'q3',
        text: 'What are your learning goals?',
        type: 'text',
        required: true,
      },
      {
        id: 'q4',
        text: 'Preferred content format',
        type: 'checkbox',
        options: ['Video', 'Article', 'Interactive', 'Audio'],
      },
      {
        id: 'q5',
        text: 'How much time can you dedicate to learning per week?',
        type: 'scale',
        minValue: 1,
        maxValue: 20,
      },
    ],
    responses: {
      q1: 'Technology,Science',
      q2: '4',
      q3: 'I want to learn more about AI and machine learning',
      q4: 'Video,Interactive',
      q5: '10',
    },
    status: 'completed',
    createdAt: new Date('2026-01-15'),
    completedAt: new Date('2026-01-15'),
  },
  {
    id: '2',
    userId: '5',
    title: 'Interest Assessment',
    description: 'Help us understand your learning preferences',
    questions: [
      {
        id: 'q1',
        text: 'What topics are you most interested in?',
        type: 'multiple_choice',
        options: ['Technology', 'Business', 'Science', 'Arts', 'Health'],
        required: true,
      },
      {
        id: 'q2',
        text: 'How would you rate your current knowledge level?',
        type: 'rating',
        minValue: 1,
        maxValue: 5,
        required: true,
      },
    ],
    responses: {
      q1: 'Business,Technology',
      q2: '2',
    },
    status: 'completed',
    createdAt: new Date('2026-01-18'),
    completedAt: new Date('2026-01-18'),
  },
];

// Requests
export const requests: Request[] = [
  {
    id: '1',
    userId: '1',
    title: 'Curated AI/ML Videos',
    description: 'I need 10 curated videos about AI and machine learning for beginners',
    type: 'video_recommendation',
    criteria: ['AI', 'Machine Learning', 'Beginner-friendly', 'Recent (2025-2026)'],
    tags: ['AI', 'Machine Learning', 'Beginner'],
    status: 'completed',
    priority: 'normal',
    assignedExpertId: '2',
    response: {
      id: 'r1',
      expertId: '2',
      content: 'Based on your profile and interests, I have curated these 10 videos that will help you understand AI and machine learning fundamentals.',
      items: [
        {
          id: 'ci1',
          title: 'Introduction to Machine Learning',
          url: 'https://example.com/video1',
          description: 'A comprehensive introduction to ML concepts',
          reason: 'Perfect for beginners, covers fundamental concepts clearly',
          relevanceScore: 0.95,
          contentItemId: 'content1',
        },
        {
          id: 'ci2',
          title: 'Neural Networks Explained',
          url: 'https://example.com/video2',
          description: 'Visual explanation of how neural networks work',
          reason: 'Matches your interest in understanding AI basics',
          relevanceScore: 0.92,
          contentItemId: 'content2',
        },
      ],
      completedAt: new Date('2026-01-20'),
    },
    createdAt: new Date('2026-01-16'),
    updatedAt: new Date('2026-01-20'),
  },
  {
    id: '2',
    userId: '1',
    title: 'Python Learning Path',
    description: 'Looking for a structured learning path to master Python for data science',
    type: 'learning_path',
    criteria: ['Python', 'Data Science', 'Structured curriculum', 'Practical projects'],
    tags: ['Python', 'Data Science', 'Tutorial'],
    status: 'in_progress',
    priority: 'high',
    assignedExpertId: '4',
    createdAt: new Date('2026-01-25'),
    updatedAt: new Date('2026-01-26'),
  },
  {
    id: '3',
    userId: '5',
    title: 'Business Analytics Tools',
    description: 'Need recommendations for learning business analytics and visualization tools',
    type: 'topic_research',
    criteria: ['Business Analytics', 'Data Visualization', 'Excel', 'Tableau'],
    tags: ['Business', 'Analytics', 'Beginner'],
    status: 'pending',
    priority: 'normal',
    createdAt: new Date('2026-01-28'),
    updatedAt: new Date('2026-01-28'),
  },
];

// User Profiles
export const userProfiles: UserProfile[] = [
  {
    userId: '1',
    interests: ['Technology', 'Science', 'AI', 'Machine Learning', 'Python'],
    preferences: {
      learningStyle: 'visual',
      contentLength: 'medium',
      difficulty: 'beginner',
      preferredPlatforms: ['youtube', 'coursera'],
      preferredLanguages: ['en'],
      subtitlePreference: 'same_language',
      notificationSettings: {
        email: true,
        push: true,
        inApp: true,
        frequency: 'daily',
      },
    },
    surveyData: {
      '1': surveys[0].responses,
    },
    requestHistory: [
      {
        requestId: '1',
        title: 'Curated AI/ML Videos',
        type: 'video_recommendation',
        status: 'completed',
        createdAt: new Date('2026-01-16'),
        completedAt: new Date('2026-01-20'),
      },
      {
        requestId: '2',
        title: 'Python Learning Path',
        type: 'learning_path',
        status: 'in_progress',
        createdAt: new Date('2026-01-25'),
      },
    ],
    engagementScore: 85,
    lastActive: new Date('2026-01-30'),
  },
  {
    userId: '5',
    interests: ['Business', 'Technology', 'Analytics'],
    preferences: {
      learningStyle: 'reading',
      contentLength: 'short',
      difficulty: 'beginner',
      preferredPlatforms: ['youtube', 'udemy'],
      preferredLanguages: ['en'],
    },
    surveyData: {
      '2': surveys[1].responses,
    },
    requestHistory: [
      {
        requestId: '3',
        title: 'Business Analytics Tools',
        type: 'topic_research',
        status: 'pending',
        createdAt: new Date('2026-01-28'),
      },
    ],
    engagementScore: 45,
    lastActive: new Date('2026-01-28'),
  },
];

// Knowledge Bases
export const knowledgeBases: KnowledgeBase[] = [
  {
    id: 'kb1',
    ownerId: '2',
    title: 'AI/ML Learning Resources',
    description: 'Curated collection of AI and Machine Learning resources for various skill levels',
    isPublic: true,
    collaborators: ['4'],
    entries: [],
    tags: ['AI', 'Machine Learning', 'Education'],
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-25'),
  },
  {
    id: 'kb2',
    ownerId: '4',
    title: 'Programming Tutorials Collection',
    description: 'Best programming tutorials and learning paths',
    isPublic: true,
    collaborators: ['2'],
    entries: [],
    tags: ['Programming', 'Python', 'Web Development'],
    createdAt: new Date('2026-01-12'),
    updatedAt: new Date('2026-01-28'),
  },
];

// Knowledge Entries
export const knowledgeEntries: KnowledgeEntry[] = [
  {
    id: 'ke1',
    knowledgeBaseId: 'kb1',
    title: 'Beginner ML Video Curation Checklist',
    content: `## Checklist for Curating Beginner ML Videos

1. **Accessibility**
   - No prior ML knowledge required
   - Clear explanations of terminology
   - Good visual aids and diagrams

2. **Content Quality**
   - Recent publication (within 2 years)
   - Accurate information
   - Well-structured progression

3. **Engagement**
   - Good production quality
   - Interactive elements or exercises
   - Reasonable length (10-30 min ideal)

4. **User Fit Considerations**
   - Match learning style preferences
   - Consider content format preferences
   - Align with stated goals`,
    contentType: 'checklist',
    sourceContentIds: ['content1', 'content2'],
    tags: ['Beginner', 'ML', 'Video', 'Curation'],
    metadata: { version: 2, lastReviewed: new Date('2026-01-20') },
    createdBy: '2',
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-20'),
  },
  {
    id: 'ke2',
    knowledgeBaseId: 'kb1',
    title: 'Top ML Channels by Topic',
    content: `## Recommended ML Channels

### Fundamentals
- 3Blue1Brown - Neural network visualizations
- StatQuest - Statistics and ML basics

### Applied ML
- Sentdex - Python ML tutorials
- Two Minute Papers - Research summaries

### Deep Learning
- Yannic Kilcher - Paper reviews
- AI Coffee Break - Accessible explanations`,
    contentType: 'reference',
    tags: ['ML', 'YouTube', 'Resources'],
    metadata: {},
    createdBy: '2',
    createdAt: new Date('2026-01-12'),
    updatedAt: new Date('2026-01-12'),
  },
  {
    id: 'ke3',
    knowledgeBaseId: 'kb2',
    title: 'Python Learning Path Template',
    content: `## Python Learning Path for Data Science

### Phase 1: Basics (Weeks 1-4)
- Python syntax and data types
- Control flow and functions
- Basic OOP concepts

### Phase 2: Data Handling (Weeks 5-8)
- NumPy fundamentals
- Pandas for data manipulation
- Data cleaning techniques

### Phase 3: Visualization (Weeks 9-10)
- Matplotlib basics
- Seaborn for statistical viz
- Interactive plots with Plotly

### Phase 4: ML Intro (Weeks 11-12)
- Scikit-learn basics
- Simple models
- Model evaluation`,
    contentType: 'template',
    tags: ['Python', 'Data Science', 'Learning Path'],
    metadata: { estimatedWeeks: 12 },
    createdBy: '4',
    createdAt: new Date('2026-01-14'),
    updatedAt: new Date('2026-01-22'),
  },
];

// Update knowledge bases with entries
knowledgeBases[0].entries = knowledgeEntries.filter(e => e.knowledgeBaseId === 'kb1');
knowledgeBases[1].entries = knowledgeEntries.filter(e => e.knowledgeBaseId === 'kb2');

// Video Sources (per-platform URLs)
export const videoSources: VideoSource[] = [
  // 3Blue1Brown Neural Networks - available on YouTube and Nebula
  {
    id: 'vs1-yt',
    videoId: 'video1',
    platformId: 'youtube',
    url: 'https://www.youtube.com/watch?v=aircAruvnKk',
    platformVideoId: 'aircAruvnKk',
    embedUrl: 'https://www.youtube.com/embed/aircAruvnKk',
    isAvailable: true,
    lastVerified: new Date('2026-01-28'),
    availableQualities: ['360p', '480p', '720p', '1080p', '4k'],
    hasSubtitles: true,
    subtitleLanguages: ['en', 'es', 'fr', 'de', 'ja', 'ko', 'zh'],
    platformNotes: [],
    createdAt: new Date('2026-01-08'),
    updatedAt: new Date('2026-01-28'),
  },
  {
    id: 'vs1-nebula',
    videoId: 'video1',
    platformId: 'nebula',
    url: 'https://nebula.tv/videos/3blue1brown-neural-networks',
    isAvailable: true,
    lastVerified: new Date('2026-01-28'),
    availableQualities: ['720p', '1080p', '4k'],
    hasSubtitles: true,
    subtitleLanguages: ['en'],
    platformNotes: [],
    createdAt: new Date('2026-01-08'),
    updatedAt: new Date('2026-01-28'),
  },
  // StatQuest ML Fundamentals - YouTube only
  {
    id: 'vs2-yt',
    videoId: 'video2',
    platformId: 'youtube',
    url: 'https://www.youtube.com/watch?v=Gv9_4yMHFhI',
    platformVideoId: 'Gv9_4yMHFhI',
    embedUrl: 'https://www.youtube.com/embed/Gv9_4yMHFhI',
    isAvailable: true,
    lastVerified: new Date('2026-01-28'),
    availableQualities: ['360p', '480p', '720p', '1080p'],
    hasSubtitles: true,
    subtitleLanguages: ['en', 'es', 'pt'],
    platformNotes: [],
    createdAt: new Date('2026-01-09'),
    updatedAt: new Date('2026-01-28'),
  },
  // Andrew Ng's ML Course - Coursera and YouTube (partial)
  {
    id: 'vs3-coursera',
    videoId: 'video3',
    platformId: 'coursera',
    url: 'https://www.coursera.org/learn/machine-learning',
    isAvailable: true,
    lastVerified: new Date('2026-01-28'),
    availableQualities: ['720p', '1080p'],
    hasSubtitles: true,
    subtitleLanguages: ['en', 'es', 'fr', 'de', 'zh', 'ar', 'ru'],
    platformNotes: [],
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-28'),
  },
  {
    id: 'vs3-yt',
    videoId: 'video3',
    platformId: 'youtube',
    url: 'https://www.youtube.com/playlist?list=PLLssT5z_DsK-h9vYZkQkYNWcItqhlRJLN',
    isAvailable: true,
    lastVerified: new Date('2026-01-28'),
    availableQualities: ['360p', '480p', '720p'],
    hasSubtitles: true,
    subtitleLanguages: ['en'],
    platformNotes: [],
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-28'),
  },
  // Transformer documentary - Netflix and CuriosityStream
  {
    id: 'vs4-netflix',
    videoId: 'video4',
    platformId: 'netflix',
    url: 'https://www.netflix.com/title/81234567',
    platformVideoId: '81234567',
    isAvailable: true,
    lastVerified: new Date('2026-01-25'),
    availableQualities: ['720p', '1080p', '4k'],
    hasSubtitles: true,
    subtitleLanguages: ['en', 'es', 'fr', 'de', 'ja', 'ko', 'pt', 'zh'],
    platformNotes: [],
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-25'),
  },
  {
    id: 'vs4-curiosity',
    videoId: 'video4',
    platformId: 'curiositystream',
    url: 'https://curiositystream.com/video/ai-revolution',
    isAvailable: true,
    lastVerified: new Date('2026-01-25'),
    availableQualities: ['720p', '1080p', '4k'],
    hasSubtitles: true,
    subtitleLanguages: ['en', 'es', 'de'],
    platformNotes: [],
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-25'),
  },
  // Python Data Science course - Udemy and LinkedIn Learning
  {
    id: 'vs5-udemy',
    videoId: 'video5',
    platformId: 'udemy',
    url: 'https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/',
    isAvailable: true,
    lastVerified: new Date('2026-01-28'),
    availableQualities: ['720p', '1080p'],
    hasSubtitles: true,
    subtitleLanguages: ['en', 'es', 'pt', 'de'],
    price: 84.99,
    currency: 'USD',
    platformNotes: [],
    createdAt: new Date('2026-01-12'),
    updatedAt: new Date('2026-01-28'),
  },
  {
    id: 'vs5-linkedin',
    videoId: 'video5',
    platformId: 'linkedin-learning',
    url: 'https://www.linkedin.com/learning/python-for-data-science-essential-training',
    isAvailable: true,
    lastVerified: new Date('2026-01-28'),
    availableQualities: ['720p', '1080p'],
    hasSubtitles: true,
    subtitleLanguages: ['en', 'es', 'fr', 'de', 'ja', 'pt', 'zh'],
    platformNotes: [],
    createdAt: new Date('2026-01-12'),
    updatedAt: new Date('2026-01-28'),
  },
];

// Platform Notes (analyst observations about platform differences)
export const platformNotes: PlatformNote[] = [
  {
    id: 'pn1',
    videoSourceId: 'vs1-nebula',
    analystId: '3',
    noteType: 'quality',
    title: 'Ad-free experience on Nebula',
    description: 'Nebula version has no ads and includes extended creator commentary at the end.',
    comparedToPlatformId: 'youtube',
    rating: 5,
    differences: [
      {
        type: 'bonus_content',
        description: 'Includes 5-minute extended commentary from Grant Sanderson',
        severity: 'minor',
      },
    ],
    createdAt: new Date('2026-01-09'),
    updatedAt: new Date('2026-01-09'),
  },
  {
    id: 'pn2',
    videoSourceId: 'vs3-coursera',
    analystId: '3',
    noteType: 'recommendation',
    title: 'Coursera preferred for structured learning',
    description: 'Coursera version includes quizzes, assignments, and certificates. Better for users who want structured accountability.',
    comparedToPlatformId: 'youtube',
    rating: 5,
    differences: [
      {
        type: 'bonus_content',
        description: 'Includes graded assignments and peer reviews',
        severity: 'significant',
      },
      {
        type: 'bonus_content',
        description: 'Offers verified certificate upon completion',
        severity: 'moderate',
      },
    ],
    createdAt: new Date('2026-01-11'),
    updatedAt: new Date('2026-01-11'),
  },
  {
    id: 'pn3',
    videoSourceId: 'vs3-yt',
    analystId: '3',
    noteType: 'content_difference',
    title: 'YouTube version is older recording',
    description: 'The YouTube playlist is from the original 2012 Stanford course. Coursera has updated content from 2022.',
    comparedToPlatformId: 'coursera',
    rating: 3,
    differences: [
      {
        type: 'content_cut',
        description: 'Missing newer topics like transformers and modern deep learning',
        severity: 'significant',
      },
      {
        type: 'quality',
        description: 'Lower video quality (SD) compared to Coursera HD',
        severity: 'moderate',
      },
    ],
    createdAt: new Date('2026-01-11'),
    updatedAt: new Date('2026-01-11'),
  },
  {
    id: 'pn4',
    videoSourceId: 'vs4-curiosity',
    analystId: '4',
    noteType: 'subtitle',
    title: 'Fewer subtitle options',
    description: 'CuriosityStream has fewer subtitle languages than Netflix version.',
    comparedToPlatformId: 'netflix',
    rating: 4,
    differences: [
      {
        type: 'subtitles',
        description: 'Missing Japanese, Korean, Portuguese, and Chinese subtitles',
        severity: 'moderate',
      },
    ],
    createdAt: new Date('2026-01-16'),
    updatedAt: new Date('2026-01-16'),
  },
  {
    id: 'pn5',
    videoSourceId: 'vs5-udemy',
    analystId: '3',
    noteType: 'recommendation',
    title: 'Better value with frequent sales',
    description: 'Udemy courses go on sale frequently (often $15-20). Wait for a sale rather than paying full price.',
    rating: 4,
    createdAt: new Date('2026-01-13'),
    updatedAt: new Date('2026-01-13'),
  },
  {
    id: 'pn6',
    videoSourceId: 'vs5-linkedin',
    analystId: '4',
    noteType: 'content_difference',
    title: 'Different instructor and approach',
    description: 'LinkedIn Learning version has different instructor. More concise but less comprehensive than Udemy version.',
    comparedToPlatformId: 'udemy',
    rating: 4,
    differences: [
      {
        type: 'duration',
        description: 'LinkedIn version is ~10 hours vs Udemy ~25 hours',
        severity: 'significant',
      },
      {
        type: 'content_cut',
        description: 'Fewer hands-on projects and exercises',
        severity: 'moderate',
      },
    ],
    createdAt: new Date('2026-01-13'),
    updatedAt: new Date('2026-01-13'),
  },
];

// Update video sources with platform notes
videoSources[1].platformNotes = platformNotes.filter(pn => pn.videoSourceId === 'vs1-nebula');
videoSources[3].platformNotes = platformNotes.filter(pn => pn.videoSourceId === 'vs3-coursera');
videoSources[4].platformNotes = platformNotes.filter(pn => pn.videoSourceId === 'vs3-yt');
videoSources[6].platformNotes = platformNotes.filter(pn => pn.videoSourceId === 'vs4-curiosity');
videoSources[7].platformNotes = platformNotes.filter(pn => pn.videoSourceId === 'vs5-udemy');
videoSources[8].platformNotes = platformNotes.filter(pn => pn.videoSourceId === 'vs5-linkedin');

// Videos (Analyst-curated)
export const videos: Video[] = [
  {
    id: 'video1',
    analystId: '3',
    title: 'Neural Networks - 3Blue1Brown',
    description: 'Visual introduction to neural networks using excellent animations. Part of the deep learning series.',
    category: 'tutorial',
    sources: videoSources.filter(vs => vs.videoId === 'video1'),
    primarySourceId: 'vs1-yt',
    duration: 1200,
    language: 'en',
    hasTranscript: true,
    creator: {
      name: '3Blue1Brown (Grant Sanderson)',
      channelUrl: 'https://www.youtube.com/c/3blue1brown',
      platformChannelIds: { youtube: 'UCYO_jab_esuFRV4b17AJtAw', nebula: '3blue1brown' },
      verified: true,
      expertise: ['Mathematics', 'Visual Learning', 'Neural Networks'],
    },
    publishedDate: new Date('2025-06-15'),
    tags: [tags[0], tags[1], tags[4], tags[7]],
    topics: ['Neural Networks', 'Deep Learning', 'Machine Learning Basics'],
    difficulty: 'beginner',
    targetAudience: ['Visual learners', 'Math enthusiasts', 'ML beginners'],
    status: 'approved',
    qualityScore: 4.8,
    expertRatings: [
      {
        id: 'er1',
        videoId: 'video1',
        expertId: '2',
        overallRating: 5,
        contentAccuracy: 5,
        productionQuality: 5,
        explanationClarity: 5,
        practicalValue: 4,
        review: 'Best visual explanation of neural networks available. Perfect for visual learners.',
        recommendedFor: ['visual learners', 'beginners', 'math-curious'],
        createdAt: new Date('2026-01-10'),
      },
    ],
    annotations: [],
    relatedVideoIds: ['video2', 'video3'],
    thumbnailUrl: 'https://i.ytimg.com/vi/aircAruvnKk/maxresdefault.jpg',
    createdAt: new Date('2026-01-08'),
    updatedAt: new Date('2026-01-10'),
    reviewedAt: new Date('2026-01-10'),
    reviewedBy: '2',
  },
  {
    id: 'video2',
    analystId: '3',
    title: 'Machine Learning Fundamentals - StatQuest',
    description: 'Clear statistical explanations of ML concepts with humor. Great for building intuition.',
    category: 'tutorial',
    sources: videoSources.filter(vs => vs.videoId === 'video2'),
    primarySourceId: 'vs2-yt',
    duration: 900,
    language: 'en',
    hasTranscript: true,
    creator: {
      name: 'StatQuest (Josh Starmer)',
      channelUrl: 'https://www.youtube.com/c/joshstarmer',
      platformChannelIds: { youtube: 'UCtYLUTtgS3k1Fg4y5tAhLbw' },
      verified: true,
      expertise: ['Statistics', 'Machine Learning', 'Biostatistics'],
    },
    publishedDate: new Date('2025-08-20'),
    tags: [tags[1], tags[4], tags[7]],
    topics: ['Machine Learning', 'Statistics', 'Fundamentals'],
    difficulty: 'beginner',
    targetAudience: ['Statistics learners', 'ML beginners'],
    status: 'approved',
    qualityScore: 4.9,
    expertRatings: [
      {
        id: 'er2',
        videoId: 'video2',
        expertId: '2',
        overallRating: 5,
        contentAccuracy: 5,
        productionQuality: 4,
        explanationClarity: 5,
        practicalValue: 5,
        review: 'Josh makes statistics fun and accessible. Essential for anyone learning ML.',
        recommendedFor: ['statistics beginners', 'anyone intimidated by math'],
        notRecommendedFor: ['those seeking advanced theory'],
        createdAt: new Date('2026-01-11'),
      },
    ],
    annotations: [],
    relatedVideoIds: ['video1'],
    createdAt: new Date('2026-01-09'),
    updatedAt: new Date('2026-01-11'),
    reviewedAt: new Date('2026-01-11'),
    reviewedBy: '2',
  },
  {
    id: 'video3',
    analystId: '3',
    title: 'Machine Learning Course - Andrew Ng',
    description: 'The classic introductory ML course from Stanford. Comprehensive coverage of ML fundamentals.',
    category: 'course',
    sources: videoSources.filter(vs => vs.videoId === 'video3'),
    primarySourceId: 'vs3-coursera',
    duration: 60 * 60 * 60, // ~60 hours
    language: 'en',
    hasTranscript: true,
    creator: {
      name: 'Andrew Ng',
      channelUrl: 'https://www.coursera.org/instructor/andrewng',
      platformChannelIds: { coursera: 'andrewng', youtube: 'UCcIXc5mJsHVYTZR1maL5l9w' },
      verified: true,
      expertise: ['Machine Learning', 'Deep Learning', 'AI Research'],
    },
    publishedDate: new Date('2022-06-01'),
    tags: [tags[1], tags[4], tags[7]],
    topics: ['Machine Learning', 'Supervised Learning', 'Unsupervised Learning', 'Neural Networks'],
    difficulty: 'beginner',
    targetAudience: ['Career changers', 'CS students', 'Self-learners'],
    prerequisites: ['Basic programming', 'High school math'],
    status: 'approved',
    qualityScore: 5.0,
    expertRatings: [
      {
        id: 'er3',
        videoId: 'video3',
        expertId: '4',
        overallRating: 5,
        contentAccuracy: 5,
        productionQuality: 5,
        explanationClarity: 5,
        practicalValue: 5,
        review: 'The gold standard for ML education. Transformed the industry.',
        recommendedFor: ['serious learners', 'career changers', 'anyone wanting certificates'],
        createdAt: new Date('2026-01-12'),
      },
    ],
    annotations: [],
    relatedVideoIds: ['video1', 'video2', 'video5'],
    thumbnailUrl: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/coursera-course-photos/ml.jpg',
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-12'),
    reviewedAt: new Date('2026-01-12'),
    reviewedBy: '4',
  },
  {
    id: 'video4',
    analystId: '4',
    title: 'The AI Revolution: From Theory to Practice',
    description: 'Documentary exploring the history and future of artificial intelligence.',
    category: 'documentary',
    sources: videoSources.filter(vs => vs.videoId === 'video4'),
    primarySourceId: 'vs4-netflix',
    duration: 90 * 60, // 90 minutes
    language: 'en',
    hasTranscript: true,
    creator: {
      name: 'Tech Documentaries Inc.',
      verified: false,
    },
    publishedDate: new Date('2025-09-15'),
    tags: [tags[0], tags[2], tags[6]],
    topics: ['AI History', 'Deep Learning', 'AI Ethics', 'Future of AI'],
    difficulty: 'all_levels',
    targetAudience: ['General audience', 'Tech enthusiasts', 'Business leaders'],
    status: 'approved',
    qualityScore: 4.5,
    expertRatings: [
      {
        id: 'er4',
        videoId: 'video4',
        expertId: '2',
        overallRating: 4,
        contentAccuracy: 4,
        productionQuality: 5,
        explanationClarity: 5,
        practicalValue: 3,
        review: 'Excellent production value and accessible to non-technical audiences. Some oversimplifications.',
        recommendedFor: ['general audience', 'executives', 'those new to AI'],
        notRecommendedFor: ['those seeking technical depth'],
        createdAt: new Date('2026-01-16'),
      },
    ],
    annotations: [],
    relatedVideoIds: [],
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-16'),
    reviewedAt: new Date('2026-01-16'),
    reviewedBy: '2',
  },
  {
    id: 'video5',
    analystId: '3',
    title: 'Python for Data Science Bootcamp',
    description: 'Comprehensive course covering Python programming for data science applications.',
    category: 'course',
    sources: videoSources.filter(vs => vs.videoId === 'video5'),
    primarySourceId: 'vs5-udemy',
    duration: 25 * 60 * 60, // ~25 hours
    language: 'en',
    hasTranscript: true,
    creator: {
      name: 'Jose Portilla',
      channelUrl: 'https://www.udemy.com/user/joseportilla/',
      platformChannelIds: { udemy: 'joseportilla' },
      verified: true,
      expertise: ['Python', 'Data Science', 'Machine Learning'],
    },
    publishedDate: new Date('2025-03-10'),
    tags: [tags[3], tags[8], tags[5]],
    topics: ['Python', 'Data Science', 'Pandas', 'NumPy', 'Matplotlib', 'Machine Learning'],
    difficulty: 'beginner',
    targetAudience: ['Career changers', 'Analysts', 'Self-learners'],
    prerequisites: ['None - starts from basics'],
    status: 'approved',
    qualityScore: 4.6,
    expertRatings: [
      {
        id: 'er5',
        videoId: 'video5',
        expertId: '4',
        overallRating: 5,
        contentAccuracy: 5,
        productionQuality: 4,
        explanationClarity: 5,
        practicalValue: 5,
        review: 'Excellent comprehensive course. Best value for money on Udemy during sales.',
        recommendedFor: ['complete beginners', 'career changers'],
        createdAt: new Date('2026-01-14'),
      },
    ],
    annotations: [],
    relatedVideoIds: ['video3'],
    createdAt: new Date('2026-01-12'),
    updatedAt: new Date('2026-01-14'),
    reviewedAt: new Date('2026-01-14'),
    reviewedBy: '4',
  },
];

// Legacy alias for backwards compatibility
export const contentItems = videos;

// Annotations on content
export const annotations: Annotation[] = [
  {
    id: 'ann1',
    contentItemId: 'content1',
    authorId: '3',
    type: 'insight',
    text: 'This video is particularly effective for visual learners. The animations make abstract concepts tangible.',
    tags: ['visual-learning', 'recommendation'],
    reactions: [{ userId: '2', type: 'helpful', createdAt: new Date('2026-01-10') }],
    replies: [
      {
        id: 'reply1',
        authorId: '2',
        text: 'Agreed - I\'ve recommended this to 5+ users with visual learning preferences.',
        createdAt: new Date('2026-01-11'),
      },
    ],
    createdAt: new Date('2026-01-09'),
    updatedAt: new Date('2026-01-11'),
  },
  {
    id: 'ann2',
    contentItemId: 'content1',
    authorId: '2',
    type: 'note',
    text: 'Best paired with StatQuest videos for statistical foundations.',
    position: { timestamp: 300 },
    tags: ['pairing-suggestion'],
    reactions: [],
    replies: [],
    createdAt: new Date('2026-01-12'),
    updatedAt: new Date('2026-01-12'),
  },
  {
    id: 'ann3',
    contentItemId: 'content4',
    authorId: '2',
    type: 'warning',
    text: 'This paper requires strong linear algebra background. Not suitable for beginners.',
    tags: ['prerequisites', 'advanced'],
    reactions: [{ userId: '4', type: 'agree', createdAt: new Date('2026-01-07') }],
    replies: [],
    createdAt: new Date('2026-01-06'),
    updatedAt: new Date('2026-01-06'),
  },
];

// Update content items with annotations
contentItems[0].annotations = annotations.filter(a => a.contentItemId === 'content1');
contentItems[3].annotations = annotations.filter(a => a.contentItemId === 'content4');

// Projects (Collaboration)
export const projects: Project[] = [
  {
    id: 'proj1',
    title: 'Comprehensive Python Data Science Path',
    description: 'Collaborative project to create the ultimate Python for Data Science learning path',
    status: 'active',
    requestId: '2',
    ownerId: '4',
    members: [
      { userId: '4', role: 'owner', joinedAt: new Date('2026-01-26'), permissions: ['all'] },
      { userId: '2', role: 'contributor', joinedAt: new Date('2026-01-26'), permissions: ['read', 'write', 'comment'] },
      { userId: '3', role: 'contributor', joinedAt: new Date('2026-01-27'), permissions: ['read', 'comment'] },
    ],
    tasks: [],
    comments: [],
    sharedResources: [
      {
        id: 'sr1',
        type: 'content_item',
        title: 'Real Python Data Science Guide',
        contentItemId: 'content3',
        uploadedBy: '4',
        createdAt: new Date('2026-01-26'),
      },
    ],
    createdAt: new Date('2026-01-26'),
    updatedAt: new Date('2026-01-28'),
    dueDate: new Date('2026-02-10'),
  },
];

// Tasks
export const tasks: Task[] = [
  {
    id: 'task1',
    projectId: 'proj1',
    title: 'Gather beginner Python resources',
    description: 'Collect and evaluate beginner-friendly Python tutorials and courses',
    status: 'done',
    assigneeId: '3',
    priority: 'high',
    completedAt: new Date('2026-01-27'),
    createdAt: new Date('2026-01-26'),
    updatedAt: new Date('2026-01-27'),
  },
  {
    id: 'task2',
    projectId: 'proj1',
    title: 'Create curriculum outline',
    description: 'Design the week-by-week learning progression',
    status: 'in_progress',
    assigneeId: '4',
    priority: 'high',
    dueDate: new Date('2026-02-01'),
    createdAt: new Date('2026-01-26'),
    updatedAt: new Date('2026-01-28'),
  },
  {
    id: 'task3',
    projectId: 'proj1',
    title: 'Review and add practice exercises',
    description: 'Find hands-on projects and exercises for each phase',
    status: 'todo',
    assigneeId: '2',
    priority: 'normal',
    dueDate: new Date('2026-02-05'),
    createdAt: new Date('2026-01-26'),
    updatedAt: new Date('2026-01-26'),
  },
];

// Update project with tasks
projects[0].tasks = tasks;

// Comments
export const comments: Comment[] = [
  {
    id: 'com1',
    authorId: '2',
    entityType: 'project',
    entityId: 'proj1',
    text: 'I think we should include some interactive coding platforms like Codecademy or DataCamp in Phase 1.',
    mentions: ['4'],
    reactions: [{ userId: '4', type: 'like', createdAt: new Date('2026-01-27') }],
    createdAt: new Date('2026-01-27'),
    updatedAt: new Date('2026-01-27'),
  },
  {
    id: 'com2',
    authorId: '4',
    parentId: 'com1',
    entityType: 'project',
    entityId: 'proj1',
    text: 'Good idea! I\'ll add a section for interactive resources. @Mike can you research the best options?',
    mentions: ['3'],
    reactions: [],
    createdAt: new Date('2026-01-27'),
    updatedAt: new Date('2026-01-27'),
  },
  {
    id: 'com3',
    authorId: '3',
    parentId: 'com2',
    entityType: 'project',
    entityId: 'proj1',
    text: 'On it! I\'ll have a comparison ready by tomorrow.',
    mentions: [],
    reactions: [{ userId: '2', type: 'helpful', createdAt: new Date('2026-01-28') }],
    createdAt: new Date('2026-01-27'),
    updatedAt: new Date('2026-01-27'),
  },
];

// Update project with comments
projects[0].comments = comments;

// Notifications
export const notifications: Notification[] = [
  {
    id: 'notif1',
    userId: '2',
    type: 'request_assigned',
    title: 'New Request Assigned',
    message: 'You have been assigned a new request: "Curated AI/ML Videos"',
    link: '/expert/requests/1',
    entityType: 'request',
    entityId: '1',
    isRead: true,
    createdAt: new Date('2026-01-16'),
  },
  {
    id: 'notif2',
    userId: '4',
    type: 'collaboration_invite',
    title: 'Collaboration Invitation',
    message: 'Dr. Jane Smith invited you to collaborate on "Comprehensive Python Data Science Path"',
    link: '/projects/proj1',
    entityType: 'project',
    entityId: 'proj1',
    isRead: true,
    createdAt: new Date('2026-01-26'),
  },
  {
    id: 'notif3',
    userId: '3',
    type: 'task_assigned',
    title: 'New Task Assigned',
    message: 'You have been assigned: "Gather beginner Python resources"',
    link: '/projects/proj1/tasks/task1',
    entityType: 'task',
    entityId: 'task1',
    isRead: true,
    createdAt: new Date('2026-01-26'),
  },
  {
    id: 'notif4',
    userId: '3',
    type: 'comment_mention',
    title: 'You were mentioned',
    message: 'Dr. Sarah Williams mentioned you in a comment on "Comprehensive Python Data Science Path"',
    link: '/projects/proj1#com2',
    entityType: 'comment',
    entityId: 'com2',
    isRead: false,
    createdAt: new Date('2026-01-27'),
  },
  {
    id: 'notif5',
    userId: '1',
    type: 'request_completed',
    title: 'Request Completed',
    message: 'Your request "Curated AI/ML Videos" has been completed by Dr. Jane Smith',
    link: '/dashboard/requests/1',
    entityType: 'request',
    entityId: '1',
    isRead: true,
    createdAt: new Date('2026-01-20'),
  },
  {
    id: 'notif6',
    userId: '2',
    type: 'ai_suggestion',
    title: 'AI Pattern Detected',
    message: '3 users this week requested beginner ML content. Consider updating your ML knowledge base.',
    link: '/expert/knowledge/kb1',
    isRead: false,
    createdAt: new Date('2026-01-29'),
  },
];

// AI Suggestions
export const aiSuggestions: AISuggestion[] = [
  {
    id: 'ai1',
    type: 'content_match',
    targetEntityType: 'request',
    targetEntityId: '2',
    suggestion: 'Based on user profile, consider including "Real Python: Data Science with Python" in response',
    confidence: 0.89,
    reasoning: 'User prefers articles and has intermediate goals in data science',
    createdAt: new Date('2026-01-26'),
  },
  {
    id: 'ai2',
    type: 'question_refinement',
    targetEntityType: 'request',
    targetEntityId: '3',
    suggestion: 'User may benefit from specifying: preferred tool complexity, team vs individual use, budget constraints',
    confidence: 0.78,
    reasoning: 'Request criteria are broad; more specificity would improve curation quality',
    createdAt: new Date('2026-01-28'),
  },
  {
    id: 'ai3',
    type: 'research_priority',
    targetEntityType: 'analyst',
    targetEntityId: '3',
    suggestion: 'Consider researching: Business Analytics beginner tutorials - 2 pending requests in this area',
    confidence: 0.85,
    reasoning: 'Gap detected in content library for business analytics beginner resources',
    createdAt: new Date('2026-01-28'),
  },
  {
    id: 'ai4',
    type: 'tag_suggestion',
    targetEntityType: 'content_item',
    targetEntityId: 'content5',
    suggestion: 'Suggested tags: "structured-learning", "certification-available", "time-intensive"',
    confidence: 0.92,
    reasoning: 'Content metadata indicates course format with certificate; duration suggests significant time commitment',
    createdAt: new Date('2026-01-20'),
  },
];

// Content Feedback (Expert → Analyst)
export const contentFeedback: ContentFeedback[] = [
  {
    id: 'fb1',
    contentItemId: 'content3',
    expertId: '4',
    feedbackType: 'quality',
    message: 'This article is excellent but could use more recent 2026 updates. Some library versions are outdated.',
    priority: 'normal',
    status: 'acknowledged',
    response: 'Will look for updated version or alternatives. Thanks for the feedback!',
    respondedBy: '3',
    respondedAt: new Date('2026-01-15'),
    createdAt: new Date('2026-01-14'),
  },
  {
    id: 'fb2',
    contentItemId: 'content1',
    expertId: '2',
    feedbackType: 'gap',
    message: 'We need more content bridging this visual intro to hands-on coding. Users often struggle with the transition.',
    priority: 'high',
    status: 'open',
    createdAt: new Date('2026-01-22'),
  },
];

// Research Requests (Expert → Analyst)
export const researchRequests: ResearchRequest[] = [
  {
    id: 'rr1',
    requesterId: '2',
    requesterRole: 'expert',
    title: 'Interactive ML Playgrounds',
    description: 'Looking for interactive web-based tools where users can experiment with ML models without coding. Ideal for visual learners starting their ML journey.',
    targetAreas: ['Machine Learning', 'Interactive Tools', 'Beginner Education'],
    priority: 'high',
    status: 'in_progress',
    assignedTo: '3',
    createdAt: new Date('2026-01-25'),
    updatedAt: new Date('2026-01-26'),
  },
  {
    id: 'rr2',
    requesterId: '4',
    requesterRole: 'expert',
    title: 'Python IDE Recommendations for Beginners',
    description: 'Need to compare beginner-friendly Python development environments. Should cover VS Code, PyCharm, Jupyter, and cloud options.',
    targetAreas: ['Python', 'Development Tools', 'Beginner'],
    priority: 'normal',
    status: 'open',
    createdAt: new Date('2026-01-28'),
    updatedAt: new Date('2026-01-28'),
  },
];

// ============================================
// Helper Functions
// ============================================

// User functions
export function getUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}

export function getUserByEmail(email: string): User | undefined {
  return users.find(user => user.email === email);
}

export function getUsersByRole(role: string): User[] {
  return users.filter(user => user.roles.includes(role as any));
}

// Request functions
export function getRequestsByUserId(userId: string): Request[] {
  return requests.filter(request => request.userId === userId);
}

export function getRequestsByExpertId(expertId: string): Request[] {
  return requests.filter(request => request.assignedExpertId === expertId);
}

export function getPendingRequests(): Request[] {
  return requests.filter(r => r.status === 'pending' && !r.assignedExpertId);
}

export function createRequest(request: Omit<Request, 'id' | 'createdAt' | 'updatedAt'>): Request {
  const newRequest: Request = {
    ...request,
    id: String(requests.length + 1),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  requests.push(newRequest);
  return newRequest;
}

// Profile functions
export function getUserProfile(userId: string): UserProfile | undefined {
  return userProfiles.find(profile => profile.userId === userId);
}

export function getSurveysByUserId(userId: string): Survey[] {
  return surveys.filter(survey => survey.userId === userId);
}

// Knowledge base functions
export function getKnowledgeBasesByOwnerId(ownerId: string): KnowledgeBase[] {
  return knowledgeBases.filter(kb => kb.ownerId === ownerId || kb.collaborators.includes(ownerId));
}

export function getKnowledgeBaseById(id: string): KnowledgeBase | undefined {
  return knowledgeBases.find(kb => kb.id === id);
}

export function searchKnowledgeEntries(query: string, tags?: string[]): KnowledgeEntry[] {
  return knowledgeEntries.filter(entry => {
    const matchesQuery = !query ||
      entry.title.toLowerCase().includes(query.toLowerCase()) ||
      entry.content.toLowerCase().includes(query.toLowerCase());
    const matchesTags = !tags || tags.length === 0 ||
      tags.some(tag => entry.tags.includes(tag));
    return matchesQuery && matchesTags;
  });
}

// Content functions (using Video type)
export function getContentItems(filters?: { status?: string; category?: string; analystId?: string }): Video[] {
  return videos.filter(item => {
    if (filters?.status && item.status !== filters.status) return false;
    if (filters?.category && item.category !== filters.category) return false;
    if (filters?.analystId && item.analystId !== filters.analystId) return false;
    return true;
  });
}

export function getContentItemById(id: string): Video | undefined {
  return videos.find(item => item.id === id);
}

export function searchContentItems(query: string, tags?: string[]): Video[] {
  return videos.filter(item => {
    const matchesQuery = !query ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase());
    const matchesTags = !tags || tags.length === 0 ||
      item.tags.some(tag => tags.includes(tag.name));
    return matchesQuery && matchesTags;
  });
}

// Project functions
export function getProjectsByUserId(userId: string): Project[] {
  return projects.filter(p =>
    p.ownerId === userId || p.members.some(m => m.userId === userId)
  );
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

// Notification functions
export function getNotificationsByUserId(userId: string): Notification[] {
  return notifications.filter(n => n.userId === userId);
}

export function getUnreadNotificationCount(userId: string): number {
  return notifications.filter(n => n.userId === userId && !n.isRead).length;
}

export function markNotificationAsRead(notificationId: string): void {
  const notification = notifications.find(n => n.id === notificationId);
  if (notification) {
    notification.isRead = true;
  }
}

// AI Suggestion functions
export function getAISuggestionsForEntity(entityType: string, entityId: string): AISuggestion[] {
  return aiSuggestions.filter(s =>
    s.targetEntityType === entityType && s.targetEntityId === entityId
  );
}

export function getAISuggestionsByType(type: string): AISuggestion[] {
  return aiSuggestions.filter(s => s.type === type);
}

// Feedback functions
export function getContentFeedback(contentItemId?: string): ContentFeedback[] {
  if (contentItemId) {
    return contentFeedback.filter(f => f.contentItemId === contentItemId);
  }
  return contentFeedback;
}

export function getResearchRequests(status?: string): ResearchRequest[] {
  if (status) {
    return researchRequests.filter(r => r.status === status);
  }
  return researchRequests;
}

// Tag functions
export function getAllTags(): Tag[] {
  return tags;
}

export function getTagsByCategory(category: string): Tag[] {
  return tags.filter(t => t.category === category);
}

// Comment functions
export function getCommentsByEntity(entityType: string, entityId: string): Comment[] {
  return comments.filter(c => c.entityType === entityType && c.entityId === entityId);
}

// Analytics helpers
export function getExpertStats(expertId: string) {
  const expertRequests = getRequestsByExpertId(expertId);
  return {
    totalAssignments: expertRequests.length,
    completed: expertRequests.filter(r => r.status === 'completed').length,
    inProgress: expertRequests.filter(r => r.status === 'in_progress').length,
    averageRating: 4.5, // Mock value
  };
}

export function getAnalystStats(analystId: string) {
  const analystContent = getContentItems({ analystId });
  return {
    totalContent: analystContent.length,
    approved: analystContent.filter(c => c.status === 'approved').length,
    pending: analystContent.filter(c => c.status === 'pending').length,
    averageQuality: analystContent.reduce((sum, c) => sum + (c.qualityScore || 0), 0) / analystContent.length || 0,
  };
}

// ============================================
// Platform Functions
// ============================================

export function getAllPlatforms(): Platform[] {
  return platforms;
}

export function getPlatformById(id: string): Platform | undefined {
  return platforms.find(p => p.id === id);
}

export function getPlatformBySlug(slug: string): Platform | undefined {
  return platforms.find(p => p.slug === slug);
}

export function getPlatformsByType(type: string): Platform[] {
  return platforms.filter(p => p.type === type);
}

export function getPlatformsWithApi(): Platform[] {
  return platforms.filter(p => p.hasApi);
}

export function getUserPlatforms(userId: string): Platform[] {
  const user = getUserById(userId);
  if (!user) return [];
  return platforms.filter(p => user.platformSubscriptions.includes(p.id));
}

// ============================================
// Video Functions
// ============================================

export function getAllVideos(): Video[] {
  return videos;
}

export function getVideoById(id: string): Video | undefined {
  return videos.find(v => v.id === id);
}

export function getVideosByCategory(category: string): Video[] {
  return videos.filter(v => v.category === category);
}

export function getVideosByDifficulty(difficulty: string): Video[] {
  return videos.filter(v => v.difficulty === difficulty);
}

export function getVideosForUser(userId: string): Video[] {
  const userPlatformIds = getUserById(userId)?.platformSubscriptions || [];
  return videos.filter(v =>
    v.sources.some(s => userPlatformIds.includes(s.platformId) && s.isAvailable)
  );
}

export function getVideoSourcesForUser(videoId: string, userId: string): VideoSource[] {
  const video = getVideoById(videoId);
  if (!video) return [];

  const userPlatformIds = getUserById(userId)?.platformSubscriptions || [];
  return video.sources.filter(s =>
    userPlatformIds.includes(s.platformId) && s.isAvailable
  );
}

export function getVideoSourceById(id: string): VideoSource | undefined {
  return videoSources.find(vs => vs.id === id);
}

export function getVideoSourcesByVideoId(videoId: string): VideoSource[] {
  return videoSources.filter(vs => vs.videoId === videoId);
}

export function getPlatformNotesForSource(videoSourceId: string): PlatformNote[] {
  return platformNotes.filter(pn => pn.videoSourceId === videoSourceId);
}

export function getRecommendedSourceForUser(videoId: string, userId: string): VideoSource | undefined {
  const availableSources = getVideoSourcesForUser(videoId, userId);
  if (availableSources.length === 0) return undefined;

  // Prefer the primary source if available to user
  const video = getVideoById(videoId);
  if (video?.primarySourceId) {
    const primary = availableSources.find(s => s.id === video.primarySourceId);
    if (primary) return primary;
  }

  // Otherwise return the first available source
  return availableSources[0];
}

export function checkVideoAvailabilityForUser(videoId: string, userId: string): {
  available: boolean;
  sources: VideoSource[];
  unavailablePlatforms: Platform[];
} {
  const video = getVideoById(videoId);
  if (!video) return { available: false, sources: [], unavailablePlatforms: [] };

  const userPlatformIds = getUserById(userId)?.platformSubscriptions || [];
  const availableSources = video.sources.filter(s =>
    userPlatformIds.includes(s.platformId) && s.isAvailable
  );

  const unavailablePlatformIds = video.sources
    .filter(s => !userPlatformIds.includes(s.platformId))
    .map(s => s.platformId);

  const unavailablePlatforms = platforms.filter(p =>
    unavailablePlatformIds.includes(p.id)
  );

  return {
    available: availableSources.length > 0,
    sources: availableSources,
    unavailablePlatforms,
  };
}
