import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationHeader = () => {
  return (
    <div className="text-center space-y-4 mb-8">
      {/* Hero Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
            <Icon name="GraduationCap" size={24} color="white" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Student Registration</h1>
            <p className="text-sm text-muted-foreground">PM Internship Matcher</p>
          </div>
        </div>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join thousands of students finding their perfect internship match through our AI-powered platform
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
          <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
            <Icon name="Target" size={20} className="text-success" />
          </div>
          <div className="text-left">
            <p className="font-medium text-foreground text-sm">AI Matching</p>
            <p className="text-xs text-muted-foreground">Smart recommendations</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Building2" size={20} className="text-primary" />
          </div>
          <div className="text-left">
            <p className="font-medium text-foreground text-sm">Top Companies</p>
            <p className="text-xs text-muted-foreground">Premium opportunities</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="Clock" size={20} className="text-accent" />
          </div>
          <div className="text-left">
            <p className="font-medium text-foreground text-sm">Quick Process</p>
            <p className="text-xs text-muted-foreground">5-minute setup</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
        <Link to="/home-landing">
          <Button variant="ghost" size="sm" iconName="ArrowLeft" iconPosition="left">
            Back to Home
          </Button>
        </Link>
        
        <span className="text-muted-foreground">•</span>
        
        <Link to="/matchmaking-dashboard">
          <Button variant="ghost" size="sm" iconName="Search" iconPosition="left">
            Browse Internships
          </Button>
        </Link>
        
        <span className="text-muted-foreground">•</span>
        
        <Link to="/company-internship-posting">
          <Button variant="ghost" size="sm" iconName="Building" iconPosition="left">
            For Companies
          </Button>
        </Link>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-xs text-primary font-medium">Registration</span>
        </div>
        <Icon name="ChevronRight" size={12} className="text-muted-foreground" />
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-muted rounded-full"></div>
          <span className="text-xs text-muted-foreground">Profile Setup</span>
        </div>
        <Icon name="ChevronRight" size={12} className="text-muted-foreground" />
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-muted rounded-full"></div>
          <span className="text-xs text-muted-foreground">Matching</span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationHeader;