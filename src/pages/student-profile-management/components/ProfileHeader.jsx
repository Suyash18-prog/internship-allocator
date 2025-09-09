import React from 'react';
import Icon from '../../../components/AppIcon';


const ProfileHeader = ({ student, profileCompletion }) => {
  const getCompletionColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 70) return 'text-warning';
    return 'text-error';
  };

  const getCompletionBgColor = (percentage) => {
    if (percentage >= 90) return 'bg-success';
    if (percentage >= 70) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Profile Avatar */}
        <div className="relative">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-2xl font-semibold text-primary-foreground">
            {student?.name?.split(' ')?.map(n => n?.[0])?.join('')?.toUpperCase()}
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
            <Icon name="Check" size={14} color="white" />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground mb-1">{student?.name}</h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <Icon name="Mail" size={16} />
                {student?.email}
              </p>
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <Icon name="MapPin" size={16} />
                {student?.location}
              </p>
            </div>

            {/* Profile Completion */}
            <div className="flex flex-col items-start sm:items-end">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground">Profile Completion</span>
                <span className={`text-lg font-semibold ${getCompletionColor(profileCompletion)}`}>
                  {profileCompletion}%
                </span>
              </div>
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getCompletionBgColor(profileCompletion)} transition-all duration-300`}
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {profileCompletion < 100 ? 'Complete your profile for better matches' : 'Profile complete!'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;