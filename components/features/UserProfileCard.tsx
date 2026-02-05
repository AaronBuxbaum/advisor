'use client';

import { UserProfile, User, Survey } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { getUserById, getSurveysByUserId } from '@/lib/data';

interface UserProfileCardProps {
  profile: UserProfile;
  showHistory?: boolean;
}

export function UserProfileCard({ profile, showHistory = true }: UserProfileCardProps) {
  const user = getUserById(profile.userId);
  const surveys = getSurveysByUserId(profile.userId);

  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{user.name}</CardTitle>
            <p className="text-sm text-gray-500 mt-1">{user.email}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {profile.engagementScore || 0}
            </div>
            <p className="text-xs text-gray-500">Engagement Score</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Interests */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Interests</h4>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, idx) => (
              <Badge key={idx} variant="info">{interest}</Badge>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Learning Preferences</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Style:</span>{' '}
              <span className="capitalize">{profile.preferences.learningStyle || 'Not set'}</span>
            </div>
            <div>
              <span className="text-gray-500">Difficulty:</span>{' '}
              <span className="capitalize">{profile.preferences.difficulty || 'Not set'}</span>
            </div>
            <div>
              <span className="text-gray-500">Content Length:</span>{' '}
              <span className="capitalize">{profile.preferences.contentLength || 'Not set'}</span>
            </div>
            <div>
              <span className="text-gray-500">Formats:</span>{' '}
              <span>{profile.preferences.preferredFormats?.join(', ') || 'Not set'}</span>
            </div>
          </div>
        </div>

        {/* Survey Responses Summary */}
        {surveys.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Survey Responses</h4>
            {surveys.map((survey) => (
              <div key={survey.id} className="bg-gray-50 rounded p-3 mb-2">
                <p className="text-sm font-medium">{survey.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Completed {survey.completedAt?.toLocaleDateString() || 'In progress'}
                </p>
                <div className="mt-2 space-y-1">
                  {survey.questions.slice(0, 3).map((q) => (
                    <div key={q.id} className="text-xs">
                      <span className="text-gray-500">{q.text}</span>
                      <span className="ml-2 text-gray-900">
                        {survey.responses[q.id] || 'No response'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Request History */}
        {showHistory && profile.requestHistory.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Requests</h4>
            <div className="space-y-2">
              {profile.requestHistory.slice(0, 5).map((req) => (
                <div
                  key={req.requestId}
                  className="flex justify-between items-center text-sm py-2 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{req.title}</p>
                    <p className="text-xs text-gray-500">
                      {req.type.replace(/_/g, ' ')} • {req.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <StatusBadge status={req.status} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Last Active */}
        {profile.lastActive && (
          <p className="text-xs text-gray-400 mt-4">
            Last active: {profile.lastActive.toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
