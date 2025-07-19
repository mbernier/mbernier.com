import React from 'react';
import { requireAdminAuth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Mail, 
  Clock, 
  DollarSign, 
  Building, 
  MessageSquare,
  Calendar,
  Check
} from 'lucide-react';

async function getContactSubmissions() {
  const contacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const stats = {
    total: contacts.length,
    unread: contacts.filter(c => !c.isRead).length,
    thisWeek: contacts.filter(c => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return c.createdAt >= weekAgo;
    }).length,
  };

  return { contacts, stats };
}

interface ContactSubmission {
  id: string;
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string;
  budget?: string;
  timeline?: string;
  serviceType?: string;
  isRead?: boolean;
  createdAt: Date;
}

function ContactCard({ contact }: { contact: ContactSubmission }) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getServiceTypeColor = (serviceType: string) => {
    switch (serviceType) {
      case 'Fractional Product Management':
        return 'bg-[var(--color-primary-500)] text-white';
      case 'Technical Consulting':
        return 'bg-secondary text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getBudgetColor = (budget: string) => {
    const budgetNum = parseInt(budget.replace(/\D/g, ''));
    if (budgetNum >= 10000) return 'bg-green-100 text-green-800';
    if (budgetNum >= 5000) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <Card className={`${!contact.isRead ? 'ring-2 ring-secondary ring-opacity-20' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${contact.isRead ? 'bg-gray-300' : 'bg-secondary'}`} />
            <CardTitle className="text-lg text-graphite">
              {contact.name || 'Anonymous'}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              {formatDate(contact.createdAt)}
            </Badge>
            {!contact.isRead && (
              <Badge className="bg-secondary text-white text-xs">
                New
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contact.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{contact.email}</span>
            </div>
          )}
          
          {contact.company && (
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{contact.company}</span>
            </div>
          )}
          
          {contact.budget && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <Badge className={getBudgetColor(contact.budget)}>
                {contact.budget}
              </Badge>
            </div>
          )}
          
          {contact.timeline && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{contact.timeline}</span>
            </div>
          )}
        </div>
        
        {contact.serviceType && (
          <div className="flex items-center gap-2">
            <Badge className={getServiceTypeColor(contact.serviceType)}>
              {contact.serviceType}
            </Badge>
          </div>
        )}
        
        {contact.subject && (
          <div>
            <h4 className="font-medium text-graphite mb-1">Subject:</h4>
            <p className="text-sm text-gray-600">{contact.subject}</p>
          </div>
        )}
        
        {contact.message && (
          <div>
            <h4 className="font-medium text-graphite mb-1">Message:</h4>
            <p className="text-sm text-gray-600 line-clamp-3">{contact.message}</p>
          </div>
        )}
        
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex items-center gap-1">
            <Mail className="h-4 w-4" />
            Reply
          </Button>
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <Check className="h-4 w-4" />
            Mark as Read
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function ContactsPage() {
  await requireAdminAuth();
  const { contacts, stats } = await getContactSubmissions();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-graphite">
            Contact Submissions
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button variant="outline" size="sm">
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Contacts</p>
                  <p className="text-2xl font-bold text-graphite">{stats.total}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-[var(--color-primary-500)]" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Unread</p>
                  <p className="text-2xl font-bold text-secondary">{stats.unread}</p>
                </div>
                <Mail className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-graphite">{stats.thisWeek}</p>
                </div>
                <Calendar className="h-8 w-8 text-[var(--color-primary-500)]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contacts List */}
        <div className="space-y-4">
          {contacts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-graphite mb-2">
                  No contact submissions yet
                </h3>
                <p className="text-gray-600">
                  Contact submissions from your website will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}