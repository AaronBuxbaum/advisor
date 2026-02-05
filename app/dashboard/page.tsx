'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getRequestsByUserId, getSurveysByUserId } from '@/lib/data';

export default function Dashboard() {
  // In a real app, this would come from authentication context
  const userId = '1';
  const [requests] = useState(() => getRequestsByUserId(userId));
  const [surveys] = useState(() => getSurveysByUserId(userId));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
            <div className="space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <button className="text-gray-600 hover:text-gray-900">Logout</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome back, John!</h2>
          <p className="text-gray-600">Your subscription is active. You have unlimited access to expert advice.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/requests/new"
            className="bg-blue-600 text-white p-6 rounded-lg shadow hover:bg-blue-700 text-center"
          >
            <h3 className="text-xl font-semibold mb-2">New Request</h3>
            <p className="text-blue-100">Ask for expert curation or advice</p>
          </Link>
          <Link
            href="/surveys"
            className="bg-green-600 text-white p-6 rounded-lg shadow hover:bg-green-700 text-center"
          >
            <h3 className="text-xl font-semibold mb-2">Take Survey</h3>
            <p className="text-green-100">Update your preferences</p>
          </Link>
          <div className="bg-purple-600 text-white p-6 rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-2">Profile</h3>
            <p className="text-purple-100">Manage your settings</p>
          </div>
        </div>

        {/* My Requests */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">My Requests</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {requests.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                No requests yet. Create your first request to get started!
              </div>
            ) : (
              requests.map((request) => (
                <div key={request.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-md font-medium text-gray-900">{request.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{request.description}</p>
                      <div className="flex gap-2 mt-2">
                        {request.criteria.map((criterion, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {criterion}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        request.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : request.status === 'in_progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>
                  {request.response && (
                    <div className="mt-4 border-t pt-4">
                      <p className="text-sm text-gray-700 mb-3">{request.response.content}</p>
                      {request.response.items && request.response.items.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-900">
                            Curated Items ({request.response.items.length}):
                          </p>
                          {request.response.items.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="bg-gray-50 p-3 rounded">
                              <a
                                href={item.url}
                                className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {item.title}
                              </a>
                              <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                              <p className="text-xs text-gray-500 mt-1 italic">Why: {item.reason}</p>
                            </div>
                          ))}
                          {request.response.items.length > 3 && (
                            <p className="text-xs text-gray-500">
                              +{request.response.items.length - 3} more items
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Surveys */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">My Surveys</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {surveys.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                No surveys completed yet.
              </div>
            ) : (
              surveys.map((survey) => (
                <div key={survey.id} className="px-6 py-4 hover:bg-gray-50">
                  <h4 className="text-md font-medium text-gray-900">{survey.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Completed on {survey.createdAt.toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
