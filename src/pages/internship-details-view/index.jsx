import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import InternshipHeader from './components/InternshipHeader';
import MatchScoreCard from './components/MatchScoreCard';
import SkillsMatchSection from './components/SkillsMatchSection';
import InternshipDescription from './components/InternshipDescription';
import CompanyInfo from './components/CompanyInfo';
import ApplicationActions from './components/ApplicationActions';
import SimilarInternships from './components/SimilarInternships';

const InternshipDetailsView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const internshipId = searchParams?.get('id') || '1';
  
  const [internship, setInternship] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock student skills for matching
  const studentSkills = [
    "React", "JavaScript", "HTML", "CSS", "Node.js", "MongoDB", 
    "Git", "Figma", "Communication", "Problem Solving"
  ];

  // Mock internship data
  const mockInternships = {
    '1': {
      id: '1',
      title: 'Product Management Intern',
      companyName: 'TechCorp Solutions',
      companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop&crop=center',
      location: 'Mumbai, Maharashtra',
      duration: '6 months',
      stipend: 25000,
      sector: 'Technology',
      applicationDeadline: '15/10/2025',
      applicationsCount: 127,
      viewsCount: 1543,
      matchScore: 87,
      skillMatch: 85,
      locationMatch: 100,
      sectorMatch: 90,
      companySize: '500-1000 employees',
      description: `Join our dynamic product management team and gain hands-on experience in building innovative digital solutions that impact millions of users.\n\nAs a Product Management Intern, you'll work closely with senior product managers, engineers, and designers to understand user needs, define product requirements, and drive feature development from conception to launch.\n\nThis internship offers a unique opportunity to learn about the complete product lifecycle, from market research and user interviews to data analysis and go-to-market strategies. You'll be involved in real projects that contribute to our product roadmap and business objectives.`,
      requiredSkills: [
        'Product Management', 'Data Analysis', 'User Research', 'Agile Methodology',
        'Communication', 'Problem Solving', 'Market Research', 'Wireframing'
      ],
      responsibilities: [
        'Conduct user research and analyze customer feedback to identify product opportunities',
        'Collaborate with engineering teams to define technical requirements and user stories',
        'Create and maintain product documentation, including PRDs and feature specifications',
        'Assist in competitive analysis and market research to inform product strategy',
        'Support go-to-market activities including feature launches and user communication',
        'Participate in agile ceremonies and contribute to sprint planning and retrospectives'
      ],
      learningOutcomes: [
        'Understanding of product management fundamentals and best practices',
        'Experience with user research methodologies and data-driven decision making',
        'Knowledge of agile development processes and cross-functional collaboration',
        'Skills in product analytics, A/B testing, and performance measurement',
        'Exposure to go-to-market strategies and product marketing principles'
      ],
      requirements: [
        'Currently pursuing Bachelor\'s or Master\'s degree in Business, Engineering, or related field',
        'Strong analytical and problem-solving skills with attention to detail',
        'Excellent written and verbal communication skills',
        'Basic understanding of technology and software development processes',
        'Interest in user experience design and customer-centric thinking',
        'Ability to work independently and manage multiple projects simultaneously'
      ],
      benefits: [
        'Competitive monthly stipend of ₹25,000',
        'Mentorship from senior product managers',
        'Access to premium product management tools and resources',
        'Opportunity to work on live products with real user impact',
        'Flexible working hours and remote work options',
        'Certificate of completion and potential for full-time offer'
      ]
    }
  };

  const mockCompanies = {
    'TechCorp Solutions': {
      name: 'TechCorp Solutions',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop&crop=center',
      description: 'TechCorp Solutions is a leading technology company specializing in innovative digital solutions for businesses across various industries. We focus on creating user-centric products that solve real-world problems and drive digital transformation.',
      size: '500-1000 employees',
      founded: '2015',
      headquarters: 'Mumbai, Maharashtra',
      totalInternships: 15,
      successfulHires: 89,
      rating: '4.6/5',
      responseTime: '2-3 days',
      industries: ['Technology', 'Software Development', 'Digital Solutions', 'SaaS'],
      culture: [
        'Innovation-driven environment',
        'Collaborative team culture',
        'Continuous learning opportunities',
        'Work-life balance focus',
        'Diversity and inclusion',
        'Remote-friendly policies'
      ],
      website: 'https://techcorpsolutions.com',
      email: 'careers@techcorpsolutions.com',
      address: 'Tech Park, Andheri East, Mumbai, Maharashtra 400069'
    }
  };

  const mockSimilarInternships = [
    {
      id: '2',
      title: 'Business Analyst Intern',
      companyName: 'DataTech Analytics',
      companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop&crop=center',
      location: 'Pune, Maharashtra',
      duration: '4 months',
      stipend: 22000,
      matchScore: 82,
      requiredSkills: ['Data Analysis', 'Excel', 'SQL', 'Business Intelligence'],
      applicationsCount: 89,
      postedDaysAgo: 3
    },
    {
      id: '3',
      title: 'UX Research Intern',
      companyName: 'Design Studio Pro',
      companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop&crop=center',
      location: 'Bangalore, Karnataka',
      duration: '5 months',
      stipend: 28000,
      matchScore: 78,
      requiredSkills: ['User Research', 'Figma', 'Prototyping', 'Usability Testing'],
      applicationsCount: 156,
      postedDaysAgo: 5
    },
    {
      id: '4',
      title: 'Marketing Strategy Intern',
      companyName: 'Growth Marketing Co',
      companyLogo: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=100&h=100&fit=crop&crop=center',
      location: 'Delhi, NCR',
      duration: '6 months',
      stipend: 24000,
      matchScore: 75,
      requiredSkills: ['Digital Marketing', 'Analytics', 'Content Strategy', 'SEO'],
      applicationsCount: 203,
      postedDaysAgo: 7
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchInternshipDetails = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const internshipData = mockInternships?.[internshipId];
        if (internshipData) {
          setInternship(internshipData);
        } else {
          // Fallback to first internship if ID not found
          setInternship(mockInternships?.['1']);
        }
      } catch (error) {
        console.error('Error fetching internship details:', error);
        setInternship(mockInternships?.['1']);
      } finally {
        setLoading(false);
      }
    };

    fetchInternshipDetails();
  }, [internshipId]);

  const handleBack = () => {
    navigate('/matchmaking-dashboard');
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // In a real app, this would make an API call to save/unsave the internship
  };

  const handleApply = async (internshipId) => {
    // Simulate API call for application
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Applied to internship:', internshipId);
  };

  const handleExpressInterest = async (internshipId) => {
    // Simulate API call for expressing interest
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Expressed interest in internship:', internshipId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-muted rounded-lg"></div>
                  <div className="flex-1 space-y-4">
                    <div className="h-8 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="flex gap-4">
                      <div className="h-6 bg-muted rounded w-24"></div>
                      <div className="h-6 bg-muted rounded w-24"></div>
                      <div className="h-6 bg-muted rounded w-24"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-card border border-border rounded-lg p-6 h-64"></div>
                  <div className="bg-card border border-border rounded-lg p-6 h-96"></div>
                </div>
                <div className="bg-card border border-border rounded-lg p-6 h-96"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-12">
              <h1 className="text-2xl font-semibold text-foreground mb-4">Internship Not Found</h1>
              <p className="text-muted-foreground mb-6">The internship you're looking for doesn't exist or has been removed.</p>
              <button
                onClick={handleBack}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-150"
              >
                Back to Search
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const companyInfo = mockCompanies?.[internship?.companyName];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Internship Header */}
          <InternshipHeader
            internship={internship}
            onBack={handleBack}
            onSave={handleSave}
            isSaved={isSaved}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Match Score */}
              <MatchScoreCard
                matchScore={internship?.matchScore}
                skillMatch={internship?.skillMatch}
                locationMatch={internship?.locationMatch}
                sectorMatch={internship?.sectorMatch}
              />

              {/* Skills Match */}
              <SkillsMatchSection
                requiredSkills={internship?.requiredSkills}
                studentSkills={studentSkills}
              />

              {/* Internship Description */}
              <InternshipDescription internship={internship} />

              {/* Company Information */}
              {companyInfo && <CompanyInfo company={companyInfo} />}

              {/* Similar Internships */}
              <SimilarInternships similarInternships={mockSimilarInternships} />
            </div>

            {/* Right Column - Application Actions */}
            <div className="lg:col-span-1">
              <ApplicationActions
                internship={internship}
                onApply={handleApply}
                onExpressInterest={handleExpressInterest}
                onSave={handleSave}
                isSaved={isSaved}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetailsView;