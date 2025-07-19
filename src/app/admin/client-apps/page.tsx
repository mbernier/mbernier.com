import React from 'react';
import { requireAdminAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Key, 
  Plus, 
  Eye, 
  EyeOff, 
  Copy, 
  Trash2, 
  Activity, 
  Users, 
  Settings,
  Shield,
  MoreVertical
} from 'lucide-react';

async function getClientApps() {
  const apps = await prisma.clientApp.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      usage: {
        orderBy: { timestamp: 'desc' },
        take: 5,
      },
      _count: {
        select: {
          usage: true,
        },
      },
    },
  });

  const stats = {
    total: apps.length,
    active: apps.filter(app => app.usage.length > 0).length,
    totalUsage: apps.reduce((sum, app) => sum + app._count.usage, 0),
  };

  return { apps, stats };
}

interface ClientApp {
  id: string;
  name: string;
  apiKey: string;
  permissions: string[];
  purposes: string[];
  createdAt: Date;
  usage: Array<{ timestamp: Date }>;
  _count: { usage: number };
}

function ClientAppCard({ app }: { app: ClientApp }) {
  const [showApiKey, setShowApiKey] = React.useState(false);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const copyApiKey = async () => {
    await navigator.clipboard.writeText(app.apiKey);
    // You could add a toast notification here
  };

  const getUsageLastWeek = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return app.usage.filter((usage: { timestamp: Date }) => usage.timestamp >= weekAgo).length;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-graphite flex items-center gap-2">
                            <div className="w-8 h-8 bg-[var(--color-primary-500)] rounded-lg flex items-center justify-center">
              <Key className="h-4 w-4 text-white" />
            </div>
            {app.name}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={app.usage.length > 0 ? 'success' : 'outline'}>
              {app.usage.length > 0 ? 'Active' : 'Inactive'}
            </Badge>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* API Key */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-graphite">API Key</span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowApiKey(!showApiKey)}
                className="h-6 w-6 p-0"
              >
                {showApiKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyApiKey}
                className="h-6 w-6 p-0"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="p-2 bg-gray-50 rounded border font-mono text-sm">
            {showApiKey ? app.apiKey : `${app.apiKey.substring(0, 8)}...${app.apiKey.substring(app.apiKey.length - 4)}`}
          </div>
        </div>

        {/* Permissions */}
        <div className="space-y-2">
          <span className="text-sm font-medium text-graphite">Permissions</span>
          <div className="flex flex-wrap gap-1">
            {app.permissions.map((permission: string) => (
              <Badge key={permission} variant="outline" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                {permission}
              </Badge>
            ))}
          </div>
        </div>

        {/* Purposes */}
        <div className="space-y-2">
          <span className="text-sm font-medium text-graphite">Purpose</span>
          <div className="flex flex-wrap gap-1">
            {app.purposes.map((purpose: string) => (
              <Badge key={purpose} variant="secondary" className="text-xs">
                {purpose}
              </Badge>
            ))}
          </div>
        </div>

        {/* Usage Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-bold text-graphite">{app._count.usage}</div>
            <div className="text-xs text-gray-500">Total Requests</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-graphite">{getUsageLastWeek()}</div>
            <div className="text-xs text-gray-500">This Week</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-graphite">{formatDate(app.createdAt)}</div>
            <div className="text-xs text-gray-500">Created</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline">
            <Settings className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button size="sm" variant="outline">
            <Activity className="h-4 w-4 mr-1" />
            View Usage
          </Button>
          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
            <Trash2 className="h-4 w-4 mr-1" />
            Revoke
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function ClientAppsPage() {
  await requireAdminAuth();
  const { apps, stats } = await getClientApps();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-graphite">
            Client Applications
          </h1>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New App
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Apps</p>
                  <p className="text-2xl font-bold text-graphite">{stats.total}</p>
                </div>
                <Users className="h-8 w-8 text-[var(--color-primary-500)]" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Apps</p>
                  <p className="text-2xl font-bold text-secondary">{stats.active}</p>
                </div>
                <Activity className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-graphite">{stats.totalUsage}</p>
                </div>
                <Key className="h-8 w-8 text-[var(--color-primary-500)]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Apps List */}
        <div className="space-y-4">
          {apps.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-graphite mb-2">
                  No client applications yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Create your first client application to start using the API.
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First App
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {apps.map((app) => (
                <ClientAppCard key={app.id} app={app} />
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}