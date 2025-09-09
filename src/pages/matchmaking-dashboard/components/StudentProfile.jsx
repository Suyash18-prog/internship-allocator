import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudentProfile = ({ student }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/student-profile-management');
  };

  const getProfileCompletionColor = (percentage) => {
    if (percentage >= 90) return 'text-success bg-success/10';
    if (percentage >= 70) return 'text-accent bg-accent/10';
    return 'text-warning bg-warning/10';
  };

  const getSkillLevel = (skill) => {
    const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
    return levels?.[Math.floor(Math.random() * levels?.length)];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Profile Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full">
            <span className="text-xl font-semibold text-primary-foreground">
              {student?.name?.split(' ')?.map(n => n?.[0])?.join('')}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{student?.name}</h2>
            <div className="flex items-center space-x-2 mt-1">
              <Icon name="MapPin" size={14} color="var(--color-muted-foreground)" />
              <span className="text-sm text-muted-foreground">{student?.location}</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <Icon name="Briefcase" size={14} color="var(--color-muted-foreground)" />
              <span className="text-sm text-muted-foreground">Interested in {student?.sector}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`px-3 py-1 rounded-full ${getProfileCompletionColor(student?.profileCompletion)}`}>
            <span className="text-sm font-semibold">{student?.profileCompletion}% Complete</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleEditProfile}
            iconName="Edit"
            iconPosition="left"
          >
            Edit Profile
          </Button>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-primary">{student?.totalMatches}</div>
          <div className="text-sm text-muted-foreground">Total Matches</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-success">{student?.newMatches}</div>
          <div className="text-sm text-muted-foreground">New This Week</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-accent">{student?.applications}</div>
          <div className="text-sm text-muted-foreground">Applications Sent</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-warning">{student?.interviews}</div>
          <div className="text-sm text-muted-foreground">Interviews</div>
        </div>
      </div>
      {/* Skills Preview */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Skills & Expertise</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Show Less' : 'Show All'}
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {(isExpanded ? student?.skills : student?.skills?.slice(0, 6))?.map((skill, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 px-3 py-2 bg-primary/10 text-primary rounded-lg border border-primary/20"
            >
              <span className="text-sm font-medium">{skill}</span>
              <span className="text-xs text-primary/70">({getSkillLevel(skill)})</span>
            </div>
          ))}
          {!isExpanded && student?.skills?.length > 6 && (
            <div className="px-3 py-2 bg-muted text-muted-foreground rounded-lg border border-border">
              <span className="text-sm">+{student?.skills?.length - 6} more skills</span>
            </div>
          )}
        </div>
      </div>
      {/* Expanded Profile Details */}
      {isExpanded && (
        <div className="border-t border-border pt-4 animate-slide-down">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center space-x-2">
                <Icon name="GraduationCap" size={16} />
                <span>Education</span>
              </h4>
              <div className="space-y-2">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-medium text-foreground">{student?.education?.degree}</div>
                  <div className="text-sm text-muted-foreground">{student?.education?.institution}</div>
                  <div className="text-xs text-muted-foreground">{student?.education?.year}</div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center space-x-2">
                <Icon name="Settings" size={16} />
                <span>Preferences</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Preferred Duration:</span>
                  <span className="text-foreground font-medium">{student?.preferences?.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Work Mode:</span>
                  <span className="text-foreground font-medium">{student?.preferences?.workMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Stipend:</span>
                  <span className="text-foreground font-medium">{student?.preferences?.stipend}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Completion Tips */}
          {student?.profileCompletion < 100 && (
            <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Lightbulb" size={20} color="var(--color-accent)" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Complete Your Profile</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {student?.profileCompletion < 90 && <li>• Add a professional photo</li>}
                    {student?.profileCompletion < 80 && <li>• Include project portfolio</li>}
                    {student?.profileCompletion < 70 && <li>• Add certifications and achievements</li>}
                  </ul>
                  <p className="text-xs text-accent mt-2">
                    Complete profiles get 3x more matches!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentProfile;