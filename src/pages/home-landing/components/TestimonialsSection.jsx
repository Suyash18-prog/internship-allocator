import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Computer Science Student',
      institution: 'IIT Delhi',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: `The AI matching system is incredible! I got matched with a perfect internship at a fintech startup that aligned with my Python and machine learning skills. The 95% match score was spot on.`,
      rating: 5,
      matchScore: 95,
      sector: 'Fintech'
    },
    {
      id: 2,
      name: 'Rahul Patel',
      role: 'MBA Student',
      institution: 'IIM Bangalore',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: `Found my dream internship in product management within 2 days of registration. The location matching was perfect - got placed in Bangalore as preferred. Highly recommend this platform!`,
      rating: 5,
      matchScore: 92,
      sector: 'Product Management'
    },
    {
      id: 3,
      name: 'Ananya Singh',
      role: 'Design Student',
      institution: 'NIFT Mumbai',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: `As a UX design student, I was worried about finding relevant internships. This platform matched me with 3 amazing design opportunities, and I'm now interning at a top e-commerce company.`,rating: 5,matchScore: 88,sector: 'Design'
    },
    {
      id: 4,
      name: 'Vikram Kumar',role: 'HR Manager',institution: 'TechCorp Solutions',avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: `From the company side, this platform has revolutionized our intern hiring. We get pre-matched candidates with relevant skills, saving us weeks of screening time. Quality of matches is exceptional.`,
      rating: 5,
      matchScore: 94,
      sector: 'Technology'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? 'text-accent fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from students and companies who have found their perfect matches through our platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials?.map((testimonial) => (
            <div key={testimonial?.id} className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={testimonial?.avatar}
                      alt={testimonial?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} color="white" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial?.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial?.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial?.institution}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    {renderStars(testimonial?.rating)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial?.matchScore}% match
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <blockquote className="text-muted-foreground mb-4 leading-relaxed">
                "{testimonial?.content}"
              </blockquote>
              
              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="Briefcase" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">{testimonial?.sector}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Verified Match</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Overall Stats */}
        <div className="mt-12 text-center">
          <div className="bg-card rounded-xl p-8 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="text-2xl font-bold text-primary mb-1">4.9/5</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-accent mb-1">98%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-success mb-1">15,623</div>
                <div className="text-sm text-muted-foreground">Happy Students</div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-error mb-1">1,234</div>
                <div className="text-sm text-muted-foreground">Partner Companies</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;