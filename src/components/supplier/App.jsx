
import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Sidebar from "./components/Sidebar";
import Overview from "./pages/Overview";
import ProductCatalog from "./pages/ProductCatalog";
import IncomingOrders from "./pages/IncomingOrders";
import DeliveryManagement from "./pages/DeliveryManagement";
import FundTracker from "./pages/FundTracker";
import DeliveryHistory from "./pages/DeliveryHistory";
import Messaging from "./pages/Messaging";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ProjectDetail from "./pages/ProjectDetail";

// Component to handle tab state based on route
const RouteHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Extract the current path and determine the active tab
  useEffect(() => {
    const path = location.pathname.split('/').pop() || '';
    let activeTab = 'overview';
    
    switch(path) {
      case 'product-catalog':
        activeTab = 'catalog';
        break;
      case 'incoming-orders':
        activeTab = 'orders';
        break;
      case 'delivery-management':
        activeTab = 'delivery';
        break;
      case 'fund-tracker':
        activeTab = 'funds';
        break;
      case 'delivery-history':
        activeTab = 'history';
        break;
      case 'messaging':
        activeTab = 'messaging';
        break;
      case 'profile':
        activeTab = 'profile';
        break;
      case 'settings':
        activeTab = 'settings';
        break;
      default:
        activeTab = 'overview';
    }
    
    // Update the active tab in the store if needed
    // dispatch(setActiveTab(activeTab));
  }, [location, dispatch]);

  return null;
};

export default function App() {
  // Get the base path from the current URL
  const location = useLocation();
  const basePath = location.pathname.split('/').slice(0, 3).join('/'); // Gets /dashboard/supplier

  return (
    <div className="flex min-h-screen bg-gray-50">
      <RouteHandler />
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route index element={<Overview />} />
          <Route path="product-catalog" element={<ProductCatalog />} />
          <Route path="incoming-orders" element={<IncomingOrders />} />
          <Route path="delivery-management" element={<DeliveryManagement />} />
          <Route path="fund-tracker" element={<FundTracker />} />
          <Route path="delivery-history" element={<DeliveryHistory />} />
          <Route path="messaging" element={<Messaging />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="project-detail" element={<ProjectDetail />} />
          
          {/* Catch-all route for 404 handling */}
          <Route path="*" element={<Navigate to={basePath} replace />} />
        </Routes>
      </div>
    </div>
  );
}