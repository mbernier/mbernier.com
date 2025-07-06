import { prisma } from './db';

/**
 * Log an admin action for audit purposes
 */
export async function logAdminAction(
  actorId: string,
  action: string,
  details: string,
  targetId?: string,
  targetType?: string
) {
  try {
    await prisma.adminAction.create({
      data: {
        actorId,
        action,
        target: targetType || 'unknown',
        targetId: targetId || 'unknown',
        details,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    console.error('Failed to log admin action:', error);
    // Don't throw error to avoid breaking the main flow
  }
}

/**
 * Get recent admin actions for audit trail
 */
export async function getRecentAdminActions(limit: number = 50) {
  try {
    return await prisma.adminAction.findMany({
      orderBy: {
        timestamp: 'desc',
      },
      take: limit,
      include: {
        // Include any related data if needed
      },
    });
  } catch (error) {
    console.error('Failed to fetch admin actions:', error);
    return [];
  }
}

/**
 * Get admin actions for a specific user
 */
export async function getAdminActionsByUser(userId: string, limit: number = 20) {
  try {
    return await prisma.adminAction.findMany({
      where: {
        actorId: userId,
      },
      orderBy: {
        timestamp: 'desc',
      },
      take: limit,
    });
  } catch (error) {
    console.error('Failed to fetch user admin actions:', error);
    return [];
  }
}

/**
 * Get admin actions for a specific target
 */
export async function getAdminActionsByTarget(targetId: string, targetType: string, limit: number = 20) {
  try {
    return await prisma.adminAction.findMany({
      where: {
        targetId,
        target: targetType,
      },
      orderBy: {
        timestamp: 'desc',
      },
      take: limit,
    });
  } catch (error) {
    console.error('Failed to fetch target admin actions:', error);
    return [];
  }
} 