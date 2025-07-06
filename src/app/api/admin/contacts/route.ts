import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser, logAdminAction } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user || !['admin', 'editor'].includes(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const unreadOnly = searchParams.get('unread') === 'true';
    const offset = (page - 1) * limit;

    const where = unreadOnly ? { isRead: false } : {};

    const [contacts, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.contactSubmission.count({ where }),
    ]);

    return NextResponse.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user || !['admin', 'editor'].includes(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { contactId, action } = await request.json();

    if (!contactId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let updatedContact;

    switch (action) {
      case 'mark_read':
        updatedContact = await prisma.contactSubmission.update({
          where: { id: contactId },
          data: { isRead: true },
        });
        await logAdminAction('mark_read', 'contact', contactId);
        break;
      
      case 'mark_unread':
        updatedContact = await prisma.contactSubmission.update({
          where: { id: contactId },
          data: { isRead: false },
        });
        await logAdminAction('mark_unread', 'contact', contactId);
        break;
      
      case 'delete':
        await prisma.contactSubmission.delete({
          where: { id: contactId },
        });
        await logAdminAction('delete', 'contact', contactId);
        return NextResponse.json({ message: 'Contact deleted successfully' });
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json(updatedContact);
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user || !['admin', 'editor'].includes(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, contactIds } = await request.json();

    if (!action || !contactIds || !Array.isArray(contactIds)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    switch (action) {
      case 'mark_all_read':
        await prisma.contactSubmission.updateMany({
          where: { id: { in: contactIds } },
          data: { isRead: true },
        });
        
        // Log admin action for each contact
        for (const contactId of contactIds) {
          await logAdminAction('mark_read', 'contact', contactId);
        }
        
        return NextResponse.json({ message: `${contactIds.length} contacts marked as read` });
      
      case 'delete_multiple':
        await prisma.contactSubmission.deleteMany({
          where: { id: { in: contactIds } },
        });
        
        // Log admin action for each contact
        for (const contactId of contactIds) {
          await logAdminAction('delete', 'contact', contactId);
        }
        
        return NextResponse.json({ message: `${contactIds.length} contacts deleted` });
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error performing batch action:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}