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
    login: '🔓',
    logout: '🔒',
    'password-change': '🔑',
    'mfa-setup': '✓',
    'permission-grant': '✓',
    'permission-revoke': '✕',
    'file-upload': '↑',
    'file-download': '↓',
    'session-created': '+',
    'session-terminated': '-',
  };
  return icons[type] || '•';
};

type BadgeColor = 'default' | 'success' | 'error' | 'warning' | 'info';

const getStatusColor = (status?: string): BadgeColor => {
  const colors: Record<string, BadgeColor> = {
    completed: 'success',
    pending: 'warning',
    failed: 'error',
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
            <div key={date} style={{ marginBottom: 16 }}>
              <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--wx-color-text-muted, #717182)', marginBottom: 12 }}>
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
          <div style={{ textAlign: 'center', marginTop: 16 }}>
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
        <div style={{ textAlign: 'center', marginTop: 16 }}>
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
      style={{
        padding: 12,
        background: 'var(--wx-color-background-alt, #f3f3f5)',
        borderRadius: 8,
        border: '1px solid var(--wx-color-border, #ccc)',
        cursor: 'pointer',
      }}
      onClick={onToggle}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: 12, flex: 1 }}>
          <div style={{ fontSize: '1.125rem', flex: 0 }}>
            {icon}
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700 }}>
              {activity.description}
            </span>
            <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--wx-color-text-muted, #717182)' }}>
                {activity.timestamp.toLocaleTimeString()}
              </span>
              {activity.actor && (
                <span style={{ fontSize: '0.75rem', color: 'var(--wx-color-text-muted, #717182)' }}>
                  by {activity.actor}
                </span>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {activity.status && (
            <Badge color={statusColor}>
              {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
            </Badge>
          )}
          <span style={{ fontSize: '1.125rem' }}>{isExpanded ? '▼' : '▶'}</span>
        </div>
      </div>

      {isExpanded && (
        <div
          style={{
            marginTop: 12,
            paddingTop: 12,
            borderTop: '1px solid var(--wx-color-border, #ccc)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--wx-color-text-muted, #717182)' }}>ID:</span>
            <span style={{ fontFamily: 'monospace' }}>{activity.id}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginTop: 4 }}>
            <span style={{ color: 'var(--wx-color-text-muted, #717182)' }}>Type:</span>
            <span>{activity.type}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginTop: 4 }}>
            <span style={{ color: 'var(--wx-color-text-muted, #717182)' }}>Time:</span>
            <span>{activity.timestamp.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

ActivityFeed.displayName = 'ActivityFeed';

export default ActivityFeed;
