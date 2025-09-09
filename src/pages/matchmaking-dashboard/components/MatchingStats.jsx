import React from 'react';
import Icon from '../../../components/AppIcon';

const MatchingStats = ({ stats }) => {
  const getScoreDistribution = () => {
    return [
      { range: '90-100%', count: stats?.excellent, color: 'bg-success', label: 'Excellent Match' },
      { range: '80-89%', count: stats?.good, color: 'bg-primary', label: 'Good Match' },
      { range: '70-79%', count: stats?.fair, color: 'bg-accent', label: 'Fair Match' },
      { range: '60-69%', count: stats?.poor, color: 'bg-warning', label: 'Needs Improvement' }
    ];
  };

  const getTotalMatches = () => {
    return stats?.excellent + stats?.good + stats?.fair + stats?.poor;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="BarChart3" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Matching Analytics</h3>
            <p className="text-sm text-muted-foreground">Your personalized match insights</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{getTotalMatches()}</div>
          <div className="text-sm text-muted-foreground">Total Matches</div>
        </div>
      </div>
      {/* Score Distribution */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-foreground mb-3">Match Score Distribution</h4>
        <div className="space-y-3">
          {getScoreDistribution()?.map((item, index) => {
            const percentage = getTotalMatches() > 0 ? (item?.count / getTotalMatches()) * 100 : 0;
            return (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-20 text-sm text-muted-foreground">{item?.range}</div>
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full ${item?.color} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="w-12 text-sm font-medium text-foreground text-right">
                  {item?.count}
                </div>
                <div className="w-24 text-xs text-muted-foreground">{item?.label}</div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-success/10 rounded-lg border border-success/20">
          <div className="text-xl font-bold text-success">{stats?.avgScore}%</div>
          <div className="text-xs text-muted-foreground">Avg Match Score</div>
        </div>
        <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
          <div className="text-xl font-bold text-primary">{stats?.skillMatches}</div>
          <div className="text-xs text-muted-foreground">Skill Matches</div>
        </div>
        <div className="text-center p-3 bg-accent/10 rounded-lg border border-accent/20">
          <div className="text-xl font-bold text-accent">{stats?.locationMatches}</div>
          <div className="text-xs text-muted-foreground">Location Matches</div>
        </div>
        <div className="text-center p-3 bg-warning/10 rounded-lg border border-warning/20">
          <div className="text-xl font-bold text-warning">{stats?.sectorMatches}</div>
          <div className="text-xs text-muted-foreground">Sector Matches</div>
        </div>
      </div>
      {/* Recommendations */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Improve Your Matches</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {stats?.avgScore < 80 && (
                <li className="flex items-center space-x-2">
                  <Icon name="ArrowRight" size={12} />
                  <span>Add more relevant skills to increase skill match scores</span>
                </li>
              )}
              {stats?.locationMatches < 5 && (
                <li className="flex items-center space-x-2">
                  <Icon name="ArrowRight" size={12} />
                  <span>Consider expanding your location preferences</span>
                </li>
              )}
              {stats?.sectorMatches < 3 && (
                <li className="flex items-center space-x-2">
                  <Icon name="ArrowRight" size={12} />
                  <span>Explore related sectors for more opportunities</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingStats;