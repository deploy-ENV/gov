import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveTab } from './dashboardSlice';

// Import dashboard components
import Dashboard from './LandingDashboardContractor';
import AvailableProjects from './AvailableProjects';
import RequestFund from './RequestFund';
import MyBids from './MyBids';
import Updates from './ProjectUpdates';
import Expense from './Expense';
import Communication from './Communication';
import Settings from './Settings';
import Profile from './Profile';
// Component to handle tab state based on route
const RouteHandler = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Extract the active tab from the URL
    const path = location.pathname.split('/').pop();
    let activeTab = 'overview';
    
    switch(path) {
      case 'availableprojects':
        activeTab = 'availableprojects';
        break;
      case 'projects':
        activeTab = 'projects';
        break;
      case 'bids':
        activeTab = 'bids';
        break;
      case 'updates':
        activeTab = 'updates';
        break;
      case 'expenses':
        activeTab = 'expenses';
        break;
      case 'communication':
        activeTab = 'communication';
        break;
      case 'requestFund':
        activeTab = 'fund';
        break;
      case 'settings':
        activeTab = 'settings';
        break;
      case 'profile':
        activeTab = 'profile';
        break;
      default:
        activeTab = 'overview';
    }
    
    dispatch(setActiveTab(activeTab));
  }, [location, dispatch]);

  return null;
};

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <RouteHandler />
      <Routes>
          <Route path="/" element={<Dashboard />}>
          
          <Route path="availableprojects" element={<AvailableProjects />} />
          <Route path="projects" element={<AvailableProjects />} />
          <Route path="requestFund" element={<RequestFund />} />
          <Route path="bids" element={<MyBids />} />
          <Route path="updates" element={<Updates />} />
          <Route path="expenses" element={<Expense />} />
          <Route path="communication" element={<Communication />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
