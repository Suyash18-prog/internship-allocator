import React from 'react';
import Icon from '../../../components/AppIcon';

const MatchScoreCard = ({ matchScore, skillMatch, locationMatch, sectorMatch }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-accent';
    return 'text-warning';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-accent/10';
    return 'bg-warning/10';
  };

  const ScoreBar = ({ score, color }) => (
    <div className="w-full bg-muted rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${color}`}
        style={{ width: `${score}%` }}
      />
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Match Analysis</h2>
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold ${getScoreBgColor(matchScore)} ${getScoreColor(matchScore)}`}>
          <Icon name="Target" size={20} className="mr-2" />
          {matchScore}% Match
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Skills Match */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Code" size={16} className="text-primary" />
              <span className="font-medium text-foreground">Skills</span>
            </div>
            <span className={`font-semibold ${getScoreColor(skillMatch)}`}>
              {skillMatch}%
            </span>
          </div>
          <ScoreBar score={skillMatch} color="bg-primary" />
          <p className="text-xs text-muted-foreground">
            Based on skill overlap (70% weight)
          </p>
        </div>

        {/* Location Match */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={16} className="text-accent" />
              <span className="font-medium text-foreground">Location</span>
            </div>
            <span className={`font-semibold ${getScoreColor(locationMatch)}`}>
              {locationMatch}%
            </span>
          </div>
          <ScoreBar score={locationMatch} color="bg-accent" />
          <p className="text-xs text-muted-foreground">
            Location preference alignment (20% weight)
          </p>
        </div>

        {/* Sector Match */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Building" size={16} className="text-success" />
              <span className="font-medium text-foreground">Sector</span>
            </div>
            <span className={`font-semibold ${getScoreColor(sectorMatch)}`}>
              {sectorMatch}%
            </span>
          </div>
          <ScoreBar score={sectorMatch} color="bg-success" />
          <p className="text-xs text-muted-foreground">
            Industry sector match (10% weight)
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start gap-3">
          <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Match Insights</p>
            <p className="text-xs text-muted-foreground">
              Your profile shows strong alignment with this internship. Consider highlighting your matching skills in your application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchScoreCard;