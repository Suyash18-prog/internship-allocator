import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';

const StudentRegistration = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Student Registration - PM Internship Matcher</title>
        <meta name="description" content="Register as a student to find your perfect internship match through our AI-powered platform. Join thousands of students already using PM Internship Matcher." />
        <meta name="keywords" content="student registration, internship, PM scheme, career, job matching, AI recommendations" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-4xl mx-auto">
              <RegistrationHeader />
              
              <div className="bg-card rounded-xl border border-border shadow-sm">
                <div className="p-6 sm:p-8">
                  <RegistrationForm />
                </div>
              </div>
              
              {/* Additional Information */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Why Register?</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Get personalized internship recommendations based on your skills and interests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Access exclusive opportunities from top companies across India</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Track your applications and get real-time updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>Build your professional network with industry mentors</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-card rounded-lg border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Next Steps</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-medium">1</div>
                      <span className="text-sm text-muted-foreground">Complete your registration form</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-muted text-muted-foreground rounded-full text-xs font-medium">2</div>
                      <span className="text-sm text-muted-foreground">Browse AI-matched internship recommendations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-muted text-muted-foreground rounded-full text-xs font-medium">3</div>
                      <span className="text-sm text-muted-foreground">Apply to internships that match your profile</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-muted text-muted-foreground rounded-full text-xs font-medium">4</div>
                      <span className="text-sm text-muted-foreground">Start your internship journey</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default StudentRegistration;