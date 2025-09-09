import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'new_match':
        return { name: 'Star', color: 'var(--color-success)' };
      case 'application_sent':
        return { name: 'Send', color: 'var(--color-primary)' };
      case 'profile_updated':
        return { name: 'User', color: 'var(--color-accent)' };
      case 'interview_scheduled':
        return { name: 'Calendar', color: 'var(--color-warning)' };
      case 'application_viewed':
        return { name: 'Eye', color: 'var(--color-secondary)' };
      default:
        return { name: 'Bell', color: 'var(--color-muted-foreground)' };
    }
  };

  const getActivityMessage = (activity) => {
    switch (activity?.type) {
      case 'new_match':
        return `New ${activity?.matchScore}% match found with ${activity?.company}`;
      case 'application_sent':
        return `Application sent to ${activity?.company} for ${activity?.position}`;
      case 'profile_updated':
        return `Profile updated - ${activity?.field} information added`;
      case 'interview_scheduled':
        return `Interview scheduled with ${activity?.company} on ${activity?.date}`;
      case 'application_viewed':
        return `${activity?.company} viewed your application for ${activity?.position}`;
      default:
        return activity?.message;
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="Activity" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            <p className="text-sm text-muted-foreground">Your latest updates and matches</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      {/* Activity List */}
      <div className="space-y-4">
        {activities?.length === 0 ? (
          <div className="text-center py-8">
            <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
              <Icon name="Clock" size={24} color="var(--color-muted-foreground)" />
            </div>
            <h4 className="text-sm font-medium text-foreground mb-2">No Recent Activity</h4>
            <p className="text-sm text-muted-foreground">
              Start exploring internships to see your activity here
            </p>
          </div>
        ) : (
          activities?.map((activity, index) => {
            const iconConfig = getActivityIcon(activity?.type);
            return (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-150"
              >
                {/* Activity Icon */}
                <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-full flex-shrink-0 mt-0.5">
                  <Icon name={iconConfig?.name} size={16} color={iconConfig?.color} />
                </div>
                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    {getActivityMessage(activity)}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(activity?.timestamp)}
                    </span>
                    {activity?.type === 'new_match' && activity?.matchScore >= 85 && (
                      <span className="px-2 py-0.5 bg-success/10 text-success text-xs rounded-full font-medium">
                        High Match
                      </span>
                    )}
                    {activity?.urgent && (
                      <span className="px-2 py-0.5 bg-warning/10 text-warning text-xs rounded-full font-medium">
                        Action Required
                      </span>
                    )}
                  </div>
                </div>
                {/* Action Button */}
                {activity?.actionable && (
                  <div className="flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="ArrowRight"
                    >
                      View
                    </Button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      {/* Activity Summary */}
      {activities?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-success">
                {activities?.filter(a => a?.type === 'new_match')?.length}
              </div>
              <div className="text-xs text-muted-foreground">New Matches</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-primary">
                {activities?.filter(a => a?.type === 'application_sent')?.length}
              </div>
              <div className="text-xs text-muted-foreground">Applications</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-warning">
                {activities?.filter(a => a?.type === 'interview_scheduled')?.length}
              </div>
              <div className="text-xs text-muted-foreground">Interviews</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-accent">
                {activities?.filter(a => a?.type === 'application_viewed')?.length}
              </div>
              <div className="text-xs text-muted-foreground">Profile Views</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;