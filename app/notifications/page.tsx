'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layouts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  getNotificationsByUserId,
  markNotificationAsRead,
  getUserById,
} from '@/lib/data';
import type { NotificationType } from '@/types';

export default function NotificationsPage() {
  const userId = '2'; // Mock: expert user
  const user = getUserById(userId);
  const [notifications, setNotifications] = useState(getNotificationsByUserId(userId));
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const handleMarkAsRead = (notificationId: string) => {
    markNotificationAsRead(notificationId);
    setNotifications([...getNotificationsByUserId(userId)]);
  };

  const handleMarkAllAsRead = () => {
    notifications.forEach(n => {
      if (!n.isRead) markNotificationAsRead(n.id);
    });
    setNotifications([...getNotificationsByUserId(userId)]);
  };

  const getNotificationIcon = (type: NotificationType) => {
    const icons: Record<NotificationType, string> = {
      request_assigned: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      request_completed: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      request_updated: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
      collaboration_invite: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
      comment_mention: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z',
      comment_reply: 'M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6',
      task_assigned: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
      task_due: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      content_feedback: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z',
      ai_suggestion: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      system: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    };
    return icons[type] || icons.system;
  };

  const getNotificationColor = (type: NotificationType) => {
    const colors: Record<string, string> = {
      request_assigned: 'text-blue-500',
      request_completed: 'text-green-500',
      collaboration_invite: 'text-purple-500',
      ai_suggestion: 'text-purple-500',
      task_due: 'text-yellow-500',
      content_feedback: 'text-orange-500',
    };
    return colors[type] || 'text-gray-500';
  };

  return (
    <PageLayout userId={userId} role={user?.role || 'expert'}>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">
              {notifications.filter(n => !n.isRead).length} unread notifications
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'unread' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('unread')}
            >
              Unread
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
            >
              Mark all read
            </Button>
          </div>
        </div>

        <Card>
          {filteredNotifications.length === 0 ? (
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <p className="text-gray-500">
                {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
              </p>
            </CardContent>
          ) : (
            <div className="divide-y">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-6 py-4 hover:bg-gray-50 flex items-start gap-4 ${
                    !notification.isRead ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className={`flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={getNotificationIcon(notification.type)}
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {notification.createdAt.toLocaleDateString()} at{' '}
                          {notification.createdAt.toLocaleTimeString()}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      {notification.link && (
                        <Link
                          href={notification.link}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          View Details
                        </Link>
                      )}
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </PageLayout>
  );
}
