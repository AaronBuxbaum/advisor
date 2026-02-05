'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageLayout } from '@/components/layouts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { getAllTags } from '@/lib/data';
import type { ContentType } from '@/types';

export default function NewContentPage() {
  const router = useRouter();
  const analystId = '3';
  const allTags = getAllTags();

  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentType, setContentType] = useState<ContentType>('article');
  const [source, setSource] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [annotation, setAnnotation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const contentTypes: ContentType[] = ['video', 'article', 'paper', 'tutorial', 'tool', 'course', 'other'];

  const handleAddTag = () => {
    if (newTag && !selectedTags.includes(newTag)) {
      setSelectedTags([...selectedTags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Submitting content:', {
      url,
      title,
      description,
      contentType,
      source,
      tags: selectedTags,
      difficulty,
      annotation,
    });

    setIsLoading(false);
    router.push('/analyst');
  };

  const handleFetchMetadata = async () => {
    if (!url) return;
    setIsLoading(true);

    // Simulate fetching metadata from URL
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock auto-fill based on URL
    if (url.includes('youtube')) {
      setContentType('video');
      setSource('YouTube');
    } else if (url.includes('arxiv')) {
      setContentType('paper');
      setSource('arXiv');
    } else if (url.includes('medium')) {
      setContentType('article');
      setSource('Medium');
    }

    setIsLoading(false);
  };

  return (
    <PageLayout userId={analystId} role="analyst">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Add New Content</h1>
          <p className="text-gray-600">
            Curate content from the web for experts to use in their recommendations
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Content URL</CardTitle>
              <CardDescription>
                Enter the URL of the content you want to add
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="https://..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleFetchMetadata}
                  disabled={!url || isLoading}
                >
                  Fetch Info
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Content Details</CardTitle>
              <CardDescription>
                Describe the content for better discoverability
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Title"
                placeholder="Content title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <Textarea
                label="Description"
                placeholder="Brief description of the content and why it's valuable"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content Type
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value as ContentType)}
                  >
                    {contentTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Source"
                  placeholder="e.g., YouTube, Medium, arXiv"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty Level
                </label>
                <div className="flex gap-2">
                  {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setDifficulty(level)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        difficulty === level
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <CardDescription>
                Add tags to help experts find this content
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Selected Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="info">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-red-500"
                    >
                      x
                    </button>
                  </Badge>
                ))}
              </div>

              {/* Add Tag */}
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Add a tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={handleAddTag}>
                  Add
                </Button>
              </div>

              {/* Suggested Tags */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Suggested tags:</p>
                <div className="flex flex-wrap gap-1">
                  {allTags
                    .filter(tag => !selectedTags.includes(tag.name))
                    .slice(0, 10)
                    .map((tag) => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => setSelectedTags([...selectedTags, tag.name])}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200"
                      >
                        + {tag.name}
                      </button>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Initial Annotation</CardTitle>
              <CardDescription>
                Add your notes about this content (optional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="What makes this content valuable? Any specific insights or warnings?"
                value={annotation}
                onChange={(e) => setAnnotation(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Add Content'}
            </Button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}
