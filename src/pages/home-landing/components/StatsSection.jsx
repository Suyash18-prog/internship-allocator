import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      icon: 'Users',
      value: '25,847',
      label: 'Registered Students',
      description: 'Active student profiles seeking internships',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 2,
      icon: 'Building2',
      value: '1,234',
      label: 'Partner Companies',
      description: 'Verified organizations offering opportunities',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 3,
      icon: 'Briefcase',
      value: '8,956',
      label: 'Active Internships',
      description: 'Available positions across sectors',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 4,
      icon: 'Heart',
      value: '15,623',
      label: 'Successful Matches',
      description: 'Students placed in perfect-fit internships',
      color: 'text-error',
      bgColor: 'bg-error/10'
    }
  ];

  return (
    <section className="py-16 bg-muted/30 animate-fade-in delay-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Platform Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real numbers showcasing the success of our AI-powered internship matching platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats?.map((stat) => (
            <div key={stat?.id} className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon name={stat?.icon} size={24} className={stat?.color} />
                </div>
                <div className="text-right">
                  <div className={`text-2xl lg:text-3xl font-bold ${stat?.color}`}>
                    {stat?.value}
                  </div>
                </div>
              </div>
              
              <h3 className="font-semibold text-foreground mb-2">
                {stat?.label}
              </h3>
              
              <p className="text-sm text-muted-foreground">
                {stat?.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Additional Metrics */}
        <div className="mt-12 bg-card rounded-xl p-8 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">93%</div>
              <div className="text-sm font-medium text-foreground mb-1">Average Match Score</div>
              <div className="text-xs text-muted-foreground">Based on skill, location &amp; sector alignment</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">2.3 days</div>
              <div className="text-sm font-medium text-foreground mb-1">Average Match Time</div>
              <div className="text-xs text-muted-foreground">From registration to first match</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">4.8/5</div>
              <div className="text-sm font-medium text-foreground mb-1">User Satisfaction</div>
              <div className="text-xs text-muted-foreground">Based on 12,000+ reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;