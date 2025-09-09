import React from 'react';
import Icon from '../../../components/AppIcon';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: 'Brain',
      title: 'AI-Powered Matching',
      description: 'Advanced algorithm analyzes skills, location preferences, and sector interests to find perfect internship matches with 93% accuracy.',
      highlights: ['70% Skill Weight', '20% Location Weight', '10% Sector Weight'],
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 2,
      icon: 'Zap',
      title: 'Real-Time Recommendations',
      description: 'Get instant notifications when new internships match your profile. Our system continuously updates recommendations as new opportunities arise.',
      highlights: ['Instant Notifications', 'Live Updates', 'Smart Filtering'],
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 3,
      icon: 'MapPin',
      title: 'Location Intelligence',
      description: 'Smart location matching considers your preferences, commute distance, and remote work options to find geographically suitable internships.',
      highlights: ['Commute Analysis', 'Remote Options', 'City Preferences'],
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 4,
      icon: 'Target',
      title: 'Skill-Based Matching',
      description: 'Our system analyzes your technical and soft skills to match you with internships that align with your expertise and growth goals.',
      highlights: ['Technical Skills', 'Soft Skills', 'Growth Tracking'],
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      id: 5,
      icon: 'Smartphone',
      title: 'Mobile-First Design',
      description: 'Access your internship matches anywhere, anytime. Our responsive platform works seamlessly across all devices and screen sizes.',
      highlights: ['Responsive Design', 'Touch Optimized', 'Offline Support'],
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      id: 6,
      icon: 'Shield',
      title: 'Secure & Verified',
      description: 'All companies and internships are verified through our rigorous screening process. Your data is protected with enterprise-grade security.',
      highlights: ['Company Verification', 'Data Protection', 'SSL Security'],
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Platform Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover how our advanced matching system connects students with their ideal internship opportunities 
            through intelligent algorithms and user-centric design.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature) => (
            <div key={feature?.id} className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${feature?.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={feature?.icon} size={24} className={feature?.color} />
                </div>
                <h3 className="text-xl font-semibold text-foreground ml-4">
                  {feature?.title}
                </h3>
              </div>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {feature?.description}
              </p>
              
              <div className="space-y-2">
                {feature?.highlights?.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-sm text-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Algorithm Explanation */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 border border-border">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              How Our Matching Algorithm Works
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our proprietary AI system uses a weighted scoring approach to ensure the most relevant matches
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">70%</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Skill Matching</h4>
              <p className="text-sm text-muted-foreground">
                Analyzes technical skills, programming languages, frameworks, and soft skills to find the best fit
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">20%</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Location Preference</h4>
              <p className="text-sm text-muted-foreground">
                Considers your preferred cities, commute distance, and remote work preferences
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-success">10%</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Sector Interest</h4>
              <p className="text-sm text-muted-foreground">
                Matches your industry preferences with available internship sectors
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;