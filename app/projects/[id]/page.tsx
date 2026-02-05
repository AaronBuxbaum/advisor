'use client';

import { useState } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layouts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Badge, StatusBadge, PriorityBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import {
  getProjectById,
  getUserById,
  getContentItemById,
} from '@/lib/data';

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = getProjectById(id);
  const userId = '2'; // Mock expert user
  const user = getUserById(userId);

  const [newComment, setNewComment] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  if (!project) {
    return (
      <PageLayout userId={userId} role="expert">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">Project Not Found</h1>
          <Link href="/projects" className="text-blue-600 mt-4 inline-block">
            Back to Projects
          </Link>
        </div>
      </PageLayout>
    );
  }

  const owner = getUserById(project.ownerId);
  const tasksByStatus = {
    todo: project.tasks.filter(t => t.status === 'todo'),
    in_progress: project.tasks.filter(t => t.status === 'in_progress'),
    review: project.tasks.filter(t => t.status === 'review'),
    done: project.tasks.filter(t => t.status === 'done'),
  };

  return (
    <PageLayout userId={userId} role="expert">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/projects" className="hover:text-gray-700">
            Projects
          </Link>
          <span>/</span>
          <span>{project.title}</span>
        </div>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
              <StatusBadge status={project.status} />
            </div>
            <p className="text-gray-600">{project.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Settings</Button>
            <Button>Invite Member</Button>
          </div>
        </div>
      </div>

      {/* Project Info Bar */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div>
                <p className="text-xs text-gray-500">Owner</p>
                <p className="font-medium">{owner?.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Members</p>
                <div className="flex -space-x-2">
                  {project.members.slice(0, 5).map((member) => {
                    const memberUser = getUserById(member.userId);
                    return (
                      <div
                        key={member.userId}
                        className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                        title={memberUser?.name}
                      >
                        {memberUser?.name?.charAt(0)}
                      </div>
                    );
                  })}
                  {project.members.length > 5 && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-600 text-xs">
                      +{project.members.length - 5}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Due Date</p>
                <p className="font-medium">
                  {project.dueDate?.toLocaleDateString() || 'Not set'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Progress</p>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{
                        width: `${(tasksByStatus.done.length / project.tasks.length) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {Math.round((tasksByStatus.done.length / project.tasks.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="tasks">
        <TabsList className="mb-4">
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="discussion">Discussion</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        {/* Tasks Tab */}
        <TabsContent value="tasks">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Task Board</h2>
            <Button onClick={() => setShowAddTask(true)}>Add Task</Button>
          </div>

          {/* Kanban Board */}
          <div className="grid grid-cols-4 gap-4">
            {(['todo', 'in_progress', 'review', 'done'] as const).map((status) => (
              <div key={status} className="bg-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-700 capitalize">
                    {status.replace('_', ' ')}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {tasksByStatus[status].length}
                  </span>
                </div>
                <div className="space-y-3">
                  {tasksByStatus[status].map((task) => {
                    const assignee = task.assigneeId
                      ? getUserById(task.assigneeId)
                      : null;
                    return (
                      <Card key={task.id} className="cursor-pointer hover:shadow-md">
                        <CardContent className="py-3">
                          <h4 className="font-medium text-sm mb-2">{task.title}</h4>
                          <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                            {task.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <PriorityBadge priority={task.priority} />
                            {assignee && (
                              <div
                                className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs"
                                title={assignee.name}
                              >
                                {assignee.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          {task.dueDate && (
                            <p className="text-xs text-gray-400 mt-2">
                              Due {task.dueDate.toLocaleDateString()}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                  {tasksByStatus[status].length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">
                      No tasks
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Task Modal */}
          {showAddTask && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="w-full max-w-md mx-4">
                <CardHeader>
                  <CardTitle>Add New Task</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    label="Task Title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="What needs to be done?"
                  />
                  <Textarea
                    label="Description"
                    placeholder="Add details..."
                    rows={3}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Assignee
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option>Unassigned</option>
                        {project.members.map((m) => {
                          const memberUser = getUserById(m.userId);
                          return (
                            <option key={m.userId} value={m.userId}>
                              {memberUser?.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="low">Low</option>
                        <option value="normal">Normal</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 py-4 border-t flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddTask(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setShowAddTask(false)}>
                    Add Task
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Discussion Tab */}
        <TabsContent value="discussion">
          <Card>
            <CardHeader>
              <CardTitle>Discussion</CardTitle>
              <CardDescription>
                Team communication and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Comments */}
              <div className="space-y-4 mb-6">
                {project.comments.map((comment) => {
                  const author = getUserById(comment.authorId);
                  const isReply = !!comment.parentId;
                  return (
                    <div
                      key={comment.id}
                      className={`${isReply ? 'ml-8' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
                          {author?.name?.charAt(0)}
                        </div>
                        <div className="flex-1 bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{author?.name}</span>
                            <span className="text-xs text-gray-400">
                              {comment.createdAt.toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{comment.text}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <button className="text-xs text-gray-500 hover:text-gray-700">
                              Reply
                            </button>
                            {comment.reactions.length > 0 && (
                              <span className="text-xs text-gray-500">
                                {comment.reactions.length} reactions
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* New Comment */}
              <div className="border-t pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
                    {user?.name?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                    />
                    <div className="flex justify-end mt-2">
                      <Button size="sm" disabled={!newComment.trim()}>
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Shared Resources</CardTitle>
                  <CardDescription>
                    Files, links, and content shared with the team
                  </CardDescription>
                </div>
                <Button>Add Resource</Button>
              </div>
            </CardHeader>
            <CardContent>
              {project.sharedResources.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No resources shared yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {project.sharedResources.map((resource) => {
                    const uploader = getUserById(resource.uploadedBy);
                    const contentItem = resource.contentItemId
                      ? getContentItemById(resource.contentItemId)
                      : null;
                    return (
                      <div
                        key={resource.id}
                        className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={resource.type === 'link'
                                ? 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101'
                                : resource.type === 'content_item'
                                ? 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                                : 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'
                              }
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{resource.title}</p>
                          <p className="text-xs text-gray-500">
                            Added by {uploader?.name} on{' '}
                            {resource.createdAt.toLocaleDateString()}
                          </p>
                          {contentItem && (
                            <p className="text-sm text-gray-600 mt-1">
                              {contentItem.description}
                            </p>
                          )}
                        </div>
                        <Badge variant="default">{resource.type}</Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
