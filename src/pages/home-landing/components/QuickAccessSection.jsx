import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickAccessSection = () => {
  const quickLinks = [
    {
      id: 1,
      title: 'Find Internships',
      description: 'Browse and discover internship opportunities matched to your profile',
      icon: 'Search',
      path: '/matchmaking-dashboard',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      buttonVariant: 'default'
    },
    {
      id: 2,
      title: 'Manage Profile',
      description: 'Update your skills, preferences, and view your match history',
      icon: 'User',
      path: '/student-profile-management',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20',
      buttonVariant: 'outline'
    },
    {
      id: 3,
      title: 'View Details',
      description: 'Explore detailed information about specific internship opportunities',
      icon: 'FileText',
      path: '/internship-details-view',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      buttonVariant: 'outline'
    }
  ];

  const userTypes = [
    {
      id: 1,
      type: 'Students',
      title: 'Looking for Internships?',
      description: 'Register your profile and get matched with relevant opportunities based on your skills and preferences.',
      features: ['AI-powered matching', 'Skill-based recommendations', 'Location preferences', 'Real-time notifications'],
      icon: 'GraduationCap',
      ctaText: 'Register Now',
      ctaPath: '/student-registration',
      color: 'text-primary',
      bgColor: 'bg-primary/5'
    },
    {
      id: 2,
      type: 'Companies',
      title: 'Need Quality Interns?',
      description: 'Post your internship opportunities and get matched with pre-screened candidates who fit your requirements.',
      features: ['Pre-screened candidates', 'Skill-based matching', 'Easy posting process', 'Quality assurance'],
      icon: 'Building2',
      ctaText: 'Post Internship',
      ctaPath: '/company-internship-posting',
      color: 'text-accent',
      bgColor: 'bg-accent/5'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Access Links */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Quick Access
            </h2>
            <p className="text-muted-foreground">
              Jump directly to the features you need most
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickLinks?.map((link) => (
              <Link key={link?.id} to={link?.path} className="group">
                <div className={`bg-card rounded-xl p-6 border-2 ${link?.borderColor} hover:shadow-lg transition-all duration-300 group-hover:scale-105`}>
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${link?.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon name={link?.icon} size={24} className={link?.color} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground ml-4">
                      {link?.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {link?.description}
                  </p>
                  
                  <div className="flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                    <span className={link?.color}>Access Now</span>
                    <Icon name="ArrowRight" size={16} className={`ml-2 ${link?.color}`} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* User Type Sections */}
        <div className="space-y-8">
          {userTypes?.map((userType) => (
            <div key={userType?.id} className={`${userType?.bgColor} rounded-2xl p-8 border border-border`}>
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-card rounded-lg flex items-center justify-center border border-border`}>
                      <Icon name={userType?.icon} size={24} className={userType?.color} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        For {userType?.type}
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {userType?.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {userType?.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {userType?.features?.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Icon name="Check" size={16} className="text-success" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link to={userType?.ctaPath}>
                    <Button 
                      variant="default" 
                      size="lg" 
                      iconName="ArrowRight" 
                      iconPosition="right"
                      className="w-full sm:w-auto"
                    >
                      {userType?.ctaText}
                    </Button>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Match Quality</span>
                        <span className="text-sm font-medium text-foreground">Excellent</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Response Time</span>
                        <span className="text-sm font-medium text-foreground">2.3 days</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Success Rate</span>
                        <span className="text-sm font-medium text-foreground">98%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-accent h-2 rounded-full" style={{ width: '98%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating indicator */}
                  <div className="absolute -top-3 -right-3 bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Live Data
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickAccessSection;