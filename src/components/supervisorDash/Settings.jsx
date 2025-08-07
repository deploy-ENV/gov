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
  LogOut,
  VerifiedIcon,
  ArchiveRestore
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSettings, setActiveTab } from '../contractorDash/dashboardSlice';
import { useNavigate } from 'react-router-dom';

const SettingsTabSupervisor = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { notificationPrefs, theme, language } = useSelector(state => state.supervisorDashboard.settings);
  const [localSettings, setLocalSettings] = useState({
    notificationPrefs,
    theme,
    language,
  });
  const [isEditing, setIsEditing] = useState(false);
  const toggleProfileDropdown = () => {
      setIsProfileOpen(!isProfileOpen);
    };

  const [activeTab,setActiveTab] = useState('Settings');
  
const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home, path: '', color: 'text-blue-600' },
    { id: 'projects', label: 'Assigned Project', icon: FileText, path: 'assignedproject', color: 'text-green-600' },
    { id: 'supplier', label: 'Supplier Verification', icon: VerifiedIcon, path: 'supplierverification', color: 'text-purple-600' },
    { id: 'updates', label: 'Updates', icon: Activity, path: 'reviewupdates', color: 'text-amber-600' },
    { id: 'fund', label: 'Fund Requests', icon: DollarSign, path: 'fundrequestsreview', color: 'text-cyan-600' },
    { id: 'history', label: 'Request History', icon: ArchiveRestore, path: 'requesthistory', color: 'text-indigo-600' },
    { id: 'communication', label: 'Communication', icon: Users, path: 'communication', color: 'text-pink-600' },
    { id: 'settings', label: 'Settings', icon: Settings, path: 'settings', color: 'text-gray-600' },
 
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
      <div className="w-72 bg-slate-800/60 backdrop-blur-xl border-r border-slate-700/50 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-yellow-500/5"></div>

        {/* Logo */}
        <div className="flex items-center gap-3 p-6 relative z-10">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-300 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-slate-900" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">
            SecurePortal
          </h1>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-4 relative z-10">
          {sidebarItems.filter(item => !item.hidden).map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id}>
                <Link to={`/dashboard/supervisor/${item.path}`}>
                  <button
                    onClick={() => dispatch(setActiveTab(item.id))}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${
                      item.id === 'settings'
                        ? 'bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-medium hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </Link>
              </div>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-6 left-4 right-4 bg-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3 cursor-pointer"
          onClick={toggleProfileDropdown}>
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-slate-900" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Contractor</p>
              <p className="text-xs text-slate-400">contractor@secureportal.com</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
          {isProfileOpen && (
            <div className="mt-3 bg-slate-600/50 rounded-lg p-2 flex flex-col gap-3">
              <Link to="/profile">
                <button 
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-500/50 rounded-md transition-colors"
                  onClick={() => dispatch(setActiveTab(""))}
                >
                  <UserCircle className="w-4 h-4" />
                  Profile
                </button>
              </Link>
              <Link to="/logout">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-red-400/40 text-red-400/90 hover:bg-slate-500/50 rounded-md transition-colors">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

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

export default SettingsTabSupervisor;