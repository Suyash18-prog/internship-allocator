import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CompanyInfo = ({ company }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">About {company?.name}</h2>
      <div className="space-y-6">
        {/* Company Overview */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-lg overflow-hidden border border-border">
              <Image
                src={company?.logo}
                alt={`${company?.name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-2">{company?.name}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              {company?.description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Icon name="Users" size={14} />
                <span>{company?.size}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Calendar" size={14} />
                <span>Founded {company?.founded}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="MapPin" size={14} />
                <span>{company?.headquarters}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-semibold text-foreground">{company?.totalInternships}</div>
            <div className="text-xs text-muted-foreground">Active Internships</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-semibold text-foreground">{company?.successfulHires}</div>
            <div className="text-xs text-muted-foreground">Successful Hires</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-semibold text-foreground">{company?.rating}</div>
            <div className="text-xs text-muted-foreground">Company Rating</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-lg font-semibold text-foreground">{company?.responseTime}</div>
            <div className="text-xs text-muted-foreground">Avg Response</div>
          </div>
        </div>

        {/* Industry & Specializations */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Industry & Specializations</h4>
          <div className="flex flex-wrap gap-2">
            {company?.industries?.map((industry, index) => (
              <div
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
              >
                {industry}
              </div>
            ))}
          </div>
        </div>

        {/* Company Culture */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Company Culture</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {company?.culture?.map((value, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <Icon name="Heart" size={16} className="text-accent flex-shrink-0" />
                <span className="text-sm text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-border pt-4">
          <h4 className="font-medium text-foreground mb-3">Contact Information</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Icon name="Globe" size={16} className="text-muted-foreground" />
              <a 
                href={company?.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 text-sm"
              >
                {company?.website}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="Mail" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{company?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{company?.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;