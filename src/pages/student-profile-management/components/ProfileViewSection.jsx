import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileViewSection = ({ student, matchStats }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="User" size={20} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Current Profile</h2>
      </div>
      <div className="space-y-6">
        {/* Basic Information */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <p className="text-muted-foreground mt-1">{student?.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <p className="text-muted-foreground mt-1">{student?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Phone</label>
              <p className="text-muted-foreground mt-1">{student?.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Location Preference</label>
              <p className="text-muted-foreground mt-1">{student?.location}</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Skills ({student?.skills?.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {student?.skills?.map((skill, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Sector Interests */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Sector Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {student?.sectors?.map((sector, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>

        {/* Match Performance */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Match Performance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">{matchStats?.totalMatches}</div>
              <div className="text-sm text-muted-foreground">Total Matches</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-success mb-1">{matchStats?.averageScore}%</div>
              <div className="text-sm text-muted-foreground">Avg Match Score</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-warning mb-1">{matchStats?.newMatches}</div>
              <div className="text-sm text-muted-foreground">New This Week</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileViewSection;