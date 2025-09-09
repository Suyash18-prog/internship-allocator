import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MatchInsights = ({ insights, onViewMatches }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Match Insights</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
          onClick={onViewMatches}
        >
          View All Matches
        </Button>
      </div>
      <div className="space-y-6">
        {/* Recent Matches */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
            Recent Matches
          </h3>
          <div className="space-y-3">
            {insights?.recentMatches?.map((match) => (
              <div key={match?.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{match?.title}</h4>
                  <p className="text-sm text-muted-foreground">{match?.company}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <Icon name="MapPin" size={12} className="inline mr-1" />
                    {match?.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getScoreColor(match?.score)}`}>
                    {match?.score}%
                  </div>
                  <div className="text-xs text-muted-foreground">match</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
            Performance Metrics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {insights?.metrics?.map((metric) => (
              <div key={metric?.label} className={`p-4 rounded-lg ${getScoreBgColor(metric?.value)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric?.label}</p>
                    <p className={`text-2xl font-bold ${getScoreColor(metric?.value)}`}>
                      {metric?.value}%
                    </p>
                  </div>
                  <Icon name={metric?.icon} size={24} className={getScoreColor(metric?.value)} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">{metric?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Improvement Suggestions */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
            Improvement Suggestions
          </h3>
          <div className="space-y-3">
            {insights?.suggestions?.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-foreground">{suggestion?.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Expected improvement: +{suggestion?.impact}% match score
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              iconName="RefreshCw"
              iconPosition="left"
              onClick={() => window.location?.reload()}
            >
              Refresh Matches
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchInsights;