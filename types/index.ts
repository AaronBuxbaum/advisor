export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'expert';
  subscriptionStatus: 'active' | 'inactive' | 'trial';
  createdAt: Date;
}

export interface Survey {
  id: string;
  userId: string;
  title: string;
  questions: Question[];
  responses: Record<string, string>;
  createdAt: Date;
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'multiple_choice' | 'rating';
  options?: string[];
}

export interface Request {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: 'video_curation' | 'article_curation' | 'advice' | 'custom';
  criteria: string[];
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  assignedExpertId?: string;
  response?: RequestResponse;
  createdAt: Date;
  updatedAt: Date;
}

export interface RequestResponse {
  expertId: string;
  content: string;
  items?: CuratedItem[];
  completedAt: Date;
}

export interface CuratedItem {
  title: string;
  url: string;
  description: string;
  reason: string;
}

export interface UserProfile {
  userId: string;
  interests: string[];
  preferences: Record<string, any>;
  surveyData: Record<string, any>;
}
