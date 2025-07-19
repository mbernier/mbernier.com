import React from 'react';
import { requireAdminAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Activity, 
  FileText, 
  FolderOpen, 
  Smartphone, 
  Share2,
  Eye,
  Heart,
  MessageCircle,
  TrendingUp,
  Calendar,
  ExternalLink,
  RefreshCw
} from 'lucide-react';

async function getActivityData() {
  const [activities, socialMetrics, adminActions] = await Promise.all([
    prisma.activity_items.findMany({
      orderBy: { publishedAt: 'desc' },
      take: 50,
      include: {
        socialMetrics: true,
      },
    }),
    prisma.social_metrics.findMany({ orderBy: { createdAt: 'desc' }, take: 50 }),
    prisma.adminAction.findMany({ orderBy: { createdAt: 'desc' }, take: 50 }),
  ]);
  return { activities, aggregateMetrics: aggregateSocialMetrics(socialMetrics), adminActions };
}

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case 'article':
      return <FileText className="h-4 w-4" />;
    case 'project':
      return <FolderOpen className="h-4 w-4" />;
    case 'app_update':
      return <Smartphone className="h-4 w-4" />;
    case 'offer':
      return <Share2 className="h-4 w-4" />;
    default:
      return <Activity className="h-4 w-4" />;
  }
}

interface Activity {
  id: string;
  type: string;
  itemId: string;
  sourceUrl?: string;
  publishedAt: Date;
  status: string;
  scheduledAt?: Date;
  contextJson?: Record<string, unknown>;
  socialMetrics: Array<{
    impressions?: number;
    likes?: number;
    shares?: number;
    comments?: number;
  }>;
}

function ActivityCard({ activity }: { activity: Activity }) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'posted':
        return 'bg-green-100 text-green-800';
      case 'queued':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalEngagement = activity.socialMetrics.reduce((sum: number, metric: { likes?: number; shares?: number; comments?: number }) => {
    return sum + (metric.likes || 0) + (metric.shares || 0) + (metric.comments || 0);
  }, 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-[var(--color-primary-500)] rounded-lg flex items-center justify-center text-white">
              <ActivityIcon type={activity.type} />
            </div>
            <div>
              <CardTitle className="text-lg text-graphite">
                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} Activity
              </CardTitle>
              <div className="text-sm text-gray-500">
                {formatDate(activity.publishedAt)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(activity.status)}>
              {activity.status}
            </Badge>
            {activity.scheduledAt && (
              <Badge variant="outline" className="text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                Scheduled
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {activity.sourceUrl && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ExternalLink className="h-4 w-4" />
                            <a href={activity.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary-500)]">
              {activity.sourceUrl}
            </a>
          </div>
        )}

        {activity.contextJson && (
          <div className="p-3 bg-gray-50 rounded">
            <h4 className="font-medium text-sm text-graphite mb-2">Context</h4>
            <pre className="text-xs text-gray-600 overflow-auto">
              {JSON.stringify(activity.contextJson, null, 2)}
            </pre>
          </div>
        )}

        {activity.socialMetrics.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-graphite">Social Media Performance</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                  <Eye className="h-3 w-3" />
                  <span className="font-medium">
                    {activity.socialMetrics.reduce((sum: number, m) => sum + (m.impressions || 0), 0)}
                  </span>
                </div>
                <div className="text-xs text-gray-500">Impressions</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                  <Heart className="h-3 w-3" />
                  <span className="font-medium">
                    {activity.socialMetrics.reduce((sum: number, m) => sum + (m.likes || 0), 0)}
                  </span>
                </div>
                <div className="text-xs text-gray-500">Likes</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                  <Share2 className="h-3 w-3" />
                  <span className="font-medium">
                    {activity.socialMetrics.reduce((sum: number, m) => sum + (m.shares || 0), 0)}
                  </span>
                </div>
                <div className="text-xs text-gray-500">Shares</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                  <MessageCircle className="h-3 w-3" />
                                    <span className="font-medium">
                    {activity.socialMetrics.reduce((sum: number, m) => sum + (m.comments || 0), 0)}
                  </span>
                </div>
                <div className="text-xs text-gray-500">Comments</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="text-sm text-gray-600">
            Total Engagement: {totalEngagement}
          </div>
          <Button size="sm" variant="outline">
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh Metrics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function ActivityPage() {
  await requireAdminAuth();
  const { activities, aggregateMetrics } = await getActivityData();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-graphite">
            Platform Activity
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh All
            </Button>
            <Button variant="outline" size="sm">
              Export Data
            </Button>
          </div>
        </div>

        {/* Aggregate Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Impressions</p>
                  <p className="text-2xl font-bold text-graphite">{aggregateMetrics.totalImpressions.toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-[var(--color-primary-500)]" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Likes</p>
                  <p className="text-2xl font-bold text-secondary">{aggregateMetrics.totalLikes.toLocaleString()}</p>
                </div>
                <Heart className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Shares</p>
                  <p className="text-2xl font-bold text-graphite">{aggregateMetrics.totalShares.toLocaleString()}</p>
                </div>
                <Share2 className="h-8 w-8 text-[var(--color-primary-500)]" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Comments</p>
                  <p className="text-2xl font-bold text-graphite">{aggregateMetrics.totalComments.toLocaleString()}</p>
                </div>
                <MessageCircle className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-graphite flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-graphite mb-2">
                    No activity yet
                  </h3>
                  <p className="text-gray-600">
                    Platform activity will appear here as content is published and shared.
                  </p>
                </div>
              ) : (
                activities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}