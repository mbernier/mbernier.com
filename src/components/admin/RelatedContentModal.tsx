'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { 
  X, 
  Search, 
  FileText, 
  FolderOpen, 
  Store, 
  Plus,
  Wand2,
  Filter,
  Star,
  ExternalLink
} from 'lucide-react';

interface RelatedContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (items: RelatedContentItem[]) => void;
  currentContent: string;
  selectedItems?: RelatedContentItem[];
  contentType?: 'article' | 'project' | 'offer' | 'all';
}

interface RelatedContentItem {
  id: string;
  title: string;
  slug: string;
  type: 'article' | 'project' | 'offer';
  excerpt?: string;
  tags?: string[];
  categories?: string[];
  relevanceScore?: number;
  manual?: boolean;
}

interface ContentCluster {
  topic: string;
  items: RelatedContentItem[];
  relevanceScore: number;
}

export function RelatedContentModal({
  isOpen,
  onClose,
  onSelect,
  currentContent,
  selectedItems = [],
  contentType = 'all'
}: RelatedContentModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [availableContent, setAvailableContent] = useState<RelatedContentItem[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<RelatedContentItem[]>([]);
  const [topicClusters, setTopicClusters] = useState<ContentCluster[]>([]);
  const [selectedTab, setSelectedTab] = useState<'search' | 'ai' | 'clusters'>('ai');
  const [filterType, setFilterType] = useState<'all' | 'article' | 'project' | 'offer'>('all');
  const [loading, setLoading] = useState(false);
  const [selection, setSelection] = useState<RelatedContentItem[]>(selectedItems);

  useEffect(() => {
    if (isOpen) {
      fetchAvailableContent();
      if (currentContent.trim()) {
        generateAISuggestions();
        generateTopicClusters();
      }
    }
  }, [isOpen, currentContent]);

  const fetchAvailableContent = async () => {
    try {
      const response = await fetch('/api/admin/content/search');
      if (response.ok) {
        const data = await response.json();
        setAvailableContent(data.content || []);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const generateAISuggestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/ai/related-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: currentContent, availableContent }),
      });
      
      if (response.ok) {
        const suggestions = await response.json();
        setAiSuggestions(suggestions);
      }
    } catch (error) {
      console.error('Error generating AI suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateTopicClusters = async () => {
    try {
      const response = await fetch('/api/admin/ai/topic-clusters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: currentContent, availableContent }),
      });
      
      if (response.ok) {
        const clusters = await response.json();
        setTopicClusters(clusters);
      }
    } catch (error) {
      console.error('Error generating topic clusters:', error);
    }
  };

  const filteredContent = availableContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const toggleSelection = (item: RelatedContentItem) => {
    const isSelected = selection.some(s => s.id === item.id && s.type === item.type);
    if (isSelected) {
      setSelection(selection.filter(s => !(s.id === item.id && s.type === item.type)));
    } else {
      setSelection([...selection, { ...item, manual: true }]);
    }
  };

  const isSelected = (item: RelatedContentItem) => {
    return selection.some(s => s.id === item.id && s.type === item.type);
  };

  const handleApply = () => {
    onSelect(selection);
    onClose();
  };

  const ContentCard = ({ item, showRelevance = false }: { item: RelatedContentItem; showRelevance?: boolean }) => (
    <Card className={`cursor-pointer transition-all ${isSelected(item) ? 'ring-2 ring-primary bg-primary-50' : 'hover:shadow-md'}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0 mt-1">
              {item.type === 'article' && <FileText className="h-4 w-4 text-primary" />}
              {item.type === 'project' && <FolderOpen className="h-4 w-4 text-primary" />}
              {item.type === 'offer' && <Store className="h-4 w-4 text-secondary" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-graphite mb-1 truncate">{item.title}</h4>
              {item.excerpt && (
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.excerpt}</p>
              )}
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">{item.type}</Badge>
                {showRelevance && item.relevanceScore && (
                  <Badge variant="secondary" className="text-xs">
                    {Math.round(item.relevanceScore * 100)}% match
                  </Badge>
                )}
                {item.manual && (
                  <Badge variant="outline" className="text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Manual
                  </Badge>
                )}
              </div>
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                window.open(`/${item.type}s/${item.slug}`, '_blank');
              }}
              className="text-gray-400 hover:text-primary"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
            <button
              onClick={() => toggleSelection(item)}
                              className={`p-1 rounded ${isSelected(item) ? 'bg-primary-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {isSelected(item) ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-graphite">Add Related Content</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => setSelectedTab('ai')}
                              className={`px-4 py-2 rounded-lg font-medium ${selectedTab === 'ai' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <Wand2 className="h-4 w-4 mr-2 inline" />
              AI Suggestions
            </button>
            <button
              onClick={() => setSelectedTab('clusters')}
                              className={`px-4 py-2 rounded-lg font-medium ${selectedTab === 'clusters' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <Filter className="h-4 w-4 mr-2 inline" />
              Topic Clusters
            </button>
            <button
              onClick={() => setSelectedTab('search')}
                              className={`px-4 py-2 rounded-lg font-medium ${selectedTab === 'search' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <Search className="h-4 w-4 mr-2 inline" />
              Manual Search
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Main Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            {selectedTab === 'search' && (
              <div className="space-y-4">
                {/* Search Controls */}
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search content..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="all">All Types</option>
                    <option value="article">Articles</option>
                    <option value="project">Projects</option>
                    <option value="offer">Resources</option>
                  </select>
                </div>

                {/* Search Results */}
                <div className="space-y-3">
                  {filteredContent.map(item => (
                    <ContentCard key={`${item.type}-${item.id}`} item={item} />
                  ))}
                  {filteredContent.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p>No content found matching your search.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedTab === 'ai' && (
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <Wand2 className="h-12 w-12 mx-auto mb-4 text-gray-400 animate-spin" />
                    <p className="text-gray-500">Generating AI suggestions...</p>
                  </div>
                ) : aiSuggestions.length > 0 ? (
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600 mb-4">
                      AI has analyzed your content and found {aiSuggestions.length} potentially relevant items:
                    </div>
                    {aiSuggestions.map(item => (
                      <ContentCard key={`${item.type}-${item.id}`} item={item} showRelevance />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Wand2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>No AI suggestions available yet.</p>
                    <p className="text-sm">Add some content to get intelligent recommendations.</p>
                  </div>
                )}
              </div>
            )}

            {selectedTab === 'clusters' && (
              <div className="space-y-6">
                {topicClusters.length > 0 ? (
                  topicClusters.map((cluster, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-graphite">{cluster.topic}</h3>
                        <Badge variant="outline" className="text-xs">
                          {Math.round(cluster.relevanceScore * 100)}% relevance
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {cluster.items.map(item => (
                          <ContentCard key={`${item.type}-${item.id}`} item={item} showRelevance />
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Filter className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>No topic clusters generated yet.</p>
                    <p className="text-sm">Topic clustering helps organize related content by themes.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar - Selected Items */}
          <div className="w-80 border-l bg-gray-50 p-6">
            <h3 className="font-semibold text-graphite mb-4">
              Selected Items ({selection.length})
            </h3>
            {selection.length > 0 ? (
              <div className="space-y-2 mb-6">
                {selection.map(item => (
                  <div key={`${item.type}-${item.id}`} className="flex items-center justify-between p-2 bg-white rounded border">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {item.type === 'article' && <FileText className="h-4 w-4 text-primary flex-shrink-0" />}
                      {item.type === 'project' && <FolderOpen className="h-4 w-4 text-primary flex-shrink-0" />}
                      {item.type === 'offer' && <Store className="h-4 w-4 text-secondary flex-shrink-0" />}
                      <span className="text-sm truncate">{item.title}</span>
                    </div>
                    <button
                      onClick={() => toggleSelection(item)}
                      className="text-gray-400 hover:text-red-600 flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 mb-6">
                <Plus className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No items selected</p>
              </div>
            )}
            
            {/* Actions */}
            <div className="space-y-2">
              <Button onClick={handleApply} className="w-full">
                Apply Selection ({selection.length})
              </Button>
              <Button variant="outline" onClick={onClose} className="w-full">
                Cancel
              </Button>
              {selection.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setSelection([])}
                  className="w-full text-gray-600"
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}