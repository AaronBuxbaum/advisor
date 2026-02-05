'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getRequestsByExpertId, requests } from '@/lib/data';

export default function ExpertDashboard() {
  // In a real app, this would come from authentication context
  const expertId = '2';
  const [assignedRequests] = useState(() => getRequestsByExpertId(expertId));
  const [pendingRequests] = useState(() => 
    requests.filter(r => r.status === 'pending' && !r.assignedExpertId)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Expert Dashboard</h1>
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
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome, Dr. Jane Smith!</h2>
          <p className="text-gray-600">
            You have {pendingRequests.length} new requests and {assignedRequests.length} active assignments.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Pending Requests</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{pendingRequests.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Active Assignments</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {assignedRequests.filter(r => r.status !== 'completed').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Completed</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {assignedRequests.filter(r => r.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Available Requests</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {pendingRequests.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                No pending requests at the moment.
              </div>
            ) : (
              pendingRequests.map((request) => (
                <div key={request.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-md font-medium text-gray-900">{request.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{request.description}</p>
                      <div className="flex gap-2 mt-2">
                        {request.criteria.map((criterion, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                          >
                            {criterion}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Created {request.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                      Accept
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* My Assignments */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">My Assignments</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {assignedRequests.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                No assignments yet. Accept a request to get started!
              </div>
            ) : (
              assignedRequests.map((request) => (
                <div key={request.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-md font-medium text-gray-900">{request.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{request.description}</p>
                      <div className="flex gap-2 mt-2">
                        {request.criteria.map((criterion, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                          >
                            {criterion}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        User ID: {request.userId} • Created {request.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="ml-4 flex flex-col gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          request.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {request.status}
                      </span>
                      {request.status !== 'completed' && (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
                          Complete
                        </button>
                      )}
                    </div>
                  </div>
                  {request.response && (
                    <div className="mt-4 border-t pt-4 bg-gray-50 -mx-6 px-6 py-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Your Response:</p>
                      <p className="text-sm text-gray-700">{request.response.content}</p>
                      {request.response.items && (
                        <p className="text-xs text-gray-500 mt-2">
                          Provided {request.response.items.length} curated items
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
