import React from 'react';
import { requireAdminAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  FileText, 
  FolderOpen, 
  Mail, 
  Users, 
  Activity, 
  TrendingUp,
  Eye,
  MessageSquare,
  Calendar,
  Settings
} from 'lucide-react';
import Link from 'next/link';

async function getDashboardStats() {
  const [
    articleCount,
    projectCount,
    contactCount,
    unreadContacts,
    notificationCount,
    unreadNotifications,
    recentActivity,
    recentContacts,
  ] = await Promise.all([
    prisma.article.count(),
    prisma.project.count(),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { isRead: false } }),
    prisma.notification.count(),
    prisma.notification.count({ where: { isRead: false } }),
    prisma.activityItem.findMany({
      take: 5,
      orderBy: { publishedAt: 'desc' },
      include: {
        socialMetrics: true,
      },
    }),
    prisma.contactSubmission.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return {
    articleCount,
    projectCount,
    contactCount,
    unreadContacts,
    notificationCount,
    unreadNotifications,
    recentActivity,
    recentContacts,
  };
}

export default async function AdminDashboard() {
  const user = await requireAdminAuth();
  const stats = await getDashboardStats();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-graphite">
            Dashboard
          </h1>
          <div className="text-sm text-gray-600">
            Welcome back, {user.email || 'Admin'}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Articles
              </CardTitle>
                              <FileText className="h-4 w-4 text-[var(--color-primary-500)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-graphite">
                {stats.articleCount}
              </div>
              <p className="text-xs text-gray-500">
                Published content
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Projects
              </CardTitle>
                              <FolderOpen className="h-4 w-4 text-[var(--color-primary-500)]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-graphite">
                {stats.projectCount}
              </div>
              <p className="text-xs text-gray-500">
                Portfolio items
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Contact Submissions
              </CardTitle>
              <Mail className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-graphite">
                {stats.contactCount}
              </div>
              <p className="text-xs text-gray-500">
                {stats.unreadContacts} unread
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Notifications
              </CardTitle>
              <Activity className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-graphite">
                {stats.notificationCount}
              </div>
              <p className="text-xs text-gray-500">
                {stats.unreadNotifications} unread
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-graphite">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button asChild className="h-auto py-4 flex-col">
                <Link href="/admin/articles/new">
                  <FileText className="h-6 w-6 mb-2" />
                  New Article
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col">
                <Link href="/admin/projects/new">
                  <FolderOpen className="h-6 w-6 mb-2" />
                  New Project
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col">
                <Link href="/admin/contacts">
                  <Mail className="h-6 w-6 mb-2" />
                  View Contacts
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col">
                <Link href="/admin/settings">
                  <Settings className="h-6 w-6 mb-2" />
                  Settings
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity & Contacts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-graphite flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        {activity.type === 'article' && <FileText className="h-4 w-4 text-[var(--color-primary-500)]" />}
                        {activity.type === 'project' && <FolderOpen className="h-4 w-4 text-[var(--color-primary-500)]" />}
                        {activity.type === 'app_update' && <Activity className="h-4 w-4 text-secondary" />}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-graphite">
                          {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} Activity
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(activity.publishedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Eye className="h-3 w-3" />
                      {activity.socialMetrics.reduce((sum, metric) => sum + (metric.impressions || 0), 0)}
                    </div>
                  </div>
                ))}
                {stats.recentActivity.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No recent activity
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-graphite flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Recent Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${contact.isRead ? 'bg-gray-300' : 'bg-secondary'}`} />
                      <div>
                        <div className="text-sm font-medium text-graphite">
                          {contact.name || 'Anonymous'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {contact.serviceType && `${contact.serviceType} • `}
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {contact.budget && `$${contact.budget}`}
                    </div>
                  </div>
                ))}
                {stats.recentContacts.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No recent contacts
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}