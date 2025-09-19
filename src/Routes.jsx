import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HomeLanding from './pages/home-landing';
import InternshipDetailsView from './pages/internship-details-view';
import CompanyInternshipPosting from './pages/company-internship-posting';
import ApplicantsPage from './pages/company-internship-posting/applicants';
import StudentRegistration from './pages/student-registration';
import StudentProfileManagement from './pages/student-profile-management';
import StudentProfileSetup from './pages/student-profile-management/StudentProfileSetup';
import StudentCompaniesList from './pages/student-profile-management/StudentCompaniesList';
import MatchmakingDashboard from './pages/matchmaking-dashboard';
import StudentDashboard from './pages/student-dashboard';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import IndustryLogin from './pages/industry/Login';
import IndustryRegister from './pages/industry/Register';
import IndustryPost from './pages/industry/PostInternship';
import IndustryDashboard from './pages/industry/Dashboard';
import ProtectedRoute from './utils/ProtectedRoute';
import ApplicationsPage from './pages/applications';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Navigate to="/home-landing" replace />} />
        <Route path="/home-landing" element={<HomeLanding />} />
  <Route path="/internship-details-view" element={<InternshipDetailsView />} />
  <Route path="/company-internship-posting" element={<CompanyInternshipPosting />} />
  <Route path="/company-internship-posting/:id/applicants" element={<ApplicantsPage />} />
  <Route path="/student-registration" element={<StudentRegistration />} />
  <Route path="/student-profile-management" element={<StudentProfileManagement />} />
  <Route path="/student-profile-setup" element={<StudentProfileSetup />} />
  <Route path="/companies" element={<StudentCompaniesList />} />
  <Route path="/matchmaking-dashboard" element={<MatchmakingDashboard />} />
  <Route path="/student-dashboard" element={<StudentDashboard />} />
  <Route path="/industry/login" element={<IndustryLogin />} />
  <Route path="/industry/register" element={<IndustryRegister />} />
  <Route path="/industry/post" element={<IndustryPost />} />
  <Route path="/industry/dashboard" element={<IndustryDashboard />} />
  <Route path="/auth/login" element={<Login />} />
  <Route path="/auth/signup" element={<SignUp />} />
  <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
