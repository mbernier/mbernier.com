import { currentUser } from '@clerk/nextjs/server';
import { prisma } from './db';

/**
 * Get the current authenticated user
 */
export async function getCurrentUser() {
  const user = await currentUser();
  
  if (!user) {
    return null;
  }

  // For now, we'll assume all authenticated users are admins
  // In a real implementation, you'd check against a user roles table
  return {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress,
    firstName: user.firstName,
    lastName: user.lastName,
    role: 'admin', // Default role for authenticated users
  };
}

/**
 * Require admin authentication - throws error if not authenticated
 */
export async function requireAdminAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('Authentication required');
  }

  return user;
}

/**
 * Log admin actions for audit trail
 */
export async function logAdminAction(
  action: string,
  target: string,
  targetId: string
) {
  const user = await getCurrentUser();
  
  if (!user) {
    console.warn('Attempted to log admin action without authenticated user');
    return;
  }

  try {
    await prisma.adminAction.create({
      data: {
        actorId: user.id,
        action,
        target,
        targetId,
      },
    });
  } catch (error) {
    console.error('Failed to log admin action:', error);
  }
}