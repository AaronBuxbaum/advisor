'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layouts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Badge, StatusBadge, PriorityBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { ContentItemCard } from '@/components/features/ContentItemCard';
import { AISuggestionsList } from '@/components/features/AISuggestionCard';
import {
  getUserById,
  getContentItems,
  getAnalystStats,
  getResearchRequests,
  getContentFeedback,
  getAISuggestionsByType,
  getProjectsByUserId,
} from '@/lib/data';

export default function AnalystDashboard() {
  const analystId = '3';
  const analyst = getUserById(analystId);
  const stats = getAnalystStats(analystId);
  const myContent = getContentItems({ analystId });
  const pendingContent = myContent.filter(c => c.status === 'pending');
  const approvedContent = myContent.filter(c => c.status === 'approved');
  const researchRequests = getResearchRequests();
  const feedback = getContentFeedback();
  const openFeedback = feedback.filter(f => f.status === 'open');
  const aiSuggestions = getAISuggestionsByType('research_priority');
  const projects = getProjectsByUserId(analystId);

  return (
    <PageLayout userId={analystId} role="analyst">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {analyst?.name}!
        </h1>
        <p className="text-gray-600">
          You have {pendingContent.length} pending reviews and{' '}
          {researchRequests.filter(r => r.status === 'open').length} open research requests.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="py-4">
            <p className="text-sm text-gray-500">Total Content</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalContent}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <p className="text-sm text-gray-500">Approved</p>
            <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <p className="text-sm text-gray-500">Pending Review</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <p className="text-sm text-gray-500">Avg Quality</p>
            <p className="text-3xl font-bold text-blue-600">
              {stats.averageQuality.toFixed(1)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="content">
            <TabsList className="mb-4">
              <TabsTrigger value="content">My Content</TabsTrigger>
              <TabsTrigger value="requests">Research Requests</TabsTrigger>
              <TabsTrigger value="feedback">Expert Feedback</TabsTrigger>
            </TabsList>

            {/* Content Tab */}
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Content Library</CardTitle>
                      <CardDescription>Content you have curated and tagged</CardDescription>
                    </div>
                    <Link href="/analyst/content/new">
                      <Button>Add Content</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {myContent.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>No content yet. Start adding content from the web!</p>
                      <Link href="/analyst/content/new">
                        <Button className="mt-4">Add First Content</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {myContent.map((content) => (
                        <ContentItemCard
                          key={content.id}
                          content={content}
                          showAnnotations
                          onView={(id) => console.log('View:', id)}
                          onEdit={(id) => console.log('Edit:', id)}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Research Requests Tab */}
            <TabsContent value="requests">
              <Card>
                <CardHeader>
                  <CardTitle>Research Requests</CardTitle>
                  <CardDescription>
                    Content requests from experts
                  </CardDescription>
                </CardHeader>
                <div className="divide-y">
                  {researchRequests.length === 0 ? (
                    <div className="px-6 py-8 text-center text-gray-500">
                      No research requests at the moment.
                    </div>
                  ) : (
                    researchRequests.map((request) => (
                      <div key={request.id} className="px-6 py-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-gray-900">
                                {request.title}
                              </h4>
                              <StatusBadge status={request.status} />
                              <PriorityBadge priority={request.priority} />
                            </div>
                            <p className="text-sm text-gray-600">
                              {request.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {request.targetAreas.map((area, idx) => (
                            <Badge key={idx} variant="info" size="sm">
                              {area}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">
                            From: {getUserById(request.requesterId)?.name}
                          </span>
                          <div className="flex gap-2">
                            {request.status === 'open' && (
                              <Button size="sm">
                                Accept
                              </Button>
                            )}
                            {request.status === 'in_progress' && (
                              <Button size="sm" variant="outline">
                                Add Results
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </TabsContent>

            {/* Feedback Tab */}
            <TabsContent value="feedback">
              <Card>
                <CardHeader>
                  <CardTitle>Expert Feedback</CardTitle>
                  <CardDescription>
                    Feedback from experts on your curated content
                  </CardDescription>
                </CardHeader>
                <div className="divide-y">
                  {feedback.length === 0 ? (
                    <div className="px-6 py-8 text-center text-gray-500">
                      No feedback yet.
                    </div>
                  ) : (
                    feedback.map((fb) => (
                      <div key={fb.id} className="px-6 py-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge
                                variant={
                                  fb.feedbackType === 'gap' ? 'warning' :
                                  fb.feedbackType === 'quality' ? 'info' : 'default'
                                }
                              >
                                {fb.feedbackType}
                              </Badge>
                              <StatusBadge status={fb.status} />
                              <PriorityBadge priority={fb.priority} />
                            </div>
                            <p className="text-sm text-gray-900">{fb.message}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          From: {getUserById(fb.expertId)?.name} •{' '}
                          {fb.createdAt.toLocaleDateString()}
                        </div>
                        {fb.response && (
                          <div className="mt-2 bg-green-50 rounded p-2">
                            <p className="text-sm text-green-800">
                              <span className="font-medium">Response:</span> {fb.response}
                            </p>
                          </div>
                        )}
                        {fb.status === 'open' && (
                          <div className="mt-2">
                            <Button size="sm" variant="outline">
                              Respond
                            </Button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Research Priorities */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">AI Research Priorities</h3>
            <AISuggestionsList
              suggestions={aiSuggestions}
              onAccept={(id) => console.log('Accepted:', id)}
              onDismiss={(id) => console.log('Dismissed:', id)}
            />
          </div>

          {/* Open Feedback */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Open Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              {openFeedback.length === 0 ? (
                <p className="text-sm text-gray-500">No open feedback</p>
              ) : (
                <div className="space-y-2">
                  {openFeedback.slice(0, 3).map((fb) => (
                    <div key={fb.id} className="text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="warning" size="sm">{fb.feedbackType}</Badge>
                        <PriorityBadge priority={fb.priority} />
                      </div>
                      <p className="text-gray-700 mt-1 line-clamp-2">{fb.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                href="/analyst/content/new"
                className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-700"
              >
                Add New Content
              </Link>
              <Link
                href="/analyst/content"
                className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-700"
              >
                Browse Content Library
              </Link>
              <Link
                href="/analyst/tags"
                className="block p-2 rounded hover:bg-gray-50 text-sm text-gray-700"
              >
                Manage Tags
              </Link>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">My Projects</CardTitle>
                <Link href="/projects" className="text-sm text-blue-600">
                  View All
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {projects.length === 0 ? (
                <p className="text-sm text-gray-500">No projects</p>
              ) : (
                <div className="space-y-2">
                  {projects.slice(0, 3).map((project) => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.id}`}
                      className="block p-2 rounded hover:bg-gray-50"
                    >
                      <p className="text-sm font-medium text-gray-900">
                        {project.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {project.tasks.filter(t => t.status !== 'done').length} open tasks
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
