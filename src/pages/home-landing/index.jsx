import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import QuickAccessSection from './components/QuickAccessSection';
import FooterSection from './components/FooterSection';

const HomeLanding = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>PM Internship Matcher - AI-Powered Internship Matching Platform</title>
        <meta 
          name="description" 
          content="Connect with perfect internship opportunities through our AI-powered matching system. Part of Government of India's PM Internship Scheme initiative." 
        />
        <meta name="keywords" content="PM Internship, internship matching, AI matching, government scheme, student internships, company hiring" />
        <meta property="og:title" content="PM Internship Matcher - AI-Powered Internship Matching" />
        <meta property="og:description" content="Streamlining the PM Internship Scheme by connecting students with relevant opportunities through intelligent matching algorithms." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/home-landing" />
      </Helmet>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Platform Statistics */}
        <StatsSection />

        {/* Features Overview */}
        <FeaturesSection />

        {/* Success Stories */}
        <TestimonialsSection />

        {/* Quick Access & User Types */}
        <QuickAccessSection />

        {/* Footer */}
        <FooterSection />
      </main>
    </div>
  );
};

export default HomeLanding;