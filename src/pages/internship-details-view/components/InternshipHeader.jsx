import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InternshipHeader = ({ internship, onBack, onSave, isSaved }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          iconName="ArrowLeft"
          iconPosition="left"
          onClick={onBack}
          className="mb-4"
        >
          Back to Results
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          iconName={isSaved ? "BookmarkCheck" : "Bookmark"}
          onClick={onSave}
          className={isSaved ? "text-accent" : "text-muted-foreground"}
        />
      </div>
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border border-border">
            <Image
              src={internship?.companyLogo}
              alt={`${internship?.companyName} logo`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-foreground mb-2">
                {internship?.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Icon name="Building2" size={16} />
                <span className="font-medium">{internship?.companyName}</span>
                <span className="text-border">•</span>
                <span>{internship?.companySize}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="MapPin" size={14} />
                  <span>{internship?.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={14} />
                  <span>{internship?.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Calendar" size={14} />
                  <span>Apply by {internship?.applicationDeadline}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              <Icon name="Tag" size={14} className="mr-1" />
              {internship?.sector}
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success/10 text-success">
              <Icon name="IndianRupee" size={14} className="mr-1" />
              ₹{internship?.stipend?.toLocaleString('en-IN')}/month
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent">
              <Icon name="Users" size={14} className="mr-1" />
              {internship?.applicationsCount} applications
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipHeader;