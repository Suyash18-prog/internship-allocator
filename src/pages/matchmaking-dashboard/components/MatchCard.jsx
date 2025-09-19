import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MatchCard = ({ internship, rank, isTopMatch = false }) => {
  const navigate = useNavigate();


  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState(null);

  const handleViewDetails = () => {
    navigate('/internship-details-view', { state: { internship } });
  };

  const handleApply = async () => {
    setApplying(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ internshipId: internship.id })
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to apply');
      }
      setApplied(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setApplying(false);
    }
  };

  const getMatchScoreColor = (score) => {
    if (score >= 85) return 'text-success bg-success/10';
    if (score >= 70) return 'text-accent bg-accent/10';
    return 'text-warning bg-warning/10';
  };

  const getSkillMatchColor = (matchCount, totalCount) => {
    const percentage = (matchCount / totalCount) * 100;
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-accent';
    return 'text-warning';
  };

  return (
    <div className={`
      bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]
      ${isTopMatch ? 'ring-2 ring-primary/20 bg-gradient-to-br from-card to-primary/5' : ''}
    `}>
      {/* Header with Rank and Match Score */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {isTopMatch && (
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
              <Icon name="Star" size={16} color="white" />
            </div>
          )}
          <div>
            <span className="text-sm font-medium text-muted-foreground">
              #{rank} Match
            </span>
            {isTopMatch && (
              <div className="flex items-center space-x-1 mt-1">
                <Icon name="TrendingUp" size={14} color="var(--color-primary)" />
                <span className="text-xs text-primary font-medium">Top Recommendation</span>
              </div>
            )}
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full ${getMatchScoreColor(internship?.matchScore)}`}>
          <span className="text-sm font-semibold">{internship?.matchScore}% Match</span>
        </div>
      </div>
      {/* Company and Title */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {internship?.title}
        </h3>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Building2" size={16} />
          <span className="font-medium">{internship?.company}</span>
        </div>
      </div>
      {/* Location and Sector */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-1">
          <Icon name="MapPin" size={14} color="var(--color-accent)" />
          <span className="text-sm text-foreground">{internship?.location}</span>
          {internship?.locationMatch && (
            <Icon name="CheckCircle" size={14} color="var(--color-success)" />
          )}
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Briefcase" size={14} color="var(--color-secondary)" />
          <span className="text-sm text-foreground">{internship?.sector}</span>
          {internship?.sectorMatch && (
            <Icon name="CheckCircle" size={14} color="var(--color-success)" />
          )}
        </div>
      </div>
      {/* Skills Match */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Skills Match</span>
          <span className={`text-sm font-semibold ${getSkillMatchColor(internship?.matchingSkills?.length, internship?.requiredSkills?.length)}`}>
            {internship?.matchingSkills?.length}/{internship?.requiredSkills?.length} skills
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {internship?.requiredSkills?.slice(0, 4)?.map((skill, index) => {
            const isMatched = internship?.matchingSkills?.includes(skill);
            return (
              <span
                key={index}
                className={`px-2 py-1 rounded-md text-xs font-medium ${
                  isMatched
                    ? 'bg-success/10 text-success border border-success/20' :'bg-muted text-muted-foreground border border-border'
                }`}
              >
                {skill}
                {isMatched && <Icon name="Check" size={12} className="ml-1 inline" />}
              </span>
            );
          })}
          {internship?.requiredSkills?.length > 4 && (
            <span className="px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground">
              +{internship?.requiredSkills?.length - 4} more
            </span>
          )}
        </div>
      </div>
      {/* Additional Info */}
      <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={14} />
          <span>{internship?.duration}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="IndianRupee" size={14} />
          <span>{internship?.stipend}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Users" size={14} />
          <span>{internship?.openings} openings</span>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button
          variant="default"
          onClick={handleViewDetails}
          iconName="Eye"
          iconPosition="left"
          className="flex-1"
        >
          View Details
        </Button>
        <Button
          variant={applied ? 'success' : 'outline'}
          iconName={applied ? 'Check' : 'Heart'}
          iconPosition="left"
          className="flex-1"
          onClick={handleApply}
          loading={applying}
          disabled={applied || applying}
        >
          {applied ? 'Applied' : 'Apply'}
        </Button>
      </div>
      {error && <div className="mt-2 text-xs text-error">{error}</div>}
      {/* Match Breakdown Tooltip */}
      {isTopMatch && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Info" size={14} color="var(--color-primary)" />
            <span className="text-xs font-medium text-foreground">Match Breakdown</span>
          </div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Skills Match (70%)</span>
              <span className="font-medium">{Math.round(internship?.skillScore)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Location Match (20%)</span>
              <span className="font-medium">{internship?.locationMatch ? '100%' : '0%'}</span>
            </div>
            <div className="flex justify-between">
              <span>Sector Match (10%)</span>
              <span className="font-medium">{internship?.sectorMatch ? '100%' : '0%'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchCard;