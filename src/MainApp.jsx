import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, ROLES } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Import all dashboard components
import LandingPage from './components/landingPage/components/landing/LandingPage';
import ContractorDashboard from './components/contractorDash/App';
import SupplierDashboard from './components/supplier/App';
import ProjectManagerDashboard from './components/projectManager/App';
import SupervisorApp from './components/supervisorDash/App';

// Import the main App component for the landing page
import App from './components/landingPage/components/App';
import './components/landingPage/index.css';

// Component to handle redirection after login
const AuthCallback = () => {
  const location = useLocation();
  return <Navigate to={location.state?.from?.pathname || '/'} replace />;
};

const MainApp = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
        
          <Route path="/" element={<App />} />
          
          {/* Auth callback route */}
          <Route path="/auth/callback" element={<AuthCallback />} />
          
          {/* Protected dashboard routes */}
          <Route 
            path="/dashboard/contractor/*" 
            element={
              <ProtectedRoute 
                allowedRoles={[ROLES.INDIVIDUAL_CONTRACTOR, ROLES.CORPORATE_CONTRACTOR]}
              >
                <ContractorDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard/supplier/*" 
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPPLIER]}>
                <SupplierDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard/pm/*" 
            element={
              <ProtectedRoute allowedRoles={[ROLES.PROJECT_MANAGER]}>
                <ProjectManagerDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard/supervisor/*" 
            element={
              <ProtectedRoute allowedRoles={[ROLES.SUPERVISOR]}>
                <SupervisorApp />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 Not Found route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default MainApp;