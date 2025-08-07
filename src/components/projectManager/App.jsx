import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import Layout from './components/Layout';
import DashboardHome from './pages/DashboardHome';
import CreateProject from './pages/CreateProject';
import AllProjects from './pages/AllProjects';
import ViewBids from './pages/ViewBids';
import AssignSupervisorSupplier from './pages/AssignSupervisorSupplier';
import ProjectMonitoring from './pages/ProjectMonitoring';
import FundRequests from './pages/FundRequests';
import DocumentsBlueprints from './pages/DocumentsBlueprints';
import InternalChat from './pages/InternalChat';
import ExportReports from './pages/ExportReports';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import ProductCatalog from './pages/ProductCatalog';
// import services and context same as before...

const ProjectManagerDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('dashboard');

  // Set active tab based on path
  useEffect(() => {
    const path = location.pathname.split('/').pop() || 'dashboard';
    setActiveTab(path);
  }, [location]);

  // Add your auth & project fetching logic here as before...

  return (
    <>
      <Routes>
        <Route element={<Layout activeTab={activeTab} setActiveTab={setActiveTab} />}>
          {/* Default: DashboardHome for /dashboard/pm */}
          <Route index element={<DashboardHome />} />
          
          <Route path="create-project" element={<CreateProject />} />
          <Route path="all-projects" element={<AllProjects />} />
          <Route path="view-bids" element={<ViewBids />} />
          <Route path="assign-team" element={<AssignSupervisorSupplier />} />
          <Route path="monitor" element={<ProjectMonitoring />} />
          <Route path="fund-requests" element={<FundRequests />} />
          <Route path="documents" element={<DocumentsBlueprints />} />
          <Route path="chat" element={<InternalChat />} />
          <Route path="reports" element={<ExportReports />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="product-catalog" element={<ProductCatalog />} />

          
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default ProjectManagerDashboard;
