'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageLayout } from '@/components/layouts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { KnowledgeEntryCard } from '@/components/features/KnowledgeEntryCard';
import {
  getKnowledgeBasesByOwnerId,
  searchKnowledgeEntries,
  knowledgeEntries,
  getUserById,
} from '@/lib/data';

export default function KnowledgeBasePage() {
  const expertId = '2';
  const expert = getUserById(expertId);
  const knowledgeBases = getKnowledgeBasesByOwnerId(expertId);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showNewKBModal, setShowNewKBModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

  const searchResults = searchQuery || selectedTags.length > 0
    ? searchKnowledgeEntries(searchQuery, selectedTags)
    : [];

  const allTags = Array.from(
    new Set(knowledgeEntries.flatMap(e => e.tags))
  );

  const selectedEntryData = selectedEntry
    ? knowledgeEntries.find(e => e.id === selectedEntry)
    : null;

  return (
    <PageLayout userId={expertId} role="expert">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
        <p className="text-gray-600">
          Build and organize your expert knowledge for better curation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Search */}
          <Card className="mb-6">
            <CardContent className="py-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search knowledge entries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  Advanced Search
                </Button>
              </div>
              {/* Tag filters */}
              <div className="flex flex-wrap gap-2 mt-3">
                {allTags.slice(0, 10).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSelectedTags(prev =>
                        prev.includes(tag)
                          ? prev.filter(t => t !== tag)
                          : [...prev, tag]
                      );
                    }}
                    className={`text-xs px-2 py-1 rounded-full transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Search Results */}
          {(searchQuery || selectedTags.length > 0) && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Search Results</CardTitle>
                <CardDescription>
                  {searchResults.length} entries found
                </CardDescription>
              </CardHeader>
              <CardContent>
                {searchResults.length === 0 ? (
                  <p className="text-gray-500 text-sm">No entries match your search</p>
                ) : (
                  <div className="space-y-3">
                    {searchResults.map((entry) => (
                      <KnowledgeEntryCard
                        key={entry.id}
                        entry={entry}
                        onClick={setSelectedEntry}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Knowledge Bases List */}
          <Tabs defaultValue={knowledgeBases[0]?.id || 'all'}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                {knowledgeBases.map((kb) => (
                  <TabsTrigger key={kb.id} value={kb.id}>
                    {kb.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              <Button onClick={() => setShowNewKBModal(true)}>
                New Knowledge Base
              </Button>
            </div>

            {knowledgeBases.map((kb) => (
              <TabsContent key={kb.id} value={kb.id}>
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{kb.title}</CardTitle>
                        <CardDescription>{kb.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm">
                          Add Entry
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>{kb.entries.length} entries</span>
                      <span>{kb.collaborators.length} collaborators</span>
                      <span>{kb.isPublic ? 'Public' : 'Private'}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {kb.tags.map((tag, idx) => (
                        <Badge key={idx} variant="info" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {kb.entries.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p>No entries yet</p>
                        <Button size="sm" className="mt-2">
                          Create First Entry
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {kb.entries.map((entry) => (
                          <KnowledgeEntryCard
                            key={entry.id}
                            entry={entry}
                            onClick={setSelectedEntry}
                          />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Sidebar - Entry Viewer/Editor */}
        <div>
          {selectedEntryData ? (
            <Card className="sticky top-4">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{selectedEntryData.title}</CardTitle>
                  <button
                    onClick={() => setSelectedEntry(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Badge variant="info" size="sm">
                    {selectedEntryData.contentType}
                  </Badge>
                  <span>Updated {selectedEntryData.updatedAt.toLocaleDateString()}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-sm text-gray-700">
                    {selectedEntryData.content}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-4">
                  {selectedEntryData.tags.map((tag, idx) => (
                    <Badge key={idx} variant="default" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    Edit
                  </Button>
                  <Button size="sm" className="flex-1">
                    Use in Response
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <p className="text-gray-500 text-sm">
                  Select an entry to view its content
                </p>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Entries</span>
                  <span className="font-medium">{knowledgeEntries.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Knowledge Bases</span>
                  <span className="font-medium">{knowledgeBases.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Unique Tags</span>
                  <span className="font-medium">{allTags.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {knowledgeEntries.slice(0, 3).map((entry) => (
                  <div key={entry.id} className="text-sm">
                    <p className="font-medium text-gray-900">{entry.title}</p>
                    <p className="text-xs text-gray-500">
                      Updated {entry.updatedAt.toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* New Knowledge Base Modal */}
      {showNewKBModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Create Knowledge Base</CardTitle>
              <CardDescription>
                Organize your expert knowledge into collections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input label="Title" placeholder="e.g., AI/ML Resources" />
                <Textarea
                  label="Description"
                  placeholder="What kind of knowledge will this contain?"
                  rows={3}
                />
                <Input label="Tags" placeholder="Comma-separated tags" />
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isPublic" className="rounded" />
                  <label htmlFor="isPublic" className="text-sm text-gray-700">
                    Make this knowledge base public to other experts
                  </label>
                </div>
              </div>
            </CardContent>
            <div className="px-6 py-4 border-t flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowNewKBModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowNewKBModal(false)}>
                Create
              </Button>
            </div>
          </Card>
        </div>
      )}
    </PageLayout>
  );
}
