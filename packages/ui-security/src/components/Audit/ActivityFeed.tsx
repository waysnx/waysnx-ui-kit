/**
 * ActivityFeed Component
 * 
 * Display user activity in a feed/notification style format.
 */

import React, { useState } from 'react';
import { Button } from '@waysnx/ui-core';
import { Stack } from '@waysnx/ui-layout';
import { Badge } from '@waysnx/ui-feedback';

export interface ActivityRecord {
  /**
   * Activity ID
   */
  id: string;
  /**
   * Activity type
   */
  type: string;
  /**
   * Activity description
   */
  description: string;
  /**
   * Timestamp
   */
  timestamp: Date;
  /**
   * Icon/emoji
   */
  icon?: string;
  /**
   * Activity status
   */
  status?: 'pending' | 'completed' | 'failed';
  /**
   * Actor (user, system, etc)
   */
  actor?: string;
}

export interface ActivityFeedProps {
  /**
   * Activity records
   */
  activities: ActivityRecord[];
  /**
   * Max activities to show initially
   */
  maxInitial?: number;
  /**
   * Enable real-time updates (simulation)
   */
  isLive?: boolean;
  /**
   * Group by date
   */
  groupByDate?: boolean;
}

const getActivityIcon = (type: string, customIcon?: string) => {
  if (customIcon) return customIcon;
  const icons: Record<string, string> = {
    login: 'ðŸ”“',
    logout: 'ðŸ”’',
    'password-change': 'ðŸ”',
    'mfa-setup': 'âœ“',
    'permission-grant': 'âœ“',
    'permission-revoke': 'âœ•',
    'file-upload': 'ðŸ“¤',
    'file-download': 'ðŸ“¥',
    'session-created': '+',
    'session-terminated': '-',
  };
  return icons[type] || 'â€¢';
};

const getStatusColor = (status?: string) => {
  const colors = {
    completed: 'success',
    pending: 'warning',
    failed: 'danger',
  };
  return colors[status as keyof typeof colors] || 'info';
};

const groupActivitiesByDate = (activities: ActivityRecord[]) => {
  const groups: Record<string, ActivityRecord[]> = {};
  activities.forEach(activity => {
    const dateKey = activity.timestamp.toLocaleDateString();
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(activity);
  });
  return groups;
};

/**
 * ActivityFeed - Display user activity in feed format
 */
export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  maxInitial = 10,
  isLive = false,
  groupByDate = true,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [isExpanded, setIsExpanded] = useState<Set<string>>(new Set());

  const displayedActivities = showAll ? activities : activities.slice(0, maxInitial);
  const hasMore = activities.length > maxInitial;

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(isExpanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setIsExpanded(newExpanded);
  };

  if (groupByDate) {
    const grouped = groupActivitiesByDate(displayedActivities);
    return (
      <div>
        {Object.entries(grouped)
          .reverse()
          .map(([date, dateActivities]) => (
            <div key={date} marginBottom="lg">
              <span fontSize="xs" fontWeight="bold" color="muted" marginBottom="md">
                {date}
              </span>
              <Stack gap="md">
                {dateActivities.map(activity => (
                  <ActivityItem
                    key={activity.id}
                    activity={activity}
                    isExpanded={isExpanded.has(activity.id)}
                    onToggle={() => toggleExpand(activity.id)}
                  />
                ))}
              </Stack>
            </div>
          ))}

        {hasMore && !showAll && (
          <div textAlign="center" marginTop="lg">
            <Button
              variant="outline"
              onClick={() => setShowAll(true)}
            >
              Load More ({activities.length - maxInitial} more)
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <Stack gap="md">
        {displayedActivities.map(activity => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            isExpanded={isExpanded.has(activity.id)}
            onToggle={() => toggleExpand(activity.id)}
          />
        ))}
      </Stack>

      {hasMore && !showAll && (
        <div textAlign="center" marginTop="lg">
          <Button
            variant="outline"
            onClick={() => setShowAll(true)}
          >
            Load More ({activities.length - maxInitial} more)
          </Button>
        </div>
      )}
    </div>
  );
};

interface ActivityItemProps {
  activity: ActivityRecord;
  isExpanded: boolean;
  onToggle: () => void;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity, isExpanded, onToggle }) => {
  const icon = getActivityIcon(activity.type, activity.icon);
  const statusColor = getStatusColor(activity.status);

  return (
    <div
      padding="md"
      backgroundColor="background-alt"
      borderRadius="md"
      border="1px solid var(--color-border, #ccc)"
      cursor="pointer"
      onClick={onToggle}
    >
      <div display="flex" justifyContent="space-between" alignItems="flex-start">
        <div display="flex" gap="md" flex={1}>
          <div fontSize="lg" flex={0}>
            {icon}
          </div>
          <div flex={1}>
            <span fontSize="sm" fontWeight="bold">
              {activity.description}
            </span>
            <div display="flex" gap="md" marginTop="xs">
              <span fontSize="xs" color="muted">
                {activity.timestamp.toLocaleTimeString()}
              </span>
              {activity.actor && (
                <span fontSize="xs" color="muted">
                  by {activity.actor}
                </span>
              )}
            </div>
          </div>
        </div>

        <div display="flex" gap="md" alignItems="center">
          {activity.status && (
            <Badge color={statusColor}>
              {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
            </Badge>
          )}
          <span fontSize="lg">{isExpanded ? 'â–¼' : 'â–¶'}</span>
        </div>
      </div>

      {isExpanded && (
        <div
          marginTop="md"
          paddingTop="md"
          borderTop="1px solid var(--color-border, #ccc)"
        >
          <div display="flex" justifyContent="space-between" fontSize="sm">
            <span color="muted">ID:</span>
            <span fontFamily="monospace">{activity.id}</span>
          </div>
          <div display="flex" justifyContent="space-between" fontSize="sm" marginTop="xs">
            <span color="muted">Type:</span>
            <span>{activity.type}</span>
          </div>
          <div display="flex" justifyContent="space-between" fontSize="sm" marginTop="xs">
            <span color="muted">Time:</span>
            <span>{activity.timestamp.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

ActivityFeed.displayName = 'ActivityFeed';

export default ActivityFeed;
