import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-success/5 py-16 lg:py-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                <Icon name="Award" size={20} className="text-primary" />
                <span className="text-sm font-medium text-primary">Government Initiative</span>
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              PM Internship
              <span className="block text-primary">Matcher</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Connect with the perfect internship opportunities through our AI-powered matching system. 
              Streamlining the PM Internship Scheme for students and companies across India.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link to="/student-registration">
                <Button 
                  variant="default" 
                  size="lg" 
                  iconName="UserPlus" 
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Register as Student
                </Button>
              </Link>
              
              <Link to="/company-internship-posting">
                <Button 
                  variant="outline" 
                  size="lg" 
                  iconName="Building2" 
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Post Internship
                </Button>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span>Government Verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-success" />
                <span>Trusted by 500+ Institutions</span>
              </div>
            </div>
          </div>
          
          {/* Visual Element */}
          <div className="relative">
            <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Brain" size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">AI-Powered Matching</h3>
                    <p className="text-sm text-muted-foreground">Smart algorithm finds perfect fits</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Skill Match</span>
                    <span className="text-sm font-medium text-foreground">95%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Location Preference</span>
                    <span className="text-sm font-medium text-foreground">88%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Sector Alignment</span>
                    <span className="text-sm font-medium text-foreground">92%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">Overall Match Score</span>
                    <span className="text-lg font-bold text-primary">93%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full animate-pulse-gentle"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-success/20 rounded-full animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;