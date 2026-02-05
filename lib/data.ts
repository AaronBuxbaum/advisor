import { User, Survey, Request, UserProfile } from '@/types';

// Mock data store (in a real app, this would be a database)
export const users: User[] = [
  {
    id: '1',
    email: 'user@example.com',
    name: 'John Doe',
    role: 'user',
    subscriptionStatus: 'active',
    createdAt: new Date('2026-01-01'),
  },
  {
    id: '2',
    email: 'expert@example.com',
    name: 'Dr. Jane Smith',
    role: 'expert',
    subscriptionStatus: 'active',
    createdAt: new Date('2026-01-01'),
  },
];

export const surveys: Survey[] = [
  {
    id: '1',
    userId: '1',
    title: 'Interest Assessment',
    questions: [
      {
        id: 'q1',
        text: 'What topics are you most interested in?',
        type: 'multiple_choice',
        options: ['Technology', 'Business', 'Science', 'Arts', 'Health'],
      },
      {
        id: 'q2',
        text: 'How would you rate your current knowledge level?',
        type: 'rating',
      },
      {
        id: 'q3',
        text: 'What are your learning goals?',
        type: 'text',
      },
    ],
    responses: {
      q1: 'Technology,Science',
      q2: '4',
      q3: 'I want to learn more about AI and machine learning',
    },
    createdAt: new Date('2026-01-15'),
  },
];

export const requests: Request[] = [
  {
    id: '1',
    userId: '1',
    title: 'Curated AI/ML Videos',
    description: 'I need 10 curated videos about AI and machine learning for beginners',
    type: 'video_curation',
    criteria: ['AI', 'Machine Learning', 'Beginner-friendly', 'Recent (2025-2026)'],
    status: 'completed',
    assignedExpertId: '2',
    response: {
      expertId: '2',
      content: 'Based on your profile and interests, I have curated these 10 videos that will help you understand AI and machine learning fundamentals.',
      items: [
        {
          title: 'Introduction to Machine Learning',
          url: 'https://example.com/video1',
          description: 'A comprehensive introduction to ML concepts',
          reason: 'Perfect for beginners, covers fundamental concepts clearly',
        },
        {
          title: 'Neural Networks Explained',
          url: 'https://example.com/video2',
          description: 'Visual explanation of how neural networks work',
          reason: 'Matches your interest in understanding AI basics',
        },
        // More items would be here...
      ],
      completedAt: new Date('2026-01-20'),
    },
    createdAt: new Date('2026-01-16'),
    updatedAt: new Date('2026-01-20'),
  },
];

export const userProfiles: UserProfile[] = [
  {
    userId: '1',
    interests: ['Technology', 'Science', 'AI', 'Machine Learning'],
    preferences: {
      learningStyle: 'visual',
      contentLength: 'medium',
      difficulty: 'beginner',
    },
    surveyData: {
      '1': surveys[0].responses,
    },
  },
];

// Helper functions
export function getUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}

export function getUserByEmail(email: string): User | undefined {
  return users.find(user => user.email === email);
}

export function getRequestsByUserId(userId: string): Request[] {
  return requests.filter(request => request.userId === userId);
}

export function getRequestsByExpertId(expertId: string): Request[] {
  return requests.filter(request => request.assignedExpertId === expertId);
}

export function getUserProfile(userId: string): UserProfile | undefined {
  return userProfiles.find(profile => profile.userId === userId);
}

export function getSurveysByUserId(userId: string): Survey[] {
  return surveys.filter(survey => survey.userId === userId);
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
