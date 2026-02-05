'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getUnreadNotificationCount, getNotificationsByUserId, getUserById } from '@/lib/data';
import type { UserRole } from '@/types';

interface HeaderProps {
  userId: string;
  role: UserRole;
}

export function Header({ userId, role }: HeaderProps) {
  const user = getUserById(userId);
  const unreadCount = getUnreadNotificationCount(userId);
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = getNotificationsByUserId(userId).slice(0, 5);

  const navLinks = {
    user: [
      { href: '/dashboard', label: 'Dashboard' },
      { href: '/surveys', label: 'Surveys' },
      { href: '/requests/new', label: 'New Request' },
    ],
    expert: [
      { href: '/expert', label: 'Dashboard' },
      { href: '/expert/knowledge', label: 'Knowledge Base' },
      { href: '/expert/research', label: 'Research' },
      { href: '/projects', label: 'Projects' },
    ],
    analyst: [
      { href: '/analyst', label: 'Dashboard' },
      { href: '/analyst/content', label: 'Content' },
      { href: '/analyst/feedback', label: 'Feedback' },
      { href: '/projects', label: 'Projects' },
    ],
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Advisory Board
            </Link>
            <nav className="hidden md:flex space-x-4">
              {navLinks[role]?.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-900"
              >
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                  <div className="px-4 py-3 border-b">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-8 text-center text-gray-500 text-sm">
                        No notifications
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <Link
                          key={notif.id}
                          href={notif.link || '#'}
                          className={`block px-4 py-3 hover:bg-gray-50 border-b ${
                            !notif.isRead ? 'bg-blue-50' : ''
                          }`}
                        >
                          <p className="text-sm font-medium text-gray-900">
                            {notif.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notif.createdAt.toLocaleDateString()}
                          </p>
                        </Link>
                      ))
                    )}
                  </div>
                  <Link
                    href="/notifications"
                    className="block px-4 py-3 text-center text-sm text-blue-600 hover:bg-gray-50"
                  >
                    View all notifications
                  </Link>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{user?.name}</span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded capitalize">
                {role}
              </span>
            </div>
            <Link href="/login" className="text-gray-600 hover:text-gray-900 text-sm">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
