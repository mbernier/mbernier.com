'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  Save, 
  Wand2, 
  Image, 
  Link2, 
  Tags, 
  Eye, 
  FileText,
  FolderOpen,
  Store,
  Sparkles,
  X,
  Plus
} from 'lucide-react';

interface ContentEditorProps {
  initialContent?: string;
  initialTitle?: string;
  onSave?: (content: string, metadata: ContentMetadata) => void;
  contentType?: 'article' | 'project';
}

interface ContentMetadata {
  title: string;
  excerpt: string;
  tags: string[];
  categories: string[];
  focusKeyword?: string;
  secondaryKeywords?: string[];
  image?: string;
  relatedContent?: RelatedContentItem[];
}

interface RelatedContentItem {
  id: string;
  title: string;
  slug: string;
  type: 'article' | 'project' | 'offer';
  relevanceScore?: number;
  manual?: boolean;
}

interface SlashCommand {
  command: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export function ContentEditor({ 
  initialContent = '', 
  initialTitle = '',
  onSave,
  // contentType = 'article'
}: ContentEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);
  const [metadata, setMetadata] = useState<ContentMetadata>({
    title: initialTitle,
    excerpt: '',
    tags: [],
    categories: [],
    relatedContent: [],
  });
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [showSlashCommands, setShowSlashCommands] = useState(false);
  // const [slashPosition, setSlashPosition] = useState(0);
  // const [showRelatedModal, setShowRelatedModal] = useState(false);
  const [availableContent, setAvailableContent] = useState<RelatedContentItem[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<{
    title?: string;
    excerpt?: string;
    tags?: string[];
    categories?: string[];
    focusKeyword?: string;
    secondaryKeywords?: string[];
  } | null>(null);
  
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const slashMenuRef = useRef<HTMLDivElement>(null);

  const slashCommands: SlashCommand[] = [
    {
      command: '/project',
      description: 'Link to a project',
      icon: FolderOpen,
      action: () => handleSlashCommand(),
    },
    {
      command: '/article',
      description: 'Link to an article',
      icon: FileText,
      action: () => handleSlashCommand(),
    },
    {
      command: '/offer',
      description: 'Link to a resource/offer',
      icon: Store,
      action: () => handleSlashCommand(),
    },
    {
      command: '/enhance',
      description: 'AI enhance content',
      icon: Wand2,
      action: () => handleAIEnhancement(),
    },
    {
      command: '/image',
      description: 'Generate AI image',
      icon: Image,
      action: () => handleGenerateImage(),
    },
    {
      command: '/related',
      description: 'Suggest related content',
      icon: Link2,
      action: () => handleRelatedContent(),
    },
  ];

  useEffect(() => {
    // Load available content for linking
    fetchAvailableContent();
  }, []);

  const fetchAvailableContent = async () => {
    try {
      const response = await fetch('/api/admin/content/search');
      if (response.ok) {
        const data = await response.json();
        setAvailableContent(data.content || []);
      }
    } catch (error) {
      console.error('Error fetching available content:', error);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);

    // Check for slash commands
    const cursorPosition = e.target.selectionStart;
    const textBeforeCursor = newContent.slice(0, cursorPosition);
    const lastSlashIndex = textBeforeCursor.lastIndexOf('/');
    
    if (lastSlashIndex !== -1 && cursorPosition - lastSlashIndex <= 20) {
      const textAfterSlash = textBeforeCursor.slice(lastSlashIndex);
      if (textAfterSlash.match(/^\/\w*$/)) {
        setSlashPosition(lastSlashIndex);
        setShowSlashCommands(true);
        return;
      }
    }
    
    setShowSlashCommands(false);
  };

  const handleSlashCommand = () => {
    setShowSlashCommands(false);
    setShowRelatedModal(true);
    // Filter available content by type
    // Implementation for content linking modal
  };

  const handleAIEnhancement = async () => {
    setIsEnhancing(true);
    try {
      const response = await fetch('/api/admin/ai/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, title }),
      });
      
      if (response.ok) {
        const enhancement = await response.json();
        setAiSuggestions(enhancement);
        setMetadata(prev => ({
          ...prev,
          ...enhancement,
          title: enhancement.title || prev.title,
        }));
      }
    } catch (error) {
      console.error('Error enhancing content:', error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerateImage = async () => {
    try {
      const response = await fetch('/api/admin/ai/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      
      if (response.ok) {
        const { imageUrl } = await response.json();
        setMetadata(prev => ({ ...prev, image: imageUrl }));
      }
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const handleRelatedContent = async () => {
    try {
      const response = await fetch('/api/admin/ai/related-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, availableContent }),
      });
      
      if (response.ok) {
        const suggestions = await response.json();
        setMetadata(prev => ({
          ...prev,
          relatedContent: [...(prev.relatedContent || []), ...suggestions],
        }));
      }
    } catch (error) {
      console.error('Error getting related content:', error);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(content, { ...metadata, title });
    }
  };

  const addTag = (tag: string) => {
    if (!metadata.tags.includes(tag)) {
      setMetadata(prev => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
  };

  const removeTag = (tag: string) => {
    setMetadata(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };

  const applySuggestion = (key: string, value: string | string[]) => {
    setMetadata(prev => ({ ...prev, [key]: value }));
    if (key === 'title') {
      setTitle(value);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-graphite">Content Editor</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleAIEnhancement} disabled={isEnhancing}>
            <Wand2 className="h-4 w-4 mr-2" />
            {isEnhancing ? 'Enhancing...' : 'AI Enhance'}
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-graphite mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter title..."
            />
          </div>

          {/* Content Editor */}
          <div className="relative">
            <label className="block text-sm font-medium text-graphite mb-2">
              Content
            </label>
            <textarea
              ref={editorRef}
              value={content}
              onChange={handleContentChange}
              className="w-full h-96 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
              placeholder="Start writing... Use / for commands"
            />
            
            {/* Slash Commands Menu */}
            {showSlashCommands && (
              <div
                ref={slashMenuRef}
                className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-2 min-w-64"
                style={{
                  top: '100px', // You'd calculate this based on cursor position
                  left: '20px',
                }}
              >
                {slashCommands.map((cmd) => (
                  <button
                    key={cmd.command}
                    onClick={cmd.action}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 rounded"
                  >
                    <cmd.icon className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="font-medium text-sm">{cmd.command}</div>
                      <div className="text-xs text-gray-500">{cmd.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AI Suggestions */}
          {aiSuggestions && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-secondary" />
                  AI Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiSuggestions.title && aiSuggestions.title !== title && (
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                    <div>
                      <div className="font-medium text-sm">Improved Title</div>
                      <div className="text-sm text-gray-600">{aiSuggestions.title}</div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => applySuggestion('title', aiSuggestions.title)}
                    >
                      Apply
                    </Button>
                  </div>
                )}
                
                {aiSuggestions.excerpt && (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                    <div>
                      <div className="font-medium text-sm">Generated Excerpt</div>
                      <div className="text-sm text-gray-600">{aiSuggestions.excerpt}</div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => applySuggestion('excerpt', aiSuggestions.excerpt)}
                    >
                      Apply
                    </Button>
                  </div>
                )}
                
                {aiSuggestions.tags && aiSuggestions.tags.length > 0 && (
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
                    <div>
                      <div className="font-medium text-sm">Suggested Tags</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {aiSuggestions.tags.map((tag: string) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => applySuggestion('tags', aiSuggestions.tags)}
                    >
                      Apply All
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-graphite mb-2">
                  Excerpt
                </label>
                <textarea
                  value={metadata.excerpt}
                  onChange={(e) => setMetadata(prev => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  rows={3}
                  placeholder="Brief description..."
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-graphite mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-1 mb-2">
                  {metadata.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add tag and press Enter"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      addTag(e.currentTarget.value.trim());
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-graphite mb-2">
                  Categories
                </label>
                <div className="flex flex-wrap gap-1">
                  {metadata.categories.map((category) => (
                    <Badge key={category} variant="outline" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Related Content
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowRelatedModal(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {metadata.relatedContent && metadata.relatedContent.length > 0 ? (
                <div className="space-y-2">
                  {metadata.relatedContent.map((item) => (
                    <div key={`${item.type}-${item.id}`} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        {item.type === 'article' && <FileText className="h-4 w-4 text-[var(--color-primary-500)]" />}
                                                  {item.type === 'project' && <FolderOpen className="h-4 w-4 text-[var(--color-primary-500)]" />}
                        {item.type === 'offer' && <Store className="h-4 w-4 text-secondary" />}
                        <div>
                          <div className="text-sm font-medium">{item.title}</div>
                          {item.relevanceScore && (
                            <div className="text-xs text-gray-500">
                              Relevance: {Math.round(item.relevanceScore * 100)}%
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => setMetadata(prev => ({
                          ...prev,
                          relatedContent: prev.relatedContent?.filter(r => r.id !== item.id)
                        }))}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <Link2 className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">No related content yet</p>
                  <p className="text-xs">Use AI suggestions or add manually</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateImage}
                className="w-full justify-start"
              >
                <Image className="h-4 w-4 mr-2" alt="Generate AI Image" />
                Generate Image
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRelatedContent}
                className="w-full justify-start"
              >
                <Link2 className="h-4 w-4 mr-2" />
                Find Related Content
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
              >
                <Tags className="h-4 w-4 mr-2" />
                Generate Tags
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <h1 className="text-2xl font-bold mb-4">{title || 'Untitled'}</h1>
            {metadata.excerpt && (
              <p className="text-gray-600 italic mb-4">{metadata.excerpt}</p>
            )}
            <div className="whitespace-pre-wrap text-sm">
              {content || 'Start writing to see preview...'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}