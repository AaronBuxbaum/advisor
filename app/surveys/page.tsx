'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Surveys() {
  const router = useRouter();
  const [responses, setResponses] = useState<Record<string, string>>({});

  const survey = {
    title: 'Interest Assessment',
    questions: [
      {
        id: 'q1',
        text: 'What topics are you most interested in?',
        type: 'multiple_choice' as const,
        options: ['Technology', 'Business', 'Science', 'Arts', 'Health', 'Finance', 'Education'],
      },
      {
        id: 'q2',
        text: 'How would you rate your current knowledge level? (1-5)',
        type: 'rating' as const,
      },
      {
        id: 'q3',
        text: 'What are your learning goals?',
        type: 'text' as const,
      },
      {
        id: 'q4',
        text: 'What is your preferred content format?',
        type: 'multiple_choice' as const,
        options: ['Videos', 'Articles', 'Podcasts', 'Interactive courses', 'Books'],
      },
      {
        id: 'q5',
        text: 'How much time can you dedicate to learning per week?',
        type: 'multiple_choice' as const,
        options: ['Less than 1 hour', '1-3 hours', '3-5 hours', '5-10 hours', 'More than 10 hours'],
      },
    ],
  };

  const handleCheckboxChange = (questionId: string, value: string) => {
    const current = responses[questionId] || '';
    const values = current ? current.split(',') : [];
    
    if (values.includes(value)) {
      const newValues = values.filter(v => v !== value);
      setResponses({ ...responses, [questionId]: newValues.join(',') });
    } else {
      setResponses({ ...responses, [questionId]: [...values, value].join(',') });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to a database
    alert('Survey submitted successfully!');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Survey</h1>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{survey.title}</h2>
            <p className="text-gray-600 mt-2">
              Help us understand your interests and preferences to provide better personalized recommendations.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {survey.questions.map((question, index) => (
              <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <label className="block text-lg font-medium text-gray-900 mb-3">
                  {index + 1}. {question.text}
                </label>

                {question.type === 'multiple_choice' && question.options && (
                  <div className="space-y-2">
                    {question.options.map((option) => {
                      const currentValues = (responses[question.id] || '').split(',');
                      const isChecked = currentValues.includes(option);
                      
                      return (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleCheckboxChange(question.id, option)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-3 text-gray-700">{option}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {question.type === 'rating' && (
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setResponses({ ...responses, [question.id]: String(rating) })}
                        className={`px-4 py-2 rounded-md border ${
                          responses[question.id] === String(rating)
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                )}

                {question.type === 'text' && (
                  <textarea
                    value={responses[question.id] || ''}
                    onChange={(e) => setResponses({ ...responses, [question.id]: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your answer here..."
                  />
                )}
              </div>
            ))}

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 font-medium"
              >
                Submit Survey
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

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Your survey responses help our experts provide more personalized and relevant
            recommendations. All information is kept confidential and used only to improve your experience.
          </p>
        </div>
      </main>
    </div>
  );
}
