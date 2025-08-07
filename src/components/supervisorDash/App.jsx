import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LandingDashboardSupervisor from './LandingDashboardSupervisor';
import AssignedProject from './AssignedProject';
import SupplierMaterialVerificationPanel from './SupplierVerfication';
import ReviewUpdates from './ReviewUpdates';
import FundRequestsReview from './FundRequestsReview';
import RequestHistory from './RequestHistory';
import Communication from './Communication';
import Settings from './Settings';
import Profile from './Profile';

// Component to handle tab state based on route
const RouteHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Extract the current path and determine the active tab
  useEffect(() => {
    const path = location.pathname.split('/').pop() || '';
    let activeTab = 'overview';
    
    // Map path to tab ID
    const pathToTabMap = {
      'assignedproject': 'projects',
      'supplierverification': 'supplier',
      'reviewupdates': 'updates',
      'fundrequestsreview': 'fund',
      'requesthistory': 'history',
      'communication': 'communication',
      'profile': 'profile',
      'settings': 'settings'
    };

    activeTab = pathToTabMap[path.toLowerCase()] || 'overview';
    
    // Update the active tab in the store if needed
    // dispatch(setActiveTab(activeTab));
  }, [location, dispatch]);

  return null;
};

const SupervisorApp = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <RouteHandler />
      <Routes>
        <Route index element={<LandingDashboardSupervisor />} />
        <Route path="assignedproject" element={<AssignedProject />} />
        <Route path="supplierverification" element={<SupplierMaterialVerificationPanel />} />
        <Route path="reviewupdates" element={<ReviewUpdates />} />
        <Route path="fundrequestsreview" element={<FundRequestsReview />} />
        <Route path="requesthistory" element={<RequestHistory />} />
        <Route path="communication" element={<Communication />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        
        {/* Catch-all route for 404 handling */}
        <Route path="*" element={<LandingDashboardSupervisor />} />
      </Routes>
    </div>
  );
};

export default SupervisorApp;
