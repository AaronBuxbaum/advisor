'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createRequest } from '@/lib/data';

export default function NewRequest() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'video_curation' | 'article_curation' | 'advice' | 'custom'>('video_curation');
  const [criteria, setCriteria] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would come from authentication context
    const userId = '1';
    
    const criteriaArray = criteria
      .split(',')
      .map(c => c.trim())
      .filter(c => c.length > 0);

    createRequest({
      userId,
      title,
      description,
      type,
      criteria: criteriaArray,
      tags: criteriaArray,
      status: 'pending',
      priority: 'normal',
    });

    alert('Request submitted successfully!');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">New Request</h1>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Request Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Curated AI/ML Videos"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Request Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="video_curation">Video Curation</option>
                <option value="article_curation">Article Curation</option>
                <option value="advice">Expert Advice</option>
                <option value="custom">Custom Request</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe what you're looking for in detail..."
              />
            </div>

            <div>
              <label htmlFor="criteria" className="block text-sm font-medium text-gray-700 mb-2">
                Criteria (comma-separated)
              </label>
              <input
                type="text"
                id="criteria"
                value={criteria}
                onChange={(e) => setCriteria(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., AI, Machine Learning, Beginner-friendly, Recent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter specific criteria or preferences separated by commas
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Our experts will review your profile, survey responses, and this request
                to provide personalized recommendations tailored to your interests and needs.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 font-medium"
              >
                Submit Request
              </button>
              <Link
                href="/dashboard"
                className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 font-medium text-gray-700"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips for Better Results</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Be specific about what you're looking for and why</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Include relevant criteria like difficulty level, time constraints, or preferences</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Keep your profile and surveys up to date for more personalized results</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Experts typically respond within 24-48 hours</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
