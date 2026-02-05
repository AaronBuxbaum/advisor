'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layouts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import {
  getProjectsByUserId,
  getUserById,
  projects,
} from '@/lib/data';

export default function ProjectsPage() {
  const userId = '2'; // Mock expert user
  const user = getUserById(userId);
  const userProjects = getProjectsByUserId(userId);
  const [showNewProject, setShowNewProject] = useState(false);

  return (
    <PageLayout userId={userId} role="expert">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Collaboration Projects</h1>
            <p className="text-gray-600">
              Work together with other experts and analysts
            </p>
          </div>
          <Button onClick={() => setShowNewProject(true)}>
            New Project
          </Button>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="py-4">
            <p className="text-sm text-gray-500">Total Projects</p>
            <p className="text-3xl font-bold text-gray-900">{userProjects.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-3xl font-bold text-blue-600">
              {userProjects.filter(p => p.status === 'active').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-3xl font-bold text-green-600">
              {userProjects.filter(p => p.status === 'completed').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4">
            <p className="text-sm text-gray-500">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-900">
              {userProjects.reduce((sum, p) => sum + p.tasks.length, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userProjects.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center">
              <svg
                className="w-12 h-12 mx-auto text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-gray-500 mb-4">No projects yet</p>
              <Button onClick={() => setShowNewProject(true)}>
                Create Your First Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          userProjects.map((project) => {
            const owner = getUserById(project.ownerId);
            const completedTasks = project.tasks.filter(t => t.status === 'done').length;
            const progress = project.tasks.length > 0
              ? Math.round((completedTasks / project.tasks.length) * 100)
              : 0;

            return (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base">{project.title}</CardTitle>
                      <StatusBadge status={project.status} />
                    </div>
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Members */}
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {project.members.slice(0, 4).map((member) => {
                          const memberUser = getUserById(member.userId);
                          return (
                            <div
                              key={member.userId}
                              className="w-7 h-7 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                              title={memberUser?.name}
                            >
                              {memberUser?.name?.charAt(0)}
                            </div>
                          );
                        })}
                        {project.members.length > 4 && (
                          <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-600 text-xs">
                            +{project.members.length - 4}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {project.tasks.length} tasks
                      </div>
                    </div>

                    {/* Due Date */}
                    {project.dueDate && (
                      <p className="text-xs text-gray-400 mt-3">
                        Due {project.dueDate.toLocaleDateString()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })
        )}
      </div>

      {/* New Project Modal */}
      {showNewProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Create New Project</CardTitle>
              <CardDescription>
                Start a collaboration with other experts or analysts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Project Title"
                placeholder="e.g., Comprehensive ML Learning Path"
              />
              <Textarea
                label="Description"
                placeholder="What is this project about?"
                rows={3}
              />
              <Input
                label="Related Request (optional)"
                placeholder="Request ID or search..."
              />
              <Input
                label="Due Date (optional)"
                type="date"
              />
            </CardContent>
            <div className="px-6 py-4 border-t flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowNewProject(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowNewProject(false)}>
                Create Project
              </Button>
            </div>
          </Card>
        </div>
      )}
    </PageLayout>
  );
}
