import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HomeLanding from './pages/home-landing';
import InternshipDetailsView from './pages/internship-details-view';
import CompanyInternshipPosting from './pages/company-internship-posting';
import StudentRegistration from './pages/student-registration';
import StudentProfileManagement from './pages/student-profile-management';
import MatchmakingDashboard from './pages/matchmaking-dashboard';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CompanyInternshipPosting />} />
        <Route path="/home-landing" element={<HomeLanding />} />
        <Route path="/internship-details-view" element={<InternshipDetailsView />} />
        <Route path="/company-internship-posting" element={<CompanyInternshipPosting />} />
        <Route path="/student-registration" element={<StudentRegistration />} />
        <Route path="/student-profile-management" element={<StudentProfileManagement />} />
        <Route path="/matchmaking-dashboard" element={<MatchmakingDashboard />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
