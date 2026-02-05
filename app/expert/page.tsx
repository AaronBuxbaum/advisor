'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layouts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Badge, StatusBadge, PriorityBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { UserProfileCard } from '@/components/features/UserProfileCard';
import { AISuggestionsList } from '@/components/features/AISuggestionCard';
import {
  getRequestsByExpertId,
  getPendingRequests,
  getUserProfile,
  getKnowledgeBasesByOwnerId,
  getProjectsByUserId,
  getAISuggestionsForEntity,
  getExpertStats,
  getUserById,
} from '@/lib/data';

export default function ExpertDashboard() {
  const expertId = '2'; // Mock: would come from auth context
  const expert = getUserById(expertId);
  const stats = getExpertStats(expertId);
  const assignedRequests = getRequestsByExpertId(expertId);
  const pendingRequests = getPendingRequests();
  const knowledgeBases = getKnowledgeBasesByOwnerId(expertId);
  const projects = getProjectsByUserId(expertId);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const selectedUserProfile = selectedUserId ? getUserProfile(selectedUserId) : null;

  // Get AI suggestions for this expert
  const aiSuggestions = assignedRequests.flatMap(req =>
    getAISuggestionsForEntity('request', req.id)
  );

  return (
    <PageLayout userId={expertId} role="expert">
      {/* Welcome & Stats */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {expert?.name}!
        </h1>
        <p className="text-gray-600">
          You have {pendingRequests.length} new requests and{' '}
          {assignedRequests.filter(r => r.status !== 'completed').length} active assignments.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="py-4">
            <p className="text-sm text-gray-500">Pending Requests</p>
            <p className="text-3xl font-bold text-gray-900">{pendingRequests.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <p className="text-sm text-gray-500">Active Assignments</p>
            <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <p className="text-sm text-gray-500">Avg Rating</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.averageRating}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Requests */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="assigned">
            <TabsList className="mb-4">
              <TabsTrigger value="assigned">My Assignments</TabsTrigger>
              <TabsTrigger value="available">Available Requests</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>

            <TabsContent value="assigned">
              <Card>
                <CardHeader>
                  <CardTitle>Active Assignments</CardTitle>
                  <CardDescription>Requests you are currently working on</CardDescription>
                </CardHeader>
                <div className="divide-y">
                  {assignedRequests.length === 0 ? (
                    <div className="px-6 py-8 text-center text-gray-500">
                      No assignments yet. Accept a request to get started!
                    </div>
                  ) : (
                    assignedRequests.map((request) => (
                      <div key={request.id} className="px-6 py-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-gray-900">{request.title}</h4>
                              <StatusBadge status={request.status} />
                              <PriorityBadge priority={request.priority} />
                            </div>
                            <p className="text-sm text-gray-600">{request.description}</p>
                          </div>
                        </div>

                        {/* Criteria Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {request.criteria.map((criterion, idx) => (
                            <Badge key={idx} variant="info" size="sm">
                              {criterion}
                            </Badge>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => setSelectedUserId(request.userId)}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            View User Profile
                          </button>
                          <div className="flex gap-2">
                            <Link href={`/expert/requests/${request.id}`}>
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </Link>
                            {request.status !== 'completed' && (
                              <Button size="sm">
                                Complete
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Response preview */}
                        {request.response && (
                          <div className="mt-3 bg-green-50 rounded p-3">
                            <p className="text-sm text-green-800">
                              <span className="font-medium">Your response:</span>{' '}
                              {request.response.content.substring(0, 100)}...
                            </p>
                            {request.response.items && (
                              <p className="text-xs text-green-600 mt-1">
                                {request.response.items.length} curated items provided
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="available">
              <Card>
                <CardHeader>
                  <CardTitle>Available Requests</CardTitle>
                  <CardDescription>Requests waiting to be claimed</CardDescription>
                </CardHeader>
                <div className="divide-y">
                  {pendingRequests.length === 0 ? (
                    <div className="px-6 py-8 text-center text-gray-500">
                      No pending requests at the moment.
                    </div>
                  ) : (
                    pendingRequests.map((request) => (
                      <div key={request.id} className="px-6 py-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-gray-900">{request.title}</h4>
                              <Badge variant="info">{request.type.replace(/_/g, ' ')}</Badge>
                              <PriorityBadge priority={request.priority} />
                            </div>
                            <p className="text-sm text-gray-600">{request.description}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {request.criteria.map((criterion, idx) => (
                            <Badge key={idx} variant="default" size="sm">
                              {criterion}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">
                            Created {request.createdAt.toLocaleDateString()}
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSelectedUserId(request.userId)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              View User
                            </button>
                            <Button size="sm">
                              Accept Request
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Collaboration Projects</CardTitle>
                      <CardDescription>Team projects you are participating in</CardDescription>
                    </div>
                    <Link href="/projects/new">
                      <Button size="sm">New Project</Button>
                    </Link>
                  </div>
                </CardHeader>
                <div className="divide-y">
                  {projects.length === 0 ? (
                    <div className="px-6 py-8 text-center text-gray-500">
                      No active projects. Create one to collaborate with others!
                    </div>
                  ) : (
                    projects.map((project) => (
                      <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        className="block px-6 py-4 hover:bg-gray-50"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-gray-900">{project.title}</h4>
                              <StatusBadge status={project.status} />
                            </div>
                            <p className="text-sm text-gray-600">{project.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>{project.members.length} members</span>
                              <span>{project.tasks.length} tasks</span>
                              {project.dueDate && (
                                <span>Due {project.dueDate.toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected User Profile */}
          {selectedUserProfile ? (
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900">User Profile</h3>
                <button
                  onClick={() => setSelectedUserId(null)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>
              <UserProfileCard profile={selectedUserProfile} />
            </div>
          ) : (
            <Card>
              <CardContent className="py-6 text-center text-gray-500">
                <p className="text-sm">Select a user to view their profile</p>
              </CardContent>
            </Card>
          )}

          {/* AI Suggestions */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">AI Suggestions</h3>
            <AISuggestionsList
              suggestions={aiSuggestions}
              onAccept={(id) => console.log('Accepted:', id)}
              onDismiss={(id) => console.log('Dismissed:', id)}
            />
          </div>

          {/* Quick Access - Knowledge Bases */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Knowledge Bases</CardTitle>
                <Link href="/expert/knowledge" className="text-sm text-blue-600 hover:text-blue-800">
                  View All
                </Link>
              </div>
            </CardHeader>
            <CardContent className="py-2">
              {knowledgeBases.length === 0 ? (
                <p className="text-sm text-gray-500 py-2">No knowledge bases yet</p>
              ) : (
                <div className="space-y-2">
                  {knowledgeBases.map((kb) => (
                    <Link
                      key={kb.id}
                      href={`/expert/knowledge/${kb.id}`}
                      className="block p-2 rounded hover:bg-gray-50"
                    >
                      <p className="text-sm font-medium text-gray-900">{kb.title}</p>
                      <p className="text-xs text-gray-500">
                        {kb.entries.length} entries • {kb.collaborators.length} collaborators
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="py-2 space-y-2">
              <Link
                href="/expert/research"
                className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-700"
              >
                Search Content Library
              </Link>
              <Link
                href="/analyst/feedback"
                className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-700"
              >
                Request Research
              </Link>
              <Link
                href="/expert/analytics"
                className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-700"
              >
                View Analytics
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
