import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ProfileHeader from './components/ProfileHeader';
import ProfileViewSection from './components/ProfileViewSection';
import ProfileEditForm from './components/ProfileEditForm';
import MatchInsights from './components/MatchInsights';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const StudentProfileManagement = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mock student data
  const [student, setStudent] = useState({
    id: 1,
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    location: "Mumbai",
    skills: ["Project Management", "Data Analysis", "Communication", "Leadership", "Problem Solving"],
    sectors: ["Technology", "Healthcare", "Finance"],
    registrationDate: "2024-08-15",
    lastUpdated: "2024-09-05"
  });

  // Mock match statistics
  const matchStats = {
    totalMatches: 24,
    averageScore: 78,
    newMatches: 5
  };

  // Mock match insights
  const matchInsights = {
    recentMatches: [
      {
        id: 1,
        title: "Product Management Intern",
        company: "TechCorp Solutions",
        location: "Mumbai",
        score: 85
      },
      {
        id: 2,
        title: "Business Analyst Intern",
        company: "DataFlow Systems",
        location: "Mumbai",
        score: 78
      },
      {
        id: 3,
        title: "Project Coordinator Intern",
        company: "HealthTech Innovations",
        location: "Mumbai",
        score: 72
      }
    ],
    metrics: [
      {
        label: "Skill Match Rate",
        value: 82,
        icon: "Target",
        description: "How well your skills match available internships"
      },
      {
        label: "Location Preference",
        value: 95,
        icon: "MapPin",
        description: "Availability of internships in your preferred location"
      }
    ],
    suggestions: [
      {
        text: "Add 'Agile Methodology' to your skills to match 8 more internships",
        impact: 12
      },
      {
        text: "Consider expanding location preferences to include Pune for 15 additional matches",
        impact: 18
      },
      {
        text: "Add \'Digital Marketing\' skill to access high-demand internship opportunities",
        impact: 15
      }
    ]
  };

  // Calculate profile completion percentage
  const calculateProfileCompletion = (studentData) => {
    let completion = 0;
    const fields = {
      name: 15,
      email: 15,
      phone: 15,
      location: 15,
      skills: 25,
      sectors: 15
    };

    Object.keys(fields)?.forEach(field => {
      if (field === 'skills' && studentData?.skills?.length > 0) {
        completion += fields?.[field];
      } else if (field === 'sectors' && studentData?.sectors?.length > 0) {
        completion += fields?.[field];
      } else if (studentData?.[field] && studentData?.[field]?.toString()?.trim()) {
        completion += fields?.[field];
      }
    });

    return completion;
  };

  const profileCompletion = calculateProfileCompletion(student);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async (updatedStudent) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setStudent(updatedStudent);
      setIsEditing(false);
      setIsLoading(false);
      setShowSuccessMessage(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }, 1500);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleViewMatches = () => {
    navigate('/matchmaking-dashboard');
  };

  const handleBackToHome = () => {
    navigate('/home-landing');
  };

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Student Profile Management - PM Internship Matcher</title>
        <meta name="description" content="Manage your student profile, update skills and preferences, and optimize your internship matching results." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Success Message */}
            {showSuccessMessage && (
              <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center gap-3 animate-fade-in">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <div>
                  <p className="text-success font-medium">Profile Updated Successfully!</p>
                  <p className="text-success/80 text-sm">Your changes have been saved and will be reflected in future matches.</p>
                </div>
              </div>
            )}

            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <button 
                onClick={handleBackToHome}
                className="hover:text-foreground transition-colors duration-150"
              >
                Home
              </button>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground">Profile Management</span>
            </div>

            {/* Profile Header */}
            <ProfileHeader 
              student={student} 
              profileCompletion={profileCompletion} 
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {!isEditing ? (
                  <>
                    {/* Profile View Section */}
                    <ProfileViewSection 
                      student={student} 
                      matchStats={matchStats} 
                    />
                    
                    {/* Edit Profile Button */}
                    <div className="flex justify-center">
                      <Button
                        variant="default"
                        size="lg"
                        iconName="Edit"
                        iconPosition="left"
                        onClick={handleEditProfile}
                      >
                        Edit Profile
                      </Button>
                    </div>
                  </>
                ) : (
                  /* Profile Edit Form */
                  (<ProfileEditForm
                    student={student}
                    onSave={handleSaveProfile}
                    onCancel={handleCancelEdit}
                    isLoading={isLoading}
                  />)
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <MatchInsights 
                  insights={matchInsights} 
                  onViewMatches={handleViewMatches} 
                />
              </div>
            </div>

            {/* Additional Actions */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Ready to find your perfect internship?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Your profile is {profileCompletion}% complete. 
                  {profileCompletion < 100 
                    ? ' Complete your profile to get better match recommendations.' 
                    : ' You\'re all set to discover amazing internship opportunities!'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="default"
                    size="lg"
                    iconName="Search"
                    iconPosition="left"
                    onClick={handleViewMatches}
                  >
                    Find Internships
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="FileText"
                    iconPosition="left"
                    onClick={() => navigate('/internship-details-view')}
                  >
                    Browse Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default StudentProfileManagement;