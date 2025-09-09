import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MatchCard from './components/MatchCard';
import FilterPanel from './components/FilterPanel';
import StudentProfile from './components/StudentProfile';
import MatchingStats from './components/MatchingStats';
import RecentActivity from './components/RecentActivity';

const MatchmakingDashboard = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    sector: '',
    minScore: '',
    duration: '',
    stipend: '',
    companySize: '',
    workMode: ''
  });
  const [sortBy, setSortBy] = useState('matchScore');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);

  // Mock student data
  const studentData = {
    id: 1,
    name: "Alex Kumar",
    location: "Mumbai",
    sector: "Technology",
    skills: ["React", "JavaScript", "Python", "Node.js", "MongoDB", "AWS", "Git", "Docker", "TypeScript", "GraphQL"],
    profileCompletion: 85,
    totalMatches: 47,
    newMatches: 8,
    applications: 12,
    interviews: 3,
    education: {
      degree: "B.Tech Computer Science",
      institution: "IIT Mumbai",
      year: "2024"
    },
    preferences: {
      duration: "3-6 months",
      workMode: "Hybrid",
      stipend: "₹25,000 - ₹50,000"
    }
  };

  // Mock internship data with match scores
  const mockInternships = [
    {
      id: 1,
      title: "Full Stack Developer Intern",
      company: "TechCorp Solutions",
      location: "Mumbai",
      sector: "Technology",
      requiredSkills: ["React", "Node.js", "MongoDB", "JavaScript"],
      matchingSkills: ["React", "Node.js", "MongoDB", "JavaScript"],
      matchScore: 92,
      skillScore: 95,
      locationMatch: true,
      sectorMatch: true,
      duration: "6 months",
      stipend: "₹35,000/month",
      openings: 3,
      description: `Join our dynamic team as a Full Stack Developer Intern and work on cutting-edge web applications.\nYou'll collaborate with senior developers on real-world projects using modern technologies.`,
      companySize: "medium",
      workMode: "hybrid"
    },
    {
      id: 2,
      title: "Python Developer Intern",
      company: "DataTech Analytics",
      location: "Mumbai",
      sector: "Technology",
      requiredSkills: ["Python", "Django", "PostgreSQL", "AWS"],
      matchingSkills: ["Python", "AWS"],
      matchScore: 87,
      skillScore: 82,
      locationMatch: true,
      sectorMatch: true,
      duration: "4 months",
      stipend: "₹28,000/month",
      openings: 2,
      description: `Work with our data science team to build scalable backend systems and APIs.\nGain experience in cloud deployment and database optimization.`,
      companySize: "startup",
      workMode: "onsite"
    },
    {
      id: 3,
      title: "Frontend Developer Intern",
      company: "Creative Digital",
      location: "Delhi",
      sector: "Technology",
      requiredSkills: ["React", "TypeScript", "CSS", "JavaScript"],
      matchingSkills: ["React", "TypeScript", "JavaScript"],
      matchScore: 84,
      skillScore: 88,
      locationMatch: false,
      sectorMatch: true,
      duration: "3 months",
      stipend: "₹22,000/month",
      openings: 4,
      description: `Create beautiful and responsive user interfaces for our client projects.\nWork with designers and backend developers in an agile environment.`,
      companySize: "medium",
      workMode: "remote"
    },
    {
      id: 4,
      title: "DevOps Intern",
      company: "CloudFirst Technologies",
      location: "Bangalore",
      sector: "Technology",
      requiredSkills: ["Docker", "AWS", "Kubernetes", "Linux"],
      matchingSkills: ["Docker", "AWS"],
      matchScore: 78,
      skillScore: 75,
      locationMatch: false,
      sectorMatch: true,
      duration: "5 months",
      stipend: "₹32,000/month",
      openings: 1,
      description: `Learn infrastructure automation and cloud deployment strategies.\nWork with containerization and orchestration tools in production environments.`,
      companySize: "large",
      workMode: "hybrid"
    },
    {
      id: 5,
      title: "Software Development Intern",
      company: "InnovateTech",
      location: "Hyderabad",
      sector: "Technology",
      requiredSkills: ["Java", "Spring Boot", "MySQL", "Git"],
      matchingSkills: ["Git"],
      matchScore: 65,
      skillScore: 60,
      locationMatch: false,
      sectorMatch: true,
      duration: "6 months",
      stipend: "₹25,000/month",
      openings: 5,
      description: `Develop enterprise-level applications using Java and Spring framework.\nParticipate in code reviews and learn software engineering best practices.`,
      companySize: "large",
      workMode: "onsite"
    },
    {
      id: 6,
      title: "Mobile App Developer Intern",
      company: "AppCrafters",
      location: "Pune",
      sector: "Technology",
      requiredSkills: ["React Native", "JavaScript", "Firebase", "Redux"],
      matchingSkills: ["JavaScript"],
      matchScore: 62,
      skillScore: 58,
      locationMatch: false,
      sectorMatch: true,
      duration: "4 months",
      stipend: "₹20,000/month",
      openings: 2,
      description: `Build cross-platform mobile applications for iOS and Android.\nWork with modern mobile development frameworks and cloud services.`,
      companySize: "startup",
      workMode: "remote"
    }
  ];

  // Mock matching statistics
  const matchingStats = {
    excellent: 3,
    good: 8,
    fair: 15,
    poor: 21,
    avgScore: 76,
    skillMatches: 28,
    locationMatches: 12,
    sectorMatches: 35
  };

  // Mock recent activities
  const recentActivities = [
    {
      type: 'new_match',
      company: 'TechCorp Solutions',
      matchScore: 92,
      timestamp: new Date(Date.now() - 300000),
      actionable: true
    },
    {
      type: 'application_sent',
      company: 'DataTech Analytics',
      position: 'Python Developer Intern',
      timestamp: new Date(Date.now() - 3600000),
      actionable: false
    },
    {
      type: 'application_viewed',
      company: 'Creative Digital',
      position: 'Frontend Developer Intern',
      timestamp: new Date(Date.now() - 7200000),
      actionable: true
    },
    {
      type: 'interview_scheduled',
      company: 'CloudFirst Technologies',
      date: '15th Sep 2025',
      timestamp: new Date(Date.now() - 86400000),
      urgent: true,
      actionable: true
    },
    {
      type: 'profile_updated',
      field: 'Skills',
      timestamp: new Date(Date.now() - 172800000),
      actionable: false
    }
  ];

  // Filter and sort internships
  const getFilteredInternships = () => {
    let filtered = mockInternships?.filter(internship => {
      // Search filter
      if (filters?.search && !internship?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) && 
          !internship?.company?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
        return false;
      }
      
      // Location filter
      if (filters?.location && internship?.location !== filters?.location) {
        return false;
      }
      
      // Sector filter
      if (filters?.sector && internship?.sector !== filters?.sector) {
        return false;
      }
      
      // Minimum score filter
      if (filters?.minScore && internship?.matchScore < parseInt(filters?.minScore)) {
        return false;
      }
      
      // Duration filter
      if (filters?.duration && internship?.duration !== filters?.duration) {
        return false;
      }
      
      // Stipend filter
      if (filters?.stipend) {
        const stipendValue = parseInt(internship?.stipend?.replace(/[^\d]/g, ''));
        if (filters?.stipend === '0-10000' && stipendValue > 10000) return false;
        if (filters?.stipend === '10000-25000' && (stipendValue < 10000 || stipendValue > 25000)) return false;
        if (filters?.stipend === '25000-50000' && (stipendValue < 25000 || stipendValue > 50000)) return false;
        if (filters?.stipend === '50000+' && stipendValue < 50000) return false;
      }
      
      // Company size filter
      if (filters?.companySize && internship?.companySize !== filters?.companySize) {
        return false;
      }
      
      // Work mode filter
      if (filters?.workMode && internship?.workMode !== filters?.workMode) {
        return false;
      }
      
      return true;
    });

    // Sort results
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'matchScore':
          return b?.matchScore - a?.matchScore;
        case 'company':
          return a?.company?.localeCompare(b?.company);
        case 'location':
          return a?.location?.localeCompare(b?.location);
        case 'stipend':
          const aStipend = parseInt(a?.stipend?.replace(/[^\d]/g, ''));
          const bStipend = parseInt(b?.stipend?.replace(/[^\d]/g, ''));
          return bStipend - aStipend;
        default:
          return b?.matchScore - a?.matchScore;
      }
    });

    return filtered;
  };

  const filteredInternships = getFilteredInternships();
  const topMatches = filteredInternships?.slice(0, 3);
  const otherMatches = filteredInternships?.slice(3);

  const handleClearFilters = () => {
    setFilters({
      search: '',
      location: '',
      sector: '',
      minScore: '',
      duration: '',
      stipend: '',
      companySize: '',
      workMode: ''
    });
  };

  const handleExportResults = () => {
    const exportData = filteredInternships?.map(internship => ({
      title: internship?.title,
      company: internship?.company,
      location: internship?.location,
      matchScore: internship?.matchScore,
      stipend: internship?.stipend
    }));
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'internship-matches.json';
    const linkElement = document.createElement('a');
    linkElement?.setAttribute('href', dataUri);
    linkElement?.setAttribute('download', exportFileDefaultName);
    linkElement?.click();
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Finding Your Perfect Matches</h3>
                <p className="text-muted-foreground">Analyzing internship opportunities based on your profile...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Matchmaking Dashboard</h1>
                <p className="text-muted-foreground">
                  Discover AI-powered internship recommendations tailored to your skills and preferences
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleExportResults}
                  iconName="Download"
                  iconPosition="left"
                >
                  Export Results
                </Button>
                <Button
                  variant="default"
                  onClick={() => navigate('/student-registration')}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Update Profile
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Student Profile */}
              <StudentProfile student={studentData} />

              {/* Filter Panel */}
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={handleClearFilters}
              />

              {/* Results Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Your Matches ({filteredInternships?.length})
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Ranked by compatibility score and your preferences
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e?.target?.value)}
                    className="px-3 py-2 border border-border rounded-md text-sm bg-card text-foreground"
                  >
                    <option value="matchScore">Sort by Match Score</option>
                    <option value="company">Sort by Company</option>
                    <option value="location">Sort by Location</option>
                    <option value="stipend">Sort by Stipend</option>
                  </select>
                  <div className="flex items-center border border-border rounded-md">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <Icon name="Grid3X3" size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <Icon name="List" size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Top 3 Matches */}
              {topMatches?.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Icon name="Star" size={20} color="var(--color-primary)" />
                    <h3 className="text-lg font-semibold text-foreground">Top Recommendations</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {topMatches?.map((internship, index) => (
                      <MatchCard
                        key={internship?.id}
                        internship={internship}
                        rank={index + 1}
                        isTopMatch={true}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Other Matches */}
              {otherMatches?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">More Matches</h3>
                  <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                    {otherMatches?.map((internship, index) => (
                      <MatchCard
                        key={internship?.id}
                        internship={internship}
                        rank={index + 4}
                        isTopMatch={false}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {filteredInternships?.length === 0 && (
                <div className="text-center py-12">
                  <div className="flex items-center justify-center w-20 h-20 bg-muted rounded-full mx-auto mb-4">
                    <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Matches Found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or updating your profile to find more opportunities
                  </p>
                  <div className="flex items-center justify-center space-x-3">
                    <Button variant="outline" onClick={handleClearFilters}>
                      Clear Filters
                    </Button>
                    <Button variant="default" onClick={() => navigate('/student-profile-management')}>
                      Update Profile
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Matching Statistics */}
              <MatchingStats stats={matchingStats} />

              {/* Recent Activity */}
              <RecentActivity activities={recentActivities} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchmakingDashboard;