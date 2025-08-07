import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Home,
  Users,
  FileText,
  Settings,
  Bell,
  Search,
  ChevronDown,
  BarChart3,
  Activity,
  DollarSign,
  User,
  Plus,
  X,
  UserCircle,
  LogOut
} from 'lucide-react';
import {
  
  recalculateDashMode,
} from './dashboardSlice';
import { useSelector, useDispatch } from 'react-redux';
import { updateSettings, setActiveTab } from './dashboardSlice';
import { useNavigate } from 'react-router-dom';

const SettingsTab = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { notificationPrefs, theme, language } = useSelector(state => state.projectsDashboard.settings);
  const [localSettings, setLocalSettings] = useState({
    notificationPrefs,
    theme,
    language,
  });
  const [isEditing, setIsEditing] = useState(false);
  const toggleProfileDropdown = () => {
      setIsProfileOpen(!isProfileOpen);
    };

  const dashboardMode = useSelector(state => state.projectsDashboard.dashMode)
  useEffect(() => {
    dispatch(recalculateDashMode())
      // navigate("/")
      // else{
      //   navigate("/")
      // }
  }, [dashboardMode]);
//   const hasAcceptedBid = true;
  
  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home, link: "/" },
    { id: 'projects', label: 'Available Projects', hidden: dashboardMode === 'execution', icon: FileText, link: "/availableprojects" },
    { id: 'updates', label: 'Updates', icon: Activity, hidden: dashboardMode === 'bidding', link: "/updates" },
    { id: 'expenses', label: 'Expenses', icon: BarChart3, hidden: dashboardMode === 'bidding', link: "/expenses" },
    { id: 'bids', label: 'My Bids', icon: DollarSign, hidden: dashboardMode === 'execution', link: "/bids" },
    { id: 'communication', label: 'Communication', hidden: dashboardMode === 'bidding', icon: Users, link: "/communication" },
    { id: 'fund', label: 'Request Fund', hidden: dashboardMode === 'bidding', icon: DollarSign, link: "/requestFund" },
    { id: 'settings', label: 'Settings', icon: Settings, link: "/settings" },
  ];

  useEffect(() => {
    setLocalSettings({ notificationPrefs, theme, language });
  }, [notificationPrefs, theme, language]);

  const handleNotificationChange = (type) => {
    setLocalSettings(prev => ({
      ...prev,
      notificationPrefs: { ...prev.notificationPrefs, [type]: !prev.notificationPrefs[type] },
    }));
  };

  const handleThemeChange = (e) => {
    setLocalSettings(prev => ({ ...prev, theme: e.target.value }));
  };

  const handleLanguageChange = (e) => {
    setLocalSettings(prev => ({ ...prev, language: e.target.value }));
  };

  const handleSave = () => {
    dispatch(updateSettings(localSettings));
    setIsEditing(false);
  };

  return (
    <div className="flex h-screen font-sans bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar */}
      

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-cyan-400">Settings</h2>
              <p className="text-slate-400 mt-1">Customize your preferences</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search settings..."
                  className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                />
              </div>
              <button className="relative p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors">
                <Bell className="w-5 h-5 text-slate-300" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Notification Preferences */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Notification Preferences</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Email Notifications</span>
                    <input
                      type="checkbox"
                      checked={localSettings.notificationPrefs.email}
                      onChange={() => handleNotificationChange('email')}
                      className="w-5 h-5 rounded border-slate-500 bg-slate-700 text-emerald-400 focus:ring-emerald-400 focus:ring-2"
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Push Notifications</span>
                    <input
                      type="checkbox"
                      checked={localSettings.notificationPrefs.push}
                      onChange={() => handleNotificationChange('push')}
                      className="w-5 h-5 rounded border-slate-500 bg-slate-700 text-emerald-400 focus:ring-emerald-400 focus:ring-2"
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">SMS Notifications</span>
                    <input
                      type="checkbox"
                      checked={localSettings.notificationPrefs.sms}
                      onChange={() => handleNotificationChange('sms')}
                      className="w-5 h-5 rounded border-slate-500 bg-slate-700 text-emerald-400 focus:ring-emerald-400 focus:ring-2"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Theme and Language */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Appearance & Language</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-slate-300 mb-2">Theme</label>
                    <select
                      value={localSettings.theme}
                      onChange={handleThemeChange}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      disabled={!isEditing}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System Default</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-2">Language</label>
                    <select
                      value={localSettings.language}
                      onChange={handleLanguageChange}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      disabled={!isEditing}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-6 py-2 rounded-lg transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-slate-600/30 hover:bg-slate-600/50 text-slate-300 px-6 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-6 py-2 rounded-lg transition-colors"
              >
                Edit Settings
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;