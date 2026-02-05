import {
  User,
  UserProfile,
  Survey,
  Request,
  RequestResponse,
  KnowledgeBase,
  KnowledgeEntry,
  ContentItem,
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
    type: 'video_curation',
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
    type: 'advice',
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
    type: 'article_curation',
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
      preferredFormats: ['Video', 'Interactive'],
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
        type: 'video_curation',
        status: 'completed',
        createdAt: new Date('2026-01-16'),
        completedAt: new Date('2026-01-20'),
      },
      {
        requestId: '2',
        title: 'Python Learning Path',
        type: 'advice',
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
      preferredFormats: ['Article'],
    },
    surveyData: {
      '2': surveys[1].responses,
    },
    requestHistory: [
      {
        requestId: '3',
        title: 'Business Analytics Tools',
        type: 'article_curation',
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

// Content Items (Analyst-curated)
export const contentItems: ContentItem[] = [
  {
    id: 'content1',
    analystId: '3',
    url: 'https://youtube.com/watch?v=example1',
    title: '3Blue1Brown: Neural Networks',
    description: 'Visual introduction to neural networks using excellent animations',
    contentType: 'video',
    source: 'YouTube',
    tags: [tags[0], tags[1], tags[4], tags[7]],
    annotations: [],
    status: 'approved',
    qualityScore: 4.8,
    relevanceAreas: ['AI', 'Machine Learning', 'Beginner Education'],
    metadata: {
      author: '3Blue1Brown',
      publishedDate: new Date('2025-06-15'),
      duration: 1200,
      difficulty: 'beginner',
      language: 'English',
      thumbnail: 'https://example.com/thumb1.jpg',
    },
    createdAt: new Date('2026-01-08'),
    updatedAt: new Date('2026-01-10'),
    reviewedAt: new Date('2026-01-10'),
    reviewedBy: '2',
  },
  {
    id: 'content2',
    analystId: '3',
    url: 'https://youtube.com/watch?v=example2',
    title: 'StatQuest: Machine Learning Fundamentals',
    description: 'Clear statistical explanations of ML concepts with humor',
    contentType: 'video',
    source: 'YouTube',
    tags: [tags[1], tags[4], tags[7]],
    annotations: [],
    status: 'approved',
    qualityScore: 4.9,
    relevanceAreas: ['Machine Learning', 'Statistics', 'Beginner Education'],
    metadata: {
      author: 'StatQuest',
      publishedDate: new Date('2025-08-20'),
      duration: 900,
      difficulty: 'beginner',
      language: 'English',
    },
    createdAt: new Date('2026-01-09'),
    updatedAt: new Date('2026-01-11'),
    reviewedAt: new Date('2026-01-11'),
    reviewedBy: '2',
  },
  {
    id: 'content3',
    analystId: '3',
    url: 'https://realpython.com/python-data-science',
    title: 'Real Python: Data Science with Python',
    description: 'Comprehensive guide to Python for data science applications',
    contentType: 'article',
    source: 'Real Python',
    tags: [tags[3], tags[8], tags[5]],
    annotations: [],
    status: 'approved',
    qualityScore: 4.5,
    relevanceAreas: ['Python', 'Data Science', 'Tutorials'],
    metadata: {
      author: 'Real Python Team',
      publishedDate: new Date('2025-10-01'),
      wordCount: 5000,
      difficulty: 'intermediate',
      language: 'English',
    },
    createdAt: new Date('2026-01-12'),
    updatedAt: new Date('2026-01-14'),
    reviewedAt: new Date('2026-01-14'),
    reviewedBy: '4',
  },
  {
    id: 'content4',
    analystId: '4',
    url: 'https://arxiv.org/abs/example',
    title: 'Attention Is All You Need - Transformer Paper',
    description: 'The foundational paper introducing the Transformer architecture',
    contentType: 'paper',
    source: 'arXiv',
    tags: [tags[0], tags[2], tags[6]],
    annotations: [],
    status: 'approved',
    qualityScore: 5.0,
    relevanceAreas: ['AI', 'Deep Learning', 'NLP', 'Research'],
    metadata: {
      author: 'Vaswani et al.',
      publishedDate: new Date('2017-06-12'),
      difficulty: 'advanced',
      language: 'English',
    },
    createdAt: new Date('2026-01-05'),
    updatedAt: new Date('2026-01-05'),
    reviewedAt: new Date('2026-01-06'),
    reviewedBy: '2',
  },
  {
    id: 'content5',
    analystId: '3',
    url: 'https://coursera.org/learn/machine-learning',
    title: 'Machine Learning Course by Andrew Ng',
    description: 'The classic introductory ML course from Stanford',
    contentType: 'course',
    source: 'Coursera',
    tags: [tags[1], tags[4], tags[7]],
    annotations: [],
    status: 'pending',
    relevanceAreas: ['Machine Learning', 'Education', 'Structured Learning'],
    metadata: {
      author: 'Andrew Ng',
      duration: 60 * 60 * 60, // ~60 hours
      difficulty: 'beginner',
      language: 'English',
    },
    createdAt: new Date('2026-01-20'),
    updatedAt: new Date('2026-01-20'),
  },
];

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

// Content functions
export function getContentItems(filters?: { status?: string; contentType?: string; analystId?: string }): ContentItem[] {
  return contentItems.filter(item => {
    if (filters?.status && item.status !== filters.status) return false;
    if (filters?.contentType && item.contentType !== filters.contentType) return false;
    if (filters?.analystId && item.analystId !== filters.analystId) return false;
    return true;
  });
}

export function getContentItemById(id: string): ContentItem | undefined {
  return contentItems.find(item => item.id === id);
}

export function searchContentItems(query: string, tags?: string[]): ContentItem[] {
  return contentItems.filter(item => {
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
