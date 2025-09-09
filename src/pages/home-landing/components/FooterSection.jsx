import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FooterSection = () => {
  const currentYear = new Date()?.getFullYear();
  
  const footerLinks = {
    platform: [
      { label: 'Find Internships', path: '/matchmaking-dashboard' },
      { label: 'Post Internship', path: '/company-internship-posting' },
      { label: 'Student Registration', path: '/student-registration' },
      { label: 'Profile Management', path: '/student-profile-management' }
    ],
    resources: [
      { label: 'How It Works', path: '/home-landing' },
      { label: 'Success Stories', path: '/home-landing' },
      { label: 'Platform Features', path: '/home-landing' },
      { label: 'FAQ', path: '/home-landing' }
    ],
    support: [
      { label: 'Help Center', path: '/home-landing' },
      { label: 'Contact Support', path: '/home-landing' },
      { label: 'Technical Issues', path: '/home-landing' },
      { label: 'Feedback', path: '/home-landing' }
    ],
    legal: [
      { label: 'Privacy Policy', path: '/home-landing' },
      { label: 'Terms of Service', path: '/home-landing' },
      { label: 'Cookie Policy', path: '/home-landing' },
      { label: 'Data Protection', path: '/home-landing' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', url: '#' },
    { name: 'Facebook', icon: 'Facebook', url: '#' },
    { name: 'Instagram', icon: 'Instagram', url: '#' }
  ];

  const governmentPartners = [
    'Ministry of Education',
    'AICTE',
    'UGC',
    'Skill India',
    'Digital India'
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                  <Icon name="Briefcase" size={24} color="white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">PM Internship</h3>
                  <p className="text-sm text-muted-foreground -mt-1">Matcher</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Connecting students with perfect internship opportunities through AI-powered matching. 
                Part of the Government of India's PM Internship Scheme initiative.
              </p>
              
              {/* Government Verification */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-sm text-muted-foreground">Government Verified Platform</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={16} className="text-success" />
                  <span className="text-sm text-muted-foreground">SSL Secured &amp; Encrypted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-muted-foreground">ISO 27001 Certified</span>
                </div>
              </div>
            </div>
            
            {/* Links Sections */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* Platform Links */}
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Platform</h4>
                  <ul className="space-y-3">
                    {footerLinks?.platform?.map((link, index) => (
                      <li key={index}>
                        <Link 
                          to={link?.path} 
                          className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                        >
                          {link?.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Resources Links */}
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Resources</h4>
                  <ul className="space-y-3">
                    {footerLinks?.resources?.map((link, index) => (
                      <li key={index}>
                        <Link 
                          to={link?.path} 
                          className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                        >
                          {link?.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Support Links */}
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Support</h4>
                  <ul className="space-y-3">
                    {footerLinks?.support?.map((link, index) => (
                      <li key={index}>
                        <Link 
                          to={link?.path} 
                          className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                        >
                          {link?.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Legal Links */}
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                  <ul className="space-y-3">
                    {footerLinks?.legal?.map((link, index) => (
                      <li key={index}>
                        <Link 
                          to={link?.path} 
                          className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                        >
                          {link?.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Government Partners Section */}
        <div className="py-8 border-t border-border">
          <div className="text-center mb-6">
            <h4 className="font-semibold text-foreground mb-4">Government Partners</h4>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {governmentPartners?.map((partner, index) => (
                <div key={index} className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="Award" size={16} className="text-primary" />
                  <span className="text-sm">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-muted-foreground text-sm">
                © {currentYear} PM Internship Matcher. All rights reserved. 
                <span className="block md:inline md:ml-2">
                  A Government of India Initiative.
                </span>
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground mr-2">Follow us:</span>
              {socialLinks?.map((social, index) => (
                <a
                  key={index}
                  href={social?.url}
                  className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-150"
                  aria-label={`Follow us on ${social?.name}`}
                >
                  <Icon name={social?.icon} size={16} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-4 pt-4 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              This platform is developed in compliance with Government of India's Digital India initiative. 
              All data is processed and stored within Indian jurisdiction as per data localization norms.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;